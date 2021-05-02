import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import { resetPassword } from "../../../services/auth-service";

import styles from "./styles.module.scss";
import {showNotification} from "../../../assets/functions/notification";

/**
 * This component renders the reset password form.
 *
 * @returns {JSX}
 */
const ConfirmPasswordForm: React.FC = () => {
    const history = useHistory();

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    /**
     *
     * @param {any} values form values
     */
    const onFormFinish = async (values: any) => {
        const query = new URLSearchParams(history.location.search);
        const token = query.get("token") || "";
        const response = await
            resetPassword(values.password, token)
                .catch(() =>
            history.push("/503")
        );
        if(!response) return;

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) {
            showNotification(undefined, message, status);
            return;
        }

        showNotification(undefined, message, status);
        history.push("/signin");
    };

    return (
        <div className={styles.confirmPasswordForm}>
            <h2 className={styles.formTitle}>Confirm password</h2>
            <Form
                name="confirmPassword"
                onFinish={onFormFinish}
            >
                <Form.Item
                    name="password"
                    rules={[
                        {
                            min: 8,
                            required: true,
                            message: "Password is incorrect",
                        }
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="Password"
                        size="large"
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "key"
                                )}
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
                                if(getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("The two passwords that you entered do not match!"));
                            }
                        })
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="Repeat Password"
                        size="large"
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName(
                                    "fas",
                                    "key"
                                )}
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
