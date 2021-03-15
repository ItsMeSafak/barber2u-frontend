import React from "react";

import { Card, Col, Image, Row } from "antd";

import content from "../../../asset/content/homepage/homepage_howdoesitwork.json";

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
        content.instruction.map((card) => (
            <Col key={card.step} xs={24} sm={12} lg={8}>
                <Card className={styles.card}>
                    <Image src={card.image} preview={false} />
                    <div className={styles.step}>
                        <span>{card.step}</span>
                    </div>
                    <p className={styles.stepDescription}>{card.description}</p>
                </Card>
            </Col>
        ));

    return (
        <Row id="howdoesitwork" className={styles.section} justify="center">
            <Col xs={24}>
                <h2 className={styles.sectionTitle}>{content.header_text}</h2>
            </Col>
            <Row className={styles.cardContainer} justify="center">
                {content && renderCards()}
            </Row>
        </Row>
    );
};

export default HowDoesItWorkSection;
