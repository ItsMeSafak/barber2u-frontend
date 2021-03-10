import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

interface ComponentProps {
    items?: {
        style: string;
        description: string;
        price: number;
    }[];
}

const Services: React.FC<ComponentProps> = ({ items }) => {
    const MAX_WIDTH = 1200;

    return (
        <div className={styles.services}>
            <Layout>
                <Content>
                    <h1 className={styles.title}>Services</h1>
                    <Button className={styles.addBtn} type="primary" icon={<FontAwesomeIcon icon={faPlus} />} size="large">
                        Add new service
                        </Button>
                    <Row gutter={[20, 20]}>
                        {items &&
                            items.map(({ style, description, price }) => (
                                <Col key={style} xs={24} sm={12} lg={8} xl={8}>
                                    <Card className={styles.card}
                                    actions={[
                                        <FontAwesomeIcon key="delete" icon={faTrash} />,
                                        <FontAwesomeIcon key="edit" icon={faEdit} />,
                                         ]}>
                                        <h2 className={styles.header}>{style}</h2>
                                        <p>{description}</p>
                                        <span className={styles.price}>&euro; {price.toFixed(2)},-</span>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Content>
            </Layout>

        </div>
    );
};

export default Services;
