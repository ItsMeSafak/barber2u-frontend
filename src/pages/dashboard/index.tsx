import React from "react";

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
const Menu: React.FC<ComponentProps> = ({ isMobile, items }) => (
    <ul className={isMobile ? styles.navbarMobile : styles.navbarDesktop}>
        {items &&
            items.map(({ url, name, isPillButton }) => (
                <li
                    key={name}
                    className={
                        isPillButton && !isMobile
                            ? styles.pillButton
                            : undefined
                    }
                >
                    <a href={url}>{name}</a>
                </li>
            ))}
    </ul>
);

export default Menu;
