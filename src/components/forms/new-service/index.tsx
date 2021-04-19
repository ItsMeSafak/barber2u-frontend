import React, { ChangeEvent, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button, Switch, Tooltip, InputNumber } from "antd";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import TextArea from "antd/lib/input/TextArea";
import Service from "../../../models/Service";

import styles from "./styles.module.scss";
import { updateService } from "../../../services/services-service";
import { AuthContext } from "../../../contexts/auth-context";
import { showNotification } from "../../../assets/functions/notification";

interface FormProps {
    serviceDetail: Service;
    newService: boolean;
    callback?: (formData: { name: string; description: string; price: number; time: number; }) => void;
}

/**
 * This component renders the new service form.
 *
 * @returns {JSX}
 */
const NewServiceForm: React.FC<FormProps> = (props) => {
    const { serviceDetail, newService, callback } = props;
    const { accessToken } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(serviceDetail.active);

    const [formValue, setFormValue] = useState<{
        name: string;
        description: string;
        price: number;
        time: number
    }>({
        name: "",
        description: "",
        price: 0,
        time: 0
    });

    /**
     * This function sets the form value for number typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onNumberChange = (key: string) =>
        (value: number) => {
            setFormValue({
                ...formValue,
                [key]: value
            });
            if (callback) callback(formValue);
        };

    /**
     * This function sets the form value for string typed inputs.
     * 
     * @param {string} key name of the input 
     */
    const onInputChange = (key: string) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormValue({
                ...formValue,
                [key]: event.target.value
            });
            if (callback) callback(formValue);
        };

    /**
     * test
     */
    const updateCurrentService = async () => {
        serviceDetail.name = formValue.name;
        serviceDetail.description = formValue.description;
        serviceDetail.time = formValue.time;
        serviceDetail.price = formValue.price;
        serviceDetail.active = isActive;

        const response = await updateService(accessToken, serviceDetail);

        // If request is not OK, handle errors with notification.
        const { status, message } = response;
        if (!(status === 200)) showNotification(undefined, message, status);
        else showNotification(undefined, message, status);
    };

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
            { !newService &&
                <>
                    <Tooltip title="Save">
                        <Button
                            className={styles.confirmButton}
                            type="primary"
                            shape="circle"
                            onClick={() => updateCurrentService()}
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
