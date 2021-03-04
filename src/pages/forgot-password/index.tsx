import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Card, Alert, AlertProps } from "antd";

import styles from "./styles.module.scss";

const ForgotPasswordPage: React.FC = () => {
    const [isAlertVisible, displayAlert] = useState(false);
    const [alertProps, setAlertProps] = useState<AlertProps>({
        message: undefined,
        type: undefined,
    });

    const onFinish = (values: {}) => {
        const success = true;
        console.log("Success:", values);

        displayAlert(true);
        if (success) {
            setAlertProps({
                message: "E-mail has been sent!",
                description: "A confirmation E-mail has been sent to you.",
                type: "success",
            });
        } else {
            setAlertProps({
                message: "E-mail address not found.",
                description:
                    "The E-mail address you have entered might be incorrect, try again.",
                type: "error",
            });
        }
    };

    const onFinishFailed = (errorInfo: {}) => {
        console.log("Failed:", errorInfo);
        displayAlert(false);
    };

    const displayAlertPopup = () => (
        <Alert className={styles.alert} {...alertProps} showIcon />
    );

    return (
        <div className={styles.container}>
            <Card className={styles.formCard}>
                <h2>Forgot Password?</h2>
                {isAlertVisible && displayAlertPopup()}
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please insert a valid E-mail address",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="E-mail"
                            prefix={<FontAwesomeIcon icon={faAt} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            shape="round"
                            type="primary"
                            block
                            htmlType="submit"
                        >
                            Recover password
                        </Button>
                    </Form.Item>
                </Form>
                <Button
                    shape="round"
                    type="primary"
                    ghost
                    block
                    htmlType="submit"
                >
                    Go back
                </Button>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
