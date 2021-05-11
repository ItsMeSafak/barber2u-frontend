import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ColumnsType } from "antd/lib/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Modal, Space, Table, Tag, Avatar } from "antd";

import User from "../../../../models/User";
import Spinner from "../../../../components/spinner";

import { getIconByPrefixName } from "../../../../assets/functions/icon";
import { AuthenticationContext } from "../../../../contexts/authentication-context";

import styles from "./styles.module.scss";
import GenericForm from "../../../../components/forms/generic-form";
import Barber from "../../../../models/Barber";

/**
 * Admin users page.
 *
 * @returns {JSX}
 */
const UsersPage: React.FC = () => {
    const { loading } = useContext(AuthenticationContext);

    const history = useHistory();

    const tabs = [
        {
            key: "#customers",
            tab: "Customers",
        },
        {
            key: "#barbers",
            tab: "Barbers",
        },
    ];

    const columns: ColumnsType<User> = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            width: 150
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            width: 150,
            responsive: ["md"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
            responsive: ["md"],
        },
        {
            title: "Verified",
            dataIndex: "isVerified",
            key: "isVerified",
            width: 150,
            responsive: ["md"],
            render: (isVerified: boolean) => renderTag(isVerified ? "green" : "volcano", isVerified ? "check" : "times"),
        },
        {
            title: "Active",
            dataIndex: "isActive",
            key: "isActive",
            width: 150,
            responsive: ["md"],
            render: (isActive: boolean) => renderTag(isActive ? "green" : "volcano", isActive ? "unlock" : "lock"),
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

    const customerData = [
        1, 5, 6, 7, 8
    ].map(
        (index) =>
            new User(
                index.toString(),
                `John ${index}`,
                "Doe",
                "test@test.com",
                "06123",
                "123",
                "123",
                [{ id: "123", name: "ROLE_CUSTOMER" }],
                true,
                false
            )
    );

    // const barberData = [
    //     2, 3, 4, 5
    // ].map((index) =>
    //     new Barber(
    //         index.toString(), 
    //     `Barber ${index}`, 
    //     "Doe",
    //     "test@test.com",
    //     "06123",
    //     "123",
    //     "123",
    //     [{id: "123", name: "ROLE_BARBER"}],
    //     true,
    //     true,
    //     "123123123",
    //     "123456789",
    //     10))

    const content = {
        "#customers": (
            <Table
                columns={columns}
                dataSource={customerData}
                scroll={{ x: 500 }}
            />
        ),
        "#barbers": (
            <Table
                columns={columns}
                dataSource={customerData}
                scroll={{ x: 500 }}
            />
        ),
    };

    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>();

    useEffect(() => {
        const hashLocation = history.location.hash;

        if (hashLocation && tabs.some(({ key }) => key === hashLocation)) {
            setActiveTab(hashLocation);
        }

        return () => setActiveTab(tabs[0].key);
    }, [history.location.hash]);

    /**
     * TODO...
     * @param key
     */
    const onTabChange = (key: string) => {
        history.push({ hash: key });
        setActiveTab(key);
    };

    /**
     * TODO...
     * @param color 
     * @param icon 
     * @returns 
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
     * TODO..
     * @param isActive
     */
    const renderAction = (isActive: boolean, user: User) => {
        const icon = isActive ? "lock" : "unlock";
        const buttonText = isActive ? "Disable" : "Enable";
        const buttonClassName = isActive ? styles.disableButton : styles.enableButton;
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
                    onClick={() => { setSelectedUser(user); toggleModal(); }}
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
                >
                    {buttonText}
                    {/* {user.getId} */}
                </Button>
            </Space>
        );
    };

    /**
     * TODO...
     * @returns 
     */
    const toggleModal = () => setModalVisibility((prevState) => !prevState);

    /**
     * TODO...
     * @returns 
     */
    const renderModalWithDetails = () => {
        const formInputData = [
            {
                name: "id",
                icon: "hashtag",
                value: selectedUser?.getId,
            },
            {
                name: "fullName",
                icon: "user",
                value: selectedUser?.getFullName,
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
                value: selectedUser?.getRoleNames.map((role) => role.replace("ROLE_", "")),
            },
        ];

        return (
            <Modal title={renderModalHeader()} visible={modalVisibility} onCancel={toggleModal} onOk={toggleModal} destroyOnClose>
                <GenericForm formName="selectedUserDetails" data={formInputData} />
            </Modal>
        );
    };

    /**
     * TODO
     * @returns 
     */
    const renderModalHeader = () => (
        <>
            <Avatar
                style={{ backgroundColor: selectedUser?.getDefaultColor, marginRight: "1rem" }}
                size={32}
                gap={0}
            >
                {selectedUser?.getFirstNameFirstLetter}
            </Avatar>
            {selectedUser?.getFullName}
        </>
    );

    return (
        <>
            <Spinner spinning={loading}>
                <Card
                    className={styles.card}
                    tabList={tabs}
                    activeTabKey={activeTab}
                    onTabChange={(key) => onTabChange(key)}
                >
                    {Object.entries(content)
                        .filter(([key]) => key === activeTab)
                        .map(([_, value]) => value)}
                </Card>
            </Spinner>
            {renderModalWithDetails()}
        </>
    );
};

export default UsersPage;
