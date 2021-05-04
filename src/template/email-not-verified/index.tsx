import React, { useContext } from "react";

import { Alert } from "antd";

import { AuthenticationContext } from "../../contexts/authentication-context";

/**
 * This template is used to render an alert for the user whenever their email address has not been verified yet.
 *
 * @returns {JSX}
 */
const EmailNotVerified: React.FC = () => {
    const { user } = useContext(AuthenticationContext);

    return (
        <>
            {!user?.getIsVerified && (
                <Alert
                    message="Email is not verified"
                    description="Your email address has not been verified yet!"
                    type="warning"
                    showIcon
                    style={{ marginBottom: "1rem" }}
                />
            )}
        </>
    );
};

export default EmailNotVerified;
