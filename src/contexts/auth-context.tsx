import React, {
    useState,
    useMemo,
    createContext,
    useEffect,
    useCallback,
} from "react";
import { useCookies } from "react-cookie";

import User from "../models/User";

import {
    USER_COOKIE,
    USER_ROLES_COOKIE,
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    AUTHENTICATED_COOKIE,
} from "../assets/constants";

interface ContextProps {
    user: User | null;
    roles: Array<string> | null;
    accessToken: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
    setUser: (user: User) => void;
    setRoles: (roles: Array<string> | null) => void;
    setAccessToken: (JWToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setAuthenticated: (authenticated: boolean) => void;
    setLogout: () => void;
}

const contextDefaultValues: ContextProps = {
    user: null,
    roles: null,
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    setUser: () => {},
    setRoles: () => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
    setAuthenticated: () => {},
    setLogout: () => {},
};

export const AuthContext = createContext<ContextProps>(contextDefaultValues);

/**
 * This provider is used to keep track of the authenticated user.
 * It can be used to keep track of the information throughout anywhere within the application.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
export const AuthProvider: React.FC = (props) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const { children } = props;

    const [cookies, setCookie, removeCookie] = useCookies();
    const [user, setUser] = useState(contextDefaultValues.user);
    const [roles, setRoles] = useState(contextDefaultValues.roles);
    const [accessToken, setAccessToken] = useState(
        contextDefaultValues.accessToken
    );
    const [refreshToken, setRefreshToken] = useState(
        contextDefaultValues.refreshToken
    );
    const [authenticated, setAuthenticated] = useState(
        contextDefaultValues.authenticated
    );

    const saveDataInCookieAndState = useCallback(
        (
            cookieName: string,
            stateName: boolean | string | string[] | User | null,
            stateFunction: (value: any) => void
        ) => {
            const cookie = cookies[cookieName];
            if (stateName && !cookie)
                setCookie(cookieName, stateName, { path: "/" });
            if (!stateName && cookie) stateFunction(cookie);
        },
        [cookies, setCookie]
    );

    const saveUserInCookieIfNotExist = useCallback(() => {
        saveDataInCookieAndState(USER_COOKIE, user, setUser);
    }, [saveDataInCookieAndState, user]);

    const saveUserRolesInCookieIfNotExist = useCallback(() => {
        saveDataInCookieAndState(USER_ROLES_COOKIE, roles, setRoles);
    }, [saveDataInCookieAndState, roles]);

    const saveAccessTokenInCookieIfNotExist = useCallback(() => {
        saveDataInCookieAndState(
            ACCESS_TOKEN_COOKIE,
            accessToken,
            setAccessToken
        );
    }, [saveDataInCookieAndState, accessToken]);

    const saveRefreshTokenInCookieIfNotExist = useCallback(() => {
        saveDataInCookieAndState(
            REFRESH_TOKEN_COOKIE,
            refreshToken,
            setRefreshToken
        );
    }, [saveDataInCookieAndState, refreshToken]);

    const saveAuthenticatedStateInCookieIfNotExist = useCallback(() => {
        saveDataInCookieAndState(
            AUTHENTICATED_COOKIE,
            authenticated,
            setAuthenticated
        );
    }, [saveDataInCookieAndState, authenticated]);

    const deleteUserDataFromCookieAndState = useCallback(() => {
        removeCookie(USER_COOKIE);
        removeCookie(USER_ROLES_COOKIE);
        removeCookie(ACCESS_TOKEN_COOKIE);
        removeCookie(REFRESH_TOKEN_COOKIE);
        removeCookie(AUTHENTICATED_COOKIE);
        setUser(null);
        setRoles(null);
        setAccessToken(null);
        setRefreshToken(null);
        setAuthenticated(false);
    }, [removeCookie]);

    useEffect(() => {
        saveUserInCookieIfNotExist();
        saveUserRolesInCookieIfNotExist();
        saveAccessTokenInCookieIfNotExist();
        saveRefreshTokenInCookieIfNotExist();
        saveAuthenticatedStateInCookieIfNotExist();
    }, [
        saveUserInCookieIfNotExist,
        saveUserRolesInCookieIfNotExist,
        saveAccessTokenInCookieIfNotExist,
        saveRefreshTokenInCookieIfNotExist,
        saveAuthenticatedStateInCookieIfNotExist,
    ]);

    const providerValues = useMemo(
        () => ({
            user: User.fromJSON(user),
            roles,
            accessToken,
            refreshToken,
            authenticated,
            setUser,
            setRoles,
            setAccessToken,
            setRefreshToken,
            setAuthenticated,
            setLogout: () => deleteUserDataFromCookieAndState(),
        }),
        [
            user,
            roles,
            accessToken,
            refreshToken,
            authenticated,
            setUser,
            setRoles,
            setAccessToken,
            setRefreshToken,
            setAuthenticated,
            deleteUserDataFromCookieAndState,
        ]
    );

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
