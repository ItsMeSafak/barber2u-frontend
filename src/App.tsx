import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";
import Dashboard from "./pages/dashboard";
import ForgotPasswordPage from "./pages/forgot-password";

import "antd/dist/antd.css";
import "./App.scss";

const App: React.FC = () => (
    <>
        <BrowserRouter>
            <HeaderPartial />
            <div className="App-body">
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route
                        path="/forgot-password"
                        component={ForgotPasswordPage}
                    />
                </Switch>
            </div>
        </BrowserRouter>
        <FooterPartial />
    </>
);

export default App;
