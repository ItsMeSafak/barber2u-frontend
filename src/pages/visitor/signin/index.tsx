import React, { useContext } from "react";

import { Col, Layout, Row } from "antd";

import SignInForm from "../../../components/forms/signin";

import { ScreenContext } from "../../../contexts/screen-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the sign in form.
 *
 * @returns {JSX}
 */
const SignInPage: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);

    /**
     * Render default sign in form
     */
    const renderSignIn = () => (
        <Row className={styles.content}>
            <Col span={12} />
            <Col span={10}>
                <SignInForm />
            </Col>
        </Row>
    );

    /**
     * Render mobile sign in form
     */
    const renderMobileSignIn = () => (
        <Row className={styles.mobileContent}>
            <Col span={22}>
                <SignInForm />
            </Col>
        </Row>
    );

    return (
        <Content>
            {isMobileOrTablet ? renderMobileSignIn() : renderSignIn()}
        </Content>
    );
};

export default SignInPage;
