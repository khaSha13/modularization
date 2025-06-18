const moment = require('moment-timezone');

class TimeUtils {
    static getCurrentUTCTime(format) {
        const now = moment.utc();
        return format ? now.format(format) : now;
    }

    static convertUtc(time, timezone, format) {
        if (!moment.tz.zone(timezone)) {
            throw new Error(`Invalid timezone: ${timezone}`);
        }

        const localTime = moment(time).tz(timezone);
        return format ? localTime.format(format) : localTime;
    }

    static formatTime(time, format) {
        return moment(time).format(format);
    }
}

module.exports = TimeUtils;
