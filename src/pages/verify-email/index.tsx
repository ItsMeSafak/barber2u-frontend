import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { Row, Layout } from "antd";

import styles from "./styles.module.scss";

const { Content } = Layout;

/**
 * 
 * @returns {JSX}
 */
const VerifyEmailPage: React.FC = () => {
    const params = new URLSearchParams(useLocation().search);;

    return (
        <Content className={styles.content}>
            <Row className={styles.container} justify="center">
                {params.get("id")}
            </Row>
        </Content>
    );
};

export default VerifyEmailPage;
