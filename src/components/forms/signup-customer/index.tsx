import { useHistory } from "react-router-dom";
import React, { ChangeEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";

import { signUp } from "../../../services/auth-service";
import { getIconByPrefixName } from "../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../assets/functions/notification";

import styles from "./styles.module.scss";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupFormCustomer: React.FC = () => {
    const [formValue, setFormValue] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        zipCode: string;
        address: string;
    }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        zipCode: "",
        address: "",
    });

    const history = useHistory();

    /**
     * This function handles the signup.
     * Once succesfully registered, the user will be redirected to the login page.
     */
    const handleSignUp = async () => {
        const response = await signUp(formValue);

        const { status, message } = response;
        showHttpResponseNotification(message, status);
        if (status === 200) history.push("/signin");
    };

    /**
     * This method checks if some of the fields have a filled in value or not.
     *
     * @returns {boolean}
     */
    const isEnabled = () => Object.values(formValue).every((o) => o !== "");

    return (
        <div className={styles.signupForm}>
            <h2>Sign up</h2>
            <Form>
                <Form.Item>
                    <Input
                        name="firstname"
                        size="large"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                firstName: event.target.value,
                            })
                        }
                        placeholder="Firstname"
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "id-card")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name="lastname"
                        size="large"
                        placeholder="Lastname"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                lastName: event.target.value,
                            })
                        }
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "id-card")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name="email"
                        type="email"
                        size="large"
                        placeholder="Email"
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
                        type="password"
                        size="large"
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
                    <Input
                        name="phoneNumber"
                        size="large"
                        placeholder="Phone number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                phoneNumber: event.target.value,
                            })
                        }
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "mobile-alt")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name="address"
                        size="large"
                        placeholder="Address"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                address: event.target.value,
                            })
                        }
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "address-book"
                                )}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name="zipCode"
                        size="large"
                        placeholder="Zip code"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                zipCode: event.target.value,
                            })
                        }
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "city")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        block
                        shape="round"
                        htmlType="submit"
                        className={styles.saveButton}
                        disabled={!isEnabled()}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignupFormCustomer;
