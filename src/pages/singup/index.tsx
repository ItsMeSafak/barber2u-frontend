import { BrowserRouter } from "react-router-dom";

import SignupForm from "../../component/forms/signup";


import styles from "./styles.module.scss";

/**
 * This component renders the singup page
 *
 * @returns {JSX}
 */
const Signup: React.FC = () => (
    <BrowserRouter>
        <div className={`${styles.signup}`}>
            <div className={`${styles.column} ${styles.signupImage}`} />
            <div className={`${styles.column}`}>
                <SignupForm />
            </div>
        </div>
    </BrowserRouter>
);

export default Signup;
