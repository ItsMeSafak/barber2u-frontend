import React, { ChangeEvent, useState } from "react";

import { Button, Form, Input, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faAt,
    faCity,
    faIdCard,
    faKey,
    faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import { IconType } from "antd/lib/notification";
import styles from "./styles.module.scss";
import { getIconByPrefixName } from "../../../asset/functions/icon";
import { User } from "../../../models/User";
import { signUp } from "../../../asset/services/Auth-Service";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupForm: React.FC = () => {
    // TODO: Add input fields and link register form to backend
    const history = useHistory();
    const [formValue, setFormValue] = useState<{
        name: string;
        lastname: string;
        email: string;
        password: string;
        phone: string;
        zip_code: string;
        address: string;
    }>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        zip_code: "",
        address: "",
    });

    /**
     * This function handles the antd notification which will be shown the moment the credentials are wrong.
     */
    const openNotificationWithIcon = (nmessage: string, ntype: IconType) => {
        notification.open({
            type: ntype,
            message: nmessage,
            placement: "bottomRight",
        });
    };

    /**
     * This function handles the signin and stores the user json object in the localstorage.
     * It will redirect you to the correct page when logged in succesfully
     */
    const handleSignUp = () => {
        const user: User = new User(
            formValue.email,
            formValue.password,
            formValue.name,
            formValue.lastname,
            formValue.zip_code,
            formValue.phone
        );
        signUp(user).then((response) => {
            if (response.status === 200) {
                openNotificationWithIcon("Successfully registered!", "success");
                history.push("/signin");
                window.location.reload();
            } else {
                openNotificationWithIcon(
                    response
                        ? response.message
                        : "Something went wrong!\n Try again later",
                    "error"
                );
            }
        });
    };

    /**
     * This method checks if some of the fields have a filled in value or not.
     *
     * @returns {boolean}
     */
    const isEnabled = () => Object.values(formValue).every((o) => o !== "");

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
                        type="email"
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
                        type="password"
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
                        name="zip_code"
                        size="large"
                        placeholder="Zip code"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                zip_code: event.target.value,
                            })
                        }
                        prefix={<FontAwesomeIcon icon={faCity} />}
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
                        Save changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignupForm;
