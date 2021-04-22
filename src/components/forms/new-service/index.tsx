import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import TextArea from "antd/lib/input/TextArea";
import { Form, Input, Switch, InputNumber } from "antd";

import Service from "../../../models/Service";

import { ServiceContext } from "../../../contexts/service-context";

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
    const { isNewService, formValues, setFormValues } = useContext(
        ServiceContext
    );
    const [active, setActive] = useState(
        isNewService ? true : serviceDetail?.active
    );

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
        if (formValues)
            setFormValues({
                ...formValues,
                [key]: event.target.value,
            });
    };

    /**
     * This fucntion sets the active value in the form values object.
     */
    const changeActiveness = () => {
        setActive((prevState) => !prevState);
        setFormValues({
            ...formValues,
            isActive: active,
        });
    };

    useEffect(() => {
        if (serviceDetail) {
            setFormValues({
                name: serviceDetail.name,
                description: serviceDetail.description,
                time: serviceDetail.time,
                price: serviceDetail.price,
                isActive: active,
            });
        }
    }, [serviceDetail, setFormValues, active]);

    return (
        <>
            <Form>
                <Form.Item>
                    <Input
                        name="name"
                        className={styles.dropdown}
                        defaultValue={serviceDetail?.name}
                        placeholder="Style"
                        onChange={onInputChange("name")}
                    />
                </Form.Item>
                <Form.Item>
                    <TextArea
                        name="description"
                        className={styles.description}
                        defaultValue={serviceDetail?.description}
                        placeholder="Description"
                        onChange={onInputChange("description")}
                        autoSize={{ maxRows: 10 }}
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber
                        name="time"
                        className={styles.inputTime}
                        defaultValue={serviceDetail?.time}
                        onChange={onNumberChange("time")}
                        placeholder="Minutes"
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber
                        name="price"
                        className={styles.inputPrice}
                        defaultValue={serviceDetail?.price}
                        formatter={(value) => `&euro; ${value}`}
                        onChange={onNumberChange("price")}
                    />
                </Form.Item>
            </Form>
            {!isNewService && (
                <Switch
                    className={styles.switch}
                    checkedChildren="Active"
                    onClick={() => changeActiveness()}
                    unCheckedChildren="Inactive"
                    defaultChecked={active}
                />
            )}
        </>
    );
};

export default NewServiceForm;
