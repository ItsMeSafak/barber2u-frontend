import React, {
    useState,
    useMemo,
    createContext,
    useEffect,
    useCallback,
} from "react";
import { useCookies } from "react-cookie";

import User from "../models/User";

import { fetchProfile } from "../services/auth-service";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../assets/constants";

interface ContextProps {
    user: User | null;
    loading: boolean;
    defaultColor: string | undefined;
    defaultHeaderColor: string | undefined;
    accessToken: string | null;
    refreshToken: string | null;
    authenticated: boolean;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    setDefaultColor: (color: string) => void;
    setDefaultHeaderColor: (color: string) => void;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    setAuthenticated: (authenticated: boolean) => void;
    logout: () => void;
}

const contextDefaultValues: ContextProps = {
    user: null,
    loading: true,
    defaultColor: undefined,
    defaultHeaderColor: undefined,
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    setUser: () => {},
    setLoading: () => {},
    setDefaultColor: () => {},
    setDefaultHeaderColor: () => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
    setAuthenticated: () => {},
    logout: () => {},
};

export const AuthenticationContext = createContext<ContextProps>(
    contextDefaultValues
);

/**
 * This provider is used to keep track of the authenticated user.
 * It can be used to keep track of the information throughout anywhere within the application.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
export const AuthenticationProvider: React.FC = (props) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const { children } = props;

    const [cookies, setCookie, removeCookie] = useCookies([
        ACCESS_TOKEN_COOKIE,
        REFRESH_TOKEN_COOKIE,
    ]);
    const [user, setUser] = useState(contextDefaultValues.user);
    const [loading, setLoading] = useState(contextDefaultValues.loading);
    const [defaultColor, setDefaultColor] = useState(
        contextDefaultValues.defaultColor
    );
    const [defaultHeaderColor, setDefaultHeaderColor] = useState(
        contextDefaultValues.defaultColor
    );
    const [accessToken, setAccessToken] = useState(
        cookies[ACCESS_TOKEN_COOKIE] || contextDefaultValues.accessToken
    );
    const [refreshToken, setRefreshToken] = useState(
        cookies[REFRESH_TOKEN_COOKIE] || contextDefaultValues.refreshToken
    );
    const [authenticated, setAuthenticated] = useState(
        contextDefaultValues.authenticated
    );

    const saveDataInCookieAndState = useCallback(
        (
            cookieName: string,
            stateName: boolean | string | User | null,
            stateFunction: (value: any) => void
        ) => {
            const cookie = cookies[cookieName];
            if (stateName && !cookie)
                setCookie(cookieName, stateName, { path: "/" });
            if (!stateName && cookie) stateFunction(cookie);
        },
        [cookies, setCookie]
    );

    const setUserObject = useCallback((data) => {
        const userObject = Object.setPrototypeOf(data, User.prototype);
        setUser(userObject);
    }, []);

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

    const deleteUserDataFromCookieAndState = useCallback(() => {
        removeCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
        removeCookie(REFRESH_TOKEN_COOKIE, { path: "/" });
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        setAuthenticated(false);
        setDefaultColor("#fff");
        setDefaultHeaderColor("#252525");
    }, [removeCookie]);

    useEffect(() => {
        /**
         * This function retrieves the current logged in user profile details.
         * It saves the details into the user state.
         */
        const fetchUser = async () => {
            const response = await fetchProfile();
            setUserObject(response.data);
            setLoading(false);
        };

        // If access token exists, send fetch request.
        if (accessToken) fetchUser();

        return () => setLoading(true);
    }, [accessToken, setUserObject]);

    useEffect(() => {
        saveAccessTokenInCookieIfNotExist();
        saveRefreshTokenInCookieIfNotExist();
    }, [
        accessToken,
        refreshToken,
        authenticated,
        saveAccessTokenInCookieIfNotExist,
        saveRefreshTokenInCookieIfNotExist,
    ]);

    useEffect(() => {
        const isAuthenticated =
            user != null && accessToken != null && refreshToken != null;
        setAuthenticated(isAuthenticated);
    }, [user, accessToken, refreshToken]);

    const providerValues = useMemo(
        () => ({
            user,
            loading,
            accessToken,
            defaultColor,
            defaultHeaderColor,
            refreshToken,
            authenticated,
            setUser: (userObject: User) => setUserObject(userObject),
            setLoading,
            setAccessToken: (token: string) => {
                removeCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
                setAccessToken(token);
                saveAccessTokenInCookieIfNotExist();
            },
            setDefaultColor,
            setDefaultHeaderColor,
            setRefreshToken,
            setAuthenticated,
            logout: () => deleteUserDataFromCookieAndState(),
        }),
        [
            user,
            loading,
            accessToken,
            defaultColor,
            defaultHeaderColor,
            refreshToken,
            authenticated,
            setUserObject,
            setLoading,
            setAccessToken,
            saveAccessTokenInCookieIfNotExist,
            removeCookie,
            setDefaultColor,
            setDefaultHeaderColor,
            setRefreshToken,
            setAuthenticated,
            deleteUserDataFromCookieAndState,
        ]
    );

    return (
        <AuthenticationContext.Provider value={providerValues}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
