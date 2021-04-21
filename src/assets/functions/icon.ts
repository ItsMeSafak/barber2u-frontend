import {
    findIconDefinition,
    IconDefinition,
    IconLookup,
    IconName,
    IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faCut,
    faEnvelope,
    faExclamationTriangle,
    faCaretLeft,
    faCaretRight,
    faIdCard,
    faAt,
    faKey,
    faMobileAlt,
    faAddressBook,
    faCity,
    faChartPie,
    faCalendarAlt,
    faCamera,
    faCalendar,
    faCog,
    faCaretDown,
    faUser,
    faSignOutAlt,
    faChartLine,
    faServer,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

/**
 * This function returns all the icons that are necessary in this project.
 * This will make it accessible to use it anywhere within this project.
 */
export const icons = {
    faCut,
    faBars,
    faEnvelope,
    faExclamationTriangle,
    faCaretLeft,
    faCaretRight,
    faIdCard,
    faAt,
    faKey,
    faMobileAlt,
    faAddressBook,
    faCity,
    faChartPie,
    faCalendarAlt,
    faCamera,
    faCalendar,
    faCog,
    faCaretDown,
    faUser,
    faSignOutAlt,
    faChartLine,
    faServer,
    faFileAlt,
};

/**
 * This function returns the correct font awesome icon with the use of strings
 * instead of having to use the font awesome icon object.
 *
 * @param {string | undefined} prefix The prefix of the icon.
 * @param {string | undefined} name The name of the icon
 * @returns {IconDefinition}
 */
export const getIconByPrefixName = (
    prefix: string | undefined,
    name: string | undefined
): IconDefinition => {
    const iconPrefix = prefix === undefined || prefix === "" ? "fas" : prefix;
    const iconLookup: IconLookup = {
        prefix: iconPrefix as IconPrefix,
        iconName: name as IconName,
    };
    return findIconDefinition(iconLookup);
};