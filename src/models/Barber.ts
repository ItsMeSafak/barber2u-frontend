import User from "./User";

/**
 * Barber class which can be used for creating barber objects.
 */
export default class Barber extends User {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private kvk_number: string;
    private btw_vat_number: string;
    private work_radius: number;
    private user: User;

    // eslint-disable-next-line require-jsdoc
    constructor(
        email: string,
        firstName: string,
        lastName: string,
        zipCode: string,
        phoneNumber: string,
        kvk_number: string,
        btw_vat_number: string,
        work_radius: number,
        user: User
    ) {
        super(email, firstName, lastName, zipCode, phoneNumber);
        this.kvk_number = kvk_number;
        this.btw_vat_number = btw_vat_number;
        this.work_radius = work_radius;
        this.user = user;
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
