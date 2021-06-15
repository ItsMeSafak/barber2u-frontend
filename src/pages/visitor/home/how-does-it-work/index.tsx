import React from "react";

import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIconByPrefixName } from "../../../../assets/functions/icon";
import {
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
    const instructions = [
        {
            step: 1,
            description: PLACEHOLDER_TEXT_STEP1,
            icon: "user-edit",
        },
        {
            step: 2,
            description: PLACEHOLDER_TEXT_STEP2,
            icon: "cut",
        },
        {
            step: 3,
            description: PLACEHOLDER_TEXT_STEP3,
            icon: "calendar",
        },
    ];

    /**
     * Rendering the cards from the content data
     *
     * @returns {JSX}
     */
    const renderCards = () =>
        instructions.map(({ step, description, icon }) => (
            <Col key={step} className={styles.cardCol} xs={24} md={12} xl={8}>
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", icon)}
                    size="5x"
                />
                <div className={styles.step}>{step}</div>
                <h4>{description}</h4>
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
