import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WIDTH_SCREEN_LG } from "../../asset/constants";
import { getIconByPrefixName } from "../../asset/functions/icon";

import Menu from "./menu";
import LogoComponent from "../../component/logo";
import NavMenuMapping from "../../asset/navbar_mapping.json";

import styles from "./styles.module.scss";

/**
 * This component renders a menu header with its menu items.
 *
 * @returns {JSX}
 */
const HeaderPartial: React.FC = () => {
    const [isMobile, setMobile] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    /**
     * This function checks whether the window screen width reaches a breakpoint.
     * If so, the mobile state is set to true.
     */
    const handleMobileView = useCallback(() => {
        setMobile(window.innerWidth <= WIDTH_SCREEN_LG);
    }, []);

    /**
     * This function checks whether the window size has been adjusted.
     * Whenever the window width reaches a specific width, the hamburger menu is then visible.
     * The function gets executed by default whenever the window has been loaded.
     * At the end, the event listener is removed so that unnecessary events are unloaded.
     */
    useEffect(() => {
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, [handleMobileView]);

    /**
     * This function renders the hamburger menu.
     */
    const renderHamburgerMenu = () => (
        <Button className={styles.hamburgerMenu} ghost onClick={toggleDrawer}>
            <FontAwesomeIcon
                icon={getIconByPrefixName("fas", "bars")}
                size="lg"
            />
        </Button>
    );

    /**
     * This function renders the drawer menu when toggled on mobile.
     *
     * @param {boolean} visible Whether the drawer menu has to be visible or not.
     * @returns {JSX}
     */
    const renderDrawerMenu = (visible: boolean) => (
        <Drawer
            key="Menu"
            title="Menu"
            closable={false}
            placement="right"
            onClose={toggleDrawer}
            visible={visible}
            bodyStyle={{ backgroundColor: "#252525" }}
        >
            <Menu isMobile items={NavMenuMapping} />
        </Drawer>
    );

    /**
     * This function checks whether the drawer menu should be visible or not.
     * It checks the previous state and returns the opposite state.
     */
    const toggleDrawer = () => setDrawerVisible((prevState) => !prevState);

    return (
        <>
            <Link to="home">
                <h1 className={styles.logo}>
                    <LogoComponent iconPrefix="fas" iconName="cut" />
                </h1>
            </Link>
            {isMobile ? renderHamburgerMenu() : <Menu items={NavMenuMapping} />}
            {renderDrawerMenu(isMobile && drawerVisible)}
        </>
    );
};

export default HeaderPartial;
