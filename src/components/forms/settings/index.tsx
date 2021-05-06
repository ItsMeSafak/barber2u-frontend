import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Input } from "antd";

import User from "../../../models/User";

import { updateUserProfile } from "../../../services/user-service";

import { getIconByPrefixName } from "../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../assets/functions/notification";

import styles from "./styles.module.scss";

/**
 * This component renders a settings form.
 * The form consists of input fields regarding the users information.
 *
 * @param user {User | null}   The logged in user object
 * @returns {JSX}
 */
const SettingsForm: React.FC<{ user: User | null }> = (user) => {
    const [formValue, setFormValue] = useState<{
        [firstname: string]: string;
        lastname: string;
        phone: string;
        address: string;
        zipcode: string;
    }>({
        firstname: user.user ? user.user.getFirstName : "",
        lastname: user.user ? user.user.getLastName : "",
        phone: user.user ? user.user.getPhoneNumber : "",
        address: user.user ? user.user.getAddress : "",
        zipcode: user.user ? user.user.getZipCode : "",
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
            name: "zipcode",
            placeholder: "Zip Code",
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
                    defaultValue={formValue[name]}
                    onChange={(event) =>
                        setFormValue({
                            ...formValue,
                            [name]: event.target.value,
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

    /**
     * Create a new User object and apply the form fields inside the properties.
     * After the object creation, it will send a request to the endpoint and update the user profile
     */
    const saveChanges = () => {
        if (user.user) {
            const newUser: User = new User(
                "",
                formValue.firstname,
                formValue.lastname,
                "",
                formValue.phone,
                formValue.address,
                formValue.zipcode,
                [],
                false,
                false
            );
            updateUserProfile(newUser).then((response) => {
                showHttpResponseNotification(
                    "The profile successfully got updated",
                    response.status
                );
            });
        }
    };

    return (
        <Form>
            <Card type="inner" title="Personal details">
                <Form.Item>
                    <Input
                        name="email"
                        size="large"
                        defaultValue={user.user?.getEmail}
                        disabled
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", "envelope")}
                                size="sm"
                            />
                        }
                    />
                </Form.Item>
                {inputFieldValues && renderInputFields()}
            </Card>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.saveButton}
                    disabled={!isEnabled()}
                    onClick={saveChanges}
                >
                    Save changes
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SettingsForm;
