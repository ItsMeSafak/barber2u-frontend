import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faAt } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input, notification } from "antd";


import { signIn } from "../../../asset/services/Auth-Service";
import { User } from "../../../models/User";
import styles from "./styles.module.scss";
/**
 * This component renders a login form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignInForm: React.FC = () => {
    const history = useHistory();
    const [formValue, setFormValue] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    /**
     * This function handles the antd notification which will be shown the moment the credentials are wrong.
     */
    const openNotificationWithIcon = () => {
        notification.error({
            message: "Invalid Credentials",
            description: "The email or password is not correct :(. Try again.",
            placement: "bottomRight",
        });
    };

    /**
     * This function handles the signin and stores the user json object in the localstorage.
     * It will redirect you to the correct page when logged in succesfully
     */
    const handleSignIn = () => {
        signIn(new User(formValue.email, formValue.password)).then(
            (response) => {
                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    history.push("/dashboard");
                    window.location.reload();
                } else {
                    openNotificationWithIcon();
                }
            }
        );
    };

    return (
        <div className={`${styles.signinForm}`}>
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
                        className={styles.signInButton}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignInForm;
