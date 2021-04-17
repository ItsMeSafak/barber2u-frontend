import React, { ChangeEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input, notification, Steps } from "antd";

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

    const formInputs = [
        {
            step: 1,
            name: "firstName",
            value: formValue.firstName,
            placeholder: "Firstname",
            icon: ["fas", "id-card"],
        },
        {
            step: 1,
            name: "lastName",
            value: formValue.lastName,
            placeholder: "Lastname",
            icon: ["fas", "id-card"],
        },
        {
            step: 1,
            name: "email",
            value: formValue.email,
            placeholder: "Email",
            icon: ["fas", "envelope"],
        },
        {
            step: 1,
            name: "password",
            type: "password",
            value: formValue.password,
            placeholder: "Password",
            icon: ["fas", "key"],
        },
        {
            step: 2,
            name: "phoneNumber",
            value: formValue.phoneNumber,
            placeholder: "Phone number",
            icon: ["fas", "mobile-alt"],
        },
        {
            step: 2,
            name: "address",
            value: formValue.address,
            placeholder: "Address",
            icon: ["fas", "address-book"],
        },
        {
            step: 2 ,
            name: "zipCode",
            value: formValue.zipCode,
            placeholder: "ZIP Code",
            icon: ["fas", "city"],
        },
        {
            step: 2,
            name: "kvk",
            value: formValue.kvk,
            placeholder: "KvK",
            icon: ["fas", "building"],
        },
        {
            step: 2,
            name: "btwNumber",
            value: formValue.btwNumber,
            placeholder: "BTW Number",
            icon: ["fas", "file-invoice-dollar"],
        },
        {
            step: 3,
            name: "style",
            placeholder: "Fill in your expertise for example fade",
            icon: ["fas", "cut"]
        },
        {
            step: 3,
            name: "description",
            placeholder: "Description",
            icon: ["fas", "clipboard"]
        },
        {
            step: 3,
            name: "price",
            placeholder: "Price of the service",
            icon: ["fas", "euro-sign"]
        },
        {
            step: 3,
            name: "time",
            placeholder: "Estimated time in minutes for service",
            icon: ["fas", "clock"]
        }
    ];

    useEffect(() => {
        setFormValue(formValue);
    }, [formValue]);

    /**
     * TODO...
     * @param key
     * @returns
     */
    const onChangeEvent = (key: string) => (
        event: ChangeEvent<HTMLInputElement>
    ) =>
        setFormValue({
            ...formValue,
            [key]: event.target.value,
        });

    // /**
    //  * This function handles the antd notification which will be shown the moment the credentials are wrong.
    //  */
    // const openNotificationWithIcon = (
    //     message: string | number,
    //     description: string
    // ) => {
    //     notification.error({
    //         message,
    //         description,
    //         placement: "bottomRight",
    //     });
    // };

    /**
     * This function handles the signup.
     * Once succesfully registered, the user will be redirected to the login page.
     */
    // const handleSignUp = async () => {
    //     // Handle sigup, if API is unavailable, redirect to 503 page.
    //     const response = await signUp(formValue).catch(() =>
    //         history.push("/503")
    //     );
    //     if (!response) return;

    //     // If request is not OK, handle errors with notification.
    //     const { status, message } = response;
    //     if (!(response.status === 200)) {
    //         openNotificationWithIcon(status, message);
    //         return;
    //     }

    //     // If request is OK, redirect user to login page.
    //     openNotificationWithIcon(status, message);
    //     history.push("/signin");
    // };

    /**
     * This method checks if some of the fields have a filled in value or not.
     *
     * @returns {boolean}
     */
    const isEnabled = () =>
        Object.values(formValue).every((input) => input !== "");

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
     * @param headingText
     * @param stepNumber
     * @returns {JSX}
     */
    const renderForm = (headingText: string, stepNumber: number) => {
        const lastFormStep =
            formInputs[formInputs.length - 1].step === stepNumber;
        return (
            <div className={styles.signupForm}>
                <h2>{headingText}</h2>
                <Form>
                    {formInputs
                        .filter(({ step }) => step === stepNumber)
                        .map(({ name, type, value, placeholder, icon }) => (
                            <Form.Item key={name}>
                                <Input
                                    type={type}
                                    name={name}
                                    size="large"
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={onChangeEvent(name)}
                                    prefix={
                                        <FontAwesomeIcon
                                            icon={getIconByPrefixName(
                                                icon[0],
                                                icon[1]
                                            )}
                                            size="sm"
                                        />
                                    }
                                />
                            </Form.Item>
                        ))}
                    {lastFormStep && (
                        <Form.Item>
                            <Button
                                block
                                type="primary"
                                shape="round"
                                htmlType="submit"
                                className={styles.saveButton}
                                disabled={!isEnabled()}
                                // onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            </div>
        );
    };

    const stepsForm = [
        {
            content: renderForm("Sign up Barber", 1),
            title: "Register barber",
        },
        {
            content: renderForm("Almost done", 2),
            title: "Almost done",
        },
        {
            content: renderForm("Almost done", 3),
            title: "Almost done",
        }
    ];

    return (
        <>
            <Steps
                size="small"
                className={styles.positionForm}
                current={activeStep}
                style={{ width: 600 }}
            >
                {stepsForm.map(({ title }) => (
                    <Steps.Step key={title} title={title} />
                ))}
            </Steps>
            <div className={styles.stepsContent}>
                {stepsForm[activeStep].content}
                <div className={styles.stepsAction}>
                    {activeStep < stepsForm.length - 1 && (
                        <FontAwesomeIcon
                            className={styles.positionRightArrow}
                            icon={faArrowRight}
                            size="2x"
                            onClick={() => next()}
                        />
                    )}
                    {activeStep > 0 && (
                        <FontAwesomeIcon
                            className={styles.positionLeftArrow}
                            icon={faArrowLeft}
                            size="2x"
                            onClick={() => prev()}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default SignupFormBarber;
