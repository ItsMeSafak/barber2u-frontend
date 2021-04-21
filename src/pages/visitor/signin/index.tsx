import React, { useCallback, useEffect, useState } from "react";

import { Layout } from "antd";
import SigninForm from "../../../components/forms/signin";

import styles from "./styles.module.scss";
import { WIDTH_SCREEN_LG } from "../../../assets/constants";

const { Content } = Layout;

/**
 * This component renders the sign in form.
 *
 * @returns {JSX}
 */
const SigninPage: React.FC = () => {
    const [isMobile, setMobile] = useState(false);

    /**
     * This function checks whether the window screen width reaches a breakpoint.
     * If so, the mobile state is set to true.
     */
    const handleMobileView = useCallback(() => {
        setMobile(window.innerWidth <= WIDTH_SCREEN_LG);
    }, []);

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
        <div className={styles.signIn}>
            <div className={`${styles.column} ${styles.signInImage}`} />
            <div className={styles.column}>
                <SigninForm />
            </div>
        </div>
    );

    /**
     * Render mobile sign in form
     */
    const renderMobileSignIn = () => (
        <div className={styles.mobileSignIn}>
            <SigninForm />
        </div>
    );

    return  (
        <Content>
            {isMobile ? renderMobileSignIn() : renderSignIn()}
        </Content>
    );
};

export default SigninPage;
