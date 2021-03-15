import React from "react";

import AboutSection from "./about";
import ReviewSection from "./review";
import WelcomeSection from "./welcome";
import HowDoesItWorkSection from "./how-does-it-work";

/**
 * Homepage wrapper containing all the needed components
 *
 * @returns {JSX}
 */
const HomePage: React.FC = () => (
    <>
        <WelcomeSection />
        <HowDoesItWorkSection />
        <AboutSection />
        <ReviewSection />
    </>
);

export default HomePage;
