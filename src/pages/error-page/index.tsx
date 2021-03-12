import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "antd";

import { getErrorStatus } from "../../asset/functions/error";
import { getIconByPrefixName } from "../../asset/functions/icon";

import styles from "./styles.module.scss";

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
        <Card className={styles.card}>
            <Col span={24}>
                <FontAwesomeIcon
                    icon={getIconByPrefixName(
                        error?.iconPrefix,
                        error?.iconName
                    )}
                    color={error?.color}
                    size="6x"
                />
                <h2 className={styles.errorCode}>
                    {code} - {error?.message}
                </h2>
            </Col>
            <Col span={24}>
                <h3 className={styles.errorMessage}>{error?.description}</h3>
                <Link to={returnUrl}>
                    <Button type="ghost" size="large">
                        Return
                    </Button>
                </Link>
            </Col>
        </Card>
    );

    return (
        <Row className={styles.container} justify="center">
            {renderError(getErrorStatus(code))}
        </Row>
    );
};

export default ErrorPage;
