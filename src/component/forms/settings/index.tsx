import React, { ChangeEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Input } from "antd";

import SettingsInputs from "../../../asset/settings_inputs.json";
import { getIconByPrefixName } from "../../../asset/functions/icon";

import styles from "../../../pages/dashboard/settings/styles.module.scss";

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

    const inputFieldValues: Array<{ name: string, placeHolder: string, icon: string }>
        = SettingsInputs;

    /**
     * This method checks if some of the fields have a filled in value or not.
     * 
     * @returns {boolean}
     */
    const isEnabled = () => Object.values(formValue).some((field) => field !== "");

    /**
     * This function renders all the input fields for the settings form.
     * 
     * @returns {JSX}
     */
    const renderInputFields = () => (
        inputFieldValues.map(({ name, placeHolder, icon }) => (
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
                    placeholder={placeHolder}
                    prefix={
                        <FontAwesomeIcon
                            icon={getIconByPrefixName("fas", icon)}
                        />
                    }
                />
            </Form.Item>
        ))
    );

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
