import React from "react";
import ReactDOM from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";

import { ScreenProvider } from "./contexts/screen-context";
import { AuthenticationProvider } from "./contexts/authentication-context";

import { icons } from "./assets/functions/icon";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";

// Make font awesome icons global.
library.add(icons);

ReactDOM.render(
    <React.StrictMode>
        <AuthenticationProvider>
            <ScreenProvider>
                <App />
            </ScreenProvider>
        </AuthenticationProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
