import React from "react";
import { BrowserRouter, Route, useRouteMatch, Switch } from "react-router-dom";
import Sidebar from "../../template/sidebar";

import styles from "./styles.module.scss";

import Reservations from "./sub-pages/reservations";
import Settings from "./sub-pages/settings";


const Dashboard: React.FC = () => {
    const { path, url } = useRouteMatch();
    return (
        <BrowserRouter>
            <div className={styles.dashboard}>
                <Sidebar url={url} />
                <Switch>
                    <Route path={`${path}/settings`} component={Settings} />
                    <Route path={`${path}/reservations`} component={Reservations} />
                </Switch>
            </div>
        </BrowserRouter>
    )
};

export default Dashboard;
