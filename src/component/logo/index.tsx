import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APPLICATION_NAME } from "../../asset/constants";
import { getIconByPrefixName } from "../../asset/functions/icon";

const LogoComponent: React.FC = () => (
    <>
        <FontAwesomeIcon icon={getIconByPrefixName("fas", "cut")} size="1x" />
        {APPLICATION_NAME}
    </>
);

export default LogoComponent;