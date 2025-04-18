import type { AsyncIterator, TransformIteratorOptions } from 'asynciterator';
import { TransformIterator } from 'asynciterator';
/**
 * Splits an iterator into chunks based on a given block size.
 */
export declare class ChunkedIterator<T> extends TransformIterator<T, AsyncIterator<T>> {
    protected readonly blockSize: number;
    protected chunk: T[];
    constructor(source: AsyncIterator<T>, blockSize: number, options?: TransformIteratorOptions<T>);
    protected consumeChunkAsIterator(): AsyncIterator<T>;
    protected _transform(item: T, done: () => void, push: (i: AsyncIterator<T>) => void): void;
    protected _flush(done: () => void): void;
}
