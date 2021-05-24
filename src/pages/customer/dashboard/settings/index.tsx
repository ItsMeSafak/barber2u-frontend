import React, { useContext } from "react";

import { Card } from "antd";

import SettingsForm from "../../../../components/forms/settings";

import { AuthenticationContext } from "../../../../contexts/authentication-context";

import styles from "../../../barber/dashboard/settings/styles.module.scss";

/**
 * Customer settings page.
 * @returns {React.FC}
 */
const SettingsPage: React.FC = () => {
    const { user } = useContext(AuthenticationContext);
    return (
        <div className={styles.settings}>
            <Card className={styles.container}>
                <SettingsForm user={user} />
            </Card>
        </div>
    );
};

export default SettingsPage;
