import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Select } from "antd";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

interface ComponentProps {
    formName: string;
    data: Array<{
        name: string;
        icon: string;
        value: string | number | string[] | undefined;
        type?: string;
    }>;
}

/**
 * TODO...
 * @param props
 * @returns
 */
const GenericForm: React.FC<ComponentProps> = (props) => {
    const { formName, data } = props;

    /**
     * TODO...
     * @returns
     */
    const renderFormData = () =>
        data.map(({ type, name, icon, value }) => {
            if (type === "select") {
                return (
                    <Form.Item key={name} name={name}>
                        <Select
                            className={styles.selectInput}
                            mode="multiple"
                            defaultValue={value}
                            disabled
                        />
                    </Form.Item>
                );
            }

            return (
                <Form.Item key={name} name={name}>
                    <Input
                        prefix={
                            <FontAwesomeIcon
                                className={styles.iconPrefix}
                                icon={getIconByPrefixName("fas", icon)}
                            />
                        }
                        defaultValue={value}
                        disabled
                    />
                </Form.Item>
            );
        });

    return <Form name={formName}>{renderFormData()}</Form>;
};

export default GenericForm;
