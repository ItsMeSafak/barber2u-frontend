import React, { useCallback, useEffect, useState } from "react";

import { Col, Layout, Row } from "antd";

import SignInForm from "../../../components/forms/signin";

import { WIDTH_SCREEN_LG } from "../../../assets/constants";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the sign in form.
 *
 * @returns {JSX}
 */
const SignInPage: React.FC = () => {
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
        <Content>{isMobile ? renderMobileSignIn() : renderSignIn()}</Content>
    );
};

export default SignInPage;
