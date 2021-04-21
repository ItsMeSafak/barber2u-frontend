import React, { ChangeEvent, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { faKey, faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, notification } from "antd";

import User from "../../../models/User";

import { signIn } from "../../../services/auth-service";
import { AuthContext } from "../../../contexts/auth-context";

import styles from "./styles.module.scss";

/**
 * This component renders a login form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SigninForm: React.FC = () => {
    const {
        setUser,
        setRoles,
        setAccessToken,
        setRefreshToken,
        setAuthenticated,
    } = useContext(AuthContext);

    const [formValue, setFormValue] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const history = useHistory();

    /**
     * TODO: make generic notification component (Mehmet)
     * This function handles the antd notification which will be shown the moment the credentials are wrong.
     */
    const openNotificationWithIcon = (
        message: string | number,
        description: string
    ) => {
        notification.error({
            message,
            description,
            placement: "bottomRight",
        });
    };

    /**
     * This function handles the signin action and stores the user data into cookies using the auth context.
     * It will redirect the user to the correct page when logged in succesfully.
     */
    const handleSignIn = async () => {
        const { email, password } = formValue;

        // Handle sigin, if API is unavailable, redirect to 503 page.
        const response = await signIn(email, password).catch(() =>
            history.push("/503")
        );
        if (!response) return;

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(response.status === 200))
            openNotificationWithIcon(status, message);
        if (!response.data) return;

        // If request is OK, handle authentication.
        const { token, roles } = response.data;
        const user = new User(email, "John", "Doe", "1111AA", "31610101010");
        setUser(user);
        setRoles(roles);
        setAccessToken(token);
        setRefreshToken("REFRESHTOKEN-TODO");
        setAuthenticated(true);
    };

    return (
        <div className={styles.signinForm}>
            <h2>Sign in</h2>
            <Form>
                <Form.Item>
                    <Input
                        name="email"
                        size="large"
                        placeholder="Email"
                        type="email"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                email: event.target.value,
                            })
                        }
                        prefix={<FontAwesomeIcon icon={faAt} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        name="password"
                        size="large"
                        type="password"
                        placeholder="Password"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                password: event.target.value,
                            })
                        }
                        prefix={<FontAwesomeIcon icon={faKey} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        className={styles.signInButton}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to="customer/signup">
                        <Button
                            type="primary"
                            shape="round"
                            ghost
                            className={styles.signUpButton}
                        >
                            Create an account
                        </Button>
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Link to="reset-password">
                        <p
                            className={styles.resetButton}
                        >
                            Reset password
                        </p>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SigninForm;
