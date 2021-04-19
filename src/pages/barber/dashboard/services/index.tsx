import React, { useEffect, useState, useContext } from "react";

import {
    Button,
    Divider,
    Layout,
    Row
} from "antd";
import {
    faCheck,
    faPlus, faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Service from "../../../../models/Service";

import styles from "./styles.module.scss";
import { showNotification } from "../../../../assets/functions/notification";
import { createNewService, deleteService, getAllServices } from "../../../../services/services-service";
import { AuthContext } from "../../../../contexts/auth-context";
import ServiceCard from "../../../../components/card-service";

const { Content } = Layout;

/**
 * This component renders the services page, where the barber can display the services they offer.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ServicesPage: React.FC = () => {
    const { user, accessToken } = useContext(AuthContext);

    const [newService, setNewService] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [formValue, setFormValue] = useState<{
        name: string;
        description: string;
        price: number;
        time: number
    }>({
        name: "",
        description: "",
        price: 0,
        time: 0
    });

    /**
     * This function sends a request to the backend, where we add a new service to the barber services.
     * 
     * @param {string} token token we received when logged in 
     * @param {Service} service service created
     * @param {string} barber barber email 
     */
    const addService = async (token: string | null, service?: Service, barber?: string) => {
        // Handle sigin, if API is unavailable, redirect to 503 page.
        const response = await createNewService(token, service);
        fetchServices(accessToken, user?.getEmail);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        else showNotification(undefined, message, status);
    };

    /**
     * This function gets called by the tooltip when editing a service.
     * Depending on if its a new service, it either creates a new service or edits one.
     */
    const initService = () => {
        if (newService) {
            const initialService = new Service(formValue.name, formValue.description, formValue.price, formValue.time, true);
            addService(accessToken, initialService, user?.getEmail);
        }
    };

    /**
     * This function fetches the services using the getAllServices function from services-service
     * 
     * @param {string} barber the email of the barber 
     */
    const fetchServices = async (token: string | null, barber?: string) => {
        // Handle sigin, if API is unavailable, redirect to 503 page.
        const response = await getAllServices(token, barber);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        if (!response.data) return;

        // If request is OK, handle authentication.
        setServices(response.data as Service[]);
    };

    useEffect(() => {
        fetchServices(accessToken, user?.getEmail);
    }, []);

    /**
     * This function create a new (and empty) instance of a service.
     *
     * @returns {Service}
     */
    const emptyService = () => new Service("", "", 0.0, 0, true);

    /**
     * This function is a callback that gets triggered everytime a change is made to the form in the child component.
     * 
     * @param data form data
     */
    const formCallback = (data: { name: string; description: string; price: number; time: number; }) => {
        setFormValue(data);
    };

    /**
     * Test
     */
    const deletedCallback = (isDeleted: boolean) => {
        if (isDeleted) fetchServices(accessToken, user?.getEmail);
    };

    return (
        <div className={styles.services}>
            <Layout>
                <Content>
                    <h1 className={styles.title}>Services</h1>
                    {!newService ? (
                        <Button
                            className={styles.addBtn}
                            type="primary"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            size="large"
                            onClick={() =>
                                setNewService((prevState) => !prevState)
                            }
                        >
                            Add new service
                        </Button>
                    ) : (
                        <>
                            <Button
                                className={`${styles.addBtn} ${styles.saveBtn}`}
                                type="primary"
                                icon={<FontAwesomeIcon icon={faCheck} />}
                                size="large"
                                onClick={() => {
                                    initService();
                                    setNewService((prevState) => !prevState);
                                }
                                }
                            >
                                Save
                            </Button>
                            <Button
                                className={styles.addBtn}
                                danger
                                type="primary"
                                icon={<FontAwesomeIcon icon={faTimes} />}
                                size="large"
                                onClick={() =>
                                    setNewService((prevState) => !prevState)
                                }
                            >
                                Cancel
                            </Button>
                            <Row gutter={[20, 20]}>
                                <ServiceCard
                                    serviceDetail={emptyService()}
                                    newService={newService}
                                    callback={formCallback}
                                />
                            </Row>
                        </>
                    )}
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {services &&
                            services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    serviceDetail={service}
                                    newService={false}
                                    serviceDeleted={deletedCallback}
                                />
                            ))}
                    </Row>
                </Content>
            </Layout>
        </div>
    );
};

export default ServicesPage;
