import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "antd/dist/antd.css";
import Header from "./template/header";
import Footer from "./template/footer";

import DashboardPage from "./pages/dashboard";

import "./App.scss";

const App: React.FC = () => (
    <>
        <BrowserRouter>
            <Header />
            <div className="App">
                <Switch>
                    <Route path="/dashboard" component={DashboardPage} />
                </Switch>
            </div>
        </BrowserRouter>
        <Footer />
    </>
);

export default App;
