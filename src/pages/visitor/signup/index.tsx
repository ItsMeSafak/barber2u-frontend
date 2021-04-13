import SignupForm from "../../../components/forms/signup";

import styles from "./styles.module.scss";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupPage: React.FC = () => (
    <div className={styles.signup}>
        <div className={`${styles.column} ${styles.signupImage}`} />
        <div className={styles.column}>
            <SignupForm />
        </div>
    </div>
);

export default SignupPage;
