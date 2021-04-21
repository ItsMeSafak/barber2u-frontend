import React, {
    useState,
    useMemo,
    createContext,
    useEffect,
    useCallback,
} from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import User from "../models/User";

import { fetchProfile } from "../services/auth-service";

import {
    USER_COOKIE,
    USER_ROLES_COOKIE,
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    AUTHENTICATED_COOKIE,
} from "../assets/constants";

interface ContextProps {
    user: User | null;
    // roles: Array<string> | null;
    // accessToken: string | null;
    // refreshToken: string | null;
    // authenticated: boolean | null;
    setUser: (user: User) => void;
    // setRoles: (roles: Array<string> | null) => void;
    // setAccessToken: (JWToken: string) => void;
    // setRefreshToken: (refreshToken: string) => void;
    // setAuthenticated: (authenticated: boolean) => void;
    // setLogout: () => void;
}

const contextDefaultValues: ContextProps = {
    user: null,
    // roles: null,
    // accessToken: null,
    // refreshToken: null,
    // authenticated: false,
    setUser: () => { },
    // setRoles: () => { },
    // setAccessToken: () => { },
    // setRefreshToken: () => { },
    // setAuthenticated: () => { },
    // setLogout: () => { },
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

    const [user, setUser] = useState(contextDefaultValues.user);

    useEffect(() => {
        // console.log({ test: fetchProfile() });
        // fetchProfile().then(({ data }) => {
        //     setUser(data as unknown as User);
        //     // console.log(data);
        //     console.log({ data });

        //     setTimeout(() => console.log(user), 1000);

        // });

        /**
         * 
         */
        const fetchUser = async () => {
            const response = await fetchProfile();
            // const {
            //     getEmail
            // } = response.data.user;
            console.log({ response });
            setUser(new User(...response));
            const u = response.data as unknown as User;
            console.log(u.getEmail);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        console.log(user);

    }, [user]);

    // const providerValues = useMemo(
    //     () => ({
    //         user: User.fromJSON(user),
    //         roles,
    //         accessToken,
    //         refreshToken,
    //         authenticated,
    //         setUser,
    //         setRoles,
    //         setAccessToken,
    //         setRefreshToken,
    //         setAuthenticated,
    //         setLogout: () => deleteUserDataFromCookieAndState(),
    //     }),
    //     [
    //         user,
    //         roles,
    //         accessToken,
    //         refreshToken,
    //         authenticated,
    //         setUser,
    //         setRoles,
    //         setAccessToken,
    //         setRefreshToken,
    //         setAuthenticated,
    //         deleteUserDataFromCookieAndState,
    //     ]
    // );

    const providerValues = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user, setUser]
    );

    return (
        <AuthenticationContext.Provider value={providerValues}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
