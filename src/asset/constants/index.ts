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
        description: "Oops... Something went wrong!",
        color: "red",
        iconPrefix: "fas",
        iconName: "exclamation-triangle",
    },
];

// String constants.
export const APPLICATION_NAME = "Barber2U";
