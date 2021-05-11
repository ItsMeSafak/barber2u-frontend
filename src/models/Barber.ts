import User from "./User";

/**
 * Barber class which can be used for creating barber objects.
 */
export default class Barber extends User {
    /* eslint-disable  require-jsdoc */
    private kvkNumber: string;
    private btwVatNumber: string;
    private workRadius: number;

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

    get getUser(): User {
        return this;
    }

    static fromJSON(json: Barber | null): Barber {
        return Object.assign(Object.create(Barber.prototype), json);
    }
}
