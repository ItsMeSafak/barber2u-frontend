import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import TextArea from "antd/lib/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Switch, Tooltip, InputNumber } from "antd";

import Service from "../../../models/Service";

import { updateService } from "../../../services/services-service";

import { showNotification } from "../../../assets/functions/notification";

import { AuthContext } from "../../../contexts/auth-context";
import { ServiceContext } from "../../../contexts/service-context";

import styles from "./styles.module.scss";

interface FormProps {
    serviceDetail: Service;
}

/**
 * This component renders the new service form.
 *
 * @returns {JSX}
 */
const NewServiceForm: React.FC<FormProps> = (props) => {
    const { serviceDetail } = props;
    const { accessToken } = useContext(AuthContext);
    const { isNewService, formValues, setIsUpdated, setFormValues, setIsEditingId, setServiceDetail } = useContext(ServiceContext);

    const [isActive, setIsActive] = useState(serviceDetail.active);

    /**
     * This function sets the form value for number typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onNumberChange = (key: string) =>
        (value: number) => {
            if (formValues)
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
        const tempService = { ...serviceDetail };

        if (formValues) {
            tempService.name = formValues.name;
            tempService.description = formValues.description;
            tempService.time = formValues.time;
            tempService.price = formValues.price;
            tempService.active = isActive;
        }

        const response = await updateService(accessToken, tempService);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        else showNotification(undefined, message, status);

        const tempBoolean = true;
        setServiceDetail(tempService);
        setIsUpdated(tempBoolean);
    };

    useEffect(() => {
        setFormValues({ name: serviceDetail.name, description: serviceDetail.description, time: serviceDetail.time, price: serviceDetail.price });
    }, []);

    return (
        <>
            <Form>
                <Form.Item>
                    <Input
                        name="name"
                        className={styles.dropdown}
                        placeholder="Style"
                        defaultValue={serviceDetail.name}
                        onChange={onInputChange("name")}
                    />
                </Form.Item>
                <Form.Item>
                    <TextArea
                        name="description"
                        className={styles.description}
                        defaultValue={serviceDetail.description}
                        placeholder="Description"
                        onChange={onInputChange("description")}
                        autoSize={{ maxRows: 10 }}
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber
                        name="time"
                        className={styles.inputTime}
                        defaultValue={serviceDetail.time}
                        onChange={onNumberChange("time")}
                        placeholder="Minutes"
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber
                        name="price"
                        className={styles.inputPrice}
                        defaultValue={serviceDetail.price}
                        formatter={(value) => `€ ${value}`}
                        onChange={onNumberChange("price")}
                    />
                </Form.Item>
            </Form>
            { !isNewService &&
                <>
                    <Tooltip title="Save">
                        <Button
                            className={styles.confirmButton}
                            type="primary"
                            shape="circle"
                            onClick={() => {
                                setIsEditingId("");
                                updateCurrentService();
                            }}
                            icon={
                                <FontAwesomeIcon icon={faCheck} />
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            onClick={() => setIsEditingId("")}
                            icon={
                                <FontAwesomeIcon icon={faTimes} />
                            }
                        />
                    </Tooltip>
                    <Switch className={styles.switch} checkedChildren="Open" onClick={() => setIsActive((prevState) => !prevState)}
                        unCheckedChildren="Closed" defaultChecked={isActive} />
                </>
            }
        </>
    );
};

export default NewServiceForm;
