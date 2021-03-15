import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import SignupForm from "../../component/forms/signup";

import { WIDTH_SCREEN_LG } from "../../asset/constants";

import styles from "./styles.module.scss";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const Signup: React.FC = () => (
    <BrowserRouter>
        <div className={styles.signup}>
            <div className={styles.column && styles.signupImage} />
            <div className={styles.column}>
                <SignupForm />
            </div>
        </div>
    </BrowserRouter>
);

export default Signup;
