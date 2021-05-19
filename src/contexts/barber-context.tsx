import React, { createContext, useMemo, useState } from "react";

import Service from "../models/Service";

interface ServiceForm {
    name: string;
    description: string;
    price: number;
    time: number;
    isActive?: boolean;
}

interface ContextProps {
    loading: boolean;
    isCreated: boolean | null;
    isUpdated: boolean | null;
    isDeleted: boolean | null;
    isEditingId: string | null;
    isNewItem: boolean | null;
    serviceDetail: Service | null;
    formValues: ServiceForm;
    listOfServices: Service[] | null;
    setLoading: (loading: boolean) => void;
    setIsCreated: (isCreated: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    setIsDeleted: (isDeleted: boolean) => void;
    setIsEditingId: (isEditingId: string) => void;
    setIsNewItem: (isNewServiceValue: boolean) => void;
    setServiceDetail: (serviceDetail: Service | null) => void;
    setFormValues: (formValues: ServiceForm) => void;
    setListOfServices: (services: Service[]) => void;
}

const contextDefaultValues: ContextProps = {
    loading: true,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    isEditingId: "",
    isNewItem: false,
    serviceDetail: null,
    formValues: {
        name: "",
        description: "",
        price: 0,
        time: 0,
        isActive: false,
    },
    listOfServices: [],
    setLoading: () => {},
    setIsCreated: () => {},
    setIsUpdated: () => {},
    setIsDeleted: () => {},
    setIsEditingId: () => {},
    setIsNewItem: () => {},
    setServiceDetail: () => {},
    setFormValues: () => {},
    setListOfServices: () => {},
};

export const BarberContext = createContext<ContextProps>(contextDefaultValues);

/**
 * The service provider is responsible for keeping track of the activities within the services page.
 * Activities such as:
 * - Updating a service.
 * - Deleting a service.
 * - Creating a new service.
 * @param {ContextProps} props
 * @returns {React.FC}
 */
export const BarberProvider: React.FC = (props) => {
    const { children } = props;

    const [loading, setLoading] = useState(contextDefaultValues.loading);
    const [isCreated, setIsCreated] = useState(contextDefaultValues.isCreated);
    const [isUpdated, setIsUpdated] = useState(contextDefaultValues.isUpdated);
    const [isDeleted, setIsDeleted] = useState(contextDefaultValues.isDeleted);
    const [isEditingId, setIsEditingId] = useState(
        contextDefaultValues.isEditingId
    );
    const [isNewItem, setIsNewItem] = useState(contextDefaultValues.isNewItem);
    const [serviceDetail, setServiceDetail] = useState(
        contextDefaultValues.serviceDetail
    );
    const [formValues, setFormValues] = useState(
        contextDefaultValues.formValues
    );
    const [listOfServices, setListOfServices] = useState(
        contextDefaultValues.listOfServices
    );

    const providerValues = useMemo(
        () => ({
            loading,
            isCreated,
            isUpdated,
            isDeleted,
            isEditingId,
            isNewItem,
            serviceDetail,
            formValues,
            listOfServices,
            setLoading,
            setIsCreated,
            setIsUpdated,
            setIsDeleted,
            setIsEditingId,
            setIsNewItem,
            setServiceDetail,
            setFormValues,
            setListOfServices,
        }),
        [
            loading,
            isCreated,
            isUpdated,
            isDeleted,
            isEditingId,
            isNewItem,
            serviceDetail,
            formValues,
            listOfServices,
            setLoading,
            setIsCreated,
            setIsUpdated,
            setIsDeleted,
            setIsEditingId,
            setIsNewItem,
            setServiceDetail,
            setFormValues,
            setListOfServices,
        ]
    );

    return (
        <BarberContext.Provider value={providerValues}>
            {children}
        </BarberContext.Provider>
    );
};

export default BarberProvider;
