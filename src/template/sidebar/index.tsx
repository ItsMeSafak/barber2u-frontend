import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core"
import { faCog, faCalendar, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

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


const Sidebar: React.FC<ComponentProps> = ({ baseUrl, isMobile, items }) => {
    const stringToIcon: any = (iconName: string) =>{
        switch(iconName) {
            case "faCog":
                return <FontAwesomeIcon icon={faCog} />;
            case "faCalendar" :
                return <FontAwesomeIcon icon={faCalendar} />;
            case "faCaretRight":
                return <FontAwesomeIcon icon={faCaretRight} />;
            default:
                return <FontAwesomeIcon icon={faCalendar} />;
        }
    }

    return (
    <>
        <div className={`${styles.sidebar} ${isMobile ? styles.sidebarMobile: styles.sideBarDesktop}`}>
            <ul>
                {items && items.map(({ url, name, iconName }) => (
                    <li key={name}>
                        <NavLink to={`${baseUrl}${url}`} activeClassName={styles.active}>
                            <FontAwesomeIcon icon={stringToIcon(iconName)} />
                            <span>{name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div >
    </>
    )

                };

export default Sidebar;
