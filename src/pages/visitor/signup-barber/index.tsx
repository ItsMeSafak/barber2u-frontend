import SignupFormBarber from "../../../components/forms/signup-barber";

import styles from "./styles.module.scss";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupPageBarber: React.FC = () => (
    <div className={styles.signup}>
        <div className={`${styles.column} ${styles.signupImage}`} />
        <div className={styles.column}>
            <SignupFormBarber />
        </div>
    </div>
);

export default SignupPageBarber;
