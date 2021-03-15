import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Layout } from "antd";

import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import DashboardPage from "./pages/dashboard";
import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";

const { Header, Footer } = Layout;

// eslint-disable-next-line require-jsdoc
const App: React.FC = () => (
    <Layout className="layoutContainer">
        <BrowserRouter>
            <Header className="header">
                <HeaderPartial />
            </Header>
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route
                        component={() => (
                            <ErrorPage code={404} returnUrl="home" />
                        )}
                    />
                </Switch>
            </Layout>
            <Footer className="footer">
                <FooterPartial />
            </Footer>
        </BrowserRouter>
    </Layout>
);

export default App;
