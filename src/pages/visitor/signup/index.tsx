import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { WIDTH_SCREEN_LG } from "../../../assets/constants";
import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

/**
 * This component renders the landings page for the signup.
 * The user can then choose for what type of user someone would like to register for.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const SignupLandingPage: React.FC = () => {
    const [isMobile, setMobile] = useState(false);

    const history = useHistory();

    /**
     * This function checks whether the window screen width reaches a breakpoint.
     * If so, the mobile state is set to true.
     */
    const handleMobileView = useCallback(() => {
        setMobile(window.innerWidth <= WIDTH_SCREEN_LG);
    }, []);

    /**
     * This function checks whether the window size has been adjusted.
     * Whenever the window width reaches a specific width, the hamburger menu is then visible.
     * The function gets executed by default whenever the window has been loaded.
     * At the end, the event listener is removed so that unnecessary events are unloaded.
     */
    useEffect(() => {
        handleMobileView();
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, [handleMobileView]);

    /**
     * This function redirects to the given path with the root url.
     *
     * @param {string} path The path to be redirected to.
     */
    const redirectToPage = (path: string) => history.push(`signup/${path}`);

    return (
        <Row className={isMobile ? styles.mobileContent : styles.content}>
            <Col xs={24} lg={12} onClick={() => redirectToPage("barber")}>
                <div className={styles.leftColumn}>
                    <h2 className={styles.title}>
                        <FontAwesomeIcon
                            className={styles.icon}
                            icon={getIconByPrefixName("fas", "cut")}
                            size="lg"
                        />
                        Register as Barber
                    </h2>
                </div>
            </Col>
            <Col xs={24} lg={12} onClick={() => redirectToPage("customer")}>
                <div className={styles.rightColumn}>
                    <h2 className={styles.title}>
                        <FontAwesomeIcon
                            className={styles.icon}
                            icon={getIconByPrefixName("fas", "user-tie")}
                            size="lg"
                        />
                        Register as Customer
                    </h2>
                </div>
            </Col>
        </Row>
    );
};

export default SignupLandingPage;
