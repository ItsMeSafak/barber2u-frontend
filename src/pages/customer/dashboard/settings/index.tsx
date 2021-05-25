import React, { useContext } from "react";

import { Card } from "antd";

import User from "../../../../models/User";
import GenericForm from "../../../../components/forms/generic-form";

import { updateUserProfile } from "../../../../services/auth-service";
import { AuthenticationContext } from "../../../../contexts/authentication-context";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";

import styles from "../../../barber/dashboard/settings/styles.module.scss";

/**
 * Customer settings page.
 *
 * @returns {JSX}
 */
const SettingsPage: React.FC = () => {
    const { user } = useContext(AuthenticationContext);

    const inputFields = [
        {
            name: "firstName",
            placeholder: "Firstname",
            icon: "id-card",
            value: user?.getFirstName,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }],
        },
        {
            name: "lastName",
            placeholder: "Lastname",
            icon: "id-card",
            value: user?.getLastName,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }],
        },
        {
            name: "email",
            placeholder: "Email",
            icon: "at",
            value: user?.getEmail,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }],
        },
        {
            name: "phoneNumber",
            placeholder: "Phone number",
            icon: "phone",
            value: user?.getPhoneNumber,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }],
        },
        {
            name: "address",
            placeholder: "Address",
            icon: "address-book",
            value: user?.getAddress,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }],
        },
        {
            name: "zipCode",
            placeholder: "Zipcode",
            icon: "city",
            value: user?.getZipCode,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }],
        },
    ];

    /**
     * This function maps the inputfields, to initial values.
     * It takes the field name and value and turns them
     * into a key-value property.
     *
     * @returns {JSX}
     */
    const mapInputData = () => {
        const initialValues: {
            [name: string]: string | number | string[] | undefined;
        } = {};
        inputFields.map((item) => {
            initialValues[item.name] = item.value;
            return item;
        });
        return initialValues;
    };

    /**
     * This function updates the customer profile.
     *
     * @param {Customer} customer the customer data to be updated.
     */
    const updateCutomerProfile = async (customer: User) => {
        const response = await updateUserProfile(customer);

        const { status, message } = response;
        showHttpResponseNotification(message, status);
    };

    return (
        <div className={styles.settings}>
            <Card className={styles.container} title="Personal details">
                <GenericForm
                    formName="personalDetails"
                    data={inputFields}
                    initialValues={mapInputData()}
                    onFinish={updateCutomerProfile}
                />
            </Card>
        </div>
    );
};

export default SettingsPage;
