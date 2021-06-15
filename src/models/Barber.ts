import User from "./User";

/**
 * Barber class which can be used for creating barber objects.
 */
export default class Barber extends User {
    private companyName: string;
    private kvkNumber: string;
    private btwVatNumber: string;
    private workRadius: number;

    constructor(
        user: User,
        companyName: string,
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
        this.companyName = companyName;
        this.kvkNumber = kvkNumber;
        this.btwVatNumber = btwVatNumber;
        this.workRadius = workRadius;
    }

    get getCompanyName(): string {
        return this.companyName;
    }

    get getKvkNumber(): string {
        return this.kvkNumber;
    }

    get getBtwVatNumber(): string {
        return this.btwVatNumber;
    }

    get getWorkRadius(): number {
        return this.workRadius;
    }

    get getWorkRadiusWithMetric(): string {
        return `${this.getWorkRadius} km.`;
    }

    getUser(): User {
        return super.getUser();
    }

    static fromJSON(json: Barber | null): Barber {
        return Object.assign(Object.create(Barber.prototype), json);
    }
}
