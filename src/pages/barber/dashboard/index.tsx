import React, { useContext } from "react";

import { Layout, Skeleton } from "antd";

import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import ServicesPage from "./services";
import SchedulePage from "./schedule";
import PortfolioPage from "./portfolio";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";
import ReservationsPage from "./reservations";
import EmailNotVerified from "../../../template/email-not-verified";

import { ServiceProvider } from "../../../contexts/service-context";
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

    // The barber dashboard sidebar components to be loaded.
    const components: React.FC[] = [
        StatisticsPage,
        SchedulePage,
        PortfolioPage,
        ServicesPage,
        ReservationsPage,
        SettingsPage,
    ];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <ServiceProvider>
                    <Skeleton active loading={loading} />
                    {!loading && (
                        <>
                            <EmailNotVerified />
                            <UserRoutes components={components} />
                        </>
                    )}
                </ServiceProvider>
            </Content>
        </Layout>
    );
};

export default BarberDashboardPage;
