"use strict";
// TODO: Find a library for this, because this is basically an xsd datatypes parser
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDayTimeDuration = exports.parseYearMonthDuration = exports.parseDuration = exports.parseTime = exports.parseDate = exports.parseDateTime = exports.parseXSDDecimal = exports.parseXSDFloat = void 0;
const DateTimeHelpers_1 = require("./DateTimeHelpers");
const Errors_1 = require("./Errors");
const SpecAlgos_1 = require("./SpecAlgos");
/**
 * TODO: Fix decently
 * Parses float datatypes (double, float).
 *
 * All invalid lexical values return undefined.
 *
 * @param value the string to interpret as a number
 */
function parseXSDFloat(value) {
    const numb = Number(value);
    if (Number.isNaN(numb)) {
        if (value === 'NaN') {
            return Number.NaN;
        }
        if (value === 'INF' || value === '+INF') {
            return Number.POSITIVE_INFINITY;
        }
        if (value === '-INF') {
            return Number.NEGATIVE_INFINITY;
        }
        return undefined;
    }
    return numb;
}
exports.parseXSDFloat = parseXSDFloat;
/**
 * Parses decimal datatypes (decimal, int, byte, nonPositiveInteger, etc...).
 *
 * All other values, including NaN, INF, and floating point numbers all
 * return undefined;
 *
 * @param value the string to interpret as a number
 */
function parseXSDDecimal(value) {
    const numb = Number(value);
    return Number.isNaN(numb) ? undefined : numb;
}
exports.parseXSDDecimal = parseXSDDecimal;
function parseDateTime(dateTimeStr) {
    // https://www.w3.org/TR/xmlschema-2/#dateTime
    const [date, time] = dateTimeStr.split('T');
    if (time === undefined) {
        throw new Errors_1.ParseError(dateTimeStr, 'dateTime');
    }
    return { ...parseDate(date), ...__parseTime(time) };
}
exports.parseDateTime = parseDateTime;
function parseTimeZone(timeZoneStr) {
    // https://www.w3.org/TR/xmlschema-2/#dateTime-timezones
    if (timeZoneStr === '') {
        return { zoneHours: undefined, zoneMinutes: undefined };
    }
    if (timeZoneStr === 'Z') {
        return { zoneHours: 0, zoneMinutes: 0 };
    }
    const timeZoneStrings = timeZoneStr.replaceAll(/^([+|-])(\d\d):(\d\d)$/gu, '$11!$2!$3').split('!');
    const timeZone = timeZoneStrings.map(Number);
    return {
        zoneHours: timeZone[0] * timeZone[1],
        zoneMinutes: timeZone[0] * timeZone[2],
    };
}
function parseDate(dateStr) {
    // https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
    const formatted = dateStr.replaceAll(/^(-)?([123456789]*\d{4})-(\d\d)-(\d\d)(Z|([+-]\d\d:\d\d))?$/gu, '$11!$2!$3!$4!$5');
    if (formatted === dateStr) {
        throw new Errors_1.ParseError(dateStr, 'date');
    }
    const dateStrings = formatted.split('!');
    const date = dateStrings.slice(0, -1).map(Number);
    const res = {
        year: date[0] * date[1],
        month: date[2],
        day: date[3],
        ...parseTimeZone(dateStrings[4]),
    };
    if (!(res.month >= 1 && res.month <= 12) || !(res.day >= 1 && res.day <= (0, SpecAlgos_1.maximumDayInMonthFor)(res.year, res.month))) {
        throw new Errors_1.ParseError(dateStr, 'date');
    }
    return res;
}
exports.parseDate = parseDate;
function __parseTime(timeStr) {
    // https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
    const formatted = timeStr.replaceAll(/^(\d\d):(\d\d):(\d\d(\.\d+)?)(Z|([+-]\d\d:\d\d))?$/gu, '$1!$2!$3!$5');
    if (formatted === timeStr) {
        throw new Errors_1.ParseError(timeStr, 'time');
    }
    const timeStrings = formatted.split('!');
    const time = timeStrings.slice(0, -1).map(Number);
    const res = {
        hours: time[0],
        minutes: time[1],
        seconds: time[2],
        ...parseTimeZone(timeStrings[3]),
    };
    if (res.seconds >= 60 || res.minutes >= 60 || res.hours > 24 ||
        (res.hours === 24 && (res.minutes !== 0 || res.seconds !== 0))) {
        throw new Errors_1.ParseError(timeStr, 'time');
    }
    return res;
}
// We make a separation in internal and external since dateTime will have hour-date rollover,
// but time just does modulo the time.
function parseTime(timeStr) {
    // https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
    const res = __parseTime(timeStr);
    res.hours %= 24;
    return res;
}
exports.parseTime = parseTime;
function parseDuration(durationStr) {
    // https://www.w3.org/TR/xmlschema-2/#duration-lexical-repr
    const [dayNotation, timeNotation] = durationStr.split('T');
    // Handle date part
    const formattedDayDur = dayNotation.replaceAll(/^(-)?P(\d+Y)?(\d+M)?(\d+D)?$/gu, '$11S!$2!$3!$4');
    if (formattedDayDur === dayNotation) {
        throw new Errors_1.ParseError(durationStr, 'duration');
    }
    const durationStrings = formattedDayDur.split('!');
    if (timeNotation !== undefined) {
        const formattedTimeDur = timeNotation.replaceAll(/^(\d+H)?(\d+M)?(\d+(\.\d+)?S)?$/gu, '$1!$2!$3');
        if (timeNotation === '' || timeNotation === formattedTimeDur) {
            throw new Errors_1.ParseError(durationStr, 'duration');
        }
        durationStrings.push(...formattedTimeDur.split('!'));
    }
    const duration = durationStrings.map(str => str.slice(0, -1));
    if (!duration.slice(1).some(Boolean)) {
        throw new Errors_1.ParseError(durationStr, 'duration');
    }
    const sign = Number(duration[0]);
    return (0, DateTimeHelpers_1.simplifyDurationRepresentation)({
        year: duration[1] ? sign * Number(duration[1]) : undefined,
        month: duration[2] ? sign * Number(duration[2]) : undefined,
        day: duration[3] ? sign * Number(duration[3]) : undefined,
        hours: duration[4] ? sign * Number(duration[4]) : undefined,
        minutes: duration[5] ? sign * Number(duration[5]) : undefined,
        seconds: duration[6] ? sign * Number(duration[6]) : undefined,
    });
}
exports.parseDuration = parseDuration;
function parseYearMonthDuration(durationStr) {
    const res = parseDuration(durationStr);
    if (['hours', 'minutes', 'seconds', 'day'].some(key => Boolean(res[key]))) {
        throw new Errors_1.ParseError(durationStr, 'yearMonthDuration');
    }
    return res;
}
exports.parseYearMonthDuration = parseYearMonthDuration;
function parseDayTimeDuration(durationStr) {
    const res = parseDuration(durationStr);
    if (['year', 'month'].some(key => Boolean(res[key]))) {
        throw new Errors_1.ParseError(durationStr, 'dayTimeDuration');
    }
    return res;
}
exports.parseDayTimeDuration = parseDayTimeDuration;
//# sourceMappingURL=Parsing.js.map