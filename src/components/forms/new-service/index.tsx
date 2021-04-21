import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import TextArea from "antd/lib/input/TextArea";
import { Form, Input, Switch, InputNumber } from "antd";

import Service from "../../../models/Service";

import { updateService } from "../../../services/services-service";

import { showNotification } from "../../../assets/functions/notification";

import { AuthContext } from "../../../contexts/auth-context";
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
    const { accessToken } = useContext(AuthContext);
    const { isCreated, isNewService, formValues, isUpdated, setIsUpdated, setFormValues, setIsEditingId, setServiceDetail } = useContext(ServiceContext);

    const [isActive, setIsActive] = useState(serviceDetail!.active);

    /**
     * This function sets the form value for number typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onNumberChange = (key: string) =>
        (value: number) => {
            if (formValues)
                console.log(formValues);
            setFormValues({
                ...formValues,
                [key]: value
            });
        };

    /**
     * This function sets the form value for string typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onInputChange = (key: string) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (formValues)
                setFormValues({
                    ...formValues,
                    [key]: event.target.value
                });
        };

    /**
     * This function updates the current service.
     */
    const updateCurrentService = async () => {
        if (formValues && serviceDetail) {
            serviceDetail.name = formValues.name;
            serviceDetail.description = formValues.description;
            serviceDetail.time = formValues.time;
            serviceDetail.price = formValues.price;
            serviceDetail.active = isActive;


            const response = await updateService(serviceDetail);

            // If request is not OK, handle errors with notification.
            const { status, message } = response;
            if (!(status === 200)) showNotification(undefined, message, status);
            else showNotification(undefined, message, status);

            const tempBoolean = true;
            setIsUpdated(tempBoolean);
        }
    };

    useEffect(() => {
        if (serviceDetail) setFormValues({ name: serviceDetail.name, description: serviceDetail.description, time: serviceDetail.time, price: serviceDetail.price });
    }, []);

    return (
        <>
            <Form>
                <Form.Item>
                    <Input
                        name="name"
                        className={styles.dropdown}
                        placeholder="Style"
                        defaultValue={serviceDetail?.name}
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
                        formatter={(value) => `€ ${value}`}
                        onChange={onNumberChange("price")}
                    />
                </Form.Item>
            </Form>
            { !isNewService &&
                <Switch className={styles.switch} checkedChildren="Open" onClick={() => setIsActive((prevState) => !prevState)}
                    unCheckedChildren="Closed" defaultChecked={isActive} />
            }
        </>
    );
};

export default NewServiceForm;
