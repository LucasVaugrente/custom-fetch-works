import type { LogLevelString, Stream } from 'bunyan';
/**
 * BunyanStreamProvider is able to create bunyan streams.
 */
export declare abstract class BunyanStreamProvider {
    readonly name: string;
    readonly level: LogLevelString;
    constructor(args: IBunyanStreamProviderArgs);
    abstract createStream(): Stream;
}
export interface IBunyanStreamProviderArgs {
    /**
     * The name of this logger
     * @default {comunica}
     */
    name?: string;
    /**
     * The logging level to emit
     */
    level?: LogLevelString;
}
