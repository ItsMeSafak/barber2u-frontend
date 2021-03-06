import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import { Form, Input, Switch, InputNumber } from "antd";

import Service from "../../../models/Service";

import { BarberContext } from "../../../contexts/barber-context";

import styles from "./styles.module.scss";

const { TextArea } = Input;

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
    const { isNewItem, formValues, setFormValues } = useContext(BarberContext);

    const [active] = useState(isNewItem || serviceDetail?.getActive);

    useEffect(() => {
        if (serviceDetail)
            setFormValues({
                name: serviceDetail.getName,
                description: serviceDetail.getDescription,
                time: serviceDetail.getTime,
                price: serviceDetail.getPrice,
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
                    defaultValue={serviceDetail?.getName}
                    placeholder="Style"
                    onChange={onInputChange("name")}
                />
            </Form.Item>
            <Form.Item name="description" rules={genericRule}>
                <TextArea
                    name="description"
                    className={styles.description}
                    defaultValue={serviceDetail?.getDescription}
                    placeholder="Description"
                    onChange={onInputChange("description")}
                    autoSize={{ maxRows: 10 }}
                />
            </Form.Item>
            <Form.Item name="time" rules={genericRule}>
                <InputNumber
                    name="time"
                    className={styles.inputTime}
                    defaultValue={
                        serviceDetail?.getId !== ""
                            ? serviceDetail?.getTime
                            : undefined
                    }
                    onChange={onNumberChange("time")}
                    placeholder="Minutes"
                />
            </Form.Item>
            <Form.Item name="price" rules={genericRule}>
                <InputNumber
                    name="price"
                    className={styles.inputPrice}
                    defaultValue={
                        serviceDetail?.getId !== ""
                            ? serviceDetail?.getPrice
                            : undefined
                    }
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
