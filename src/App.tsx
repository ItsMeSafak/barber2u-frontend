import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Layout } from "antd";

import Role from "./models/enums/Role";

import HomePage from "./pages/visitor/home";
import ErrorPage from "./pages/error";
import ListingPage from "./pages/listings";
import SignupPage from "./pages/visitor/signup";
import SigninPage from "./pages/visitor/signin";
import ResetPasswordPage from "./pages/visitor/reset-password";
import BarberDashboardPage from "./pages/barber/dashboard";
import CustomerDashboardPage from "./pages/customer/dashboard";
import ModeratorDashboardPage from "./pages/moderator/dashboard";

import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";
import ProtectedRoute from "./routes/protected-route";

import { AuthProvider } from "./contexts/auth-context";
import { NavbarProvider } from "./contexts/navbar-context";

const { Header, Footer } = Layout;

// eslint-disable-next-line require-jsdoc
const App: React.FC = () => (
    <BrowserRouter>
        <CookiesProvider>
            <AuthProvider>
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
                                    allowedRoles={[]}
                                    path="/customer/signup"
                                    component={SignupPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[]}
                                    path="/reset-password"
                                    component={ResetPasswordPage}
                                />
                                <ProtectedRoute
                                    allowedRoles={[Role.Customer, Role.Barber]}
                                    path="/listings"
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
            </AuthProvider>
        </CookiesProvider>
    </BrowserRouter>
);

export default App;
