import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Button, Layout, Result, Divider, Badge } from "antd";

import { getErrorStatus } from "../../assets/functions/error";
import { getIconByPrefixName } from "../../assets/functions/icon";

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
     *
     * @param {Object} error The error properties.
     * @returns {JSX}
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
        <Result
            icon={renderIcon(error?.color, error?.iconPrefix, error?.iconName)}
            title={renderTitle(error?.message)}
            subTitle={error?.description}
            extra={renderExtraDetails}
        />
    );

    /**
     * This function renders the actual icon.
     *
     * @param {string | undefined} color The color of the icon.
     * @param {string | undefined} prefix The prefix of the icon.
     * @param {string | undefined} name The name of the icon.
     * @returns {JSX}
     */
    const renderIcon = (
        color: string | undefined,
        prefix: string | undefined,
        name: string | undefined
    ) => (
        <Badge
            offset={[3, -3]}
            count={
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", "exclamation-triangle")}
                    color={color}
                    size="2x"
                />
            }
        >
            <FontAwesomeIcon
                icon={getIconByPrefixName(prefix, name)}
                size="5x"
            />
        </Badge>
    );

    /**
     * This function renders the error title.
     *
     * @param {string | undefined} message
     * @returns {JSX}
     */
    const renderTitle = (message: string | undefined) => (
        <>
            <Divider>
                <h2>{code}</h2>
            </Divider>
            {message}
        </>
    );

    const renderExtraDetails = (
        <Link to={returnUrl}>
            <Button className={styles.returnButton} type="ghost">
                Return Home
            </Button>
        </Link>
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
