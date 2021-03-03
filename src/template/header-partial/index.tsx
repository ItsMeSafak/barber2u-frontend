import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faCut } from "@fortawesome/free-solid-svg-icons";

import Menu from "../menu";
import NavMenuMapping from "../../asset/navbar_mapping.json";

import { MAX_WIDTH_SCREEN } from "../../asset/constants";

import styles from "./styles.module.scss";

/**
 * This component renders a menu header with its menu items.
 */
const HeaderPartial: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMobile, setMobile] = useState(false);

    /**
     * This function checks whether the window size has been adjusted.
     * Whenever the window width reaches a specific width, the hamburger menu is then visible.
     * The function gets executed by default whenever the window has been loaded.
     * At the end, the event listener is removed so that unnecessary events are unloaded.
     */
    useEffect(() => {
        const handleMobileView = () =>
            setMobile(window.innerWidth <= MAX_WIDTH_SCREEN);
        handleMobileView();
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, []);

    /**
     * This function checks whether the (hamburger) menu for mobile should be visible or not.
     * It checks the previous state and returns the opposite state.
     */
    const toggleMenu = () => setMenuOpen((prevState) => !prevState);

    /**
     * This function renders the navbar header elements.
     */
    return (
        <>
            <header>
                <h1 className={styles.title}>
                    <FontAwesomeIcon icon={faCut} size="1x" />
                    Barber2U
                </h1>
                {isMobile ? (
                    <a
                        className={styles.hamburgerMenu}
                        onClick={toggleMenu}
                        aria-hidden="true"
                    >
                        {isMenuOpen ? (
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        ) : (
                            <FontAwesomeIcon icon={faBars} size="2x" />
                        )}
                    </a>
                ) : (
                    <Menu items={NavMenuMapping} />
                )}
            </header>
            {isMobile && isMenuOpen && <Menu isMobile items={NavMenuMapping} />}
        </>
    );
};

export default HeaderPartial;
