import Role from "./enums/Role";

import { ADMIN_DEFAULT_COLOR, BARBER_DEFAULT_COLOR, CUSTOMER_DEFAULT_COLOR } from "../assets/constants";

/**
 * User class which can be used for creating user objects.
 */
export default class User {
    /* eslint-disable  require-jsdoc */
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

    set setFirstName(value: string) {
        this.firstName = value;
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

    get getFullName(): string {
        return `${this.getFirstName} ${this.getLastName}`;
    }

    get getFullNameWithInitial(): string {
        return `${this.getFirstNameFirstLetter}. ${this.getLastName}`;
    }

    get getFirstNameFirstLetter(): string {
        return this.firstName.charAt(0).toUpperCase();
    }

    get getRoles(): Array<{ id: string; name: string }> {
        return this.roles;
    }

    get getRoleNames(): Array<string> {
        return this.roles.map(({ name }) => name);
    }

    get getIsVerified(): boolean {
        return this.isVerified;
    }

    get getDefaultColor(): string {
        let color;

        switch (this.getRoleNames[0] as Role) {
            case Role.Customer:
                color = CUSTOMER_DEFAULT_COLOR;
                break;
            case Role.Barber:
                color = BARBER_DEFAULT_COLOR;
                break;
            case Role.Admin:
                color = ADMIN_DEFAULT_COLOR;
                break;
        }

        return color;
    }

    get getPhoneNumber(): string {
        return this.phoneNumber;
    }

    get getAddress(): string {
        return this.address;
    }
}
