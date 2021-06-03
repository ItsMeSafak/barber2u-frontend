import React, {
    useState,
    useMemo,
    createContext,
    useEffect,
    useCallback,
    useContext,
} from "react";

import Role from "../models/enums/Role";
import adminNavbarMenu from "../assets/navbar/admin.json";
import barberNavbarMenu from "../assets/navbar/barber.json";
import visitorNavbarMenu from "../assets/navbar/visitor.json";
import customerNavbarMenu from "../assets/navbar/customer.json";

import { AuthenticationContext } from "./authentication-context";

interface ContextProps {
    menuItems: Array<{
        id: string;
        url: string;
        name: string;
        icon: Array<string>;
        isNavbarMenu: boolean;
        isFooterMenu: boolean;
        isMobileMenu: boolean;
        isPillButton: boolean;
        isDrawerMenu: boolean;
        isDropdownMenu: boolean;
    }> | null;
    setMenuItems: (
        navbarMenu: Array<{
            id: string;
            url: string;
            name: string;
            icon: Array<string>;
            isNavbarMenu: boolean;
            isFooterMenu: boolean;
            isMobileMenu: boolean;
            isPillButton: boolean;
            isDrawerMenu: boolean;
            isDropdownMenu: boolean;
        }>
    ) => void;
}

const contextDefaultValues: ContextProps = {
    menuItems: null,
    setMenuItems: () => {},
};

export const NavbarContext = createContext<ContextProps>(contextDefaultValues);

/**
 * This provider is used to keep track of the navbar menu items of the authenticated user.
 * It can be used to keep track of the information throughout anywhere within the application.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
export const NavbarProvider: React.FC = (props) => {
    const { children } = props;
    const {
        user,
        authenticated,
        setDefaultColor,
        setDefaultHeaderColor,
    } = useContext(AuthenticationContext);

    const [menuItems, setMenuItems] = useState(contextDefaultValues.menuItems);

    const getMenuItemsByUserRole = useCallback((role?: Role) => {
        if (role) {
            switch (role) {
                case Role.Customer:
                    return customerNavbarMenu;
                case Role.Barber:
                    return barberNavbarMenu;
                case Role.Admin:
                    return adminNavbarMenu;
            }
        }

        return visitorNavbarMenu;
    }, []);

    const isRoleIncluded = useCallback(
        (role: Role) => user?.getRoleNames.includes(role),
        [user]
    );

    const getMenuByUserRole = useCallback(() => {
        if (!user?.getRoles || !menuItems || !authenticated)
            setMenuItems(getMenuItemsByUserRole());
        if (isRoleIncluded(Role.Customer))
            setMenuItems(getMenuItemsByUserRole(Role.Customer));
        if (isRoleIncluded(Role.Barber))
            setMenuItems(getMenuItemsByUserRole(Role.Barber));
        if (isRoleIncluded(Role.Admin))
            setMenuItems(getMenuItemsByUserRole(Role.Admin));
    }, [
        user,
        menuItems,
        authenticated,
        getMenuItemsByUserRole,
        isRoleIncluded,
    ]);

    const getDefaultColorByUserRole = useCallback(() => {
        if (authenticated && user && user.getRoles) {
            const { defaultColor, defaultHeaderColor } = user.getDefaultColors;
            setDefaultColor(defaultColor);
            setDefaultHeaderColor(defaultHeaderColor);
        }
    }, [authenticated, user, setDefaultColor, setDefaultHeaderColor]);

    useEffect(() => {
        getDefaultColorByUserRole();
        getMenuByUserRole();
    }, [getDefaultColorByUserRole, getMenuByUserRole]);

    const providerValues = useMemo(
        () => ({
            menuItems,
            setMenuItems,
        }),
        [menuItems, setMenuItems]
    );

    return (
        <NavbarContext.Provider value={providerValues}>
            {children}
        </NavbarContext.Provider>
    );
};

export default NavbarProvider;
