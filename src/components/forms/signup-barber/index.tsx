import React, { ChangeEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {Button, Form, Input, notification, Steps} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faEnvelope,
    faCity,
    faIdCard,
    faKey,
    faMobileAlt,
    faArrowRight,
    faArrowLeft,
    faFileInvoiceDollar,
    faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { signUp } from "../../../services/auth-service";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupFormBarber: React.FC = () => {
    // TODO: Add input fields and link register form to backend
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [formValue, setFormValue] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        zipCode: string;
        address: string;
        kvk: string;
        btwNumber: string;
    }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        zipCode: "",
        address: "",
        kvk: "",
        btwNumber: "",
    });

    /**
     * This function handles the antd notification which will be shown the moment the credentials are wrong.
     */
    const openNotificationWithIcon = (
        message: string | number,
        description: string
    ) => {
        notification.error({
            message,
            description,
            placement: "bottomRight",
        });
    };

    /**
     * This function handles the signup.
     * Once succesfully registered, the user will be redirected to the login page.
     */
    const handleSignUp = async () => {
        // Handle sigup, if API is unavailable, redirect to 503 page.
        const response = await signUp(formValue).catch(() =>
            history.push("/503")
        );
        if (!response) return;

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(response.status === 200)) {
            openNotificationWithIcon(status, message);
            return;
        }

        // If request is OK, redirect user to login page.
        openNotificationWithIcon(status, message);
        history.push("/signin");
    };

    /**
     * This method checks if some of the fields have a filled in value or not.
     *
     * @returns {boolean}
     */
    const isEnabled = () => Object.values(formValue).every((o) => o !== "");

    /**
     * next step for the steps counter
     */
    const next = () => {
        const nextStep = activeStep + 1;
        setActiveStep(nextStep);
    };

    /**
     * previous step for the steps counter
     */
    const prev = () => {
        const prevStep = activeStep - 1;
        setActiveStep(prevStep);
    };

    /**
     * This is the first form that the user will see when entering the sign up page
     */
    const firstStepForm = () => (
        <div className={styles.signupForm}>
            <h2>Sign up barber</h2>
                <Form>
                    <Form.Item>
                        <Input
                            name="firstname"
                            size="large"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    firstName: event.target.value,
                                })
                            }
                            placeholder="Firstname"
                            prefix={
                                <FontAwesomeIcon
                                    icon={getIconByPrefixName("fas", "id-card")}
                                    size="sm"
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
                                    lastName: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faIdCard} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input
                            name="email"
                            type="email"
                            size="large"
                            placeholder="Email"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    email: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faEnvelope} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input
                            name="password"
                            type="password"
                            size="large"
                            placeholder="Password"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
                            name="phoneNumber"
                            size="large"
                            placeholder="PhoneNumber"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    phoneNumber: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faMobileAlt} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input
                            name="address"
                            size="large"
                            placeholder="Address"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    address: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faAddressBook} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input
                            name="zipCode"
                            size="large"
                            placeholder="Zip code"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    zipCode: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faCity} />}
                        />
                    </Form.Item>
                </Form>
            </div>
        );

    /**
     * This is the second form where the user should add additional information
     */
    const secondStepForm = () => (
            <div className={styles.signupForm}>
                <h2>Almost done</h2>
                <Form>
                    <Form.Item>
                        <Input
                            name="kvk"
                            size="large"
                            placeholder="Kvk number"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    kvk: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faBuilding} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input
                            name="btwNumber"
                            size="large"
                            placeholder="BTW number"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    btwNumber: event.target.value,
                                })
                            }
                            prefix={<FontAwesomeIcon icon={faFileInvoiceDollar} />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            shape="round"
                            htmlType="submit"
                            className={styles.saveButton}
                            disabled={!isEnabled()}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    );

    const stepsForm = [
        {
            content: firstStepForm(),
            title: "Register barber"
        },
        {
            content: secondStepForm(),
            title: "Almost done"
        }
    ];

    return (
        <>
            <Steps className={styles.positionForm} current={activeStep} style={{ width: 350 }}>
                {stepsForm.map(({ title }) => (
                    <Steps.Step key={title} title={title} />
                ))}
            </Steps>
            <div className="steps-content">{stepsForm[activeStep].content}</div>
            <div className="steps-action">
                {activeStep < stepsForm.length - 1 && (
                    <FontAwesomeIcon
                        className={styles.positionRightArrow}
                        icon={faArrowRight}
                        size="2x"
                        onClick={() => next()} />
                )}
                {activeStep > 0 && (
                    <FontAwesomeIcon
                        className={styles.positionLeftArrow}
                        icon={faArrowLeft}
                        size="2x"
                        onClick={() => prev()} />
                )}
            </div>
        </>
    );
};

export default SignupFormBarber;
