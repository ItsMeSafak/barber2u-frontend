import React from "react";
import { Link } from "react-router-dom";

import { Button, Row } from "antd";

import { APP_SLOGAN_1, APP_SLOGAN_2 } from "../../../../assets/constants";

import styles from "./styles.module.scss";

/**
 *  Welcome landing page section on the homepage, with an option to register
 *
 * @returns {JSX}
 */
const WelcomeSection: React.FC = () => (
    <Row id="welcome" className={styles.section} justify="center">
        <div className={styles.container}>
            <h1 className={styles.sectionTitle}>{APP_SLOGAN_1}</h1>
            <h2 className={styles.sectionDescription}>{APP_SLOGAN_2}</h2>
            <Link to="signup">
                <Button type="primary" shape="round" size="large">
                    Create an account now!
                </Button>
            </Link>
        </div>
    </Row>
);

export default WelcomeSection;
