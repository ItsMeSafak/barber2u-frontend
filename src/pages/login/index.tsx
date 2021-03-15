import React from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import SignInForm from "../../component/forms/signin";

const SignIn: React.FC = () => (
    <div className={`${styles.signin}`}>
        <div className={`${styles.column} ${styles.signInImage}`} />
        <div className={`${styles.column}`}>
            <SignInForm />
        </div>
    </div>
);

export default SignIn;
