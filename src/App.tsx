import React from "react";
import logo from "./logo.svg";
import Header from "./template/header";

import "./App.scss";

const App: React.FC = () => {
    const navbarElements = [
        {
            url: "/home",
            name: "Home",
        },
        {
            url: "/how-it-works",
            name: "How it works",
        },
        {
            url: "/about",
            name: "About",
        },
        {
            url: "/contact",
            name: "Contact",
        },
        {
            url: "/login",
            name: "Log in",
            isPillButton: true,
        },
    ];

    return (
        <>
            <Header tabs={navbarElements} />
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
                </header>
            </div>
        </>
    );
};

export default App;
