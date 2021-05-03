import React, { useContext } from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import axios from "axios";

import { Layout } from "antd";

import Role from "./models/enums/Role";

import HomePage from "./pages/visitor/home";
import ErrorPage from "./pages/error";
import SigninPage from "./pages/visitor/signin";
import VerifyEmailPage from "./pages/verify-email";
import SignupPageBarber from "./pages/visitor/signup/signup-barber";
import SignupLandingPage from "./pages/visitor/signup";
import ResetPasswordPage from "./pages/visitor/reset-password";
import SignupPageCustomer from "./pages/visitor/signup/signup-customer";
import BarberDashboardPage from "./pages/barber/dashboard";
import CustomerDashboardPage from "./pages/customer/dashboard";
import ModeratorDashboardPage from "./pages/moderator/dashboard";

import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";
import ProtectedRoute from "./routes/protected-route";

import { NavbarProvider } from "./contexts/navbar-context";
import { AuthenticationContext } from "./contexts/authentication-context";

import { BASE_URL } from "./assets/constants";

const { Header, Footer } = Layout;

// eslint-disable-next-line require-jsdoc
const App: React.FC = () => {
    const { accessToken } = useContext(AuthenticationContext);

    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

    // Axios interceptor - Request.
    axios.interceptors.request.use(
        (request) => {
            request.baseURL = BASE_URL;
            // TODO:
            //      - Handle new access tokens.
            //      - Handle refresh tokens.
            return request;
        },
        (error) => Promise.reject(error)
    );

    // Axios interceptor - Response.
    axios.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );

    return (
        <BrowserRouter>
            <CookiesProvider>
                <NavbarProvider>
                    <Layout className="layoutContainer">
                        <Header className="header">
                            <HeaderPartial />
                        </Header>
                        <Layout>
                            <Switch>
                                <ProtectedRoute
                                    exact
                                    allowedRoles={[]}
                                    path="/"
                                    component={HomePage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[]}
                                    path="/signin"
                                    component={SigninPage}
                                />
                                <ProtectedRoute
                                    exact
                                    allowedRoles={[]}
                                    path="/signup"
                                    component={SignupLandingPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[]}
                                    path="/signup/customer"
                                    component={SignupPageCustomer}
                                />
                                <ProtectedRoute
                                    allowedRoles={[]}
                                    path="/signup/barber"
                                    component={SignupPageBarber}
                                />
                                <ProtectedRoute
                                    allowedRoles={[]}
                                    path="/verify"
                                    component={VerifyEmailPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[]}
                                    path="/reset-password"
                                    component={ResetPasswordPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[Role.Barber]}
                                    path="/barber"
                                    component={BarberDashboardPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[Role.Customer]}
                                    path="/customer"
                                    component={CustomerDashboardPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[Role.Moderator]}
                                    path="/moderator"
                                    component={ModeratorDashboardPage}
                                />
                                <Route
                                    exact
                                    path="/503"
                                    component={() => (
                                        <ErrorPage code={503} returnUrl="/" />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/401"
                                    component={() => (
                                        <ErrorPage code={401} returnUrl="/" />
                                    )}
                                />
                                <Route
                                    component={() => (
                                        <ErrorPage code={404} returnUrl="/" />
                                    )}
                                />
                            </Switch>
                        </Layout>
                        <Footer className="footer">
                            <FooterPartial />
                        </Footer>
                    </Layout>
                </NavbarProvider>
            </CookiesProvider>
        </BrowserRouter>
    );
};

export default App;
