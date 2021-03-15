import React from "react";

import { Col, Row } from "antd";

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
                <a href={link.url}>{link.name}</a>
            </li>
        ));

    return (
        <footer className={styles.footer}>
            <Col span={24}>
                <Row justify="start" wrap>
                    <Col flex="auto" className={styles.footerLogo}>
                        <LogoComponent iconPrefix="fas" iconName="cut" />
                    </Col>
                    <Col className={styles.footerContainer}>
                        <ul>
                            <div className={styles.footerHeader}>Contact</div>
                            <li>Phone: {contactInformation.phone}</li>
                            <li>Email: {contactInformation.email}</li>
                            <li>Address: {contactInformation.address}</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <div className={styles.footerHeader}>
                                Navigation
                            </div>
                            {renderLinks()}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <small>
                        All rights reserved. &copy; 2021 -{" "}
                        <LogoComponent iconPrefix="fas" iconName="cut" />
                    </small>
                </Row>
            </Col>
        </footer>
    );
};

export default FooterPartial;
