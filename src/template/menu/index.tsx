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
export const Menu: React.FC<ComponentProps> = ({ isMobile, items }) => (
    <ul className={isMobile ? styles.navbarMobile : styles.navbarDesktop}>
        {/* {items &&
            items.map(({ url, name, isPillButton }) => {
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
                )
            })
        } */}
        {items && RenderNavMenuItems()}
    </ul>
);

const RenderNavMenuItems: React.FC<ComponentProps> = ({ isMobile, items }) => {
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
        )
    })
}

export default Menu;
