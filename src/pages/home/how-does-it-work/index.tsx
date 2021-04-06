import React from "react";

import { Card, Col, Image, Row } from "antd";

import { PLACEHOLDER_IMAGE, PLACEHOLDER_TEXT } from "../../../assets/constants";

import styles from "./styles.module.scss";

/**
 * How Does It Work component used to display some steps
 * in order to use the web application.
 *
 * @returns {JSX}
 */
const HowDoesItWorkSection: React.FC = () => {
    /**
     * Rendering the cards from the content data
     *
     * @returns {JSX}
     */
    const renderCards = () =>
        [1, 2, 3].map((index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
                <Card className={styles.card}>
                    <Image src={PLACEHOLDER_IMAGE} preview={false} />
                    <div className={styles.step}>
                        <span>{index}</span>
                    </div>
                    <p className={styles.stepDescription}>{PLACEHOLDER_TEXT}</p>
                </Card>
            </Col>
        ));

    return (
        <Row id="how-it-works" className={styles.section} justify="center">
            <Col xs={24}>
                <h2 className={styles.sectionTitle}>How does it work?</h2>
            </Col>
            <Row className={styles.cardContainer} justify="center">
                {renderCards()}
            </Row>
        </Row>
    );
};

export default HowDoesItWorkSection;
