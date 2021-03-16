import React from "react";
import { Link } from "react-router-dom";

import { Button, Col, Row } from "antd";

import LogoComponent from "../../component/logo";

import navbar from "../../asset/navbar_mapping.json";
import contactInformation from "../../asset/content/contact_information.json";

import styles from "./styles.module.scss";

/**
 * This component renders the footer.
 *
 * @returns {JSX}
 */
const FooterPartial: React.FC = () => {
    /**
     * Render the links inside the footer
     */
    const renderLinks = () =>
        navbar.map((link) => (
            <li key={link.name}>
                <Link to={link.url}>
                    <Button type="link">{link.name}</Button>
                </Link>
            </li>
        ));

    return (
        <footer className={styles.footer}>
            <Row className={styles.container}>
                <Col xs={24} sm={10} lg={14} className={styles.footerLogo}>
                    <LogoComponent iconPrefix="fas" iconName="cut" />
                </Col>
                <Col xs={24} sm={7} lg={5} className={styles.footerContainer}>
                    <ul>
                        <div className={styles.footerHeader}>Contact</div>
                        <li>Phone: {contactInformation.phone}</li>
                        <li>Email: {contactInformation.email}</li>
                        <li>Address: {contactInformation.address}</li>
                    </ul>
                </Col>
                <Col xs={24} sm={7} lg={5}>
                    <ul>
                        <div className={styles.footerHeader}>Navigation</div>
                        {renderLinks()}
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
