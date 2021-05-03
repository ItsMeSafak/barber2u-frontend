import React, { useContext } from "react";

import { Col, Layout, Row } from "antd";

import ConfirmPasswordForm from "../../../components/forms/confirm-password";

import { ScreenContext } from "../../../contexts/screen-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component is being used to render the confirm password page.
 *
 * @returns {JSX}
 */
const ConfirmPassword: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);

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
            {isMobileOrTablet
                ? renderMobileConfirmPassword()
                : renderDefaultConfirmPassword()}
        </Content>
    );
};

export default ConfirmPassword;
