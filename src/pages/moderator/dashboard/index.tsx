import React, { useContext } from "react";

import { Layout, Skeleton } from "antd";

import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";

import { AuthenticationContext } from "../../../contexts/authentication-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the dashboard including a sidebar and the main content.
 *
 * @returns {JSX}
 */
const ModeratorDashboardPage: React.FC = () => {
    const { loading } = useContext(AuthenticationContext);

    // The moderator dashboard sidebar components to be loaded.
    const components: React.FC[] = [StatisticsPage, SettingsPage];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <Skeleton active loading={loading} />
                {!loading && <UserRoutes components={components} />}
            </Content>
        </Layout>
    );
};

export default ModeratorDashboardPage;
