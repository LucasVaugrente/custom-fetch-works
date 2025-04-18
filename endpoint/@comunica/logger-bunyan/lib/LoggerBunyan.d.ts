import { Logger } from '@comunica/types';
import type { LogLevelString } from 'bunyan';
import type { BunyanStreamProvider } from './stream/BunyanStreamProvider';
/**
 * A bunyan-based logger implementation.
 */
export declare class LoggerBunyan extends Logger {
    private readonly bunyanLogger;
    constructor(args: ILoggerBunyanArgs);
    fatal(message: string, data?: any): void;
    error(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    info(message: string, data?: any): void;
    debug(message: string, data?: any): void;
    trace(message: string, data?: any): void;
}
export interface ILoggerBunyanArgs {
    /**
     * The name of this logger
     * @default {comunica}
     */
    name: string;
    /**
     * A stream to output to
     */
    streamProviders: BunyanStreamProvider[];
    /**
     * The logging level to emit
     * @range {string}
     */
    level?: LogLevelString;
    [custom: string]: any;
}
