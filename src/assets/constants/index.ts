// Breakpoints (px).
export const WIDTH_SCREEN_XS = 480;
export const WIDTH_SCREEN_SM = 576;
export const WIDTH_SCREEN_MD = 768;
export const WIDTH_SCREEN_LG = 992;
export const WIDTH_SCREEN_XL = 1200;
export const WIDTH_SCREEN_XXL = 1600;

// Error codes/messages.
export const ERROR_STATUSES: Array<{
    code: number;
    message: string;
    description: string;
    color: string;
    iconPrefix: string;
    iconName: string;
}> = [
    {
        code: 404,
        message: "Page Not Found",
        description: "The page you tried to visit does not exist!",
        color: "orange",
        iconPrefix: "fas",
        iconName: "file-alt",
    },
    {
        code: 503,
        message: "Service Unavailable",
        description: "Service is currently not available, try again later!",
        color: "red",
        iconPrefix: "fas",
        iconName: "server",
    },
];

// String constants.
export const PACKAGE_NAME = "com.barber2u.app.";
export const APP_SLOGAN_1 = "Need to get rid of that ol' Haircut?";
export const APP_SLOGAN_2 = "Find a Barber near you Today!";
export const APPLICATION_NAME = "Barber2U";
export const CONTACT_DETAILS_ADDRESS = "Wibauthuis 12A";
export const CONTACT_DETAILS_PHONE_NUMBER = "0612-345678";
export const CONTACT_DETAILS_EMAIL_ADDRESS = "info@barber2u.nl";

// Cookies constants.
export const USER_COOKIE = `${PACKAGE_NAME}user`;
export const USER_ROLES_COOKIE = `${PACKAGE_NAME}userRoles`;
export const ACCESS_TOKEN_COOKIE = `${PACKAGE_NAME}accessToken`;
export const REFRESH_TOKEN_COOKIE = `${PACKAGE_NAME}refreshToken`;
export const AUTHENTICATED_COOKIE = `${PACKAGE_NAME}authenticated`;

// Month names.
export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Placeholders.
export const PLACEHOLDER_TEXT =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat unde iste, soluta est quasi expedita. Beatae soluta quo in eveniet! Quaerat accusamus eveniet quae mollitia sequi nobis fuga ut delectus.";
export const PLACEHOLDER_IMAGE =
    "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg";