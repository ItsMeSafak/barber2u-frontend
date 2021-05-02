import React, { useContext } from "react";

import { Layout } from "antd";

import MenuItems from "../../components/menu-items";

import { NavbarContext } from "../../contexts/navbar-context";
import { ScreenContext } from "../../contexts/screen-context";

import styles from "./styles.module.scss";

const { Sider } = Layout;

/**
 * This component renders the sidebar partial with items that navigate to components within the dashboard.
 *
 * @returns {JSX}
 */
const SidebarPartial: React.FC = () => {
    const { menuItems } = useContext(NavbarContext);
    const { isMobileOrTablet } = useContext(ScreenContext);

    return (
        <Sider
            className={styles.sidebar}
            style={{ backgroundColor: "#fff" }}
            collapsed={isMobileOrTablet}
        >
            <MenuItems menuType="sidebar" menuItems={menuItems} />
        </Sider>
    );
};

export default SidebarPartial;
