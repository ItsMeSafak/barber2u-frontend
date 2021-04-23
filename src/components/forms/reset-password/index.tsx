import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button } from "antd";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import { resetPasswordMail } from "../../../services/auth-service";

import styles from "./styles.module.scss";

/**
 * This component renders the reset password form.
 *
 * @returns {JSX}
 */
const ResetPasswordForm: React.FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    /**
     * This function is being used whenever the form succeeds.
     *
     * @param {any} values Form values.
     */
    const onFormFinish = async (values: any) => {
        const response = await resetPasswordMail(values);
        if (!response) return;
        setIsSuccess(true);
    };

    /**
     * This function is being used whenever the form fails.
     *
     * @param {any} values Form values.
     */
    const onFormFinishFailed = (values: any) => {
        console.log("error", values);
    };

    return (
        <>
            <div className={styles.resetPasswordForm}>
                <h2 className={styles.formTitle}>Reset password</h2>
                {!isSuccess && <Form
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
                                    icon={getIconByPrefixName(
                                        "fas",
                                        "envelope"
                                    )}
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
                </Form>}
                {isSuccess &&
                    <p className={styles.successMessage} >You will receive a password reset mail if you are registered.</p>}
                <Button
                    type="primary"
                    className={styles.resetPasswordButtonGhost}
                    block
                    ghost
                    shape="round"
                    htmlType="submit"
                    onClick={() => history.push("/signin")}
                >
                    Sign in
                </Button>
            </div>
        </>
    );
};

export default ResetPasswordForm;
