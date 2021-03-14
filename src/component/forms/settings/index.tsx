import React, { ChangeEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Input } from "antd";

import { getIconByPrefixName } from "../../../asset/functions/icon";

import styles from "../../../pages/dashboard/settings/styles.module.scss";

const SettingsForm: React.FC = () => {
    const [formValue, setFormValue] = useState<{
        name: string;
        lastname: string;
        email: string;
        password: string;
        phone: string;
        city: string;
        adress: string;
    }>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        adress: "",
    });

    const isEnabled = () => Object.values(formValue).some((o) => o !== "");

    return (
        <Form>
            <Card type="inner" title="Personal details">
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "id-card")}
                            />
                        }
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "at")}
                            />
                        }
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "key")}
                            />
                        }
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "mobile-alt")}
                            />
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Input
                        name="adress"
                        size="large"
                        placeholder="Adress"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setFormValue({
                                ...formValue,
                                adress: event.target.value,
                            })
                        }
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "address-book"
                                )}
                            />
                        }
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
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "city")}
                            />
                        }
                    />
                </Form.Item>
            </Card>

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
    );
};

export default SettingsForm;
