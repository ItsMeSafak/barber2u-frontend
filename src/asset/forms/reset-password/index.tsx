import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button } from "antd";

import { getIconByPrefixName } from "../../functions/icon";

import styles from "./styles.module.scss";

const ResetPasswordForm: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFormFinish = (values: any) => {
        console.log(values);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFormFinishFailed = (values: any) => {
        console.log(values);
    };

    const renderEmailInputFormItem = () => (
        <Form.Item
            name="email"
            className={styles.emailFormItem}
            rules={[
                {
                    type: "email",
                    required: true,
                    message: "Please input your email!",
                },
            ]}
        >
            <Input
                prefix={
                    <FontAwesomeIcon
                        color="#888"
                        icon={getIconByPrefixName("fas", "envelope")}
                        size="sm"
                    />
                }
                placeholder="E-mail"
            />
        </Form.Item>
    );

    return (
        <>
            <h2 className={styles.formTitle}>Reset password</h2>
            <Form
                name="resetPassword"
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                {renderEmailInputFormItem()}
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                        type="primary"
                        className={styles.buttonColorVolcano}
                        block
                        shape="round"
                        htmlType="submit"
                    >
                        Reset password
                    </Button>
                </Form.Item>
            </Form>
            <Button
                type="primary"
                // className={styles.buttonColorVolcano}
                block
                ghost
                shape="round"
                htmlType="submit"
            >
                Login
            </Button>
        </>
    );
};

export default ResetPasswordForm;
