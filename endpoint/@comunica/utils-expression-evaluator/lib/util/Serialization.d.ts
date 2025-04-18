import type { IDateRepresentation, IDateTimeRepresentation, IDurationRepresentation, ITimeRepresentation } from '@comunica/types';
export declare function serializeDateTime(date: IDateTimeRepresentation): string;
export declare function serializeDate(date: IDateRepresentation): string;
export declare function serializeTime(time: ITimeRepresentation): string;
export declare function serializeDuration(dur: Partial<IDurationRepresentation>, zeroString?: 'PT0S' | 'P0M'): string;
