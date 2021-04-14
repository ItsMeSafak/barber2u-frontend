import React, { useState } from "react";

import { Card, Col, Select } from "antd";

import Style from "../../models/Style";
import CardItem from "../../models/CardItem";

import styles from "./styles.module.scss";


interface ComponentProps {
    cardItem: CardItem;
}

const { Option } = Select;

/**
 * This component renders a service card for the service page.
 * TODO: Make this component generic
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const CardComponent: React.FC<ComponentProps> = (props) => {
    const { cardItem } = props;
    const [isEditing, setIsEditing] = useState(0);

    /**
     * This function renders the content of a card.
     */
    const renderCardContent = ()=> {
        
    };

    return (
        <Col key={cardItem.id} xs={24} sm={12} lg={8}>
            <Card className={styles.card}>
                {isEditing === cardItem.id ? (
                    <Select
                        className={styles.dropdown}
                        defaultValue={cardItem.style}
                    >
                        {Object.keys(Style).map((style) => (
                            <Option key={style} value={style}>
                                {style}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    <h2 className={styles.header}>{cardItem.style}</h2>
                )}
            </Card>
        </Col>
    );
};

export default CardComponent;
