import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APPLICATION_NAME } from "../../asset/constants";
import { getIconByPrefixName } from "../../asset/functions/icon";

interface ComponentProps {
    iconPrefix: string;
    iconName: string;
}

/**
 * This component renders the logo of the application with the given icon.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const LogoComponent: React.FC<ComponentProps> = (props) => {
    const { iconPrefix, iconName } = props;

    return (
        <>
            <FontAwesomeIcon
                icon={getIconByPrefixName(iconPrefix, iconName)}
                size="1x"
            />
            {APPLICATION_NAME}
        </>
    );
};

export default LogoComponent;
