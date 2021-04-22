import React, { useEffect, useContext, useCallback } from "react";

import { Button, Divider, Layout, Modal, Row } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Service from "../../../../models/Service";

import {
    createNewService,
    getAllServices,
    updateService,
} from "../../../../services/services-service";

import ServiceCard from "../../../../components/card-service";
import NewServiceForm from "../../../../components/forms/new-service";

import { AuthenticationContext } from "../../../../contexts/authentication-context";
import { ServiceContext } from "../../../../contexts/service-context";

import { RESPONSE_OK } from "../../../../assets/constants";
import { showNotification } from "../../../../assets/functions/notification";
import { getIconByPrefixName } from "../../../../assets/functions/icon";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the services page, where the barber can display the services they offer.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ServicesPage: React.FC = () => {
    const { user } = useContext(AuthenticationContext);
    const {
        serviceDetail,
        listOfServices,
        isNewService,
        formValues,
        isDeleted,
        setServiceDetail,
        setListOfServices,
        setIsNewService,
        setIsDeleted
    } = useContext(ServiceContext);

    /**
     * This function fetches the services using the getAllServices function from services-service
     *
     * @param {string} barber the email of the barber
     */
    const fetchServices = useCallback(async () => {
        const response = await getAllServices(user?.getEmail);
        const { status, message } = response;
        if (!(status === RESPONSE_OK)) showNotification(undefined, message, status);
        if (!response.data) return;
        setListOfServices(response.data);
    }, [setListOfServices, user]);

    useEffect(() => {
        fetchServices();
        setIsDeleted(false);
    }, [serviceDetail, isDeleted, fetchServices, setIsDeleted]);

    /**
     * This function sends a request to the backend, where we add a new service to the barber services.
     *
     * @param {string} token token we received when logged in
     * @param {Service} service service created
     * @param {string} barber barber email
     */
    const addService = async () => {
        changeCurrentService();
        if (serviceDetail) {
            const response = await createNewService(serviceDetail);
            setServiceDetail(null);

            const { status, message } = response;
            if (!(status === RESPONSE_OK)) showNotification(undefined, message, status);
            else showNotification(undefined, message, status);
        }
    };

    /**
     * This function create a new (and empty) instance of a service.
     *
     * @returns {Service}
     */
    const emptyService = () => new Service("", "", "", 0.0, 0, true);

    /**
     * This fucntion renders the add button for creating a new service.
     *
     * @returns {JSX}
     */
    const renderAddButton = () => (
        <Button
            className={styles.addBtn}
            type="primary"
            icon={<FontAwesomeIcon icon={getIconByPrefixName("fas", "plus")} />}
            size="large"
            onClick={() => {
                setServiceDetail(null);
                setIsNewService(true);
            }}
        >
            Add new service
        </Button>
    );

    /**
     * This function updates the service detail based on the form values.
     */
    const changeCurrentService = () => {
        if (formValues && serviceDetail) {
            serviceDetail.name = formValues.name;
            serviceDetail.description = formValues.description;
            serviceDetail.time = formValues.time;
            serviceDetail.price = formValues.price;
            serviceDetail.active = formValues.isActive;
            setServiceDetail({ ...serviceDetail });
        }
    };

    /**
     * This function updates the current service on the list.
     */
    const updateCurrentService = async () => {
        if (serviceDetail) {
            changeCurrentService();
            const response = await updateService(serviceDetail);
            setServiceDetail(null);
            const { status, message } = response;
            if (!(status === RESPONSE_OK)) showNotification(undefined, message, status);
            else showNotification(undefined, message, status);
        }
    };

    /**
     * This function checks if either the description or name are empty strings.
     *
     * @returns {boolean}
     */
    const checkFormValues = () =>
        formValues.description === "" || formValues.name === "";

    /**
     * This function renders the modal of a service.
     *
     * @returns {JSX}
     */
    const renderModal = () => (
        <Modal
            title="Service details"
            centered
            okButtonProps={{ disabled: checkFormValues() }}
            visible={serviceDetail !== null || isNewService!}
            onOk={() => isNewService ? addService() : updateCurrentService()}
            onCancel={() => setServiceDetail(null)}
            width={800}
        >
            <NewServiceForm serviceDetail={serviceDetail} />
        </Modal>
    );

    /**
     * This function renders the service elements.
     * 
     * @returns {JSX}
     */
    const renderServices = () =>
        listOfServices?.map((service) => (
            <ServiceCard
                key={service.id}
                serviceDetail={service}
            />
        ));

    return (
        <div className={styles.services}>
            <Layout>
                <Content>
                    <h1 className={styles.title}>Services</h1>
                    {renderAddButton()}
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {renderServices()}
                    </Row>
                </Content>
            </Layout>
            {renderModal()}
        </div>
    );
};

export default ServicesPage;
