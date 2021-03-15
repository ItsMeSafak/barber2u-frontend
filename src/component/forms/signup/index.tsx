import React, { ChangeEvent, useState } from "react";

import { Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faAt,
    faCity,
    faIdCard,
    faKey,
    faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { getIconByPrefixName } from "../../../asset/functions/icon";

// TODO: Add input fields and link register form to backend
const SignupForm: React.FC = () => {
    const [formValue, setFormValue] = useState<{
        name: string;
        lastname: string;
        email: string;
        password: string;
        phone: string;
        city: string;
        address: string;
    }>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        address: "",
    });

    const isEnabled = () => Object.values(formValue).some((o) => o !== "");

    return (
        <div className={`${styles.signupForm}`}>
            <h2>Sign up</h2>
            <Form>
                <Form.Item>
                    <Input
                        name="firstname"
                        size="large"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                name: event.target.value,
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
                                lastname: event.target.value,
                            })
                        }
                        prefix={<FontAwesomeIcon icon={faIdCard} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        name="email"
                        size="large"
                        placeholder="Email"
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
                    <Input
                        name="phone"
                        size="large"
                        placeholder="Phone number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                phone: event.target.value,
                            })
                        }
                        prefix={<FontAwesomeIcon icon={faMobileAlt} />}
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
                        prefix={<FontAwesomeIcon icon={faAddressBook} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        name="city"
                        size="large"
                        placeholder="City"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                city: event.target.value,
                            })
                        }
                        prefix={<FontAwesomeIcon icon={faCity} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.saveButton}
                        disabled={!isEnabled()}
                    >
                        Save changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignupForm;
