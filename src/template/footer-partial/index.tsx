import React, { useContext } from "react";

import { Col, Row } from "antd";

import MenuItems from "../../components/menu-items";
import LogoComponent from "../../components/logo";

import { NavbarContext } from "../../contexts/navbar-context";

import {
    CONTACT_DETAILS_ADDRESS,
    CONTACT_DETAILS_EMAIL_ADDRESS,
    CONTACT_DETAILS_PHONE_NUMBER,
} from "../../assets/constants";

import styles from "./styles.module.scss";

/**
 * This component renders the footer.
 *
 * @returns {JSX}
 */
const FooterPartial: React.FC = () => {
    const { menuItems } = useContext(NavbarContext);

    return (
        <footer className={styles.footer}>
            <Row className={styles.container}>
                <Col xs={24} sm={10} lg={14} className={styles.footerLogo}>
                    <LogoComponent iconPrefix="fas" iconName="cut" />
                </Col>
                <Col xs={24} sm={7} lg={5} className={styles.footerContainer}>
                    <ul>
                        <div className={styles.footerHeader}>Contact</div>
                        <li>Phone: {CONTACT_DETAILS_PHONE_NUMBER}</li>
                        <li>Email: {CONTACT_DETAILS_EMAIL_ADDRESS}</li>
                        <li>Address: {CONTACT_DETAILS_ADDRESS}</li>
                    </ul>
                </Col>
                <Col xs={24} sm={7} lg={5}>
                    <ul className={styles.footerLinks}>
                        <div className={styles.footerHeader}>Navigation</div>
                        <MenuItems menuType="footer" menuItems={menuItems} />
                    </ul>
                </Col>
                <Col className={styles.copyrightText} xs={24}>
                    <small>
                        All rights reserved. &copy; 2021 -{" "}
                        <LogoComponent iconPrefix="fas" iconName="cut" />
                    </small>
                </Col>
            </Row>
        </footer>
    );
};

export default FooterPartial;
