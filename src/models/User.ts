/**
 * User class which can be used for creating user objects.
 */
export default class User {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
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

    // eslint-disable-next-line require-jsdoc
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

    // eslint-disable-next-line require-jsdoc
    set setFirstName(value: string) {
        this.firstName = value;
    }

    // eslint-disable-next-line require-jsdoc
    get getEmail(): string {
        return this.email;
    }

    // eslint-disable-next-line require-jsdoc
    get getFirstName(): string {
        return this.firstName;
    }

    // eslint-disable-next-line require-jsdoc
    get getLastName(): string {
        return this.lastName;
    }

    // eslint-disable-next-line require-jsdoc
    get getFullNameWithInitial(): string {
        return `${this.getFirstNameFirstLetter}.${this.getLastName.charAt(0).toUpperCase() + this.getLastName.slice(1)}`;
    }

    // eslint-disable-next-line require-jsdoc
    get getFirstNameFirstLetter(): string {
        return this.firstName.charAt(0).toUpperCase();
    }

    // eslint-disable-next-line require-jsdoc
    get getRoles(): Array<{ id: string; name: string }> {
        return this.roles;
    }

    // eslint-disable-next-line require-jsdoc
    get getRoleNames(): Array<string> {
        return this.roles.map(({ name }) => name);
    }

    // eslint-disable-next-line require-jsdoc
    get getIsVerified(): boolean {
        return this.isVerified;
    }
}
