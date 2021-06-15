import React, { useContext } from "react";

import { Card } from "antd";

import Spinner from "../../../../components/spinner";
import GenericForm from "../../../../components/forms/generic-form";

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
            value: user?.getCleanedRoleNames,
        },
    ];

    return (
        <Spinner spinning={loading}>
            <Card className={styles.card} title="Personal details">
                <GenericForm formName="personalDetails" data={formInputData} />
            </Card>
        </Spinner>
    );
};

export default SettingsPage;
