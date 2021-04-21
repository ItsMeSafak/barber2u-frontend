import React from "react";

import { Layout } from "antd";

import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import ServicesPage from "./services";
import SchedulePage from "./schedule";
import PortfolioPage from "./portfolio";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";
import ReservationsPage from "./reservations";

import styles from "./styles.module.scss";
import { ServiceProvider } from "../../../contexts/service-context";

const { Content } = Layout;

/**
 * This component renders the dashboard page that has some routing configured, based on the sidebar.
 *
 * @returns {JSX}
 */
const BarberDashboardPage: React.FC = () => {
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
            <ServiceProvider>
                <Content className={styles.content}>
                    <UserRoutes components={components} />
                </Content>
            </ServiceProvider>

        </Layout>
    );
};

export default BarberDashboardPage;
