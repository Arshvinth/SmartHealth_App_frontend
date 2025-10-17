
class CalendarServices {
    constructor() {
        this.months = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
    }

    async addToCalendar(eventConfig) {
        try {
            // Implementation would go here
            console.log('📅 Adding to calendar:', eventConfig);
            // Return mock success for now
            return true;
        } catch (error) {
            console.error('Calendar error:', error);
            throw new Error('Failed to add to calendar');
        }
    }

    parseAppointmentDateTime(dateString, timeString, addMinutes = 0) {
        try {
            const date = this.parseDate(dateString);
            const time = this.parseTime(timeString);

            const appointmentDate = new Date(date.year, date.month, date.day, time.hours, time.minutes);

            if (addMinutes !== 0) {
                appointmentDate.setMinutes(appointmentDate.getMinutes() + addMinutes);
            }

            return appointmentDate.toISOString();
        } catch (error) {
            console.error('Date parsing error:', error);
            return this.getFallbackDate();
        }
    }

    parseDate(dateString) {
        const dateParts = dateString.split(' ');
        return {
            month: this.getMonthNumber(dateParts[0]),
            day: parseInt(dateParts[1].replace(',', '')),
            year: parseInt(dateParts[2])
        };
    }

    parseTime(timeString) {
        const timeParts = timeString.split(' ');
        const time = timeParts[0].split(':');
        let hours = parseInt(time[0]);
        const minutes = parseInt(time[1]);
        const isPM = timeParts[1] === 'PM';

        // Convert to 24-hour format
        if (isPM && hours < 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        return { hours, minutes };
    }

    getMonthNumber(monthName) {
        return this.months[monthName] || 0;
    }

    getFallbackDate() {
        const fallbackDate = new Date();
        fallbackDate.setHours(fallbackDate.getHours() + 1);
        return fallbackDate.toISOString();
    }

    // Add this helper function to your component
    formatDateForCalendar = (isoDate) => {
        const date = new Date(isoDate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    formatTimeForCalendar = (isoDate) => {
        const date = new Date(isoDate);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes} ${ampm}`;
    };
}

export default new CalendarServices();