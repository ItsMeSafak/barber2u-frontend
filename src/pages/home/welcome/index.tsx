import React from "react";
import { Link } from "react-router-dom";

import { Row } from "antd";

import content from "../../../asset/content/homepage/homepage_welcome.json";

import styles from "./styles.module.scss";

/**
 *  Welcome landing page section on the homepage, with an option to register
 *
 * @returns {JSX}
 */
const WelcomeComponent: React.FC = () => (
    <Row justify="center" id="welcome" className={styles.welcome}>
        <div className={styles.welcomeContainer}>
            <h1>{content.header1_text}</h1>
            <h2>{content.header2_text}</h2>
            <Link to="/register" className={styles.primaryButton}>
                {content.button_text}
            </Link>
        </div>
    </Row>
);

export default WelcomeComponent;
