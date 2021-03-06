import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faAt, faKey, faMobileAlt, faAddressBook, faCity } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { useForm } from "react-hook-form";


import styles from "./styles.module.scss";

const Settings: React.FC = () => {
    // const { formState } = useForm({
    //     mode: "onChange"
    // });

    useEffect(() => {

    }, []);

    // const { dirtyFields } = formState;


    return (
        <div className={styles.settings} >
            <Card className={styles.container}>
                <Form>
                    <Card type="inner" title="Personal details">
                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Firstname"
                                prefix={<FontAwesomeIcon icon={faIdCard} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Lastname"
                                prefix={<FontAwesomeIcon icon={faIdCard} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Email"
                                prefix={<FontAwesomeIcon icon={faAt} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Password"
                                prefix={<FontAwesomeIcon icon={faKey} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Phone number"
                                prefix={<FontAwesomeIcon icon={faMobileAlt} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="Adress"
                                prefix={<FontAwesomeIcon icon={faAddressBook} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
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
                        // disabled={!formState.isDirty}
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
