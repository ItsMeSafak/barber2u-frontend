import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, useRouteMatch, Switch } from "react-router-dom";

import Sidebar from "../../template/sidebar";
import Settings from "./sub-pages/settings";
import Reservations from "./sub-pages/reservations";

import { WIDTH_SCREEN_LG } from "../../asset/constants";

import styles from "./styles.module.scss";

const Dashboard: React.FC = () => {
    const { path, url } = useRouteMatch();
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const handleMobileView = () =>
            setMobile(window.innerWidth <= WIDTH_SCREEN_LG);
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
                <Sidebar baseUrl={url} isMobile={isMobile} />
                <Switch>
                    <Route path={`${path}/settings`} component={Settings} />
                    <Route
                        path={`${path}/reservations`}
                        component={Reservations}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Dashboard;
