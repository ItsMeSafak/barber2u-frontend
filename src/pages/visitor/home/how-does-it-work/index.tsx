import React from "react";

import { Col, Row } from "antd";

import CardImage from "../../../../components/card-image";

import {
    PLACEHOLDER_IMAGE_STEP1,
    PLACEHOLDER_IMAGE_STEP2,
    PLACEHOLDER_IMAGE_STEP3,
    PLACEHOLDER_TEXT_HOW_DOES_IT_WORK,
    PLACEHOLDER_TEXT_STEP1,
    PLACEHOLDER_TEXT_STEP2,
    PLACEHOLDER_TEXT_STEP3,
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
            description: PLACEHOLDER_TEXT_STEP1,
            image: PLACEHOLDER_IMAGE_STEP1
        },
        {
            step: 2,
            description: PLACEHOLDER_TEXT_STEP2,
            image: PLACEHOLDER_IMAGE_STEP2
        },
        {
            step: 3,
            description: PLACEHOLDER_TEXT_STEP3,
            image: PLACEHOLDER_IMAGE_STEP3
        },
    ];

    /**
     * Rendering the cards from the content data
     *
     * @returns {JSX}
     */
    const renderCards = () =>
        instructionsMockData.map(({ step, description, image }) => (
            <Col key={step} className={styles.cardCol} xs={24} md={12} xl={8}>
                <CardImage
                    image={image}
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
                <p>{PLACEHOLDER_TEXT_HOW_DOES_IT_WORK}</p>
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
