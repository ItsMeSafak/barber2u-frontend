import React, { useContext } from "react";

import { Col, Layout, Row } from "antd";

import ResetPasswordForm from "../../../components/forms/reset-password";

import { ScreenContext } from "../../../contexts/screen-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component is being used to render the reset password page.
 *
 * @returns {JSX}
 */
const ResetPasswordPage: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);

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
            {isMobileOrTablet
                ? renderMobileResetPassword()
                : renderDefaultResetPassword()}
        </Content>
    );
};

export default ResetPasswordPage;
