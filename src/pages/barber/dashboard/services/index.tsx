import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import {
    Button,
    Card,
    Col,
    Divider,
    InputNumber,
    Layout,
    Row,
    Tooltip,
    Input,
    Switch,
    Form
} from "antd";
import {
    faCertificate,
    faCheck,
    faEdit,
    faPlus,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Service from "../../../../models/Service";

import { getAllServices, createNewService } from "../../../../services/services-service";

import { showNotification } from "../../../../assets/functions/notification";

import styles from "./styles.module.scss";
import { AuthContext } from "../../../../contexts/auth-context";

const { Content } = Layout;
const { TextArea } = Input;

interface CardProps {
    serviceDetail: Service;
    newService: boolean;
}

/**
 * This component renders the service card for the services page,
 * consisting of information regarding the service a barber offers.
 * TODO: Create a generic card component, that can be reused in the other pages.
 *
 * @param {Object} props
 * @returns {JSX}
 */
const ServiceCardComponent: React.FC<CardProps> = (props) => {
    const { serviceDetail, newService } = props;

    const { user, accessToken } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(0);
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
     * This function renders the actions a card can have.
     * The actions are:
     * - Deleting the service.
     * - Editing the service.
     *
     * @returns {JSX}
     */
    const actions = () => [
        <FontAwesomeIcon key="delete" icon={faTrash} />,
        <FontAwesomeIcon
            key="edit"
            icon={faEdit}
            onClick={() => setIsEditing(serviceDetail.id)}
        />,
    ];

    /**
     * This function sends a request to the backend, where we add a new service to the barber services.
     * 
     * @param {string} token token we received when logged in 
     * @param {Service} service service created
     * @param {string} barber barber email 
     */
    const addService = async (token: string | null, service?: Service, barber?: string) => {
        // Handle sigin, if API is unavailable, redirect to 503 page.
        const response = await createNewService(token, service, barber);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
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
     * This function sets the form value for number typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onNumberChange = (key: string) =>
        (value: number) => {
            setFormValue({
                ...formValue,
                [key]: value
            });
        };

    /**
     * This function sets the form value for string typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onInputChange = (key: string) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormValue({
                ...formValue,
                [key]: event.target.value
            });
        };


    return (
        <Col key={serviceDetail.id} xs={24} sm={12} lg={8} xl={8}>
            <Card
                className={styles.card}
                actions={!newService ? actions() : []}
            >
                {isEditing === serviceDetail.id ? (
                    <>
                        <Form>
                            <Form.Item>
                                <Input
                                    name="name"
                                    className={styles.dropdown}
                                    placeholder="Style"
                                    defaultValue={serviceDetail.name}
                                    onChange={onInputChange("name")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <TextArea
                                    name="description"
                                    className={styles.description}
                                    defaultValue={serviceDetail.description}
                                    placeholder="Description"
                                    onChange={onInputChange("description")}
                                    autoSize={{ maxRows: 10 }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <InputNumber
                                    name="time"
                                    className={styles.description}
                                    defaultValue={serviceDetail.time}
                                    onChange={onNumberChange("time")}
                                    placeholder="Minutes"
                                />
                            </Form.Item>
                            <Form.Item>
                                <InputNumber
                                    name="price"
                                    className={styles.inputPrice}
                                    defaultValue={serviceDetail.price}
                                    formatter={(value) => `€ ${value}`}
                                    onChange={onNumberChange("price")}
                                />
                            </Form.Item>
                        </Form>
                        <Tooltip title="Save">
                            <Button
                                className={styles.confirmButton}
                                type="primary"
                                shape="circle"
                                onClick={() => initService()}
                                icon={
                                    <FontAwesomeIcon icon={faCheck} />
                                }
                            />
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <Button
                                type="primary"
                                danger
                                onClick={() => setIsEditing(0)}
                                shape="circle"
                                icon={
                                    <FontAwesomeIcon icon={faTimes} />
                                }
                            />
                        </Tooltip>
                        <Switch className={styles.switch} checkedChildren="Open" unCheckedChildren="Closed" defaultChecked={serviceDetail.active} />
                    </>
                ) : (
                    <>
                        <h2 className={styles.header}>{serviceDetail.name} <FontAwesomeIcon className={serviceDetail.active ? styles.certificateOn : styles.certificateOff}
                            icon={faCertificate} /></h2>
                        <p>{serviceDetail.description}</p>
                        <p className={styles.time}><span>{serviceDetail.time}</span> minutes</p>
                        <span className={styles.price}>
                            &euro; {serviceDetail.price.toFixed(2)},-
                        </span>
                    </>
                )}
            </Card>
        </Col>
    );
};

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
                            <Row gutter={[20, 20]}>
                                <ServiceCardComponent
                                    serviceDetail={emptyService()}
                                    newService={newService}
                                />
                            </Row>
                        </>
                    )}
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {services &&
                            services.map((service) => (
                                <ServiceCardComponent
                                    key={service.id}
                                    serviceDetail={service}
                                    newService={false}
                                />
                            ))}
                    </Row>
                </Content>
            </Layout>
        </div>
    );
};

export default ServicesPage;
