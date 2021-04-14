import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { logout } from "../../../services/auth-service";

import styles from "./styles.module.scss";

interface ComponentProps {
    isMobile?: boolean;
    items?: Array<{
        url: string;
        name: string;
        isPillButton?: boolean;
    }>;
}

/**
 * This component renders the navbar menu item elements.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const Menu: React.FC<ComponentProps> = (props) => {
    const { isMobile, items } = props;
    const history = useHistory();

    /**
     * This function renders the navbar menu items.
     * Depending on the given property, it renders a pill button for the specific text/button.
     *
     * @param {Array<{url: string, name: string, isPillButton?: boolean}>} menuItems Menu items to be rendered.
     * @returns {JSX}
     */
    const renderNavMenuItems = (
        menuItems: Array<{ url: string; name: string; isPillButton?: boolean }>
    ) =>
        menuItems.map(({ url, name, isPillButton }) => {
            const renderPillButton = isPillButton && !isMobile;
            return (
                <li key={name}>
                    <Link to={url}>
                        <Button
                            type={renderPillButton ? "primary" : "link"}
                            className={
                                renderPillButton ? styles.pillButton : ""
                            }
                            shape={renderPillButton ? "round" : undefined}
                            onClick={() => {}}
                        >
                            {name}
                        </Button>
                    </Link>
                </li>
            );
        });

    return (
        <ul className={isMobile ? styles.navbarMobile : styles.navbarDesktop}>
            {items && renderNavMenuItems(items)}
        </ul>
    );
};

export default Menu;