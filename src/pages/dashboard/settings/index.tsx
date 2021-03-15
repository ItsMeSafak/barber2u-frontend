import React from "react";

import { Card } from "antd";

import SettingsForm from "../../../component/forms/settings";

import styles from "./styles.module.scss";

/**
 * This component renders the settings page.
 * The page has a settings form with user values in it.
 *
 * @returns {JSX}
 */
const SettingsPage: React.FC = () => (
    <div className={styles.settings}>
        <Card className={styles.container}>
            <SettingsForm />
        </Card>
    </div>
);

export default SettingsPage;
