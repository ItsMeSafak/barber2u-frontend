import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCalendar, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

interface ComponentProps {
    url?: String;
}

const Sidebar: React.FC<ComponentProps> = ({ url }) => (
    <>
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <NavLink to={`${url}/settings`} activeClassName={styles.active}><FontAwesomeIcon
                        icon={faCog}
                    />
                        <span>Settings</span></NavLink>
                </li>

                <li>
                    <NavLink to={`${url}/reservations`} activeClassName={styles.active}><FontAwesomeIcon
                        icon={faCalendar}
                    />
                        <span>Reservations</span>
                    </NavLink>
                </li>
            </ul>
        </div >
    </>
);

export default Sidebar;
