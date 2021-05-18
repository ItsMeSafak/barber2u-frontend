import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, FormProps, Input, Select } from "antd";

import { getIconByPrefixName } from "../../../assets/functions/icon";

import styles from "./styles.module.scss";

interface ComponentProps extends FormProps {
    formName: string;
    data: Array<{
        name: string;
        icon: string;
        placeholder?: string;
        value?: string | number | string[] | undefined;
        type?: string;
        editable?: boolean;
        rules?: Array<{
            required: boolean;
            message: string;
        }>;
    }>;
}

/**
 * This component render a generic form, with dynamic properties regarding input fields, editability, etc.
 * @param props {ComponentProps}
 * @returns {JSX}
 */
const GenericForm: React.FC<ComponentProps> = (props) => {
    const { formName, data, onFinish, onFinishFailed, initialValues } = props;
    const [formControl] = Form.useForm();

    useEffect(() => {
        formControl.setFieldsValue(initialValues);
    }, [initialValues, formControl]);

    /**
     * Renders input fields, depending on given type of field.
     * @returns {JSX}
     */
    const renderFormData = () =>
        data.map(
            ({ type, name, placeholder, icon, value, rules, editable }) => {
                if (type === "select") {
                    return (
                        <Form.Item key={name} name={name}>
                            <Select
                                className={styles.selectInput}
                                mode="multiple"
                                defaultValue={value}
                                placeholder={placeholder}
                                disabled={!editable}
                            />
                        </Form.Item>
                    );
                }
                if (type === "number") {
                    return (
                        <Form.Item key={name} name={name}>
                            <Input
                                type="number"
                                defaultValue={value !== undefined ? value : 0}
                                placeholder={placeholder}
                                disabled={!editable}
                            />
                        </Form.Item>
                    );
                }

                return (
                    <Form.Item key={name} name={name} rules={rules}>
                        <Input
                            prefix={
                                <FontAwesomeIcon
                                    className={styles.iconPrefix}
                                    icon={getIconByPrefixName("fas", icon)}
                                />
                            }
                            defaultValue={value}
                            placeholder={placeholder}
                            disabled={!editable}
                        />
                    </Form.Item>
                );
            }
        );

    return (
        <Form
            name={formName}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={initialValues}
            form={formControl}
        >
            {renderFormData()}
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.saveButton}
                >
                    Save changes
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GenericForm;
