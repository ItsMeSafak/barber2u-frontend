import moment, { Moment } from "moment";

/**
 * A helper model for having 2 moments which represent a start moment and an end moment
 */
export default class MomentRange {
    startTime: Moment;
    endTime: Moment;

    constructor(start: moment.Moment, end: moment.Moment) {
        this.startTime = start;
        this.endTime = end;
    }
}
