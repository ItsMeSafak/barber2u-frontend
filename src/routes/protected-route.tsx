import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { Route, Redirect, RouteProps } from "react-router-dom";

import Role from "../models/enums/Role";

import { AuthContext } from "../contexts/auth-context";

import {
    USER_COOKIE,
    USER_ROLES_COOKIE,
    ACCESS_TOKEN_COOKIE,
    AUTHENTICATED_COOKIE,
    REFRESH_TOKEN_COOKIE,
} from "../assets/constants";

interface ComponentProps extends RouteProps {
    allowedRoles: Array<Role>;
}

/**
 * This component is used to protect a given route.
 * It checks whether the user matches with the allowed roles.
 *
 * @param props Component properties.
 * @returns {JSX}
 */
const ProtectedRoute: React.FC<ComponentProps> = (props) => {
    const { path, exact, component, allowedRoles } = props;
    const {
        authenticated,
        accessToken,
        refreshToken,
        user,
        roles,
    } = useContext(AuthContext);

    const [cookies] = useCookies();

    const userExist = user || cookies[USER_COOKIE];
    const userRoleExist = roles || cookies[USER_ROLES_COOKIE];
    const accessTokenExist = accessToken || cookies[ACCESS_TOKEN_COOKIE];
    const userAuthenticated = authenticated || cookies[AUTHENTICATED_COOKIE];
    const refreshTokenExist = refreshToken || cookies[REFRESH_TOKEN_COOKIE];
    const isUserLoggedIn =
        userExist !== undefined &&
        userRoleExist !== undefined &&
        accessTokenExist !== undefined &&
        userAuthenticated !== undefined &&
        refreshTokenExist !== undefined;

    /**
     * This function renders the correct component corresponding to whether the user is logged in or not and its roles.
     *
     * @returns {JSX}
     */
    const renderComponent = () => {
        if (isUserLoggedIn && checkIfRoleIsAllowed(userRoleExist))
            return <Route path={path} exact={exact} component={component} />;
        if (!isUserLoggedIn && !allowedRoles.length)
            return <Route path={path} exact={exact} component={component} />;
        return redirectToCorrectRoute();
    };

    /**
     * This function redirects the user to the correct route if the user is logged in.
     * If not, the user is redirected to the login page.
     */
    const redirectToCorrectRoute = () => {
        if (isUserLoggedIn) {
            switch (userRoleExist[0] as Role) {
                case Role.Customer:
                    return <Redirect to="/customer" />;
                case Role.Barber:
                    return <Redirect to="/barber" />;
                case Role.Moderator:
                    return <Redirect to="/moderator" />;
            }
        }
        return <Redirect to="/signin" />;
    };

    /**
     * This function checks whether the given roles of the user are allowed to visit a protected route.
     *
     * @param {Array<string>} userRoles The roles of the user.
     * @returns {boolean}
     */
    const checkIfRoleIsAllowed = (userRoles: Array<string>): boolean =>
        Array.isArray(allowedRoles) &&
        allowedRoles.length > 0 &&
        userRoles?.some((role: string) => allowedRoles.includes(role as Role));

    return renderComponent();
};

export default ProtectedRoute;
