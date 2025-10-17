import calendarUtils from "../utils/calendarUtils";

class CalendarEventBuilder {
    constructor() {
        this.eventConfig = {};
    }

    setTitle(title) {
        this.eventConfig.title = title;
        return this;
    }

    setLocation(location) {
        this.eventConfig.location = location;
        return this;
    }

    setNotes(notes) {
        this.eventConfig.notes = notes;
        return this;
    }

    setStartDate(dateString, timeString, addMinutes = 0) {
        this.eventConfig.startDate = calendarUtils.parseAppointmentDateTime(dateString, timeString, addMinutes);

        return this;
    }

    setEndDate(dateString, timeString, addMinutes = 0) {
        this.eventConfig.endDate = calendarUtils.parseAppointmentDateTime(dateString, timeString, addMinutes);
        return this;
    }

    addAlarm(minutesBefore = 60) {
        if (!this.eventConfig.alarms) {
            this.eventConfig.alarms = [];
        }
        this.eventConfig.alarms.push({ date: -minutesBefore });
        return this;
    }

    build() {
        return this.eventConfig;
    }
}

export default CalendarEventBuilder;