import React from "react";
import { BrowserRouter } from "react-router-dom";

import AboutComponent from "./about";
import ReviewComponent from "./review";
import WelcomeComponent from "./welcome";
import HowDoesItWorkComponent from "./how-does-it-work";

/**
 * Homepage wrapper containing all the needed components
 *
 * @returns {JSX}
 */
const HomePage: React.FC = () => (
    <BrowserRouter>
        <WelcomeComponent />
        <HowDoesItWorkComponent />
        <AboutComponent />
        <ReviewComponent />
    </BrowserRouter>
);

export default HomePage;
