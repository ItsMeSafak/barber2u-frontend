import React from "react";

import { Col, Row } from "antd";

import CardImage from "../../../../components/card-image";

import {
    PLACEHOLDER_IMAGE,
    PLACEHOLDER_TEXT,
} from "../../../../assets/constants";

import styles from "./styles.module.scss";

/**
 * How Does It Work component used to display some steps
 * in order to use the web application.
 *
 * @returns {JSX}
 */
const HowDoesItWorkSection: React.FC = () => {
    // Mock data.
    const instructionsMockData = [
        {
            step: 1,
            description: PLACEHOLDER_TEXT,
        },
        {
            step: 2,
            description: PLACEHOLDER_TEXT,
        },
        {
            step: 3,
            description: PLACEHOLDER_TEXT,
        },
    ];

    /**
     * Rendering the cards from the content data
     *
     * @returns {JSX}
     */
    const renderCards = () =>
        instructionsMockData.map(({ step, description }) => (
            <Col key={step} className={styles.cardCol} xs={24} md={12} xl={8}>
                <CardImage
                    image={PLACEHOLDER_IMAGE}
                    title={`Step ${step}`}
                    description={description}
                    hoverable
                />
            </Col>
        ));

    return (
        <Row id="how-it-works" className={styles.section} justify="center">
            <Col span={24}>
                <h2 className={styles.sectionTitle}>How does it work?</h2>
            </Col>
            <Col xs={24} lg={12}>
                <p>{PLACEHOLDER_TEXT}</p>
            </Col>
            <Col span={24}>
                <Row justify="center">
                    <Col xs={18} sm={12}>
                        <Row gutter={16} justify="center">
                            {renderCards()}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default HowDoesItWorkSection;
