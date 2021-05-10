import React, { useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Row, Layout, Col } from "antd";

import { ScreenContext } from "../../contexts/screen-context";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the verified email page.
 *
 * @returns {JSX}
 */
const VerifyEmailPage: React.FC = () => {
    const { isMobileOrTablet } = useContext(ScreenContext);
    const params = new URLSearchParams(useLocation().search);
    const history = useHistory();

    useEffect(() => {
        if (!params.has("id")) history.push("/404");
    }, []);

    /**
     * This function renders the default dekstop view of the email verification.
     *
     * @returns {JSX}
     */
    const renderDesktopVerification = () => (
        <Row className={styles.content}>
            <Col span={12} />
            <Col span={10}>
                <div className={styles.block}>
                    <h2 className={styles.blockTitle}>Email verified</h2>
                    <p className={styles.blockContent}>
                        Your email has successfully been verified.
                    </p>
                    <Link to="signin">
                        <p className={styles.link}>Go to sign in</p>
                    </Link>
                </div>
            </Col>
        </Row>
    );

    /**
     * This function renders the mobile view of the email verification.
     *
     * @returns {JSX}
     */
    const renderMobileVerification = () => (
        <Row className={styles.mobileContent}>
            <Col span={22}>
                <div className={styles.block}>
                    <h2 className={styles.blockTitle}>Email verified</h2>
                    <p className={styles.blockContent}>
                        Your email has successfully been verified.
                    </p>
                    <Link to="signin">
                        <p className={styles.link}>Go to sign in</p>
                    </Link>
                </div>
            </Col>
        </Row>
    );

    return (
        <Content>
            {isMobileOrTablet
                ? renderMobileVerification()
                : renderDesktopVerification()}
        </Content>
    );
};

export default VerifyEmailPage;