import React from "react";

import SigninForm from "../../../components/forms/signin";

import styles from "./styles.module.scss";

/**
 * This component renders the sign in form.
 *
 * @returns {JSX}
 */
const SigninPage: React.FC = () => (
    <div className={styles.signin}>
        <div className={`${styles.column} ${styles.signInImage}`} />
        <div className={styles.column}>
            <SigninForm />
        </div>
    </div>
);

export default SigninPage;
