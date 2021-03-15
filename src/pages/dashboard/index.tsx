import React, { useCallback, useEffect, useState } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import SettingsPage from "./settings";
import ServicesPage from "./services";
import SchedulePage from "./schedule";
import PortfolioPage from "./portfolio";
import StatisticsPage from "./statistics";
import SidebarPartial from "../../template/sidebar-partial";
import ReservationsPage from "./reservations";

import Service from "../../models/Service";
import Portfolio from "../../models/Portfolio";
import Reservation from "../../models/Reservation";

import ServicesData from "../../asset/services.json";
import PortfolioData from "../../asset/portfolio.json";
import ReservationsData from "../../asset/reservations.json";
import SidebarMenuItems from "../../asset/dashboard_links.json";

import { WIDTH_SCREEN_XL } from "../../asset/constants";

import styles from "./styles.module.scss";

/**
 * This component renders the dashboard page that has some routing configured, based on the sidebar.
 *
 * @returns {JSX}
 */
const DashboardPage: React.FC = () => {
    const { path, url } = useRouteMatch();
    const [isMobile, setMobile] = useState(false);

    /**
     * This function checks whether the window screen width reaches a breakpoint.
     * If so, the mobile state is set to true.
     */
    const handleMobileView = useCallback(() => {
        setMobile(window.innerWidth <= WIDTH_SCREEN_XL);
    }, []);

    /**
     * This function checks whether the window size has been adjusted.
     * Whenever the window width reaches a specific width, the hamburger menu is then visible.
     * The function gets executed by default whenever the window has been loaded.
     * At the end, the event listener is removed so that unnecessary events are unloaded.
     */
    useEffect(() => {
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, [handleMobileView]);

    return (
        <div
            className={`${styles.dashboard} ${
                isMobile ? styles.dashboardMobile : styles.dashboardDesktop
            }`}
        >
            <SidebarPartial
                baseUrl={url}
                isMobile={isMobile}
                items={SidebarMenuItems}
            />
            <div className={styles.dashboardContent}>
                <Switch>
                    <Route exact path={`${path}`}>
                        <StatisticsPage />
                    </Route>
                    <Route path={`${path}/schedule`}>
                        <SchedulePage />
                    </Route>
                    <Route path={`${path}/portfolio`}>
                        <PortfolioPage portfolio={PortfolioData as Portfolio} />
                    </Route>
                    <Route path={`${path}/services`}>
                        <ServicesPage services={ServicesData as Service[]} />
                    </Route>
                    <Route path={`${path}/settings`} component={SettingsPage} />
                    <Route path={`${path}/reservations`}>
                        <ReservationsPage
                            reservationItems={ReservationsData as Reservation[]}
                        />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default DashboardPage;
