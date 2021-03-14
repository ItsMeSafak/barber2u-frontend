import React from "react";

import LogoComponent from "../../component/logo";

/**
 * This component renders the footer.
 *
 * @returns {JSX}
 */
const FooterPartial: React.FC = () => (
    <small>
        All rights reserved. &copy; 2021 -{" "}
        <LogoComponent iconPrefix="fas" iconName="cut" />
    </small>
);

export default FooterPartial;
