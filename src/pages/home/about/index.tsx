import React from "react";
import { Link } from "react-router-dom";

import { Button, Col, Row } from "antd";

import content from "../../../asset/content/homepage/homepage_about.json";

import styles from "./styles.module.scss";

/**
 * About component is showed on the homepage and is an introduction
 * to the visitors of the web application.
 *
 * @returns {JSX}
 */
const AboutSection: React.FC = () => (
    <Row id="about" className={styles.section} justify="center">
        <Col xs={24}>
            <h2 className={styles.sectionTitle}>{content.header_text}</h2>
        </Col>
        <Col xs={24} lg={12}>
            <p>{content.paragraph_text}</p>
            <Link to="/about">
                <Button type="primary" shape="round" size="large">
                    {content.button_text}
                </Button>
            </Link>
        </Col>
    </Row>
);

export default AboutSection;
