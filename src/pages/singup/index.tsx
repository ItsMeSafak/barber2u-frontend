import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import SignupForm from "../../component/forms/signup";

import { WIDTH_SCREEN_LG } from "../../asset/constants";

import styles from "./styles.module.scss";

const Signup: React.FC = () => {
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const handleMobileView = () =>
            setMobile(window.innerWidth <= WIDTH_SCREEN_LG);
        handleMobileView();
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, []);

    return (
        <BrowserRouter>
            <div className={`${styles.signup}`}>
                <div className={`${styles.column} ${styles.signupImage}`} />
                <div className={`${styles.column}`}>
                    <SignupForm />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Signup;
