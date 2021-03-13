import React, { useState, ChangeEvent } from "react";

import {
    faIdCard,
    faAt,
    faKey,
    faMobileAlt,
    faAddressBook,
    faCity,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

const SettingsPage: React.FC = () => {
    // dit kan opzich een user object worden
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
        <div className={styles.settings}>
            <Card className={styles.container}>
                <Form>
                    <Card type="inner" title="Personal details">
                        <Form.Item>
                            <Input
                                name="firstname"
                                size="large"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    setFormValue({
                                        ...formValue,
                                        name: event.target.value,
                                    })
                                }
                                placeholder="Firstname"
                                prefix={<FontAwesomeIcon icon={faIdCard} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="lastname"
                                size="large"
                                placeholder="Lastname"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
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
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
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
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
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
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
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
                                name="adress"
                                size="large"
                                placeholder="Adress"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    setFormValue({
                                        ...formValue,
                                        adress: event.target.value,
                                    })
                                }
                                prefix={
                                    <FontAwesomeIcon icon={faAddressBook} />
                                }
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="city"
                                size="large"
                                placeholder="City"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    setFormValue({
                                        ...formValue,
                                        city: event.target.value,
                                    })
                                }
                                prefix={<FontAwesomeIcon icon={faCity} />}
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
            </Card>
        </div>
    );
};

export default SettingsPage;
