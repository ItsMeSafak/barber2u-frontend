import React from "react";

import { Card } from "antd";

import SettingsForm from "../../../component/forms/settings";

import styles from "./styles.module.scss";

/* eslint-disable */
const SettingsPage: React.FC = () => (
    <div className={styles.settings}>
        <Card className={styles.container}>
            <SettingsForm />
        </Card>
    </div>
);

export default SettingsPage;
