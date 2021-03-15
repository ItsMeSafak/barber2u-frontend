import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faAt } from "@fortawesome/free-solid-svg-icons";
import { getIconByPrefixName } from "../../../asset/functions/icon";
import { User } from "../../../models/User";
import { signIn } from "../../../asset/services/Auth-Service";

import styles from "./styles.module.scss";
import { WIDTH_SCREEN_LG } from "../../../asset/constants";

const SignInForm: React.FC = () => {
    const history = useHistory();
    const [formValue, setFormValue] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const handleSignIn = () => {
        signIn(new User(formValue.email, formValue.password)).then(
            (response) => {
                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    history.push("/customer/signup");
                    window.location.reload();
                } else {
                    console.error(response.message);
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
