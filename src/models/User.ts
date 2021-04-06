/**
 * User class which can be used for creating user objects.
 */
export default class User {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private firstName: string;
    private lastName: string;
    private email: string;
    private zipCode: string;
    private phoneNumber: string;

    // eslint-disable-next-line require-jsdoc
    constructor(
        email: string,
        firstName: string,
        lastName: string,
        zipCode: string,
        phoneNumber: string
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
    }

    // eslint-disable-next-line require-jsdoc
    set setEmail(value: string) {
        this.email = value;
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
        return `${this.getFirstNameFirstLetter}. ${this.getLastName}`;
    }

    // eslint-disable-next-line require-jsdoc
    get getFirstNameFirstLetter(): string {
        return this.firstName.charAt(0).toUpperCase();
    }

    // eslint-disable-next-line require-jsdoc
    static fromJSON(json: User | null): User {
        return Object.assign(Object.create(User.prototype), json);
    }
}
