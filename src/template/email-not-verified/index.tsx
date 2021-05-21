import React, { useContext } from "react";

import { Alert, Button } from "antd";

import { AuthenticationContext } from "../../contexts/authentication-context";
import { resendVerificationEmail } from "../../services/auth-service";
import { showHttpResponseNotification } from "../../assets/functions/notification";

/**
 * This template is used to render an alert for the user whenever their email address has not been verified yet.
 *
 * @returns {JSX}
 */
const EmailNotVerified: React.FC = () => {
    const { user } = useContext(AuthenticationContext);

    /**
     * This function sends a verification mail once clicked on button.
     */
    const onVerifyEmailButtonClick = async () => {
        const response = await resendVerificationEmail();

        const { message, status } = response;
        showHttpResponseNotification(message, status);
    };

    return (
        <>
            {!user?.getIsVerified && (
                <Alert
                    message="Email is not verified"
                    description="Your email address has not been verified yet!"
                    type="warning"
                    showIcon
                    style={{ marginBottom: "1rem" }}
                    action={
                        <Button
                            onClick={onVerifyEmailButtonClick}
                            size="small"
                            type="ghost"
                        >
                            Verify Email
                        </Button>
                    }
                />
            )}
        </>
    );
};

export default EmailNotVerified;
