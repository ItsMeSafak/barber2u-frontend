import React, { useCallback, useContext, useEffect, useState } from "react";

import { Card } from "antd";

import GenericForm from "../../../../components/forms/generic-form";

import styles from "./styles.module.scss";
import { AuthenticationContext } from "../../../../contexts/authentication-context";
import Barber from "../../../../models/Barber";
import { getBarber, updateUserProfile } from "../../../../services/user-service";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";
import User from "../../../../models/User";

export interface BarberData extends User {
    kvkNumber: string;
    btwVatNumber: string;
    companyName: string;
    workRadius: number;
}
/**
 * This component renders the settings page.
 * The page has a settings form with user values in it.
 *
 * @returns {JSX}
 */
const SettingsPage: React.FC = () => {
    const { user } = useContext(AuthenticationContext);
    const [inputFieldValues, setInputFieldValues] = useState<Array<{
        name: string,
        icon: string,
        placeholder?: string,
        value?: string | number | string[] | undefined,
        type?: string,
        editable?: boolean,
        rules?: Array<{
            required: boolean,
            message: string
        }>
    }>>([]);

    const setDetails = useCallback((barber: BarberData) => setInputFieldValues([
        {
            name: "firstname",
            placeholder: "Firstname",
            icon: "id-card",
            value: user?.getFirstName,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]
        },
        {
            name: "lastname",
            placeholder: "Lastname",
            icon: "id-card",
            value: user?.getLastName,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]
        },
        {
            name: "email",
            placeholder: "Email",
            icon: "at",
            value: user?.getEmail,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]

        },
        {
            name: "phoneNumber",
            placeholder: "Phone number",
            icon: "phone",
            value: user?.getPhoneNumber,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]

        },
        {
            name: "address",
            placeholder: "Address",
            icon: "address-book",
            value: user?.getAddress,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]

        },
        {
            name: "zipcode",
            placeholder: "Zipcode",
            icon: "city",
            value: user?.getZipcode,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]

        },
        {
            name: "kvkNumber",
            placeholder: "KvK number",
            icon: "passport",
            value: barber?.kvkNumber,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]
        },
        {
            name: "btwVatNumber",
            placeholder: "BTW VAT number",
            icon: "passport",
            value: barber?.btwVatNumber,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]
        },
        {
            name: "companyName",
            placeholder: "Company name",
            icon: "building",
            value: barber?.companyName,
            editable: true,
            rules: [{ required: true, message: "Field is empty!" }]
        },
        {
            name: "workRadius",
            placeholder: "Work radius",
            icon: "globe",
            value: barber?.workRadius,
            editable: true,
            type: "number",
            rules: [{ required: true, message: "Field is empty!" }]
        }
    ]), []);

    const fetchBarberData = useCallback(async () => {
        const response = await getBarber(user?.getEmail);

        const { status, message, data } = response;
        showHttpResponseNotification(message, status, false);

        setDetails(data as BarberData);
    }, [setDetails]);

    useEffect(() => {
        fetchBarberData();
    }, [fetchBarberData]);

    /**
     * TOD
     * @returns 
     */
    const sample = () => {
        const initialValues: { [name: string]: string | number | string[] | undefined } = {};
        inputFieldValues.map((item) => {
            initialValues[item.name] = item.value;
        });
        return initialValues;
    };

    /**
     * TODO
     * @param user 
     */
    const updateBarberProfile = async (barber: Barber) => {
        const response = await updateUserProfile(barber);

        const { status, message } = response;
        showHttpResponseNotification(message, status);
    };

    return (
        <div className={styles.settings}>
            <Card className={styles.container}>
                <GenericForm formName="personalDetails" data={inputFieldValues} initialValues={sample()} onFinish={updateBarberProfile} />
            </Card>
        </div>
    );

};

export default SettingsPage;
