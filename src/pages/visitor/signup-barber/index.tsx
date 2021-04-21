import { useCallback, useEffect, useState } from "react";

import { Layout } from "antd";
import SignupFormBarber from "../../../components/forms/signup-barber";

import styles from "./styles.module.scss";
import { WIDTH_SCREEN_LG } from "../../../assets/constants";

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
        <div className={styles.signup}>
            <div className={`${styles.column} ${styles.signupImage}`} />
            <div className={styles.column}>
                <SignupFormBarber />
            </div>
        </div>
    );

    /**
     * mobile form signUp
     */
    const renderMobileBarberSignUp = () => (
        <div className={styles.mobileBarberSignup}>
            <SignupFormBarber />
        </div>
    );

    return (
        <Content>
            {mobile ? renderMobileBarberSignUp() : renderBarberSignUp()}
        </Content>
    );
};

export default SignupPageBarber;
