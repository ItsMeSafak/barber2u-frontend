import React from "react";

import LogoComponent from "../../component/logo";

/**
 * This component renders the footer.
 */
const FooterPartial: React.FC = () => (
    <small>
        All rights reserved. &copy; 2021 - <LogoComponent />
    </small>
);

export default FooterPartial;
