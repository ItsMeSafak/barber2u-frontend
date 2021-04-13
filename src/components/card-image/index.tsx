import React from "react";

import { Card, Tag, Image, CardProps } from "antd";

import styles from "./styles.module.scss";

const { Meta } = Card;

interface ComponentProps extends CardProps {
    image: string;
    title: string;
    label?: string;
    description?: string;
    labelColor?: string;
}

/**
 * This component is used to render a generic card with image and its description.
 * It extends the Card component properties so that these properties can be used too.
 * 
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const CardImage: React.FC<ComponentProps> = (props) => {
    const { image, title, label, description, labelColor, hoverable } = props;

    /**
     * This function renders the description details.
     *
     * @returns {JSX}
     */
    const renderDescriptionDetails = () => (
        <>
            {label && (
                <Tag className={styles.label} color={labelColor}>
                    {label}
                </Tag>
            )}
            {description && <p className={styles.description}>{description}</p>}
        </>
    );

    return (
        <Card hoverable={hoverable} cover={<Image src={image} />}>
            <Meta title={title} description={renderDescriptionDetails()} />
        </Card>
    );
};

export default CardImage;
