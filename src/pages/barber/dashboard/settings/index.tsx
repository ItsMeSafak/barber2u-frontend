import React, { useCallback, useContext, useEffect, useState } from "react";

import { Card, Skeleton } from "antd";

import GenericForm from "../../../../components/forms/generic-form";

import {
    getBarber,
    updateUserProfile,
} from "../../../../services/user-service";
import { AuthenticationContext } from "../../../../contexts/authentication-context";

import { showHttpResponseNotification } from "../../../../assets/functions/notification";

import User from "../../../../models/User";
import Barber from "../../../../models/Barber";

import styles from "./styles.module.scss";

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
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthenticationContext);
    const [inputFields, setInputFields] = useState<
        Array<{
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
        }>
    >([]);

    /**
     * This function sets the barber data for the input fields.
     * @param barber the barber data to be set
     * @returns {Array}
     */
    const setBarberData = useCallback(
        (barber: BarberData) =>
            setInputFields([
                {
                    name: "firstname",
                    placeholder: "Firstname",
                    icon: "id-card",
                    value: user?.getFirstName,
                    editable: true,
                    rules: [{ required: true, message: "Field is empty!" }],
                },
                {
                    name: "lastname",
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
                    name: "zipcode",
                    placeholder: "Zipcode",
                    icon: "city",
                    value: user?.getZipcode,
                    editable: true,
                    rules: [{ required: true, message: "Field is empty!" }],
                },
                {
                    name: "kvkNumber",
                    placeholder: "KvK number",
                    icon: "passport",
                    value: barber?.kvkNumber,
                    editable: true,
                    rules: [{ required: true, message: "Field is empty!" }],
                },
                {
                    name: "btwVatNumber",
                    placeholder: "BTW VAT number",
                    icon: "passport",
                    value: barber?.btwVatNumber,
                    editable: true,
                    rules: [{ required: true, message: "Field is empty!" }],
                },
                {
                    name: "companyName",
                    placeholder: "Company name",
                    icon: "building",
                    value: barber?.companyName,
                    editable: true,
                    rules: [{ required: true, message: "Field is empty!" }],
                },
                {
                    name: "workRadius",
                    placeholder: "Work radius",
                    icon: "globe",
                    value: barber?.workRadius,
                    editable: true,
                    type: "number",
                    rules: [{ required: true, message: "Field is empty!" }],
                },
            ]),
        [user]
    );

    const fetchBarberData = useCallback(async () => {
        setIsLoading(true);
        const response = await getBarber(user?.getEmail);

        const { status, message, data } = response;
        showHttpResponseNotification(message, status, false);

        setBarberData(data as BarberData);
        setIsLoading(false);
    }, [setBarberData, user, setIsLoading]);

    useEffect(() => {
        fetchBarberData();
    }, [fetchBarberData]);

    /**
     * This function maps the inputfields, to initial values.
     * It takes the field name and value and turns them
     * into a key-value property.
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
     * This function updates the barber profile.
     * @param barber the barber data to be updated.
     */
    const updateBarberProfile = async (barber: Barber) => {
        const response = await updateUserProfile(barber);

        const { status, message } = response;
        showHttpResponseNotification(message, status);
    };

    return (
        <div className={styles.settings}>
            <Card className={styles.container}>
                <Skeleton active loading={isLoading} />
                {!isLoading && <GenericForm
                    formName="personalDetails"
                    data={inputFields}
                    initialValues={mapInputData()}
                    onFinish={updateBarberProfile}
                />
                }
            </Card>
        </div>
    );
};

export default SettingsPage;
