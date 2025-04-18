import { Logger } from '@comunica/types';
/**
 * A logger that pretty-prints everything.
 */
export declare class LoggerPretty extends Logger {
    static readonly COLOR_RESET: string;
    static readonly COLOR_RED: string;
    static readonly COLOR_GREEN: string;
    static readonly COLOR_YELLOW: string;
    static readonly COLOR_BLUE: string;
    static readonly COLOR_MAGENTA: string;
    static readonly COLOR_CYAN: string;
    static readonly COLOR_GRAY: string;
    private readonly level;
    private readonly levelOrdinal;
    private readonly actors?;
    constructor(args: ILoggerPrettyArgs);
    debug(message: string, data?: any): void;
    error(message: string, data?: any): void;
    fatal(message: string, data?: any): void;
    info(message: string, data?: any): void;
    trace(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    protected log(level: string, color: string, message: string, data?: any): void;
    /**
     * Return a string in a given color
     * @param str The string that should be printed in
     * @param color A given color
     */
    static withColor(str: any, color: string): string;
}
export interface ILoggerPrettyArgs {
    /**
     * The minimum logging level.
     */
    level: string;
    /**
     * A whitelist of actor IRIs to log for.
     */
    actors?: Record<string, boolean>;
}
