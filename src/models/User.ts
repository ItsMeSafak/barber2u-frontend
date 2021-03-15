/**
 * User class which can be used for creating user objects.
 */
export class User {
    private firstName: string;

    private lastName: string;

    private email: string;

    private password: string;

    private zipCode: string;
    private phoneNumber: string;

    // constructor(email: string, password: string);

    // eslint-disable-next-line require-jsdoc
    constructor(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        zipCode: string,
        phoneNumber: string
    ) {
        this.email = email;
        this.password = password;
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
    set setPassword(value: string) {
        this.password = value;
    }

    // eslint-disable-next-line require-jsdoc
    get getEmail(): string {
        return this.email;
    }

    // eslint-disable-next-line require-jsdoc
    get getPassword(): string {
        return this.password;
    }
}
