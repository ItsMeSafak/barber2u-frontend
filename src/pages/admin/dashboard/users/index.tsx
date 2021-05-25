import React, { useCallback, useEffect, useState } from "react";

import { ColumnsType } from "antd/lib/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Modal, Space, Table, Tag, Avatar, Tabs } from "antd";

import User from "../../../../models/User";
import Barber from "../../../../models/Barber";
import Spinner from "../../../../components/spinner";
import GenericForm from "../../../../components/forms/generic-form";

import { getIconByPrefixName } from "../../../../assets/functions/icon";
import { showHttpResponseNotification } from "../../../../assets/functions/notification";
import {
    disableUser,
    enableUser,
    getBarbers,
    getCustomers,
} from "../../../../services/admin-service";

import styles from "./styles.module.scss";

const { TabPane } = Tabs;

/**
 * Admin users page.
 *
 * @returns {JSX}
 */
const UsersPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState<Array<User>>([]);
    const [barbers, setBarbers] = useState<Array<Barber>>([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedUser, setSelectedUser] = useState<
        User | Barber | undefined
    >();

    const loadData = useCallback(async (key: string) => {
        if (key === "customers") {
            setLoading(true);
            getCustomers().then(({ data }) => {
                const userObjects = data.map((user: User) =>
                    Object.setPrototypeOf(user, User.prototype)
                );
                setCustomers(userObjects);
                setLoading(false);
            });
        }

        if (key === "barbers") {
            setLoading(true);
            getBarbers().then(({ data }) => {
                const userObjects = data.map(
                    ({
                        user,
                        companyName,
                        kvkNumber,
                        btwVatNumber,
                        workRadius,
                    }) =>
                        new Barber(
                            Object.setPrototypeOf(user, User.prototype),
                            companyName,
                            kvkNumber,
                            btwVatNumber,
                            workRadius
                        )
                );
                setBarbers(userObjects);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        loadData("customers");

        return () => setLoading(true);
    }, [loadData]);

    /**
     * This function renders the card body with a table.
     *
     * @returns {JSX}
     */
    const renderCardBody = () => {
        const columns: ColumnsType<User> = [
            {
                title: "First Name",
                key: "firstName",
                width: 150,
                render: (user: User) => user.getFirstNameCapitalized,
                sorter: (a, b) => a.getFirstName.length - b.getFirstName.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Last Name",
                key: "lastName",
                width: 150,
                responsive: ["md"],
                render: (user: User) => user.getLastNameCapitalized,
                sorter: (a, b) => a.getLastName.length - b.getLastName.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                width: 150,
                responsive: ["md"],
                sorter: (a, b) => a.getEmail.length - b.getEmail.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Verified",
                dataIndex: "isVerified",
                key: "isVerified",
                width: 150,
                responsive: ["md"],
                render: (isVerified: boolean) =>
                    renderTag(
                        isVerified ? "green" : "volcano",
                        isVerified ? "check" : "times"
                    ),
                sorter: (a, b) =>
                    String(a.getIsVerified).length -
                    String(b.getIsVerified).length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Active",
                dataIndex: "isActive",
                key: "isActive",
                width: 150,
                responsive: ["md"],
                render: (isActive: boolean) =>
                    renderTag(
                        isActive ? "green" : "volcano",
                        isActive ? "unlock" : "lock"
                    ),
                sorter: (a, b) =>
                    String(a.getIsActive).length - String(b.getIsActive).length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Action",
                dataIndex: "isActive",
                key: "action",
                fixed: "right",
                width: 150,
                render: (isActive, user) => renderAction(isActive, user),
            },
        ];

        return (
            <Card className={styles.card}>
                <Tabs
                    defaultActiveKey="customers"
                    onChange={(key) => loadData(key)}
                >
                    <TabPane tab="Customers" key="customers">
                        <Table
                            columns={columns}
                            dataSource={customers}
                            pagination={{ position: ["bottomCenter"] }}
                            scroll={{ x: 500 }}
                        />
                    </TabPane>
                    <TabPane tab="Barbers" key="barbers">
                        <Table
                            columns={columns}
                            dataSource={barbers}
                            pagination={{ position: ["bottomCenter"] }}
                            scroll={{ x: 500 }}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        );
    };

    /**
     * This function renders the tag with an icon.
     *
     * @param {string} color The color of the tag.
     * @param {string} icon The icon to be rendered.
     * @returns {JSX}
     */
    const renderTag = (color: string, icon: string) => (
        <Tag
            color={color}
            icon={
                <FontAwesomeIcon
                    icon={getIconByPrefixName("fas", icon)}
                    size="lg"
                />
            }
        />
    );

    /**
     * This function renders the button actions.
     *
     * @param {boolean} isActive Whether the user is active or not.
     * @param {User} user The user object.
     * @returns {JSX}
     */
    const renderAction = (isActive: boolean, user: User) => {
        const icon = isActive ? "lock" : "unlock";
        const buttonText = isActive ? "Disable" : "Enable";
        const buttonClassName = isActive
            ? styles.disableButton
            : styles.enableButton;
        return (
            <Space size="middle">
                <Button
                    ghost
                    type="primary"
                    icon={
                        <FontAwesomeIcon
                            className={styles.buttonIconPrefix}
                            icon={getIconByPrefixName("fas", "eye")}
                        />
                    }
                    onClick={() => {
                        setSelectedUser(user);
                        toggleModal();
                    }}
                >
                    See
                </Button>
                <Button
                    className={buttonClassName}
                    icon={
                        <FontAwesomeIcon
                            className={styles.buttonIconPrefix}
                            icon={getIconByPrefixName("fas", icon)}
                        />
                    }
                    onClick={() => enableOrDisableUser(user, isActive)}
                >
                    {buttonText}
                </Button>
            </Space>
        );
    };

    /**
     * This function either enables or disables the desired user.
     *
     * @param {User} user The user object.
     * @param {boolean} isActive Whether the user is active.
     * @returns {void}
     */
    const enableOrDisableUser = async (user: User, isActive: boolean) => {
        const response = isActive
            ? await disableUser(user.getId)
            : await enableUser(user.getId);
        if (!response) return;

        const { message, status } = response;
        loadData(user instanceof Barber ? "barbers" : "customers");
        showHttpResponseNotification(message, status);
    };

    /**
     * This function toggles the modal visibility.
     *
     * @returns {void}
     */
    const toggleModal = () => setModalVisibility((prevState) => !prevState);

    /**
     * This function renders the modal with user details.
     *
     * @returns {JSX}
     */
    const renderModalWithDetails = () => {
        const personalFormInputData = [
            {
                name: "id",
                icon: "hashtag",
                value: selectedUser?.getId,
            },
            {
                name: "fullName",
                icon: "user",
                value: selectedUser?.getFullNameCapitalized,
            },
            {
                name: "email",
                icon: "envelope",
                value: selectedUser?.getEmail,
            },
            {
                name: "phoneNumber",
                icon: "mobile-alt",
                value: selectedUser?.getPhoneNumber,
            },
            {
                name: "address",
                icon: "address-book",
                value: selectedUser?.getAddress,
            },
            {
                name: "verified",
                icon: selectedUser?.getIsVerified ? "check" : "times",
                value: selectedUser?.getIsVerified ? "Verified" : "Unverified",
            },
            {
                name: "active",
                icon: selectedUser?.getIsActive ? "unlock" : "lock",
                value: selectedUser?.getIsActive ? "Active" : "Inactive",
            },
            {
                type: "select",
                name: "roles",
                icon: "envelope",
                value: selectedUser?.getRoleNames.map((role) =>
                    role.replace("ROLE_", "")
                ),
            },
        ];

        const companyFormInputData = [
            {
                name: "companyName",
                icon: "building",
                value: (selectedUser as Barber)?.getCompanyName,
            },
            {
                name: "kvkNumber",
                icon: "building",
                value: (selectedUser as Barber)?.getKvkNumber,
            },
            {
                name: "btwVatNumber",
                icon: "building",
                value: (selectedUser as Barber)?.getBtwVatNumber,
            },
            {
                name: "workRadius",
                icon: "street-view",
                value: (selectedUser as Barber)?.getWorkRadiusWithMetric,
            },
        ];

        return (
            <Modal
                title={renderModalHeader()}
                visible={modalVisibility}
                onCancel={toggleModal}
                onOk={toggleModal}
                destroyOnClose
            >
                <Tabs defaultActiveKey="personal">
                    <TabPane tab="Personal" key="personal">
                        <GenericForm
                            formName="selectedBarberDetails"
                            data={personalFormInputData}
                        />
                    </TabPane>
                    {selectedUser instanceof Barber && (
                        <TabPane tab="Company" key="company">
                            <GenericForm
                                formName="selectedUserCompanyDetails"
                                data={companyFormInputData}
                            />
                        </TabPane>
                    )}
                </Tabs>
            </Modal>
        );
    };

    /**
     * This function renders the modal header with avatar.
     * The avatar color is depending on the user role.
     *
     * @returns {JSX}
     */
    const renderModalHeader = () => (
        <>
            <Avatar
                style={{
                    backgroundColor: selectedUser?.getDefaultColor,
                    marginRight: "1rem",
                }}
                size={32}
                gap={0}
            >
                {selectedUser?.getFirstNameFirstLetter}
            </Avatar>
            {selectedUser?.getFullNameCapitalized}
        </>
    );

    return (
        <>
            <Spinner spinning={loading}>{renderCardBody()}</Spinner>
            {renderModalWithDetails()}
        </>
    );
};

export default UsersPage;
