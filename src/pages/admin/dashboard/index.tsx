import React, { useContext } from "react";

import { Layout, PageHeader, Skeleton } from "antd";

import UsersPage from "./users";
import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";

import { LocationContext } from "../../../contexts/location-context";
import { AuthenticationContext } from "../../../contexts/authentication-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the dashboard including a sidebar and the main content.
 *
 * @returns {JSX}
 */
const AdminDashboardPage: React.FC = () => {
    const { loading } = useContext(AuthenticationContext);
    const { pageName } = useContext(LocationContext);

    // The admin dashboard sidebar components to be loaded.
    const components: React.FC[] = [StatisticsPage, UsersPage, SettingsPage];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <PageHeader
                    title={pageName}
                    style={{ padding: 0, marginBottom: "1rem" }}
                />
                <Skeleton active loading={loading} />
                {!loading && <UserRoutes components={components} />}
            </Content>
        </Layout>
    );
};

export default AdminDashboardPage;
