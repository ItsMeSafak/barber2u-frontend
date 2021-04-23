import React, { useCallback, useEffect, useState } from "react";

import { Col, Layout, Row } from "antd";

import ResetPasswordForm from "../../../components/forms/reset-password";

import { WIDTH_SCREEN_LG } from "../../../assets/constants";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component is being used to render the reset password page.
 *
 * @returns {JSX}
 */
const ResetPasswordPage: React.FC = () => {
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
    const renderDefaultResetPassword = () => (
        <Row className={styles.content}>
            <Col span={12} />
            <Col span={10}>
                <ResetPasswordForm />
            </Col>
        </Row>
    );

    /**
     * Default form
     */
    const renderMobileResetPassword = () => (
        <Row className={styles.mobileContent}>
            <Col span={22}>
                <ResetPasswordForm />
            </Col>
        </Row>
    );

    return (
        <Content>
            {isMobile
                ? renderMobileResetPassword()
                : renderDefaultResetPassword()}
        </Content>
    );
};

export default ResetPasswordPage;
