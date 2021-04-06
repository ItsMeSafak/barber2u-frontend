import React from "react";

import { Layout, Row, Card, Col } from "antd";

import ResetPasswordForm from "../../../components/forms/reset-password";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * This component is being used to render the reset password page.
 *
 * @returns {JSX}
 */
const ResetPasswordPage: React.FC = () => (
    <Content className={styles.content}>
        <Row className={styles.container} justify="center">
            <Col xs={20} sm={15} lg={10} xl={6}>
                <Card className={styles.card} bordered={false}>
                    <ResetPasswordForm />
                </Card>
            </Col>
        </Row>
    </Content>
);

export default ResetPasswordPage;
