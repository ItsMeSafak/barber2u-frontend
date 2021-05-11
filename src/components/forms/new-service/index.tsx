import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import TextArea from "antd/lib/input/TextArea";
import { Form, Input, Switch, InputNumber } from "antd";

import Service from "../../../models/Service";

import { BarberbContext } from "../../../contexts/barber-context";

import { EURO_SYMBOL } from "../../../assets/constants";

import styles from "./styles.module.scss";

interface FormProps {
    serviceDetail: Service | null;
}

/**
 * This component renders the new service form.
 *
 * @returns {JSX}
 */
const NewServiceForm: React.FC<FormProps> = (props) => {
    const { serviceDetail } = props;
    const { isNewItem, formValues, setFormValues } = useContext(
        BarberbContext
    );
    const [active] = useState(isNewItem || serviceDetail?.active);

    useEffect(() => {
        if (serviceDetail)
            setFormValues({
                name: serviceDetail.name,
                description: serviceDetail.description,
                time: serviceDetail.time,
                price: serviceDetail.price,
                isActive: active,
            });
    }, [serviceDetail, setFormValues, active]);

    /**
     * This function sets the form value for number typed inputs.
     *
     * @param {string} key name of the input
     */
    const onNumberChange = (key: string) => (value: number) => {
        setFormValues({
            ...formValues,
            [key]: value,
        });
    };

    /**
     * This function sets the form value for string typed inputs.
     *
     * @param {string} key name of the input
     */
    const onInputChange = (key: string) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormValues({
            ...formValues,
            [key]: event.target.value,
        });
    };

    /**
     * This fucntion sets the active value in the form values object.
     */
    const changeActiveness = (switchActive: boolean) => {
        setFormValues({
            ...formValues,
            isActive: switchActive,
        });
    };

    const genericRule = [
        {
            required: true,
            message: "This field is required",
        },
    ];

    return (
        <Form>
            <Form.Item name="name" rules={genericRule}>
                <Input
                    name="name"
                    className={styles.dropdown}
                    defaultValue={serviceDetail?.name}
                    placeholder="Style"
                    onChange={onInputChange("name")}
                />
            </Form.Item>
            <Form.Item name="description" rules={genericRule}>
                <TextArea
                    name="description"
                    className={styles.description}
                    defaultValue={serviceDetail?.description}
                    placeholder="Description"
                    onChange={onInputChange("description")}
                    autoSize={{ maxRows: 10 }}
                />
            </Form.Item>
            <Form.Item name="time" rules={genericRule}>
                <InputNumber
                    name="time"
                    className={styles.inputTime}
                    defaultValue={serviceDetail?.id !== "" ? serviceDetail?.time : undefined}
                    onChange={onNumberChange("time")}
                    placeholder="Minutes"
                />
            </Form.Item>
            <Form.Item name="price" rules={genericRule}>
                <InputNumber
                    name="price"
                    className={styles.inputPrice}
                    defaultValue={serviceDetail?.id !== "" ? serviceDetail?.price : undefined}
                    placeholder="Price"
                    onChange={onNumberChange("price")}
                />
            </Form.Item>
            <Form.Item name="active">
                <Switch
                    className={styles.switch}
                    checkedChildren="Active"
                    onClick={(isActive) => changeActiveness(isActive)}
                    unCheckedChildren="Inactive"
                    defaultChecked={active}
                />
            </Form.Item>
        </Form>
    );
};

export default NewServiceForm;
