import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, Input, Select } from "antd";

import Spinner from "../../../../components/spinner";

import { getIconByPrefixName } from "../../../../assets/functions/icon";
import { AuthenticationContext } from "../../../../contexts/authentication-context";

import styles from "./styles.module.scss";

/**
 * Admin settings page.
 *
 * @returns {React.FC}
 */
const SettingsPage: React.FC = () => {
    const { loading, user } = useContext(AuthenticationContext);

    const formInputData = [
        {
            name: "id",
            icon: "hashtag",
            value: user?.getId,
        },
        {
            name: "fullName",
            icon: "user",
            value: user?.getFullName,
        },
        {
            name: "email",
            icon: "envelope",
            value: user?.getEmail,
        },
        {
            type: "select",
            name: "roles",
            icon: "envelope",
            value: user?.getRoleNames.map((role) => role.replace("ROLE_", "")),
        },
    ];

    /**
     * This function renders the user detail form inputs.
     * It checks the desired input type and renders the right element for that.
     *
     * @returns {JSX}
     */
    const renderFormData = () =>
        formInputData.map(({ type, name, icon, value }) => {
            if (type === "select") {
                return (
                    <Form.Item key={name} name={name}>
                        <Select
                            className={styles.selectInput}
                            mode="multiple"
                            defaultValue={value}
                            disabled
                        />
                    </Form.Item>
                );
            }

            return (
                <Form.Item key={name} name={name}>
                    <Input
                        prefix={
                            <FontAwesomeIcon
                                icon={getIconByPrefixName("fas", icon)}
                            />
                        }
                        defaultValue={value}
                        disabled
                    />
                </Form.Item>
            );
        });

    return (
        <>
            <Spinner spinning={loading}>
                <Card className={styles.card} title="Personal details">
                    <Form name="personalDetails">{renderFormData()}</Form>
                </Card>
            </Spinner>
        </>
    );
};

export default SettingsPage;
