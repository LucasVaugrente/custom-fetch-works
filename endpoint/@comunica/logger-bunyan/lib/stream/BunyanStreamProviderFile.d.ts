import type { Stream } from 'bunyan';
import type { IBunyanStreamProviderArgs } from './BunyanStreamProvider';
import { BunyanStreamProvider } from './BunyanStreamProvider';
/**
 * A file bunyan stream provider.
 */
export declare class BunyanStreamProviderFile extends BunyanStreamProvider {
    readonly path: string;
    constructor(args: IBunyanStreamProviderFileArgs);
    createStream(): Stream;
}
export interface IBunyanStreamProviderFileArgs extends IBunyanStreamProviderArgs {
    /**
     * Path to the target log file
     */
    path: string;
}
