import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCut } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

/**
 * This component renders a footer.
 */
const FooterPartial: React.FC = () => (
    <footer className={styles.footer}>
        <small>
            All rights reserved. &copy; 2021 -{" "}
            <FontAwesomeIcon icon={faCut} size="sm" />
            Barber2U
        </small>
    </footer>
);

export default FooterPartial;
