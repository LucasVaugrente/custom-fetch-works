import type { AsyncIterator } from 'asynciterator';
export type IteratorCounters = {
    /**
     * The total time spent within `_read` and `read`.
     */
    timeSelf: number;
    /**
     * The time between creation and ending.
     */
    timeLife: number;
    /**
     * The number of elements produced.
     */
    count: number;
};
/**
 * Profile an iterator by monkey-patching its `_read` and `read` methods.
 * @param iterator
 */
export declare function instrumentIterator(iterator: AsyncIterator<any>): Promise<IteratorCounters>;
