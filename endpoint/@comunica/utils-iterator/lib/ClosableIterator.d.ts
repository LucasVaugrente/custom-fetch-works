import { AsyncIterator, DESTINATION } from 'asynciterator';
type InternalSource<T> = AsyncIterator<T> & {
    [DESTINATION]?: AsyncIterator<any>;
};
/**
 * An AsyncIterator with a callback for when this iterator is closed in any way.
 * In contrast to ClosableTransformIterator, this does not add the overhead of a TransformIterator.
 */
export declare class ClosableIterator<S> extends AsyncIterator<S> {
    protected readonly _source: InternalSource<S>;
    private readonly onClose;
    constructor(source: AsyncIterator<S>, options: {
        onClose: () => void;
    });
    read(): S | null;
    protected _end(destroy: boolean): void;
}
export {};
