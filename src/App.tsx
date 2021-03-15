import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import {Layout} from "antd";

import Dashboard from "./pages/dashboard";
import ErrorPage from "./pages/error-page";
import HeaderPartial from "./template/header-partial";
import FooterPartial from "./template/footer-partial";
import Signup from "./pages/singup";
import SignIn from "./pages/login";
import {WIDTH_SCREEN_LG} from "./asset/constants";
import {getCurrentUser} from "./asset/services/Auth-Service";

const {Header, Footer} = Layout;

const App: React.FC = () => {
    const [user] = useState(getCurrentUser());

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    });
    return (
        <Layout className="layoutContainer">
            <BrowserRouter>
                <Header className="header">
                    <HeaderPartial/>
                </Header>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            {user ? <Redirect to="/dashboard" /> : <SignIn />}
                        </Route>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/customer/signUp" component={Signup}/>
                        <Route path="/signIn" component={SignIn}/>
                        <Route
                            component={() => (
                                <ErrorPage code={404} returnUrl="home"/>
                            )}
                        />
                    </Switch>
                </Layout>
                <Footer className="footer">
                    <FooterPartial/>
                </Footer>
            </BrowserRouter>
        </Layout>
    );
};

export default App;
