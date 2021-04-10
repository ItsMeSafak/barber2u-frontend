import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Button, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIconByPrefixName } from "../../assets/functions/icon";

import styles from "./styles.module.scss";

interface ComponentProps {
    menuType: "navbar" | "dropdown" | "drawer" | "footer";
    menuItems: Array<{
        id: string;
        url: string;
        name: string;
        icon: Array<string>;
        isNavbarMenu: boolean;
        isFooterMenu: boolean;
        isMobileMenu: boolean;
        isPillButton: boolean;
        isDropdownMenu: boolean;
    }> | null;
    style?: Record<string, unknown>;
    functions?: Array<{ key: string; functionCallback: () => void }>;
}

/**
 * This component is used to render the menu items depending on the user role and the menu type.
 * The dynamic menu items are retrieved using the navbar context.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const MenuItems: React.FC<ComponentProps> = (props) => {
    const { menuType, menuItems } = props;

    /**
     * This function renders the navbar menu items.
     * It renders either a hashlink or a regular link depending on whether it requires smooth scrolling or not.
     *
     * @returns {JSX}
     */
    const renderNavbarMenuItems = () =>
        menuItems
            ?.filter(({ isNavbarMenu }) => isNavbarMenu)
            .map(({ id, url, name, isPillButton }) => {
                const menuItemButton = (
                    <Button
                        className={isPillButton ? styles.pillButton : ""}
                        type={isPillButton ? "primary" : "link"}
                        shape={isPillButton ? "round" : undefined}
                    >
                        {name}
                    </Button>
                );

                if (isHashLink(id)) {
                    return (
                        <li key={name}>
                            <HashLink smooth to={`${modifiedUrl(url)}/${id}`}>
                                {menuItemButton}
                            </HashLink>
                        </li>
                    );
                }

                return (
                    <li key={name}>
                        <Link to={url}>{menuItemButton}</Link>
                    </li>
                );
            });

    /**
     * This function renders the drawer menu.
     *
     * @returns {JSX}
     */
    const renderDrawerMenu = () => (
        <Menu theme="dark" selectable={false} style={props.style}>
            {renderDrawerMenuItems()}
        </Menu>
    );

    /**
     * This function renders the drawer menu items.
     *
     * @returns {JSX}
     */
    const renderDrawerMenuItems = () =>
        menuItems
            ?.filter(({ isMobileMenu }) => isMobileMenu)
            .map(({ id, url, name, icon }) => {
                const menuProps = {
                    id,
                    url: modifiedUrl(url),
                    name,
                    icon,
                    withIcon: withIcon(icon),
                };
                const callback = props.functions
                    ?.filter(({ key }) => key === id)
                    .map(({ functionCallback }) => functionCallback)[0];

                if (isHashLink(id) && callback) {
                    return (
                        <Menu.Item
                            key={`${url}-${id}-${name}`}
                            onClick={callback}
                        >
                            {withIcon(icon) && renderIcon(icon)}
                            <span>{name}</span>
                        </Menu.Item>
                    );
                }

                return (
                    <Menu.Item key={`${url}-${id}-${name}`}>
                        {isHashLink(id)
                            ? renderHashLinkMenuItem(menuProps)
                            : renderLinkMenuItem(menuProps)}
                    </Menu.Item>
                );
            });

    /**
     * This function renders a hashlink of a menu item.
     *
     * @param {Object} menuItemProps The menu item properties.
     * @returns {JSX}
     */
    const renderHashLinkMenuItem = (menuItemProps: {
        id: string;
        url: string;
        name: string;
        icon: string[];
        withIcon: boolean;
    }) => {
        const { id, url, name, icon, withIcon } = menuItemProps;
        return (
            <HashLink smooth to={`${url}/${id}`}>
                {withIcon && renderIcon(icon)}
                <span>{name}</span>
            </HashLink>
        );
    };

    /**
     * This function renders a regular link of a menu item.
     *
     * @param {Object} menuItemProps The menu item properties.
     * @returns {JSX}
     */
    const renderLinkMenuItem = (menuItemProps: {
        url: string;
        name: string;
        icon: string[];
        withIcon: boolean;
    }) => {
        const { url, name, icon, withIcon } = menuItemProps;
        return (
            <Link to={url}>
                {withIcon && renderIcon(icon)}
                <span>{name}</span>
            </Link>
        );
    };

    /**
     * This function renders the icon.
     *
     * @param {Array<string>} iconArray The icon prefix and name.
     * @returns {JSX}
     */
    const renderIcon = (iconArray: Array<string>) => {
        const iconPrefix = iconArray[0];
        const iconName = iconArray[1];
        return (
            <FontAwesomeIcon
                className={styles.menuLabelIcon}
                icon={getIconByPrefixName(iconPrefix, iconName)}
            />
        );
    };

    /**
     * This function renders the footer menu items.
     *
     * @returns {JSX}
     */
    const renderFooterMenuItems = () =>
        menuItems
            ?.filter(({ isFooterMenu }) => isFooterMenu)
            .map(({ id, url, name, icon }) => (
                <li key={name}>
                    {isHashLink(id)
                        ? renderHashLinkMenuItem({
                              id,
                              url: modifiedUrl(url),
                              name,
                              icon,
                              withIcon: false,
                          })
                        : renderLinkMenuItem({
                              url,
                              name,
                              icon,
                              withIcon: false,
                          })}
                </li>
            ));

    /**
     * This function renders the dropdown menu (profile context menu).
     *
     * @returns {JSX}
     */
    const renderDropdownMenu = () => <Menu>{renderDropdownMenuItems()}</Menu>;

    /**
     * This function renders the dropdown menu items.
     *
     * @returns {JSX}
     */
    const renderDropdownMenuItems = () =>
        menuItems
            ?.filter(({ isDropdownMenu }) => isDropdownMenu)
            .map(({ id, url, name, icon }) => {
                const callback = props.functions
                    ?.filter(({ key }) => key === id)
                    .map(({ functionCallback }) => functionCallback)[0];

                return (
                    <Menu.Item key={id} onClick={callback}>
                        {renderLinkMenuItem({
                            url,
                            name,
                            icon,
                            withIcon: withIcon(icon),
                        })}
                    </Menu.Item>
                );
            });

    /**
     * This function checks whether a link requires a hashlink or not.
     *
     * @param {string} id The id of the navbar menu item.
     * @returns {boolean}
     */
    const isHashLink = (id: string) => id !== "";

    /**
     * This function modifies the url of a given navbar menu item.
     * This modified url is then used for the hashlink menu.
     *
     * @param {string} url The url of the navbar menu item.
     * @returns {boolean}
     */
    const modifiedUrl = (url: string) => (url === "/" ? "" : url);

    /**
     * This function checks whether a menu item icon exists.
     *
     * @param {Array<string>} icon The icon of the navbar menu item.
     * @returns {boolean}
     */
    const withIcon = (icon: Array<string>) => icon.length > 0;

    return (
        <>
            {menuType === "drawer" && renderDrawerMenu()}
            {menuType === "navbar" && renderNavbarMenuItems()}
            {menuType === "footer" && renderFooterMenuItems()}
            {menuType === "dropdown" && renderDropdownMenu()}
        </>
    );
};

export default MenuItems;
