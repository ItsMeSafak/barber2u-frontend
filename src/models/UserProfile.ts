/**
 * User Profile class which can be used for updating user properties.
 */
export default class UserProfile {
    private email: string;
    private firstName: string;
    private lastName: string;
    private phoneNumber: string;
    private address: string;
    private zipCode: string;

    // eslint-disable-next-line require-jsdoc
    constructor(
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        address: string,
        zipCode: string
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.zipCode = zipCode;
    }
}
