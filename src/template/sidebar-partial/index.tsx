import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIconByPrefixName } from "../../assets/functions/icon";

import styles from "./styles.module.scss";

const { Sider } = Layout;

interface ComponentProps {
    baseUrl?: string;
    isMobile?: boolean;
    items?: Array<{
        url: string;
        name: string;
        iconPrefix: string;
        iconName: string;
    }>;
}

/**
 * This component renders the sidebar partial with items that navigate to components within the dashboard.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const SidebarPartial: React.FC<ComponentProps> = (props) => {
    const { baseUrl, isMobile, items } = props;
    const currentUrl =
        window.location.pathname.split("/")[2] === null
            ? "/"
            : `/${window.location.pathname.split("/")[2]}`;
    const [currentPath, setCurrentPath] = useState(currentUrl);

    /**
     * This function renders all the menu items in the sidebar.
     *
     * @param {Array<{ url: string, name: string, iconPrefix: string, iconName: string}>} menuItems Menu items to be rendered.
     * @returns {JSX}
     */
    const renderMenuItems = (
        menuItems: Array<{
            url: string;
            name: string;
            iconPrefix: string;
            iconName: string;
        }>
    ) =>
        menuItems.map((menuItem) => (
            <Menu.Item
                key={menuItem.url === "" ? "/" : menuItem.url}
                icon={
                    <FontAwesomeIcon
                        icon={getIconByPrefixName(
                            menuItem.iconPrefix,
                            menuItem.iconName
                        )}
                    />
                }
            >
                <NavLink
                    to={`${baseUrl}${menuItem.url}`}
                    onClick={(evt) =>
                        setCurrentPath(menuItem.url === "" ? "/" : menuItem.url)
                    }
                >
                    {menuItem.name}
                </NavLink>
            </Menu.Item>
        ));

    return (
        <>
            <Layout
                className={`${styles.side} ${
                    isMobile ? styles.sidebarMobile : styles.sideBarDesktop
                }`}
            >
                <Sider>
                    <Menu
                        mode="inline"
                        className={styles.sidebar}
                        selectedKeys={[currentPath]}
                        inlineCollapsed={isMobile}
                    >
                        {items && renderMenuItems(items)}
                    </Menu>
                </Sider>
            </Layout>
        </>
    );
};

export default SidebarPartial;
