import { useCallback, useEffect, useState } from "react";

import { Layout, Row, Col } from "antd";

import SignupFormCustomer from "../../../../components/forms/signup-customer";

import { WIDTH_SCREEN_LG } from "../../../../assets/constants";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupPageCustomer: React.FC = () => {
    const [Mobile, setMobile] = useState(false);

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
     * Render default signup form
     */
    const renderSignup = () => (
        <Row className={styles.content}>
            <Col span={12} />
            <Col span={10}>
                <SignupFormCustomer />
            </Col>
        </Row>
    );

    /**
     *Render mobile signup form
     */
    const renderMobileSignup = () => (
        <Row className={styles.mobileContent}>
            <Col span={22}>
                <SignupFormCustomer />
            </Col>
        </Row>
    );

    return <Content>{Mobile ? renderMobileSignup() : renderSignup()}</Content>;
};

export default SignupPageCustomer;
