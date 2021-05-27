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
        code: 401,
        message: "Unauthorized",
        description: "The page you tried to visit is authorized!",
        color: "red",
        iconPrefix: "fas",
        iconName: "lock",
    },
    {
        code: 404,
        message: "Page Not Found",
        description: "The page you tried to visit does not exist!",
        color: "orange",
        iconPrefix: "fas",
        iconName: "file-alt",
    },
    {
        code: 500,
        message: "Internal Server Error",
        description:
            "The server encountered an unexpected condition which prevented it from fulfilling the request, try again later!",
        color: "red",
        iconPrefix: "fas",
        iconName: "server",
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
export const APP_SLOGAN_1 = "Do you need a fresh new haircut?";
export const APP_SLOGAN_2 = "Find a Barber near you Today!";
export const APPLICATION_NAME = "Barber2U";
export const CONTACT_DETAILS_ADDRESS = "Wibauthuis 12A";
export const CONTACT_DETAILS_PHONE_NUMBER = "0612-345678";
export const CONTACT_DETAILS_EMAIL_ADDRESS = "info@barber2u.nl";

// Cookies constants.
export const ACCESS_TOKEN_COOKIE = `${PACKAGE_NAME}accessToken`;
export const REFRESH_TOKEN_COOKIE = `${PACKAGE_NAME}refreshToken`;

// API.
export const BASE_URL = "http://localhost:8080/api";
export const GOOGLE_MAPS_BASE_URL = "https://www.google.com/maps/search/";

// Authenticated user role constants.
export const ADMIN_BASE_URL = "admin";
export const ADMIN_DEFAULT_COLOR = "blue";

export const BARBER_BASE_URL = "barber";
export const BARBER_DEFAULT_COLOR = "red";

export const CUSTOMER_BASE_URL = "customer";
export const CUSTOMER_DEFAULT_COLOR = "green";

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

// Maximum card items in dashboard
export const MAX_ITEMS_PER_PAGE = 6;

// Placeholders.
export const PLACEHOLDER_TEXT_HOW_DOES_IT_WORK =
    "At Barber2U we connect customers with hairdressers. Do you also want a nice haircut? Register and make an appointment in a few simple steps!";
export const PLACEHOLDER_TEXT_ABOUT =
    "BARBER2U consists of a team of 6 students with a passion for innovation. As individuals we have our own talents, ambitions and visions, but together we make the biggest impact.";

// Placeholders about.
export const PLACEHOLDER_IMAGE_CEO = "../assets/images/ceo.jpg";
export const PLACEHOLDER_IMAGE_CTO = "../assets/images/cto.jpg";
export const PLACEHOLDER_IMAGE_COO = "../assets/images/coo.jpg";

// Placeholders how does it work.
export const PLACEHOLDER_TEXT_STEP1 =
    "First go to the registration page and fill in all your details.";
export const PLACEHOLDER_TEXT_STEP2 =
    "Go to the listings page and find the barber that suits you!";
export const PLACEHOLDER_TEXT_STEP3 =
    "Make a reservation and get a fresh haircut!";
export const PLACEHOLDER_IMAGE_STEP1 = "../assets/images/step-1.png";
export const PLACEHOLDER_IMAGE_STEP2 = "../assets/images/step-2.png";
export const PLACEHOLDER_IMAGE_STEP3 = "../assets/images/step-3.png";

// Placeholders review.
export const PLACEHOLDER_REVIEW1 =
    "I really liked the barber that I have met via BARBER2U";
export const PLACEHOLDER_REVIEW2 = "This is really a nice website!";
export const PLACEHOLDER_REVIEW3 = "Thank you BARBER2U!";

export const PLACEHOLDER_IMAGE =
    "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg";

// Date format strings
export const DATE_FORMAT = "YYYY-MM-DD";

// Special characters.
export const EURO_SYMBOL = "€";

// Color constants for within React/JSX.
export const POSITIVE_COLOR = "#3f8600";
export const NEGATIVE_COLOR = "#cf1322";

// Start and end of the day for the scheduler day and week view
export const SCHEDULER_START_DAY_HOUR = 8;
export const SCHEDULER_END_DAY_HOUR = 18;
