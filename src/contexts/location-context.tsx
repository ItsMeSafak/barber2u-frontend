import React, {
    useState,
    useMemo,
    createContext,
    useEffect,
    useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import Role from "../models/enums/Role";

interface ContextProps {
    pageName: string;
    setPageName: (pageName: string) => void;
}

const contextDefaultValues: ContextProps = {
    pageName: "N/A",
    setPageName: () => {},
};

export const LocationContext = createContext<ContextProps>(
    contextDefaultValues
);

/**
 * This provider is used to keep track of the location.
 * It can be used to keep track of the page name where ever the authenticated user is at.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
export const LocationProvider: React.FC = (props) => {
    const { children } = props;

    const [pageName, setPageName] = useState(contextDefaultValues.pageName);

    const history = useHistory();

    const getPageNameByPath = useCallback((path: string) => {
        const cleanedPath = path.split("/").pop() ?? "N/A";
        if (
            Object.values(Role)
                .map((role) => role.replace("ROLE_", "").toLowerCase())
                .includes(cleanedPath)
        )
            return "Dashboard";

        return cleanedPath.charAt(0).toUpperCase() + cleanedPath.slice(1);
    }, []);

    useEffect(() => {
        setPageName(getPageNameByPath(history.location.pathname));

        return () => setPageName("N/A");
    }, [history.location.pathname, setPageName, getPageNameByPath]);

    const providerValues = useMemo(
        () => ({
            pageName,
            setPageName,
        }),
        [pageName, setPageName]
    );

    return (
        <LocationContext.Provider value={providerValues}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;
