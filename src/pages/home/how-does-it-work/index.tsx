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
const HowDoesItWorkComponent: React.FC = () => {
    /**
     * Rendering the cards from the content data
     */
    const renderCards = () =>
        content.instruction.map((card) => (
            <Card key={card.step} className={styles.card}>
                <Col>
                    <Row justify="center">
                        <Image src={card.image} preview={false} />
                    </Row>
                    <Row justify="center">
                        <div className={styles.step}>
                            <span>{card.step}</span>
                        </div>
                    </Row>
                    <Row justify="center">
                        <p>{card.description}</p>
                    </Row>
                </Col>
            </Card>
        ));

    return (
        <section id="howdoesitwork" className={styles.howdoesitwork}>
            <h1 className={styles.underlined}>{content.header_text}</h1>
            <Row justify="center" className={styles.cardContainer}>
                {renderCards()}
            </Row>
        </section>
    );
};

export default HowDoesItWorkComponent;
