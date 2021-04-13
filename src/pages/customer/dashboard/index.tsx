import React from "react";

import { Layout } from "antd";

import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the dashboard including a sidebar and the main content.
 *
 * @param props Component properties.
 * @returns {JSX}
 */
const CustomerDashboardPage: React.FC = () => {
    // The customer dashboard sidebar components to be loaded.
    const components: React.FC[] = [StatisticsPage, SettingsPage];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <UserRoutes components={components} />
            </Content>
        </Layout>
    );
};

export default CustomerDashboardPage;
