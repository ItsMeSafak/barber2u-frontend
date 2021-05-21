import React, { useContext } from "react";

import { Layout, PageHeader } from "antd";

import Skeleton from "../../../components/skeleton";
import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import ServicesPage from "./services";
import PortfolioPage from "./portfolio";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";
import ReservationsPage from "./reservations";
import EmailNotVerified from "../../../template/email-not-verified";

import { BarberProvider } from "../../../contexts/barber-context";
import { LocationContext } from "../../../contexts/location-context";
import { AuthenticationContext } from "../../../contexts/authentication-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the dashboard page that has some routing configured, based on the sidebar.
 *
 * @returns {JSX}
 */
const BarberDashboardPage: React.FC = () => {
    const { loading } = useContext(AuthenticationContext);
    const { pageName } = useContext(LocationContext);

    // The barber dashboard sidebar components to be loaded.
    const components: React.FC[] = [
        StatisticsPage,
        PortfolioPage,
        ServicesPage,
        ReservationsPage,
        SettingsPage,
    ];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <EmailNotVerified />
                <PageHeader
                    title={pageName}
                    style={{ padding: 0, marginBottom: "1rem" }}
                />
                <BarberProvider>
                    <Skeleton loading={loading}>
                        <UserRoutes components={components} />
                    </Skeleton>
                </BarberProvider>
            </Content>
        </Layout>
    );
};

export default BarberDashboardPage;
