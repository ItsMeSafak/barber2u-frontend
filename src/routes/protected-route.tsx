import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import Role from "../models/enums/Role";

import { LocationProvider } from "../contexts/location-context";
import { AuthenticationContext } from "../contexts/authentication-context";

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
    const { user, authenticated } = useContext(AuthenticationContext);

    /**
     * This function renders the correct component corresponding to whether the user is logged in or not and its roles.
     *
     * @returns {JSX}
     */
    const renderComponent = () => {
        // If user is authenticated and the roles match the allowed roles
        // or the user is not authenticated and the allowed roles (authorization) is empty (meaning that authorized users are not allowed to visit this component)
        // then render the correct route.
        if (
            (authenticated &&
                user &&
                checkIfRoleIsAllowed(user.getRoleNames)) ||
            (!authenticated && !user && !allowedRoles.length)
        )
            return <Route path={path} exact={exact} component={component} />;

        // If user is authenticated and the user does not match the allowed roles (thus not authorized to visit a component)
        // redirect the user back to the root page depending on the role(s) the user has.
        if (authenticated && user && !checkIfRoleIsAllowed(user.getRoleNames))
            return redirectToCorrectRoute();
        return <Route />;
    };

    /**
     * This function redirects the user to the correct route if the user is logged in.
     * If not, the user is redirected to the login page.
     */
    const redirectToCorrectRoute = () => {
        if (authenticated && user) {
            switch (user.getRoleNames[0] as Role) {
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

    return (
        <LocationProvider>
            {renderComponent()}
        </LocationProvider>
    );
};

export default ProtectedRoute;
