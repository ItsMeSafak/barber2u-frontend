import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, useRouteMatch, Switch } from "react-router-dom";

import SettingsPage from "./settings";
import ServicesPage from "./services";
import SchedulePage from "./schedule";
import PortfolioPage from "./portfolio"
import StatisticsPage from "./statistics";
import ReservationsPage from "./reservations";
import SidebarPartial from "../../template/sidebar-partial";

import { Service } from "../../models/Service";
import { Portfolio } from "../../models/Portfolio";
import { Reservation } from "../../models/Reservation";

import ServicesData from "../../asset/services.json";
import PortfolioData from "../../asset/portfolio.json";
import ReservationsData from "../../asset/reservations.json";
import DashboardLinks from "../../asset/dashboard_links.json";

import styles from "./styles.module.scss";

const DashboardPage: React.FC = () => {
    const { path, url } = useRouteMatch();
    const MAX_WIDTH = 1200;
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const handleMobileView = () =>
            setMobile(window.innerWidth <= MAX_WIDTH);
        handleMobileView();
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, []);

    return (
        <BrowserRouter>
            <div
                className={`${styles.dashboard} ${
                    isMobile ? styles.dashboardMobile : styles.dashboardDesktop
                }`}
            >
                <SidebarPartial
                    baseUrl={url}
                    isMobile={isMobile}
                    items={DashboardLinks}
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
                            <PortfolioPage
                                portfolio={PortfolioData as Portfolio}
                            />
                        </Route>
                        <Route path={`${path}/services`}>
                            <ServicesPage services={ServicesData as Service[]} />
                        </Route>
                        <Route path={`${path}/settings`} component={SettingsPage} />
                        <Route path={`${path}/reservations`}>
                            <ReservationsPage
                                reservationItems={
                                    ReservationsData as Reservation[]
                                }
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default DashboardPage;
