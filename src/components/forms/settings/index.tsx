import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Input } from "antd";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

/**
 * This component renders a settings form.
 * The form consists of input fields regarding the users information.
 *
 * @returns {JSX}
 */
const SettingsForm: React.FC = () => {
    const [formValue, setFormValue] = useState<{
        name: string;
        lastname: string;
        email: string;
        password: string;
        phone: string;
        city: string;
        adress: string;
    }>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        adress: "",
    });

    const inputFieldValues: Array<{
        name: string;
        placeholder: string;
        icon: string;
    }> = [
        {
            name: "firstname",
            placeholder: "Firstname",
            icon: "id-card",
        },
        {
            name: "lastname",
            placeholder: "Lastname",
            icon: "id-card",
        },
        {
            name: "email",
            placeholder: "Email",
            icon: "at",
        },
        {
            name: "password",
            placeholder: "Password",
            icon: "key",
        },
        {
            name: "phone",
            placeholder: "Phone",
            icon: "mobile-alt",
        },
        {
            name: "address",
            placeholder: "Address",
            icon: "address-book",
        },
        {
            name: "city",
            placeholder: "City",
            icon: "city",
        },
    ];

    /**
     * This method checks if some of the fields have a filled in value or not.
     *
     * @returns {boolean}
     */
    const isEnabled = () =>
        Object.values(formValue).some((field) => field !== "");

    /**
     * This function renders all the input fields for the settings form.
     *
     * @returns {JSX}
     */
    const renderInputFields = () =>
        inputFieldValues.map(({ name, placeholder, icon }) => (
            <Form.Item key={name}>
                <Input
                    name={name}
                    size="large"
                    onChange={(event) =>
                        setFormValue({
                            ...formValue,
                            name: event.target.value,
                        })
                    }
                    placeholder={placeholder}
                    prefix={
                        <FontAwesomeIcon
                            icon={getIconByPrefixName("fas", icon)}
                            size="sm"
                        />
                    }
                />
            </Form.Item>
        ));

    return (
        <Form>
            <Card type="inner" title="Personal details">
                {inputFieldValues && renderInputFields()}
            </Card>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.saveButton}
                    disabled={!isEnabled()}
                >
                    Save changes
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SettingsForm;
