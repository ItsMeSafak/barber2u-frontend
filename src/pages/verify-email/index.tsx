import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";

import { Row, Layout, Col } from "antd";

import { verifyEmail } from "../../services/auth-service";
import { ScreenContext } from "../../contexts/screen-context";
import { AuthenticationContext } from "../../contexts/authentication-context";
import { showHttpResponseNotification } from "../../assets/functions/notification";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component renders the verified email page.
 *
 * @returns {JSX}
 */
const VerifyEmailPage: React.FC = () => {
    const { authenticated } = useContext(AuthenticationContext);
    const { isMobileOrTablet } = useContext(ScreenContext);

    const history = useHistory();
    const params = useMemo(() => new URLSearchParams(history.location.search), [
        history.location.search,
    ]);

    const verifyAccount = useCallback(async () => {
        const response = await verifyEmail(params.get("id"));

        const { status, message } = response;
        if (!(status === 200)) history.push("404");

        showHttpResponseNotification(message, status, false);
    }, [history, params]);

    useEffect(() => {
        verifyAccount();
    }, [verifyAccount]);

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
                        {!authenticated && (
                            <p className={styles.link}>Go to sign in</p>
                        )}
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
