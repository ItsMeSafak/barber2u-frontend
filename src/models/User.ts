export class User {
    private firstName?: string;

    private lastName?: string;

    private email: string;

    private password: string;

    constructor(email: string, password: string);
    constructor(
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
    ) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set setEmail(value: string) {
        this.email = value;
    }

    set setPassword(value: string) {
        this.password = value;
    }

    get getEmail(): string {
        return this.email;
    }

    get getPassword(): string {
        return this.password;
    }
}
