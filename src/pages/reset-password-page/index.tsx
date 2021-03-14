import React from "react";

import { Layout, Row, Card, Col } from "antd";

import ResetPasswordForm from "../../asset/forms/reset-password";

import styles from "./styles.module.scss";

const { Content } = Layout;

// interface ComponentProps {
// };

const ResetPasswordPage: React.FC = (props) => {
    const {} = props;

    return (
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
};

export default ResetPasswordPage;
