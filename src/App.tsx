import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { DatePicker } from "antd";

import Header from "./template/header";
import Footer from "./template/footer";

import logo from "./logo.svg";

import "antd/dist/antd.css";
import "./App.scss";
import Dashboard from "./pages/dashboard";

const App: React.FC = () => (
    <>
        <BrowserRouter>
            <Header />
            <div className="App">
                <Switch>
                    <Route path='/dashboard' component={Dashboard} />
                </Switch>
            </div>
        </BrowserRouter>
        <Footer />
    </>
);

export default App;
