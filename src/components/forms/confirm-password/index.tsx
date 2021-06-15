import React from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button } from "antd";

import { resetPassword } from "../../../services/auth-service";
import { getIconByPrefixName } from "../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../assets/functions/notification";

import styles from "./styles.module.scss";

/**
 * This component renders the reset password form.
 *
 * @returns {JSX}
 */
const ConfirmPasswordForm: React.FC = () => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const history = useHistory();

    /**
     * This function handles the logic whenever the form has been submitted.
     *
     * @param {any} values The form values.
     */
    const onFormFinish = async (values: any) => {
        const query = new URLSearchParams(history.location.search);
        const token = query.get("token") || "";
        const response = await resetPassword(values.password, token);

        const { status, message } = response;
        showHttpResponseNotification(message, status);
        if (status === 200) history.push("/signin");
    };

    return (
        <div className={styles.confirmPasswordForm}>
            <h2 className={styles.formTitle}>Confirm password</h2>
            <Form name="confirmPassword" onFinish={onFormFinish}>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            min: 8,
                            required: true,
                            message: "Password is incorrect",
                        },
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="Password"
                        size="large"
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "key")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="passwordRepeat"
                    dependencies={["password"]}
                    rules={[
                        {
                            min: 8,
                            required: true,
                            message: "Password is incorrect",
                        },
                        ({ getFieldValue }) => ({
                            /**
                             * This function checks if the passwordRepeat is the same as password
                             *
                             * @param _
                             * @param {any} value this is the stored value
                             */
                            validator(_, value) {
                                if (getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="Repeat Password"
                        size="large"
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "key")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                        type="primary"
                        block
                        shape="round"
                        htmlType="submit"
                    >
                        Reset password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ConfirmPasswordForm;
