import React, { useEffect, useContext, useCallback, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Divider,
    Empty,
    Layout,
    Modal,
    Pagination,
    Row,
    Select
} from "antd";

import Service from "../../../../models/Service";

import ServiceCard from "../../../../components/card-service";
import NewServiceForm from "../../../../components/forms/new-service";

import { BarberContext } from "../../../../contexts/barber-context";
import {
    createNewService,
    getAllServices,
    updateService,
} from "../../../../services/services-service";

import { handlePagination } from "../../../../assets/functions/pagination";
import { MAX_ITEMS_PER_PAGE } from "../../../../assets/constants";
import { getIconByPrefixName } from "../../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";

import styles from "./styles.module.scss";
import Skeleton from "../../../../components/skeleton";

const { Content } = Layout;
const { Option } = Select;

const INITIAL_PAGE = 1;

/**
 * This component renders the services page, where the barber can display the services they offer.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ServicesPage: React.FC = () => {
    const {
        loading,
        serviceDetail,
        listOfServices,
        formValues,
        isDeleted,
        isNewItem,
        setLoading,
        setServiceDetail,
        setListOfServices,
        setIsNewItem,
        setIsDeleted,
    } = useContext(BarberContext);
    const [minIndexValue, setMinIndexValue] = useState(0);
    const [maxIndexValue, setMaxIndexValue] = useState(MAX_ITEMS_PER_PAGE);
    const [currentFilter, setCurrentFilter] = useState("");

    /**
     * This function fetches the services using the getAllServices function from services-service
     *
     * @param {string} barber the email of the barber
     */
    const fetchServices = useCallback(
        async (filter: string | null) => {
            setLoading(true);
            const response = await getAllServices(filter);

            const { status, message, data } = response;
            showHttpResponseNotification(message, status, false);
            if (!response.data) return;

            const serviceObjects: Array<Service> = data.map((item) =>
                Object.setPrototypeOf(item, Service.prototype)
            );
            setListOfServices(serviceObjects);
            setLoading(false);
        },
        [setLoading, setListOfServices]
    );

    useEffect(() => {
        fetchServices(currentFilter !== "" ? currentFilter : null);
        setIsDeleted(false);
        return () => setLoading(true);
    }, [isDeleted, fetchServices, setIsDeleted, setLoading, currentFilter]);

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
            setIsNewItem(false);

            const { status, message } = response;
            showHttpResponseNotification(message, status);
            fetchServices(null);
        }
    };

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
                setServiceDetail(new Service("", "", "", 0, 0, true));
                setIsNewItem(true);
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
            serviceDetail.setName = formValues.name;
            serviceDetail.setDescription = formValues.description;
            serviceDetail.setTime = formValues.time;
            serviceDetail.setPrice = formValues.price;
            serviceDetail.setActive = formValues.isActive;
            setServiceDetail(serviceDetail);
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
            showHttpResponseNotification(message, status);
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
     * [This lint error here may be ignored because of some other issues]
     *
     * @returns {JSX}
     */
    const renderModal = () => (
        <Modal
            title="Service details"
            centered
            destroyOnClose
            okButtonProps={{ disabled: checkFormValues() }}
            visible={!!serviceDetail}
            onOk={() => (isNewItem ? addService() : updateCurrentService())}
            onCancel={() => {
                setIsNewItem(false);
                setServiceDetail(null);
            }}
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
        listOfServices
            ?.map((service) => (
                <ServiceCard key={service.getId} serviceDetail={service} />
            ))
            .slice(minIndexValue, maxIndexValue);

    /**
     * This function handles the filtering of the service based on the status
     *
     * @param value
     */
    const handleFilterChange = (value: string) => {
        setCurrentFilter(value);
        setMinIndexValue(0);
        setMaxIndexValue(MAX_ITEMS_PER_PAGE);
    };

    return (
        <div className={styles.services}>
            <Layout>
                <Content>
                    <Select
                        placeholder="Select a status"
                        size="large"
                        allowClear
                        onChange={handleFilterChange}
                    >
                        <Option value="true">Active</Option>
                        <Option value="false">Inactive</Option>
                    </Select>
                    {renderAddButton()}
                    <Divider />
                    <Skeleton loading={loading}>
                        <div className={styles.wrapper}>
                            {listOfServices && (
                                <Row gutter={[20, 20]}>
                                    {listOfServices.length > 0 ? (
                                        renderServices()
                                    ) : (
                                        <Empty className={styles.noData} />
                                    )}
                                </Row>
                            )}
                            <div className={styles.pagination}>
                                <Pagination
                                    defaultCurrent={1}
                                    onChange={(value) =>
                                        handlePagination(
                                            value,
                                            setMinIndexValue,
                                            setMaxIndexValue
                                        )
                                    }
                                    defaultPageSize={MAX_ITEMS_PER_PAGE}
                                    total={listOfServices?.length}
                                />
                            </div>
                        </div>
                    </Skeleton>
                </Content>
            </Layout>
            {renderModal()}
        </div>
    );
};

export default ServicesPage;
