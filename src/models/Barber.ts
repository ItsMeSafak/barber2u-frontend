import User from "./User";

/**
 * Barber class which can be used for creating barber objects.
 */
export default class Barber extends User {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    // private user: User;
    private kvkNumber: string;
    private btwVatNumber: string;
    private workRadius: number;

    // eslint-disable-next-line require-jsdoc
    constructor(
        user: User,
        kvkNumber: string,
        btwVatNumber: string,
        workRadius: number
    ) {
        super(
            user.getId,
            user.getFirstName,
            user.getLastName,
            user.getEmail,
            user.getPhoneNumber,
            user.getAddress,
            user.getZipCode,
            user.getRoles,
            user.getIsActive,
            user.getIsVerified
        );
        this.kvkNumber = kvkNumber;
        this.btwVatNumber = btwVatNumber;
        this.workRadius = workRadius;
    }

    // eslint-disable-next-line require-jsdoc
    get getUser(): User {
        return this;
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
