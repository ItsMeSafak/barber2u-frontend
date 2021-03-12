import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCog,
    faCalendar,
    faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import Menu from "../header-partial/menu";

import DashboardMenuLinks from "../../asset/dashboard_links.json";

import styles from "./styles.module.scss";

interface ComponentProps {
    baseUrl?: string;
    isMobile?: boolean;
}

const Sidebar: React.FC<ComponentProps> = ({ baseUrl, isMobile }) => {
    const items = DashboardMenuLinks;

    return (
        <>
            <div className={`${styles.sidebar}`}>
                <ul>
                    {/* {items && items.map(({ url, name, icon_name }) => {
                        <li>
                            <NavLink to={`${baseUrl}/${url}`} activeClassName={styles.active}><FontAwesomeIcon
                                icon={icon_name}
                            />
                                <span>{name}</span>
                            </NavLink>
                        </li>
                    })
                    } */}
                    {/* <li>
                        <NavLink to={`${url}/settings`} activeClassName={styles.active}><FontAwesomeIcon
                            icon={faCog}
                        />
                            <Menu items={DashboardMenuLinks} />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={`${url}/reservations`} activeClassName={styles.active}><FontAwesomeIcon
                            icon={faCalendar}
                        />
                            <span>Reservations</span>
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
