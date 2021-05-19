import React, { useContext } from "react";

import { Layout, PageHeader } from "antd";

import Skeleton from "../../../components/skeleton";
import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";
import EmailNotVerified from "../../../template/email-not-verified";

import { LocationContext } from "../../../contexts/location-context";
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
    const { pageName } = useContext(LocationContext);

    // The customer dashboard sidebar components to be loaded.
    const components: React.FC[] = [StatisticsPage, SettingsPage];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <PageHeader
                    title={pageName}
                    style={{ padding: 0, marginBottom: "1rem" }}
                />
                <Skeleton loading={loading}>
                    <EmailNotVerified />
                    <UserRoutes components={components} />
                </Skeleton>
            </Content>
        </Layout>
    );
};

export default CustomerDashboardPage;
