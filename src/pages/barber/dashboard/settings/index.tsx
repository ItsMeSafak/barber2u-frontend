import React, { useContext } from "react";

import { Card } from "antd";

import SettingsForm from "../../../../components/forms/settings";

import styles from "./styles.module.scss";
import { AuthenticationContext } from "../../../../contexts/authentication-context";

/**
 * This component renders the settings page.
 * The page has a settings form with user values in it.
 *
 * @returns {JSX}
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
