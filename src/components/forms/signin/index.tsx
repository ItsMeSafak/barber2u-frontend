import React, { ChangeEvent, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";

import User from "../../../models/User";

import { signIn } from "../../../services/auth-service";
import { AuthenticationContext } from "../../../contexts/authentication-context";

import { showNotification } from "../../../assets/functions/notification";
import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

/**
 * This component renders a login form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignInForm: React.FC = () => {
    const { setUser, setAccessToken, setRefreshToken } = useContext(
        AuthenticationContext
    );

    const [formValue, setFormValue] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const history = useHistory();

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
        if (!(status === 200)) showNotification(undefined, message, status);
        if (!response.data) return;

        // If request is OK, handle authentication.
        const { token, user } = response.data;
        setUser((user as unknown) as User);
        setAccessToken(token);
        setRefreshToken("REFRESHTOKEN-TODO");
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "envelope"
                                )}
                                size="sm"
                            />
                        }
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "key")}
                                size="sm"
                            />
                        }
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
                        <p className={styles.resetButton}>Reset password</p>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignInForm;
