import { useCallback, useEffect, useState } from "react";

import { Col, Layout, Row } from "antd";

import SignupFormBarber from "../../../../components/forms/signup-barber";

import { WIDTH_SCREEN_LG } from "../../../../assets/constants";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupPageBarber: React.FC = () => {
    const [mobile, setMobile] = useState(false);

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
    const renderBarberSignUp = () => (
        <Row className={styles.content}>
            <Col span={12} />
            <Col span={12}>
                <SignupFormBarber />
            </Col>
        </Row>
    );

    /**
     * mobile form signUp
     */
    const renderMobileBarberSignUp = () => (
        <Row className={styles.mobileContent}>
            <Col span={24}>
                <SignupFormBarber />
            </Col>
        </Row>
    );

    return (
        <Content>
            {mobile ? renderMobileBarberSignUp() : renderBarberSignUp()}
        </Content>
    );
};

export default SignupPageBarber;
