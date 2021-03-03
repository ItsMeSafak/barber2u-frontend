import React from "react";

import { DatePicker } from "antd";

import Header from "./template/header";
import Footer from "./template/footer";

import logo from "./logo.svg";

import "antd/dist/antd.css";
import "./App.scss";

const App: React.FC = () => (
    <>
        <Header />
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <DatePicker />
            </header>
        </div>
        <Footer />
    </>
);

export default App;
