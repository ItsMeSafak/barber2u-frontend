import React, { useState } from "react";

import { Card, Col, Select } from "antd";

import PortfolioItem from "../../models/PortfolioItem";
import styles from "../../pages/dashboard/portfolio/styles.module.scss";

import Style from "../../models/Style";

interface ComponentProps {
    portfolioItem: PortfolioItem;
    newItem: boolean;
}

const { Option } = Select;

// eslint-disable-next-line require-jsdoc
const ServiceCard: React.FC<ComponentProps> = (props) => {
    const [isEditing, setIsEditing] = useState(0);
    const { portfolioItem, newItem } = props;

    return (
        <Col key={portfolioItem.id} xs={24} sm={12} lg={8}>
            <Card className={styles.card}>
                {isEditing === portfolioItem.id ? (
                    <Select
                        className={styles.dropdown}
                        defaultValue={portfolioItem.style}
                    >
                        {Object.keys(Style).map((style) => (
                            <Option key={style} value={style}>
                                {style}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    <h2 className={styles.header}>{portfolioItem.style}</h2>
                )}
            </Card>
        </Col>
    );
};

export default ServiceCard;
