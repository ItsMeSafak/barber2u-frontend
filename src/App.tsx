import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "antd";
import { getCurrentUser } from "./services/auth-service";

import Signup from "./pages/singup";
import SignIn from "./pages/signin";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import Dashboard from "./pages/dashboard";
import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";

const { Header, Footer } = Layout;

// eslint-disable-next-line require-jsdoc
const App: React.FC = () => {
    const [user] = useState(getCurrentUser());
    const errorCode = 404;

    return (
        <Layout className="layoutContainer">
            <BrowserRouter>
                <Header className="header">
                    <HeaderPartial />
                </Header>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            {user ? <Redirect to="/dashboard" /> : <HomePage />}
                        </Route>
                        <Route path="/dashboard">
                            {!user ? <Redirect to="/signin" /> : <Dashboard />}
                        </Route>
                        <Route path="/signin">
                            {user ? <Redirect to="/dashboard" /> : <SignIn />}
                        </Route>
                        <Route path="/customer/signUp">
                            {user ? <Redirect to="/dashboard" /> : <Signup />}
                        </Route>
                        <Route
                            component={() => (
                                <ErrorPage code={errorCode} returnUrl="home" />
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
};

export default App;
