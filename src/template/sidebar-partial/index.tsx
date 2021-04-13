import React, { useCallback, useContext, useEffect, useState } from "react";

import { Layout } from "antd";

import MenuItems from "../../components/menu-items";

import { NavbarContext } from "../../contexts/navbar-context";

import { WIDTH_SCREEN_LG } from "../../assets/constants";

import styles from "./styles.module.scss";

const { Sider } = Layout;

/**
 * This component renders the sidebar partial with items that navigate to components within the dashboard.
 *
 * @returns {JSX}
 */
const SidebarPartial: React.FC = () => {
    const { menuItems } = useContext(NavbarContext);

    const [isMobile, setMobile] = useState(false);

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
        handleMobileView();
        window.addEventListener("resize", handleMobileView);
        // Remove event listener if not being used.
        return () => window.removeEventListener("resize", handleMobileView);
    }, [handleMobileView]);

    return (
        <Sider
            className={styles.sidebar}
            style={{ backgroundColor: "#fff" }}
            collapsed={isMobile}
        >
            <MenuItems menuType="sidebar" menuItems={menuItems} />
        </Sider>
    );
};

export default SidebarPartial;
