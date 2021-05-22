import React from "react";

import { Spin, SpinProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIconByPrefixName } from "../../assets/functions/icon";

/**
 * This component is used to render spinners.
 *
 * @returns {JSX}
 */
const Spinner: React.FC<SpinProps> = (props) => {
    const { spinning, children } = props;

    return (
        <Spin
            spinning={spinning}
            size="large"
            indicator={
                <FontAwesomeIcon
                    className="fa-spin"
                    icon={getIconByPrefixName("fas", "cut")}
                    color="gray"
                />
            }
        >
            {children}
        </Spin>
    );
};

export default Spinner;
