import React, { useContext } from "react";

import { Card } from "antd";

import Spinner from "../../../../components/spinner";
import SettingsForm from "../../../../components/forms/settings";

import { AuthenticationContext } from "../../../../contexts/authentication-context";

import styles from "../../../barber/dashboard/settings/styles.module.scss";

/**
 * Customer settings page.
 *
 * @returns {JSX}
 */
const SettingsPage: React.FC = () => {
    const { loading, user } = useContext(AuthenticationContext);

    return (
        <Spinner spinning={loading}>
            <Card className={styles.card} title="Personal details">
                <SettingsForm user={user} />
            </Card>
        </Spinner>
    );
};

export default SettingsPage;
