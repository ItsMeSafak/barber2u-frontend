import React from "react";

import { Button } from "antd";

import styles from "./styles.module.scss";

interface ComponentProps {
    isMobile?: boolean;
    items?: {
        url: string;
        name: string;
        isPillButton?: boolean;
    }[];
}

/**
 * This component renders the navbar menu item elements.
 *
 * @param props     Component properties.
 */
const Menu: React.FC<ComponentProps> = (props) => {
    const { isMobile, items } = props;

    /**
     * This function renders the navbar menu items.
     * Depending on the given property, it renders a pill button for the specific text/button.
     */
    const renderNavMenuItems = () =>
        items?.map(({ url, name, isPillButton }) => {
            const renderPillButton = isPillButton && !isMobile;
            return (
                <li key={name}>
                    <Button
                        href={url}
                        type={renderPillButton ? "primary" : "link"}
                        shape={renderPillButton ? "round" : undefined}
                    >
                        {name}
                    </Button>
                </li>
            );
        });

    return (
        <ul
            className={
                props.isMobile ? styles.navbarMobile : styles.navbarDesktop
            }
        >
            {props.items && renderNavMenuItems()}
        </ul>
    );
};

export default Menu;
