import React, { useState } from "react";

import { Card, Col, Select } from "antd";

import PortfolioItem from "../../models/PortfolioItem";
import Style from "../../models/enums/Style";

import styles from "./styles.module.scss";

interface ComponentProps {
    portfolioItem: PortfolioItem;
    newItem: boolean;
}

const { Option } = Select;

/**
 * This component renders a service card for the service page.
 * TODO: Make this component generic
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const PortfolioCard: React.FC<ComponentProps> = (props) => {
    const { portfolioItem, newItem } = props;
    const [isEditing, setIsEditing] = useState(0);

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

export default PortfolioCard;
