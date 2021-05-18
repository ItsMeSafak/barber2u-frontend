import React, { useContext } from "react";

import { Layout, Skeleton } from "antd";

import UserRoutes from "../../../routes/user-routes";
import SettingsPage from "./settings";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../../template/sidebar-partial";
import EmailNotVerified from "../../../template/email-not-verified";

import { AuthenticationContext } from "../../../contexts/authentication-context";

import styles from "./styles.module.scss";
import ReservationsPage from "../../barber/dashboard/reservations";
import { BarberProvider } from "../../../contexts/barber-context";

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
    const components: React.FC[] = [
        StatisticsPage,
        ReservationsPage,
        SettingsPage,
    ];

    return (
        <Layout>
            <SidebarPartial />
            <Content className={styles.content}>
                <BarberProvider>
                    <Skeleton active loading={loading} />
                    {!loading && (
                        <>
                            <EmailNotVerified />
                            <UserRoutes components={components} />
                        </>
                    )}
                </BarberProvider>
            </Content>
        </Layout>
    );
};

export default CustomerDashboardPage;
