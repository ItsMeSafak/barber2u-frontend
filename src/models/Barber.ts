import User from "./User";

/**
 * Barber class which can be used for creating barber objects.
 */
export default class Barber extends User {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private companyName: string;
    private kvkNumber: string;
    private btwVatNumber: string;
    private workRadius: number;
    private user: User;

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
        isVerified: boolean,
        companyName: string,
        kvkNumber: string,
        btwVatNumber: string,
        workRadius: number,
        user: User
    ) {
        super(
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            zipCode,
            roles,
            isActive,
            isVerified
        );
        this.companyName = companyName;
        this.kvkNumber = kvkNumber;
        this.btwVatNumber = btwVatNumber;
        this.workRadius = workRadius;
        this.user = user;
    }

    // eslint-disable-next-line require-jsdoc
    get getCompanyName(): string {
        return this.companyName;
    }

    // eslint-disable-next-line require-jsdoc
    get getKvkNumber(): string {
        return this.kvkNumber;
    }

    // eslint-disable-next-line require-jsdoc
    get getBtwVatNumber(): string {
        return this.btwVatNumber;
    }

    // eslint-disable-next-line require-jsdoc
    get getWorkRadius(): number {
        return this.workRadius;
    }

    // eslint-disable-next-line require-jsdoc
    get getUser(): User {
        return this.user;
    }

    // eslint-disable-next-line require-jsdoc
    set setUser(user: User) {
        this.user = user;
    }

    // eslint-disable-next-line require-jsdoc
    static fromJSON(json: Barber | null): Barber {
        return Object.assign(Object.create(Barber.prototype), json);
    }
}
