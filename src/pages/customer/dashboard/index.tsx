import React, { useContext } from "react";

import { Layout, Skeleton } from "antd";

import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";
import EmailNotVerified from "../../../template/email-not-verified";

import { AuthenticationContext } from "../../../contexts/authentication-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the dashboard including a sidebar and the main content.
 *
 * @param props Component properties.
 * @returns {JSX}
 */
const CustomerDashboardPage: React.FC = () => {
    const { loading } = useContext(AuthenticationContext);

    // The customer dashboard sidebar components to be loaded.
    const components: React.FC[] = [StatisticsPage, SettingsPage];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <Skeleton active loading={loading} />
                {!loading && (
                    <>
                        <EmailNotVerified />
                        <UserRoutes components={components} />
                    </>
                )}
            </Content>
        </Layout>
    );
};

export default CustomerDashboardPage;
