import React from "react";
import styles from "./styles.module.scss";
import SignInForm from "../../component/forms/signin";

/**
 * This component renders the sign in form.
 *
 * @returns {JSX}
 */
const SignIn: React.FC = () => (
    <div className={`${styles.signin}`}>
        <div className={`${styles.column} ${styles.signInImage}`} />
        <div className={`${styles.column}`}>
            <SignInForm />
        </div>
    </div>
);

export default SignIn;
