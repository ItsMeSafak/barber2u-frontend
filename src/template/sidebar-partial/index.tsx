import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Sider from "antd/lib/layout/Sider";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIconByPrefixName } from "../../asset/functions/icon";

import styles from "./styles.module.scss";

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

const SidebarPartial: React.FC<ComponentProps> = ({
    baseUrl,
    isMobile,
    items,
}) => {
    const currentUrl =
        window.location.pathname.split("/")[2] === null
            ? "/"
            : `/${window.location.pathname.split("/")[2]}`;
    const [currentPath, setCurrentPath] = useState(currentUrl);

    const renderMenuItems = (menuItems: Array<{
        url: string;
        name: string;
        iconPrefix: string;
        iconName: string;
    }>) => (
        menuItems.map((menuItem) => (
            <Menu.Item
                key={menuItem.url === "" ? "/" : menuItem.url}
                icon={<FontAwesomeIcon
                    icon={getIconByPrefixName(menuItem.iconPrefix, menuItem.iconName)} />}
            >
                <NavLink
                    to={`${baseUrl}${menuItem.url}`}
                    onClick={(evt) =>
                        setCurrentPath(
                            menuItem.url === "" ? "/" : menuItem.url
                        )
                    }
                >
                    {menuItem.name}
                </NavLink>
            </Menu.Item>
        ))
    );

    return (
        <>
            <Layout
                className={`${styles.side} ${isMobile ? styles.sidebarMobile : styles.sideBarDesktop
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
