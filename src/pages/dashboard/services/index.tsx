import { faCheck, faEdit, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Divider, InputNumber, Layout, Row, Select, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Service } from "../../../models/Service";
import { Style } from "../../../models/Style";

import styles from "./styles.module.scss";

interface ComponentProps {
    services: Service[];
}

interface CardProps {
    serviceDetail: Service;
    newService: boolean;
}

const { Option } = Select;

const ServiceCard: React.FC<CardProps> = ({ serviceDetail, newService }) => {
    const [isEditing, setIsEditing] = useState(0)

    const actions = () => [
        <FontAwesomeIcon key="delete" icon={faTrash} />,
        <FontAwesomeIcon key="edit" icon={faEdit} onClick={(evt) => setIsEditing(serviceDetail.id)} />
    ]

    return (
        <Col key={serviceDetail.id} xs={24} sm={12} lg={8} xl={8}>
            <Card className={styles.card}
                actions={!newService ? actions() : []}>
                {isEditing == serviceDetail.id ?
                    <>
                        <Select className={styles.dropdown} defaultValue={serviceDetail.style}>
                            {Object.keys(Style).map((style) => <Option key={style} value={style}>{style}</Option>
                            )}
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
                            formatter={value => `€ ${value}`}
                        />
                        {!newService && <><Tooltip title="Save">
                            <Button className={styles.confirmButton} type="primary" shape="circle"
                                icon={<FontAwesomeIcon icon={faCheck} />} />
                        </Tooltip>
                            <Tooltip title="Cancel">
                                <Button type="primary" danger onClick={(evt) => setIsEditing(0)} shape="circle"
                                    icon={<FontAwesomeIcon icon={faTimes} />} />
                            </Tooltip></>}
                    </>
                    : <>
                        <h2 className={styles.header}>{serviceDetail.style}</h2>
                        <p>{serviceDetail.description}</p>
                        <span className={styles.price}>&euro; {serviceDetail.price.toFixed(2)},-</span>
                    </>
                }
            </Card>
        </Col>
    )
}

const Services: React.FC<ComponentProps> = ({ services }) => {
    const keyCounter = 0;
    const [newService, setNewService] = useState(false)

    const keyCounterUp = () => {
        const newCounter = keyCounter + 1;
        return newCounter
    }

    const emptyService = () => new Service(0, Style.Curly, "", 0.00);

    return (
        <div className={styles.services}>
            <Layout>
                <Content>
                    <h1 className={styles.title}>Services</h1>
                    {!newService ? <Button className={styles.addBtn} type="primary" icon={<FontAwesomeIcon icon={faPlus} />} size="large"
                        onClick={(evt) => setNewService((prevState) => !prevState)}>
                        Add new service
                        </Button>
                        : <><Button className={`${styles.addBtn} ${styles.saveBtn}`} type="primary" icon={<FontAwesomeIcon icon={faCheck} />} size="large"
                            onClick={(evt) => setNewService((prevState) => !prevState)}>
                            Save
                            </Button>
                            <Button className={styles.addBtn} danger type="primary" icon={<FontAwesomeIcon icon={faTimes} />} size="large"
                                onClick={(evt) => setNewService((prevState) => !prevState)}>
                                Cancel
                            </Button>
                            <Row gutter={[20, 20]}>
                                <ServiceCard serviceDetail={emptyService()} newService={newService} />
                            </Row></>}
                    <Divider />
                    <Row gutter={[20, 20]}>
                        {services &&
                            services.map((service) => (
                                <ServiceCard key={keyCounterUp()} serviceDetail={service} newService={false} />
                            ))}
                    </Row>
                </Content>
            </Layout>
        </div >
    )
}

export default Services;
