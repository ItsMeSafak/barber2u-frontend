import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button } from "antd";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

/**
 * This component renders the reset password form.
 *
 * @returns {JSX}
 */
const ResetPasswordForm: React.FC = () => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    /**
     * This function is being used whenever the form succeeds.
     *
     * @param {any} values Form values.
     * @TODO Fix function/attach to back-end.
     */
    const onFormFinish = (values: any) => {
        console.log(values);
    };

    /**
     * This function is being used whenever the form fails.
     *
     * @param {any} values Form values.
     * @TODO Fix function/attach to back-end.
     */
    const onFormFinishFailed = (values: any) => {
        console.log("error", values);
    };

    return (
        <>
            <h2 className={styles.formTitle}>Reset password</h2>
            <Form
                name="resetPassword"
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
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
                        size="large"
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
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                        className={styles.resetPasswordButton}
                        type="primary"
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
                className={styles.resetPasswordButtonGhost}
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
