import React, { useEffect, useState, useContext } from "react";

import {
    Button,
    Divider,
    Layout,
    Modal,
    Row
} from "antd";
import {
    faCheck,
    faPlus, faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Service from "../../../../models/Service";

import { showNotification } from "../../../../assets/functions/notification";

import { createNewService, getAllServices, updateService } from "../../../../services/services-service";

import ServiceCard from "../../../../components/card-service";

import { AuthContext } from "../../../../contexts/auth-context";
import { ServiceContext } from "../../../../contexts/service-context";

import styles from "./styles.module.scss";
import NewServiceForm from "../../../../components/forms/new-service";

const { Content } = Layout;

/**
 * This component renders the services page, where the barber can display the services they offer.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ServicesPage: React.FC = () => {
    const { user } = useContext(AuthContext);

    const { serviceDetail, listOfServices, isNewService, formValues, isDeleted, setServiceDetail, setListOfServices, setIsNewService } = useContext(ServiceContext);

    /**
     * This function sends a request to the backend, where we add a new service to the barber services.
     * 
     * @param {string} token token we received when logged in 
     * @param {Service} service service created
     * @param {string} barber barber email 
     */
    const addService = async () => {
        updateCurrentServiceOnForm();
        if (serviceDetail) {
            const response = await createNewService(serviceDetail);
            setServiceDetail(null);

            // If request is not OK, handle errors with notification.
            const { status, message } = response;
            if (!(status === 200)) showNotification(undefined, message, status);
            else showNotification(undefined, message, status);
        }
    };

    /**
     * This function create a new (and empty) instance of a service.
     *
     * @returns {Service}
     */
    const emptyService = () => new Service("", "", 0.0, 0, true);

    /**
     * Test
     */
    const renderNewServiceModal = () => (
        <Modal
            title="Creating a new service"
            centered
            visible={serviceDetail !== null}
            onOk={() => addService()}
            onCancel={() => setServiceDetail(null)}
            width={1000} >
            <NewServiceForm serviceDetail={serviceDetail} />
        </Modal>
    );

    /**
     * This fucntion renders the add button for creating a new service.
     * 
     * @returns {JSX}
     */
    const renderAddButton = () => (
        <Button
            className={styles.addBtn}
            type="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            size="large"
            onClick={() => {
                setServiceDetail(emptyService());
                setIsNewService(true);
            }}>
            Add new service
        </Button>
    );

    /**
     * Test
     */
    const updateCurrentServiceOnForm = () => {
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
     * Test
     */
    const changeCurrentService = async () => {
        if (serviceDetail) {
            updateCurrentServiceOnForm();
            const response = await updateService(serviceDetail);
            setServiceDetail(null);

            // If request is not OK, handle errors with notification.
            const { status, message } = response;
            if (!(status === 200)) showNotification(undefined, message, status);
            else showNotification(undefined, message, status);
            console.log("Service updated");
        }
    };

    /**
     * This function fetches the services using the getAllServices function from services-service
     * 
     * @param {string} barber the email of the barber 
     */
    const fetchServices = async () => {
        // Handle sigin, if API is unavailable, redirect to 503 page.
        const response = await getAllServices(user?.getEmail);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        if (!response.data) return;

        // If request is OK, handle authentication.
        setListOfServices(response.data as Service[]);

        console.log("Services fetched");
    };

    useEffect(() => {
        fetchServices();
    }, [serviceDetail, isDeleted]);

    /**
     * This function renders the modal of a service.
     * 
     * @returns {JSX}
     */
    const renderModal = () => (
        <Modal
            title="Service details"
            centered
            visible={serviceDetail !== null}
            onOk={() => changeCurrentService()}
            onCancel={() => setServiceDetail(null)}
            width={1000} >
            <NewServiceForm serviceDetail={serviceDetail} />
        </Modal>
    );

    return (
        <div className={styles.services}>
            <Layout>
                <Content>
                    <h1 className={styles.title}>Services</h1>
                    {renderAddButton()}
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {listOfServices &&
                            listOfServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    serviceDetail={service}
                                />
                            ))}
                    </Row>
                </Content>
            </Layout>
            {serviceDetail && !isNewService && renderModal()}
            {isNewService && renderNewServiceModal()}
        </div >
    );
};

export default ServicesPage;

