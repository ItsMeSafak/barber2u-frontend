import React, { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faAt, faKey, faMobileAlt, faAddressBook, faCity } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Card } from "antd";
import { useForm } from "react-hook-form";


import styles from "./styles.module.scss";

const Settings: React.FC = () => {
    const {
        register,
        formState
    } = useForm({
        mode: "onChange"
    });

    const [disabled, setDisabled] = useState(true);

    const handleUserInput = (inputFields: any) => {

    }


    return (
        <div className={styles.settings} >
            <Card className={styles.container}>
                <Form>
                    <Card type="inner" title="Personal details">
                        <Form.Item>
                            <Input
                                name="firstname"
                                size="large"
                                onChange={(event) => handleUserInput(event)}
                                placeholder="Firstname"
                                prefix={<FontAwesomeIcon icon={faIdCard} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="lastname"
                                ref={register}
                                size="large"
                                placeholder="Lastname"
                                prefix={<FontAwesomeIcon icon={faIdCard} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="email"
                                ref={register}
                                size="large"
                                placeholder="Email"
                                prefix={<FontAwesomeIcon icon={faAt} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="password"
                                ref={register}
                                size="large"
                                placeholder="Password"
                                prefix={<FontAwesomeIcon icon={faKey} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="phone"
                                ref={register}
                                size="large"
                                placeholder="Phone number"
                                prefix={<FontAwesomeIcon icon={faMobileAlt} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="adress"
                                ref={register}
                                size="large"
                                placeholder="Adress"
                                prefix={<FontAwesomeIcon icon={faAddressBook} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                name="city"
                                ref={register}
                                size="large"
                                placeholder="City"
                                prefix={<FontAwesomeIcon icon={faCity} />}
                            />
                        </Form.Item>
                    </Card>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.saveButton}
                            disabled={disabled}
                        >
                            Save changes
                        </Button>
                    </Form.Item>
                </Form>
            </Card >
        </div >
    )
};

export default Settings;
