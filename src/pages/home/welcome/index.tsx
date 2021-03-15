import React from "react";
import { Link } from "react-router-dom";

import { Button, Row } from "antd";

import content from "../../../asset/content/homepage/homepage_welcome.json";

import styles from "./styles.module.scss";

/**
 *  Welcome landing page section on the homepage, with an option to register
 *
 * @returns {JSX}
 */
const WelcomeSection: React.FC = () => (
    <Row id="welcome" className={styles.section} justify="center">
        <div className={styles.container}>
            <h1 className={styles.sectionTitle}>{content.header1_text}</h1>
            <h2 className={styles.sectionDescription}>
                {content.header2_text}
            </h2>
            <Link to="/register">
                <Button type="primary" shape="round" size="large">
                    {content.button_text}
                </Button>
            </Link>
        </div>
    </Row>
);

export default WelcomeSection;
