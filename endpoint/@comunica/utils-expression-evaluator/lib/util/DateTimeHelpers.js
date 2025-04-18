"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTimeZone = exports.extractRawTimeZone = exports.dayTimeDurationsToSeconds = exports.yearMonthDurationsToMonths = exports.trimToDayTimeDuration = exports.trimToYearMonthDuration = exports.toUTCDate = exports.toJSDate = exports.negateDuration = exports.toDateTimeRepresentation = exports.defaultedDateTimeRepresentation = exports.simplifyDurationRepresentation = exports.defaultedDurationRepresentation = exports.defaultedYearMonthDurationRepresentation = exports.defaultedDayTimeDurationRepresentation = void 0;
// Important is to notice JS and XSD datatypes have different defaulted values
// | Field | Default in JS | Default in XSD_DayTime | Default in XSD_Duration |
// | Month | 0             | 1                      | 0                       |
// | Day   | 1             | 1                      | 0                       |
function defaultedDayTimeDurationRepresentation(rep) {
    return {
        day: rep.day ?? 0,
        hours: rep.hours ?? 0,
        minutes: rep.minutes ?? 0,
        seconds: rep.seconds ?? 0,
    };
}
exports.defaultedDayTimeDurationRepresentation = defaultedDayTimeDurationRepresentation;
function defaultedYearMonthDurationRepresentation(rep) {
    return {
        year: rep.year ?? 0,
        month: rep.month ?? 0,
    };
}
exports.defaultedYearMonthDurationRepresentation = defaultedYearMonthDurationRepresentation;
function defaultedDurationRepresentation(rep) {
    return {
        ...defaultedDayTimeDurationRepresentation(rep),
        ...defaultedYearMonthDurationRepresentation(rep),
    };
}
exports.defaultedDurationRepresentation = defaultedDurationRepresentation;
function simplifyDurationRepresentation(rep) {
    const temp = defaultedDurationRepresentation(rep);
    const res = {};
    // Simplify year part
    const years = temp.year + Math.trunc(temp.month / 12);
    if (years) {
        res.year = years;
        temp.month %= 12;
    }
    if (temp.month) {
        res.month = temp.month;
    }
    // Simplify day part
    const days = temp.day + Math.trunc(temp.hours / 24) +
        Math.trunc(temp.minutes / (24 * 60)) + Math.trunc(temp.seconds / (24 * 60 * 60));
    if (days) {
        res.day = days;
        temp.hours %= 24;
        temp.minutes %= 24 * 60;
        temp.seconds %= 24 * 60 * 60;
    }
    const hours = temp.hours + Math.trunc(temp.minutes / 60) +
        Math.trunc(temp.seconds / (60 * 60));
    if (hours) {
        res.hours = hours;
        temp.minutes %= 60;
        temp.seconds %= 60 * 60;
    }
    const minutes = temp.minutes + Math.trunc(temp.seconds / 60);
    if (minutes) {
        res.minutes = minutes;
        temp.seconds %= 60;
    }
    if (temp.seconds) {
        res.seconds = temp.seconds;
    }
    return res;
}
exports.simplifyDurationRepresentation = simplifyDurationRepresentation;
function defaultedDateTimeRepresentation(rep) {
    return {
        ...rep,
        day: rep.day ?? 1,
        hours: rep.hours ?? 0,
        month: rep.month ?? 1,
        year: rep.year ?? 0,
        seconds: rep.seconds ?? 0,
        minutes: rep.minutes ?? 0,
    };
}
exports.defaultedDateTimeRepresentation = defaultedDateTimeRepresentation;
function toDateTimeRepresentation({ date, timeZone }) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        zoneHours: timeZone.zoneHours,
        zoneMinutes: timeZone.zoneMinutes,
    };
}
exports.toDateTimeRepresentation = toDateTimeRepresentation;
function negateDuration(dur) {
    return {
        year: dur.year === undefined ? undefined : -1 * dur.year,
        month: dur.month === undefined ? undefined : -1 * dur.month,
        day: dur.day === undefined ? undefined : -1 * dur.day,
        hours: dur.hours === undefined ? undefined : -1 * dur.hours,
        minutes: dur.minutes === undefined ? undefined : -1 * dur.minutes,
        seconds: dur.seconds === undefined ? undefined : -1 * dur.seconds,
    };
}
exports.negateDuration = negateDuration;
function toJSDate(date) {
    // The given hours will be assumed to be local time.
    const res = new Date(date.year, date.month - 1, date.day, date.hours, date.minutes, Math.trunc(date.seconds), (date.seconds % 1) * 1_000);
    if (date.year >= 0 && date.year < 100) {
        // Special rule of date has gone int action:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#individual_date_and_time_component_values
        const jumpDeltaOfDate = 1_900;
        res.setFullYear(res.getFullYear() - jumpDeltaOfDate);
    }
    return res;
}
exports.toJSDate = toJSDate;
function toUTCDate(date, defaultTimezone) {
    const localTime = toJSDate(defaultedDateTimeRepresentation(date));
    // This date has been constructed in machine local time, now we alter it to become UTC and convert to correct timezone
    // Correction needed from local machine timezone to UTC
    const minutesCorrectionLocal = localTime.getTimezoneOffset();
    // Correction needed from UTC to provided timeZone
    const hourCorrectionUTC = date.zoneHours ?? defaultTimezone.zoneHours;
    const minutesCorrectionUTC = date.zoneMinutes ?? defaultTimezone.zoneMinutes;
    return new Date(localTime.getTime() - (minutesCorrectionLocal + hourCorrectionUTC * 60 + minutesCorrectionUTC) * 60 * 1_000);
}
exports.toUTCDate = toUTCDate;
function trimToYearMonthDuration(dur) {
    return {
        year: dur.year,
        month: dur.month,
    };
}
exports.trimToYearMonthDuration = trimToYearMonthDuration;
function trimToDayTimeDuration(dur) {
    return {
        day: dur.day,
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
    };
}
exports.trimToDayTimeDuration = trimToDayTimeDuration;
function yearMonthDurationsToMonths(dur) {
    return dur.year * 12 + dur.month;
}
exports.yearMonthDurationsToMonths = yearMonthDurationsToMonths;
function dayTimeDurationsToSeconds(dur) {
    return (((dur.day * 24) + dur.hours) * 60 + dur.minutes) * 60 + dur.seconds;
}
exports.dayTimeDurationsToSeconds = dayTimeDurationsToSeconds;
function extractRawTimeZone(zoneContained) {
    const extraction = /(Z|([+-]\d\d:\d\d))?$/u.exec(zoneContained);
    // It is safe to cast here because the empty string can always match.
    return extraction[0];
}
exports.extractRawTimeZone = extractRawTimeZone;
function extractTimeZone(date) {
    return {
        zoneHours: date.getTimezoneOffset() / 60,
        zoneMinutes: date.getTimezoneOffset() % 60,
    };
}
exports.extractTimeZone = extractTimeZone;
//# sourceMappingURL=DateTimeHelpers.js.map