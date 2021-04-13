import React, { useState } from "react";

import {
    Button,
    Card,
    Col,
    Divider,
    InputNumber,
    Layout,
    Row,
    Select,
    Tooltip,
    Input,
} from "antd";
import {
    faCheck,
    faEdit,
    faPlus,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Style from "../../../../models/enums/Style";
import Service from "../../../../models/Service";

import styles from "./styles.module.scss";

const { Option } = Select;
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
    const [isEditing, setIsEditing] = useState(0);

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

    return (
        <Col key={serviceDetail.id} xs={24} sm={12} lg={8} xl={8}>
            <Card
                className={styles.card}
                actions={!newService ? actions() : []}
            >
                {isEditing === serviceDetail.id ? (
                    <>
                        <Select
                            className={styles.dropdown}
                            defaultValue={serviceDetail.style}
                        >
                            {Object.keys(Style).map((style) => (
                                <Option key={style} value={style}>
                                    {style}
                                </Option>
                            ))}
                        </Select>
                        <TextArea
                            className={styles.description}
                            value={serviceDetail.description}
                            placeholder="Description"
                            autoSize={{ maxRows: 10 }}
                        />
                        <InputNumber
                            className={styles.inputPrice}
                            defaultValue={serviceDetail.price}
                            formatter={(value) => `€ ${value}`}
                        />
                        {!newService && (
                            <>
                                <Tooltip title="Save">
                                    <Button
                                        className={styles.confirmButton}
                                        type="primary"
                                        shape="circle"
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
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className={styles.header}>{serviceDetail.style}</h2>
                        <p>{serviceDetail.description}</p>
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
    const [newService, setNewService] = useState(false);

    const servicesMockData: Service[] = [
        {
            id: 1,
            style: Style.Curly,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
            price: 20.0,
        },
        {
            id: 2,
            style: Style.Styled,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
            price: 10.15,
        },
        {
            id: 3,
            style: Style.Yee,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
            price: 12.5,
        },
    ];

    /**
     * This function create a new (and empty) instance of a service.
     *
     * @returns {Service}
     */
    const emptyService = () => new Service(0, Style.Curly, "", 0.0);

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
                                onClick={() =>
                                    setNewService((prevState) => !prevState)
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
                                <ServiceCardComponent
                                    serviceDetail={emptyService()}
                                    newService={newService}
                                />
                            </Row>
                        </>
                    )}
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {servicesMockData &&
                            servicesMockData.map((service) => (
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
