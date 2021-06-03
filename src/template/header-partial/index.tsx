import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, Button, Avatar, Dropdown } from "antd";

import MenuItems from "../../components/menu-items";
import LogoComponent from "../../components/logo";

import { NavbarContext } from "../../contexts/navbar-context";
import { ScreenContext } from "../../contexts/screen-context";
import { getIconByPrefixName } from "../../assets/functions/icon";
import { AuthenticationContext } from "../../contexts/authentication-context";

import styles from "./styles.module.scss";

/**
 * This component renders a menu header with its menu items.
 *
 * @returns {JSX}
 */
const HeaderPartial: React.FC = () => {
    const { menuItems } = useContext(NavbarContext);
    const { isMobileOrTablet } = useContext(ScreenContext);
    const { user, authenticated, defaultColor, logout } = useContext(
        AuthenticationContext
    );

    const [drawerVisible, setDrawerVisible] = useState(false);

    const history = useHistory();

    const functions = [
        {
            key: "signout",
            functionCallback: () => {
                logout();
                history.push("/signin");
            },
        },
    ];

    /**
     * This function renders the hamburger menu.
     *
     * @returns {JSX}
     */
    const renderHamburgerMenu = () => (
        <Button className={styles.hamburgerMenu} ghost onClick={toggleDrawer}>
            <FontAwesomeIcon
                icon={getIconByPrefixName("fas", "bars")}
                size="lg"
            />
        </Button>
    );

    /**
     * This function renders the navbar menu.
     *
     * @returns {JSX}
     */
    const renderNavbarMenu = () => (
        <ul
            className={
                isMobileOrTablet ? styles.navbarMobile : styles.navbarDesktop
            }
        >
            <MenuItems
                menuType="navbar"
                menuItems={menuItems}
                functions={functions}
            />
            {authenticated && renderUserAvatarWithDropdown()}
        </ul>
    );

    /**
     * This function renders the user avatar with its dropdown and menu.
     *
     * @returns {JSX}
     */
    const renderUserAvatarWithDropdown = () => {
        const dropdownMenu = (
            <MenuItems
                menuType="dropdown"
                menuItems={menuItems}
                functions={functions}
            />
        );

        return (
            <li>
                <Avatar
                    style={{ backgroundColor: defaultColor }}
                    size={32}
                    gap={0}
                >
                    {user?.getFirstNameFirstLetter}
                </Avatar>
                <Dropdown overlay={dropdownMenu} placement="bottomCenter" arrow>
                    <Button type="link" className={styles.userDropdownButton}>
                        <span>{user?.getFullNameWithInitial}</span>
                        <FontAwesomeIcon
                            icon={getIconByPrefixName("fas", "caret-down")}
                        />
                    </Button>
                </Dropdown>
            </li>
        );
    };

    /**
     * This function renders the drawer menu when toggled on mobile.
     *
     * @param {boolean} visible Whether the drawer menu has to be visible or not.
     * @returns {JSX}
     */
    const renderDrawerMenu = (visible: boolean) => {
        const drawerBodyStyle = {
            backgroundColor: "#252525",
            padding: 0,
        };

        return (
            <Drawer
                key="Menu"
                title="Menu"
                closable={false}
                placement="right"
                onClose={toggleDrawer}
                visible={visible}
                bodyStyle={drawerBodyStyle}
            >
                <MenuItems
                    menuType="drawer"
                    menuItems={menuItems}
                    style={drawerBodyStyle}
                    functions={functions}
                />
            </Drawer>
        );
    };

    /**
     * This function checks whether the drawer menu should be visible or not.
     * It checks the previous state and returns the opposite state.
     *
     * @returns {void}
     */
    const toggleDrawer = () => setDrawerVisible((prevState) => !prevState);

    return (
        <>
            <Link to="/">
                <h1 className={styles.logo}>
                    <LogoComponent iconPrefix="fas" iconName="cut" />
                    <span className={styles.dashboardText}>
                        {} / {user?.getCleanedRoleNames[0]}
                    </span>
                </h1>
            </Link>
            {isMobileOrTablet ? renderHamburgerMenu() : renderNavbarMenu()}
            {renderDrawerMenu(isMobileOrTablet && drawerVisible)}
        </>
    );
};

export default HeaderPartial;
