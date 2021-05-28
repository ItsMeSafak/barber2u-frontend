import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { Layout } from "antd";

import Role from "./models/enums/Role";

import ListingPage from "./pages/listing";
import ListingsPage from "./pages/listings";
import HomePage from "./pages/visitor/home";
import ErrorPage from "./pages/error";
import SigninPage from "./pages/visitor/signin";
import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";
import ProtectedRoute from "./routes/protected-route";
import VerifyEmailPage from "./pages/verify-email";
import SignupPageBarber from "./pages/visitor/signup/signup-barber";
import SignupLandingPage from "./pages/visitor/signup";
import ResetPasswordPage from "./pages/visitor/reset-password";
import AdminDashboardPage from "./pages/admin/dashboard";
import SignupPageCustomer from "./pages/visitor/signup/signup-customer";
import BarberDashboardPage from "./pages/barber/dashboard";
import ConfirmPasswordPage from "./pages/visitor/confirm-password";
import CustomerDashboardPage from "./pages/customer/dashboard";

import { BASE_URL } from "./assets/constants";
import { NavbarProvider } from "./contexts/navbar-context";
import { getNewAccessToken } from "./services/auth-service";
import { AuthenticationContext } from "./contexts/authentication-context";

const { Header, Footer } = Layout;

/* eslint-disable  @typescript-eslint/no-explicit-any */
// eslint-disable-next-line require-jsdoc
const App: React.FC = () => {
    const { accessToken, refreshToken, setAccessToken } = useContext(
        AuthenticationContext
    );

    const history = useHistory();

    useEffect(() => {
        axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }, [accessToken]);

    /**
     * This function generates new access tokens.
     *
     * @param {any} request The axios request.
     * @returns {Promise<any>}
     */
    const refreshAccessToken = (request: any) =>
        getNewAccessToken(refreshToken || "").then(({ data }) => {
            const { token } = data;
            setAccessToken(token);
            request.response.config.headers.Authorization = `Bearer ${token}`;
            return Promise.resolve();
        });

    /**
     * Create axios instance with the authentication refresh logic.
     */
    createAuthRefreshInterceptor(axios, refreshAccessToken);

    // Axios interceptor - Request.
    axios.interceptors.request.use(
        (request) => {
            request.baseURL = BASE_URL;
            return request;
        },
        (error) => Promise.reject(error)
    );

    // Axios interceptor - Response.
    axios.interceptors.response.use(
        (response) => {
            // If retrieved response status is not OK, redirect to "internal server error" page
            if (response && response.status !== 200) history.push("500");
            return response;
        },
        (error) => {
            console.error(error);
            if (error.request.status === 0) history.push("503");
        }
    );

    return (
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
                            exact
                            allowedRoles={[]}
                            path="/signup/customer"
                            component={SignupPageCustomer}
                        />
                        <ProtectedRoute
                            exact
                            allowedRoles={[]}
                            path="/signup/barber"
                            component={SignupPageBarber}
                        />
                        <ProtectedRoute
                            exact
                            allowedRoles={[]}
                            path="/reset-password"
                            component={ResetPasswordPage}
                        />
                        <ProtectedRoute
                            allowedRoles={[]}
                            path="/confirm-password"
                            component={ConfirmPasswordPage}
                        />
                        <ProtectedRoute
                            allowedRoles={[Role.Customer]}
                            path="/listings"
                            component={ListingsPage}
                        />
                        <ProtectedRoute
                            exact
                            allowedRoles={[]}
                            path="/listing/:email"
                            component={ListingPage}
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
                            allowedRoles={[Role.Admin]}
                            path="/admin"
                            component={AdminDashboardPage}
                        />
                        <Route path="/verify" component={VerifyEmailPage} />
                        <Route
                            exact
                            path="/500"
                            component={() => (
                                <ErrorPage code={500} returnUrl="/" />
                            )}
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
    );
};

export default App;
