import type { IDateTimeRepresentation, IDayTimeDurationRepresentation, IDurationRepresentation, ITimeZoneRepresentation, IYearMonthDurationRepresentation } from '@comunica/types';
export declare function defaultedDayTimeDurationRepresentation(rep: Partial<IDayTimeDurationRepresentation>): IDayTimeDurationRepresentation;
export declare function defaultedYearMonthDurationRepresentation(rep: Partial<IYearMonthDurationRepresentation>): IYearMonthDurationRepresentation;
export declare function defaultedDurationRepresentation(rep: Partial<IDurationRepresentation>): IDurationRepresentation;
export declare function simplifyDurationRepresentation(rep: Partial<IDurationRepresentation>): Partial<IDurationRepresentation>;
export declare function defaultedDateTimeRepresentation(rep: Partial<IDateTimeRepresentation>): IDateTimeRepresentation;
export declare function toDateTimeRepresentation({ date, timeZone }: {
    date: Date;
    timeZone: ITimeZoneRepresentation;
}): IDateTimeRepresentation;
export declare function negateDuration(dur: Partial<IDurationRepresentation>): Partial<IDurationRepresentation>;
export declare function toJSDate(date: IDateTimeRepresentation): Date;
export declare function toUTCDate(date: Partial<IDateTimeRepresentation>, defaultTimezone: ITimeZoneRepresentation): Date;
export declare function trimToYearMonthDuration(dur: Partial<IDurationRepresentation>): Partial<IYearMonthDurationRepresentation>;
export declare function trimToDayTimeDuration(dur: Partial<IDurationRepresentation>): Partial<IDayTimeDurationRepresentation>;
export declare function yearMonthDurationsToMonths(dur: IYearMonthDurationRepresentation): number;
export declare function dayTimeDurationsToSeconds(dur: IDayTimeDurationRepresentation): number;
export declare function extractRawTimeZone(zoneContained: string): string;
export declare function extractTimeZone(date: Date): ITimeZoneRepresentation;
