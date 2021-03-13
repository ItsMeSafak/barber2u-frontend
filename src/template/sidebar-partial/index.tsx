import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import {
    faCog,
    faCalendar,
    faCaretRight,
    faChartPie,
    faCalendarAlt,
    faCamera,
    faCut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface ComponentProps {
    baseUrl?: string;
    isMobile?: boolean;
    items?: {
        url: string;
        name: string;
        iconName: string;
    }[];
}

const SidebarPartial: React.FC<ComponentProps> = ({ baseUrl, isMobile, items }) => {
    const currentUrl =
        window.location.pathname.split("/")[2] === null
            ? "/"
            : `/${window.location.pathname.split("/")[2]}`;
    const [currentPath, setCurrentPath] = useState(currentUrl);

    const stringToIcon: any = (iconName: string) => {
        switch (iconName) {
            case "faChartPie":
                return <FontAwesomeIcon icon={faChartPie} />;
            case "faCalendarAlt":
                return <FontAwesomeIcon icon={faCalendarAlt} />;
            case "faCamera":
                return <FontAwesomeIcon icon={faCamera} />;
            case "faCut":
                return <FontAwesomeIcon icon={faCut} />;
            case "faCog":
                return <FontAwesomeIcon icon={faCog} />;
            case "faCalendar":
                return <FontAwesomeIcon icon={faCalendar} />;
            case "faCaretRight":
                return <FontAwesomeIcon icon={faCaretRight} />;
            default:
                return <FontAwesomeIcon icon={faCalendar} />;
        }
    };

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
                        {items &&
                            items.map(({ url, name, iconName }) => (
                                <Menu.Item
                                    key={url === "" ? "/" : url}
                                    icon={stringToIcon(iconName)}
                                >
                                    <NavLink
                                        to={`${baseUrl}${url}`}
                                        onClick={(evt) =>
                                            setCurrentPath(
                                                url === "" ? "/" : url
                                            )
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                </Menu.Item>
                            ))}
                    </Menu>
                </Sider>
            </Layout>
        </>
    );
};

export default SidebarPartial;
