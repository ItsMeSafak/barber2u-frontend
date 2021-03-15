import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button, Layout, Divider } from "antd";

import { getErrorStatus } from "../../asset/functions/error";
import { getIconByPrefixName } from "../../asset/functions/icon";

import styles from "./styles.module.scss";

const { Content } = Layout;

interface ComponentProps {
    code: number;
    returnUrl: string;
    message?: string;
    description?: string;
    color?: string;
    iconPrefix?: string;
    iconName?: string;
}

/**
 * This component renders the error page.
 *
 * @param {Object} props Component properties.
 * @returns {JSX}
 */
const ErrorPage: React.FC<ComponentProps> = (props) => {
    const { code, returnUrl } = props;

    /**
     * This function renders the actual error details.
     */
    const renderError = (
        error:
            | {
                  code: number;
                  message: string;
                  description: string;
                  color: string;
                  iconPrefix: string;
                  iconName: string;
              }
            | undefined
    ) => (
        <Card className={styles.card} bordered={false}>
            <Col>
                <FontAwesomeIcon
                    icon={getIconByPrefixName(
                        error?.iconPrefix,
                        error?.iconName
                    )}
                    color={error?.color}
                    size="6x"
                />
                <Divider orientation="center">
                    <h2 className={styles.errorCode}>{code}</h2>
                </Divider>
                <h2 className={styles.errorMessage}>{error?.message}</h2>
                <h3 className={styles.errorDescription}>
                    {error?.description}
                </h3>
                <Link to={returnUrl}>
                    <Button
                        className={styles.returnButton}
                        type="ghost"
                        size="large"
                    >
                        Return
                    </Button>
                </Link>
            </Col>
        </Card>
    );

    return (
        <Content className={styles.content}>
            <Row className={styles.container} justify="center">
                {renderError(getErrorStatus(code))}
            </Row>
        </Content>
    );
};

export default ErrorPage;
