import React from "react";

import { Card } from "antd";

import GenericForm from "../../../../components/forms/generic-form";

import styles from "./styles.module.scss";

/**
 * This component renders the settings page.
 * The page has a settings form with user values in it.
 *
 * @returns {JSX}
 */
const SettingsPage: React.FC = () => {
    const formInputData = [
        {
            name: "id",
            icon: "hashtag",
            value: "test",
        },
        {
            name: "fullName",
            icon: "user",
            value: "test",
        },
        {
            name: "email",
            icon: "envelope",
            value: "test",
        },
        {
            type: "select",
            name: "roles",
            icon: "envelope",
            value: "test",
        },
    ];

    return (
        <div className={styles.settings}>
            <Card className={styles.container}>
                <GenericForm formName="personalDetails" data={formInputData} editable />
            </Card>
        </div>
    )

};

export default SettingsPage;
