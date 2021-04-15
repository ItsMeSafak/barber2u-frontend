import moment, { Moment } from "moment";

/**
 * A helper model for having 2 moments which represent a start moment and an end moment
 */
export default class MomentRange {
    start: Moment;
    end: Moment;

    // eslint-disable-next-line require-jsdoc
    constructor(start: moment.Moment, end: moment.Moment) {
        this.start = start;
        this.end = end;
    }
}
