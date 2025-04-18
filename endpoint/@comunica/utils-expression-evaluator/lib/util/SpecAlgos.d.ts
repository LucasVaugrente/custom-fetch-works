import type { IDateTimeRepresentation, IDurationRepresentation, ITimeZoneRepresentation } from '@comunica/types';
export declare function maximumDayInMonthFor(yearValue: number, monthValue: number): number;
export declare function addDurationToDateTime(date: IDateTimeRepresentation, duration: IDurationRepresentation): IDateTimeRepresentation;
export declare function elapsedDuration(first: IDateTimeRepresentation, second: IDateTimeRepresentation, defaultTimeZone: ITimeZoneRepresentation): Partial<IDurationRepresentation>;
