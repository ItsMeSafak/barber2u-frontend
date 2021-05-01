import React, { useCallback, useEffect, useState } from "react";

import { Col, Layout, Row } from "antd";

import ConfirmPasswordForm from "../../../components/forms/confirm-password";

import { WIDTH_SCREEN_LG } from "../../../assets/constants";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component is being used to render the confirm password page.
 *
 * @returns {JSX}
 */
const ConfirmPassword: React.FC = () => {
    const [isMobile, setMobile] = useState(false);

    /**
     * This function checks whether the window screen width reaches a breakpoint.
     * If so, the mobile state is set to true.
     */
    const handleMobileView = useCallback(() => {
        setMobile(window.innerWidth <= WIDTH_SCREEN_LG);
    }, []);

    /**
     * This function checks if the window size has been adjusted
     */
    useEffect(() => {
        handleMobileView();
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, [handleMobileView]);

    /**
     * Default form
     */
    const renderDefaultConfirmPassword = () => (
        <Row className={styles.content}>
            <Col span={12} />
            <Col span={10}>
                <ConfirmPasswordForm />
            </Col>
        </Row>
    );

    /**
     * Default form
     */
    const renderMobileConfirmPassword = () => (
        <Row className={styles.mobileContent}>
            <Col span={22}>
                <ConfirmPasswordForm />
            </Col>
        </Row>
    );

    return (
        <Content>
            {isMobile
                ? renderMobileConfirmPassword()
                : renderDefaultConfirmPassword()}
        </Content>
    );
};

export default ConfirmPassword;
