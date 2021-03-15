import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Layout } from "antd";

import ErrorPage from "./pages/error-page";
import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";

const { Header, Footer } = Layout;

import "antd/dist/antd.css";
import "./App.scss";
import Dashboard from "./pages/dashboard";
import Home from "./template/home"

// eslint-disable-next-line require-jsdoc
const App: React.FC = () => (
    <Layout className="layoutContainer">
        <BrowserRouter>
            <Header className="header">
                <HeaderPartial />
            </Header>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/dashboard' component={Dashboard} />
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
