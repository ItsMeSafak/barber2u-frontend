import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import ErrorPage from "../pages/error";

import { NavbarContext } from "../contexts/navbar-context";

interface ComponentProps {
    components: Array<React.FC>;
}

/**
 * This component is used to render the routes per given user.
 * It maps the given components by user.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const UserRoutes: React.FC<ComponentProps> = (props) => {
    const { components } = props;
    const { menuItems } = useContext(NavbarContext);

    /**
     * This function renders the routes.
     * The first route is given always an "exact" property.
     *
     * @returns {JSX}
     */
    const renderRoutes = () =>
        menuItems
            ?.filter(({ isDrawerMenu }) => isDrawerMenu)
            .map(({ id, url }, index) => (
                <Route exact={index === 0} key={id} path={url}>
                    {renderComponent(id, index)}
                </Route>
            ));

    /**
     * This function renders the correct component by id and index (of the route).
     *
     * @param {string} id The id of the component.
     * @param {string} index The index of the route.
     * @returns {React.FC}
     */
    const renderComponent = (id: string, index: number) =>
        components
            .filter((_, componentIndex) => index === componentIndex)
            .map((Component) => <Component key={id} />);

    return (
        <Switch>
            {renderRoutes()}
            <Route
                exact
                path="/*/503"
                component={() => <ErrorPage code={503} returnUrl="/" />}
            />
            <Route component={() => <ErrorPage code={404} returnUrl="/" />} />
        </Switch>
    );
};

export default UserRoutes;
