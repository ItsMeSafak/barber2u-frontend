import React, {
    useState,
    useMemo,
    createContext,
    useEffect,
    useCallback,
} from "react";

import {
    WIDTH_SCREEN_LG,
    WIDTH_SCREEN_MD,
    WIDTH_SCREEN_SM,
    WIDTH_SCREEN_XL,
    WIDTH_SCREEN_XS,
    WIDTH_SCREEN_XXL,
} from "../assets/constants";

interface ContextProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isScreenWidthXS: boolean;
    isScreenWidthSM: boolean;
    isScreenWidthMD: boolean;
    isScreenWidthLG: boolean;
    isScreenWidthXL: boolean;
    isScreenWidthXXL: boolean;
    isMobileOrTablet: boolean;
    setMobile: (isMobile: boolean) => void;
    setTablet: (isTablet: boolean) => void;
    setDesktop: (isDesktop: boolean) => void;
    setScreenWidthXS: (isXS: boolean) => void;
    setScreenWidthSM: (isSM: boolean) => void;
    setScreenWidthMD: (isMD: boolean) => void;
    setScreenWidthLG: (isLG: boolean) => void;
    setScreenWidthXL: (isXL: boolean) => void;
    setScreenWidthXXL: (isXXL: boolean) => void;
    setMobileOrTablet: (isMobileOrTablet: boolean) => void;
}

const contextDefaultValues: ContextProps = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isScreenWidthXS: false,
    isScreenWidthSM: false,
    isScreenWidthMD: false,
    isScreenWidthLG: false,
    isScreenWidthXL: false,
    isScreenWidthXXL: false,
    isMobileOrTablet: false,
    setMobile: () => {},
    setTablet: () => {},
    setDesktop: () => {},
    setScreenWidthXS: () => {},
    setScreenWidthSM: () => {},
    setScreenWidthMD: () => {},
    setScreenWidthLG: () => {},
    setScreenWidthXL: () => {},
    setScreenWidthXXL: () => {},
    setMobileOrTablet: () => {},
};

export const ScreenContext = createContext<ContextProps>(contextDefaultValues);

/**
 * This provider is used to keep track of the screen width of the UI.
 * This context provider also supports other screen sizes and these may be used depending on the situation and needs.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
export const ScreenProvider: React.FC = (props) => {
    const { children } = props;

    const [isMobile, setMobile] = useState(contextDefaultValues.isMobile);
    const [isTablet, setTablet] = useState(contextDefaultValues.isTablet);
    const [isDesktop, setDesktop] = useState(contextDefaultValues.isDesktop);
    const [isScreenWidthXS, setScreenWidthXS] = useState(
        contextDefaultValues.isScreenWidthXS
    );
    const [isScreenWidthSM, setScreenWidthSM] = useState(
        contextDefaultValues.isScreenWidthSM
    );
    const [isScreenWidthMD, setScreenWidthMD] = useState(
        contextDefaultValues.isScreenWidthMD
    );
    const [isScreenWidthLG, setScreenWidthLG] = useState(
        contextDefaultValues.isScreenWidthLG
    );
    const [isScreenWidthXL, setScreenWidthXL] = useState(
        contextDefaultValues.isScreenWidthXL
    );
    const [isScreenWidthXXL, setScreenWidthXXL] = useState(
        contextDefaultValues.isScreenWidthXXL
    );
    const [isMobileOrTablet, setMobileOrTablet] = useState(
        contextDefaultValues.isMobileOrTablet
    );

    const handleScreenWidthSize = useCallback(() => {
        const { innerWidth } = window;
        setMobile(innerWidth <= WIDTH_SCREEN_XS);
        setTablet(
            innerWidth >= WIDTH_SCREEN_SM && innerWidth <= WIDTH_SCREEN_XL
        );
        setDesktop(innerWidth > WIDTH_SCREEN_XL);
        setScreenWidthXS(innerWidth <= WIDTH_SCREEN_XS);
        setScreenWidthSM(
            innerWidth > WIDTH_SCREEN_XS && innerWidth <= WIDTH_SCREEN_SM
        );
        setScreenWidthMD(
            innerWidth > WIDTH_SCREEN_SM && innerWidth <= WIDTH_SCREEN_MD
        );
        setScreenWidthLG(
            innerWidth > WIDTH_SCREEN_MD && innerWidth <= WIDTH_SCREEN_LG
        );
        setScreenWidthXL(
            innerWidth > WIDTH_SCREEN_LG && innerWidth <= WIDTH_SCREEN_XL
        );
        setScreenWidthXXL(
            innerWidth > WIDTH_SCREEN_LG && innerWidth <= WIDTH_SCREEN_XXL
        );
        setMobileOrTablet(innerWidth <= WIDTH_SCREEN_XL);
    }, []);

    useEffect(() => {
        handleScreenWidthSize();
        window.addEventListener("resize", handleScreenWidthSize);
        // Remove event listener if not being used.
        return () =>
            window.removeEventListener("resize", handleScreenWidthSize);
    }, [handleScreenWidthSize]);

    const providerValues = useMemo(
        () => ({
            isMobile,
            isTablet,
            isDesktop,
            isScreenWidthXS,
            isScreenWidthSM,
            isScreenWidthMD,
            isScreenWidthLG,
            isScreenWidthXL,
            isScreenWidthXXL,
            isMobileOrTablet,
            setMobile,
            setTablet,
            setDesktop,
            setScreenWidthXS,
            setScreenWidthSM,
            setScreenWidthMD,
            setScreenWidthLG,
            setScreenWidthXL,
            setScreenWidthXXL,
            setMobileOrTablet,
        }),
        [
            isMobile,
            isTablet,
            isDesktop,
            isScreenWidthXS,
            isScreenWidthSM,
            isScreenWidthMD,
            isScreenWidthLG,
            isScreenWidthXL,
            isScreenWidthXXL,
            isMobileOrTablet,
            setMobile,
            setTablet,
            setDesktop,
            setScreenWidthXS,
            setScreenWidthSM,
            setScreenWidthMD,
            setScreenWidthLG,
            setScreenWidthXL,
            setScreenWidthXXL,
            setMobileOrTablet,
        ]
    );

    return (
        <ScreenContext.Provider value={providerValues}>
            {children}
        </ScreenContext.Provider>
    );
};

export default ScreenProvider;
