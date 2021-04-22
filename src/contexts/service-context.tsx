import React, {
    createContext,
    useMemo,
    useState,
} from "react";

import Service from "../models/Service";

interface ServiceForm {
    name: string;
    description: string;
    price: number;
    time: number;
    isActive?: boolean;
}

interface ContextProps {
    isCreated: boolean | null;
    isUpdated: boolean | null;
    isDeleted: boolean | null;
    isEditingId: string | null;
    isNewService: boolean | null;
    serviceDetail: Service | null;
    formValues: ServiceForm;
    listOfServices: Service[] | null;
    setIsCreated: (isCreated: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    setIsDeleted: (isDeleted: boolean) => void;
    setIsEditingId: (isEditingId: string) => void;
    setIsNewService: (isNewServiceValue: boolean) => void;
    setServiceDetail: (serviceDetail: Service | null) => void;
    setFormValues: (formValues: ServiceForm) => void;
    setListOfServices: (services: Service[]) => void;
}

const contextDefaultValues: ContextProps = {
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    isEditingId: "",
    isNewService: false,
    serviceDetail: null,
    formValues: {
        name: "",
        description: "",
        price: 0,
        time: 0,
        isActive: false,
    },
    listOfServices: [],
    setIsCreated: () => { },
    setIsUpdated: () => { },
    setIsDeleted: () => { },
    setIsEditingId: () => { },
    setIsNewService: () => { },
    setServiceDetail: () => { },
    setFormValues: () => { },
    setListOfServices: () => { },
};

export const ServiceContext = createContext<ContextProps>(contextDefaultValues);

/**
 * The service provider is responsible for keeping track of the activities within the services page.
 * Activities such as:
 * - Updating a service.
 * - Deleting a service.
 * - Creating a new service.
 * @param {ContextProps} props
 * @returns {React.FC}
 */
export const ServiceProvider: React.FC = (props) => {
    const { children } = props;

    const [isCreated, setIsCreated] = useState(contextDefaultValues.isCreated);
    const [isUpdated, setIsUpdated] = useState(contextDefaultValues.isUpdated);
    const [isDeleted, setIsDeleted] = useState(contextDefaultValues.isDeleted);
    const [isEditingId, setIsEditingId] = useState(
        contextDefaultValues.isEditingId
    );
    const [isNewService, setIsNewService] = useState(
        contextDefaultValues.isNewService
    );
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
            isCreated,
            isUpdated,
            isDeleted,
            isEditingId,
            isNewService,
            serviceDetail,
            formValues,
            listOfServices,
            setIsCreated,
            setIsUpdated,
            setIsDeleted,
            setIsEditingId,
            setIsNewService,
            setServiceDetail,
            setFormValues,
            setListOfServices,
        }),
        [
            isCreated,
            isUpdated,
            isDeleted,
            isEditingId,
            isNewService,
            serviceDetail,
            formValues,
            listOfServices,
            setIsCreated,
            setIsUpdated,
            setIsDeleted,
            setIsEditingId,
            setIsNewService,
            setServiceDetail,
            setFormValues,
            setListOfServices,
        ]
    );

    return (
        <ServiceContext.Provider value={providerValues}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceProvider;
