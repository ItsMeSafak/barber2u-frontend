import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import moment, { Moment } from "moment";
import styles from "./styles.module.scss";

// TODO remove static openingstimes

/**
 *
 * @constructor
 */
const DateTimePicker: React.FC<{ timePeriod: number, selectedDateTime: {startTime: Moment, endTime: Moment} }> = ({ timePeriod, selectedDateTime }) => {
    const openingsTime = [
        { startTime: moment("2021-04-12 08:00:00"), endTime: moment("2021-04-12 09:00:00") },
        { startTime: moment("2021-04-13 08:00:00"), endTime: moment("2021-04-13 09:00:00") },
        { startTime: moment("2021-04-14 08:00:00"), endTime: moment("2021-04-14 09:00:00") },
        { startTime: moment("2021-04-15 08:00:00"), endTime: moment("2021-04-15 09:00:00") },
        { startTime: moment("2021-04-16 08:00:00"), endTime: moment("2021-04-16 09:00:00") },
        { startTime: moment("2021-04-16 12:00:00"), endTime: moment("2021-04-16 13:00:00") },
        { startTime: moment("2021-04-16 18:00:00"), endTime: moment("2021-04-16 20:00:00") },
        { startTime: moment("2021-04-17 08:00:00"), endTime: moment("2021-04-17 09:00:00") },
        { startTime: moment("2021-04-18 08:00:00"), endTime: moment("2021-04-18 18:00:00") },
        { startTime: moment("2021-04-19 08:00:00"), endTime: moment("2021-04-19 09:00:00") },
        { startTime: moment("2021-04-20 08:00:00"), endTime: moment("2021-04-20 09:00:00") },
        { startTime: moment("2021-04-21 08:00:00"), endTime: moment("2021-04-21 09:00:00") }
    ];

    // The abbreviations of the weekday names
    const weekDayAbbreviations = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // The weekdays for the day selector
    const weekDays = openingsTime
        // Map all the times to the start of the day
        .map((x) => x.startTime)
        // Remove the duplicates
        .filter((x, index, self) =>
            index === self.findIndex((y) => (x.isSame(y, "day"))))
        // Filter all the times that exceeds a full week and the times in the past.
        .filter((x) => {
            const dayDifference = x.clone().startOf("day").diff(moment().startOf("day"), "day");
            if (dayDifference >= 0 && dayDifference < 7) {
                return x;
            }
            return false;
        });

    const [selectedDay, setSelectedDay] = useState(weekDays[0]);
    const [selectedTime, setSelectedTime] = useState(openingsTime[1]); // TODO  no correct default value

    /**
     *
     */
    const onSelectedDay = (day: Moment) => {
        setSelectedDay(day);
        const time = openingsTime.find(x => x.startTime.isSame(day));
        if (time) setSelectedTime(time);
    };

    /**
     *
     * @param time
     */
    const onSelectedTime = (time: {startTime: Moment, endTime: Moment}) => {
        setSelectedTime(time);
        // eslint-disable-next-line no-param-reassign
        selectedDateTime = time;
    };

    /**
     *
     * @param period
     */
    const getTimes = (period: number) => {
        const times: { startTime: moment.Moment; endTime: moment.Moment; }[] = [];
        openingsTime.filter(x => selectedDay.isSame(x.startTime, "day")).map((day) => {
            let startTime = day.startTime.clone();
            const timeDifferenceInMinutes = moment
                .duration(day.endTime.diff(day.startTime))
                .asMinutes();
            const amount = timeDifferenceInMinutes / period;
            for (let i = 0; i < amount; i++) {
                const endTime = startTime.clone().add(period, "minutes");
                times.push({ startTime, endTime });
                startTime = endTime;
            }
        });

        return times;
    };

    return (
        <div className={styles.dateTimePicker}>
            <Row>
                {weekDays.map((day) => (
                    <Col
                        key={day.day()}
                        className={`${styles.dayPicker} ${selectedDay.isSame(day, "day") ? styles.dayPickerActive : ""}`}
                        onClick={() => onSelectedDay(day)}
                    >
                        {weekDayAbbreviations[day.weekday()]}
                    </Col>
                ))}
                {/* <Col className={styles.dayPicker}>CUSTOM</Col> */ /* TODO In case we want to use a custom datepicker */ }
            </Row>
            <Row gutter={[16, 24]} align="middle">
                { getTimes(timePeriod).map((day) => {
                    console.log("TIMES",getTimes(timePeriod));
                    return(
                    <Col key={day.startTime.valueOf()}>
                        <Card
                            className={`${styles.cards} ${day.startTime.isSame(selectedTime.startTime) ? styles.cardsActive : ""}`}
                            title="Morning"
                            size={!day.startTime.isSame(selectedTime.startTime) ? "small" : "default"}
                            onClick={() => setSelectedTime(day)}
                        >
                            <p>{day.startTime.format("D MMMM")}</p>
                            <p>{day.startTime.format("HH:mm")} - {day.endTime.format("HH:mm")}</p>
                        </Card>
                    </Col>);
                })}
            </Row>
            <Row>Selected: from {selectedTime.startTime.calendar()} to {selectedTime.endTime.calendar()} </Row>{/* TODO temp row to check data */}
        </div>
    );
};

export default DateTimePicker;
