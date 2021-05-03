import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row, Steps } from "antd";

import { signUpBarber } from "../../../services/auth-service";
import { ScreenContext } from "../../../contexts/screen-context";

import { showNotification } from "../../../assets/functions/notification";
import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

/**
 * This component renders a signup form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SignupFormBarber: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);

    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitButtonActive, setSubmitButtonActive] = useState(false);
    const [formValue, setFormValue] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        companyName: string;
        phoneNumber: string;
        zipCode: string;
        address: string;
        kvkNumber: string;
        btwVatNumber: string;
        radius: string;
        time: string;
    }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        phoneNumber: "",
        zipCode: "",
        address: "",
        kvkNumber: "",
        btwVatNumber: "",
        radius: "",
        time: "",
    });

    const history = useHistory();

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
            name: "companyName",
            value: formValue.companyName,
            placeholder: "Company name",
            icon: ["fas", "building"],
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
            step: 2,
            name: "zipCode",
            value: formValue.zipCode,
            placeholder: "ZIP Code",
            icon: ["fas", "city"],
        },
        {
            step: 2,
            name: "kvkNumber",
            value: formValue.kvkNumber,
            placeholder: "KvK",
            icon: ["fas", "building"],
        },
        {
            step: 2,
            name: "btwVatNumber",
            value: formValue.btwVatNumber,
            placeholder: "BTW Number",
            icon: ["fas", "file-invoice-dollar"],
        },
        {
            step: 3,
            name: "radius",
            value: formValue.radius,
            placeholder: "Maximum amount of radius",
            icon: ["fas", "route"],
        },
        {
            step: 3,
            name: "time",
            value: formValue.time,
            placeholder: "The estimated time to the customer in minutes",
            icon: ["fas", "clock"],
        },
    ];

    useEffect(() => {
        setFormValue(formValue);
    }, [formValue]);

    useEffect(() => {
        // Filter out the optional fields that are not required to be filled in.
        const checkRequiredInputFields = formInputs
            .filter(({ step }) => step !== 3)
            .every(({ value }) => value !== "");
        setSubmitButtonActive(checkRequiredInputFields);
    }, [formValue, formInputs]);

    /**
     * This checks if the value is changed
     *
     * @param {string} key Value of input field
     */
    const onChangeEvent = (key: string) => (
        event: ChangeEvent<HTMLInputElement>
    ) =>
        setFormValue({
            ...formValue,
            [key]: event.target.value,
        });

    /**
     * This function handles the signup.
     * Once succesfully registered, the user will be redirected to the login page.
     */
    const handleSignUpBarber = async () => {
        // Handle sigup, if API is unavailable, redirect to 503 page.
        const response = await signUpBarber(formValue).catch(() =>
            history.push("/503")
        );
        if (!response) return;

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) {
            showNotification(undefined, message, status);
            return;
        }

        // If request is OK, redirect user to login page.
        showNotification(undefined, message, status);
        history.push("/signin");
    };

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
     * This is the main form of the signup
     *
     * @param {string} headingText Text of the header
     * @param {number} stepNumber Number where the form is
     * @returns {JSX}
     */
    const renderForm = (headingText: string, stepNumber: number) => {
        const firstFormStep =
            formInputs[formInputs.length - 1].step > stepNumber;
        const secondFormStep = stepNumber > 1;
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

                    <Row>
                        <Col xs={10} md={8}>
                            {secondFormStep && (
                                <Button
                                    onClick={() => prev()}
                                    className={styles.prevButton}
                                    type="primary"
                                    shape="round"
                                    block
                                    ghost
                                >
                                    Previous
                                </Button>
                            )}
                        </Col>
                        <Col xs={4} md={8} />
                        {firstFormStep && (
                            <Col xs={10} md={8}>
                                <Button
                                    onClick={() => next()}
                                    className={styles.nextButton}
                                    type="primary"
                                    shape="round"
                                    block
                                >
                                    Next
                                </Button>
                            </Col>
                        )}
                        <Col xs={10} md={8}>
                            {lastFormStep && (
                                <Button
                                    block
                                    type="primary"
                                    shape="round"
                                    htmlType="submit"
                                    disabled={!isSubmitButtonActive}
                                    onClick={handleSignUpBarber}
                                >
                                    Sign Up
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    };

    const stepsForm = [
        {
            content: renderForm("Account", 1),
            title: "Account",
        },
        {
            content: renderForm("Company", 2),
            title: "Company",
        },
        {
            content: renderForm("Services", 3),
            title: "Services",
        },
    ];

    /**
     * This function renders the multi step form stepper above the form.
     *
     * @returns {JSX}
     */
    const renderStepper = () => (
        <Steps
            size={isMobileOrTablet ? "small" : "default"}
            current={activeStep}
            type="navigation"
        >
            {stepsForm.map(({ title }) => (
                <Steps.Step key={title} title={title} />
            ))}
        </Steps>
    );

    return (
        <>
            <Row className={styles.stepsContainer}>
                <Col span={24}>{renderStepper()}</Col>
                <Col span={20}>{stepsForm[activeStep].content}</Col>
            </Row>
        </>
    );
};

export default SignupFormBarber;
