import React from "react";
import { Link } from "react-router-dom";

import { Col, Image, Row } from "antd";

import content from "../../../asset/content/homepage/homepage_about.json";

import styles from "./styles.module.scss";

/**
 * About component is showed on the homepage and is an introduction
 * to the visitors of the web application.
 *
 * @returns {JSX}
 */
const AboutComponent: React.FC = () => (
    <Row id="about" className={styles.about}>
        <Col className={styles.aboutContainer}>
            <h1 className={styles.underlined}>{content.header_text}</h1>
            <p>{content.paragraph_text}</p>
            <Link to="/about" className={styles.primaryButton}>
                {content.button_text}
            </Link>
        </Col>
        <Col flex="auto">
            <Image preview={false} src={content.image} />
        </Col>
    </Row>
);

export default AboutComponent;
