import Role from "./enums/Role";

import {
    ADMIN_DEFAULT_COLOR,
    ADMIN_DEFAULT_HEADER_COLOR,
    BARBER_DEFAULT_COLOR,
    BARBER_DEFAULT_HEADER_COLOR,
    CUSTOMER_DEFAULT_COLOR,
    CUSTOMER_DEFAULT_HEADER_COLOR,
} from "../assets/constants";

/**
 * User class which can be used for creating user objects.
 */
export default class User {
    private id: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;
    private address: string;
    private zipCode: string;
    private roles: Array<{ id: string; name: string }>;
    private isActive: boolean;
    private isVerified: boolean;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        address: string,
        zipCode: string,
        roles: Array<{ id: string; name: string }>,
        isActive: boolean,
        isVerified: boolean
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.zipCode = zipCode;
        this.roles = roles;
        this.isActive = isActive;
        this.isVerified = isVerified;
    }

    get getId(): string {
        return this.id;
    }

    get getEmail(): string {
        return this.email;
    }

    get getFirstName(): string {
        return this.firstName;
    }

    get getLastName(): string {
        return this.lastName;
    }

    get getRoles(): Array<{ id: string; name: string }> {
        return this.roles;
    }

    get getIsVerified(): boolean {
        return this.isVerified;
    }

    get getIsActive(): boolean {
        return this.isActive;
    }

    get getPhoneNumber(): string {
        return this.phoneNumber;
    }

    get getAddress(): string {
        return this.address;
    }

    get getZipCode(): string {
        return this.zipCode;
    }

    get getFirstNameCapitalized(): string {
        return (
            this.getFirstName.charAt(0).toUpperCase() +
            this.getFirstName.slice(1)
        );
    }

    get getLastNameCapitalized(): string {
        return (
            this.getLastName.charAt(0).toUpperCase() + this.getLastName.slice(1)
        );
    }

    get getFullName(): string {
        return `${this.getFirstName} ${this.getLastName}`;
    }

    get getFullNameWithInitial(): string {
        return `${this.getFirstNameFirstLetter}. ${this.getLastName}`;
    }

    get getFirstNameFirstLetter(): string {
        return this.firstName.charAt(0).toUpperCase();
    }

    get getFullNameCapitalized(): string {
        return `${this.getFirstNameCapitalized} ${this.getLastNameCapitalized}`;
    }

    get getRoleNames(): Array<string> {
        return this.roles.map(({ name }) => name);
    }

    get getDefaultColors(): {
        defaultColor: string;
        defaultHeaderColor: string;
    } {
        let defaultColor, defaultHeaderColor;

        switch (this.getRoleNames[0] as Role) {
            case Role.Customer:
                defaultColor = CUSTOMER_DEFAULT_COLOR;
                defaultHeaderColor = CUSTOMER_DEFAULT_HEADER_COLOR;
                break;
            case Role.Barber:
                defaultColor = BARBER_DEFAULT_COLOR;
                defaultHeaderColor = BARBER_DEFAULT_HEADER_COLOR;
                break;
            case Role.Admin:
                defaultColor = ADMIN_DEFAULT_COLOR;
                defaultHeaderColor = ADMIN_DEFAULT_HEADER_COLOR;
                break;
        }

        return { defaultColor, defaultHeaderColor };
    }

    get getCleanedRoleNames(): Array<string> {
        return this.roles.map(({ name }) => name.replace("ROLE_", ""));
    }

    getUser(): User {
        return this;
    }

    set setFirstName(value: string) {
        this.firstName = value;
    }

    set setLastname(value: string) {
        this.lastName = value;
    }

    set setEmail(value: string) {
        this.email = value;
    }

    set setPhoneNumber(value: string) {
        this.phoneNumber = value;
    }

    set setAddress(value: string) {
        this.address = value;
    }

    set setZipCode(value: string) {
        this.zipCode = value;
    }

    hasRole(role: Role): boolean {
        return this.getRoleNames.includes(role.valueOf());
    }
}
