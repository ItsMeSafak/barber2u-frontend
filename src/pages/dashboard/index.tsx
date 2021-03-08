import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, useRouteMatch, Switch } from "react-router-dom";
import Sidebar from "../../template/sidebar";
import DashboardLinks from "../../asset/dashboard_links.json";
import styles from "./styles.module.scss";

import Reservations from "./reservations";
import Settings from "./settings";

const Dashboard: React.FC = () => {
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
                className={`${styles.dashboard} ${isMobile ? styles.dashboardMobile : styles.dashboardDesktop
                    }`}
            >
                <Sidebar
                    baseUrl={url}
                    isMobile={isMobile}
                    items={DashboardLinks}
                />
                <div className={styles.dashboardContent}>
                    <Switch>
                        <Route
                            path={`${path}/settings`}
                            component={Settings} />
                        <Route
                            path={`${path}/reservations`}
                            component={Reservations}
                        />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Dashboard;
