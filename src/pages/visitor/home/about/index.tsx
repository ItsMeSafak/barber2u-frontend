import React from "react";
import { Link } from "react-router-dom";

import { Button, Col, Row } from "antd";

import CardImage from "../../../../components/card-image";

import {
    PLACEHOLDER_IMAGE,
    PLACEHOLDER_TEXT,
} from "../../../../assets/constants";

import styles from "./styles.module.scss";

/**
 * About component is showed on the homepage and is an introduction
 * to the visitors of the web application.
 *
 * @returns {JSX}
 */
const AboutSection: React.FC = () => {
    // Mock data.
    const aboutMockData = [
        {
            name: "John Doe",
            title: "CEO",
            description: PLACEHOLDER_TEXT,
        },
        {
            name: "John Johnson",
            title: "COO",
            description: PLACEHOLDER_TEXT,
        },
        {
            name: "John Smith",
            title: "CTO",
            description: PLACEHOLDER_TEXT,
        },
    ];

    /**
     * This function renders the about cards.
     *
     * @returns {JSX}
     */
    const renderAboutCards = () =>
        aboutMockData.map(({ name, title, description }) => (
            <Col key={name} className={styles.cardCol} xs={24} md={12} xl={8}>
                <CardImage
                    image={PLACEHOLDER_IMAGE}
                    title={name}
                    label={title}
                    description={description}
                    labelColor="blue"
                    hoverable
                />
            </Col>
        ));

    return (
        <Row id="about" className={styles.section} justify="center">
            <Col span={24}>
                <h2 className={styles.sectionTitle}>About</h2>
            </Col>
            <Col xs={24} lg={12}>
                <p>{PLACEHOLDER_TEXT}</p>
                <Link to="/about">
                    <Button type="primary" shape="round" size="large">
                        Get to know us
                    </Button>
                </Link>
            </Col>
            <Col span={24}>
                <Row justify="center">
                    <Col xs={18} sm={12}>
                        <Row gutter={16} justify="center">
                            {renderAboutCards()}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AboutSection;
