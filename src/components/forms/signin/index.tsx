import React, { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";

import User from "../../../models/User";

import { signIn } from "../../../services/auth-service";
import { AuthenticationContext } from "../../../contexts/authentication-context";

import { getIconByPrefixName } from "../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../assets/functions/notification";

import styles from "./styles.module.scss";

/**
 * This component renders a login form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignInForm: React.FC = () => {
    const { setUser, setAccessToken, setRefreshToken, logout } = useContext(
        AuthenticationContext
    );

    const [formValue, setFormValue] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    /**
     * This function handles the signin action and stores the user data into cookies using the auth context.
     * It will redirect the user to the correct page when logged in succesfully.
     */
    const handleSignIn = async () => {
        logout();
        const { email, password } = formValue;
        const response = await signIn(email, password);

        const { status, message } = response;
        showHttpResponseNotification(message, status);
        if (!response.data) return;

        const { token, refreshToken, user } = response.data;
        setUser((user as unknown) as User);
        setAccessToken(token);
        setRefreshToken(refreshToken);
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
                                icon={getIconByPrefixName("fas", "envelope")}
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
                        onClick={handleSignIn}
                        block
                    >
                        Sign In
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to="signup">
                        <Button type="primary" shape="round" ghost block>
                            Create an account
                        </Button>
                    </Link>
                </Form.Item>
                <Link to="reset-password">
                    <p className={styles.resetButton}>Reset password</p>
                </Link>
            </Form>
        </div>
    );
};

export default SignInForm;
