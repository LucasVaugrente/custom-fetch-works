import type { IDateRepresentation, IDateTimeRepresentation, IDayTimeDurationRepresentation, IDurationRepresentation, ITimeRepresentation, IYearMonthDurationRepresentation } from '@comunica/types';
/**
 * TODO: Fix decently
 * Parses float datatypes (double, float).
 *
 * All invalid lexical values return undefined.
 *
 * @param value the string to interpret as a number
 */
export declare function parseXSDFloat(value: string): number | undefined;
/**
 * Parses decimal datatypes (decimal, int, byte, nonPositiveInteger, etc...).
 *
 * All other values, including NaN, INF, and floating point numbers all
 * return undefined;
 *
 * @param value the string to interpret as a number
 */
export declare function parseXSDDecimal(value: string): number | undefined;
export declare function parseDateTime(dateTimeStr: string): IDateTimeRepresentation;
export declare function parseDate(dateStr: string): IDateRepresentation;
export declare function parseTime(timeStr: string): ITimeRepresentation;
export declare function parseDuration(durationStr: string): Partial<IDurationRepresentation>;
export declare function parseYearMonthDuration(durationStr: string): Partial<IYearMonthDurationRepresentation>;
export declare function parseDayTimeDuration(durationStr: string): Partial<IDayTimeDurationRepresentation>;
