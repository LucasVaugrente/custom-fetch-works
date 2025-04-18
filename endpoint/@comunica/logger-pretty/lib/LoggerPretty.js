"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerPretty = void 0;
const types_1 = require("@comunica/types");
// Use require instead of import for default exports, to be compatible with variants of esModuleInterop in tsconfig.
// eslint-disable-next-line ts/no-require-imports
const objectInspect = require("object-inspect");
const process = require('process/');
/**
 * A logger that pretty-prints everything.
 */
class LoggerPretty extends types_1.Logger {
    constructor(args) {
        super();
        this.level = args.level;
        this.levelOrdinal = types_1.Logger.getLevelOrdinal(this.level);
        this.actors = args.actors;
    }
    debug(message, data) {
        this.log('debug', LoggerPretty.COLOR_GRAY, message, data);
    }
    error(message, data) {
        this.log('error', LoggerPretty.COLOR_RED, message, data);
    }
    fatal(message, data) {
        this.log('fatal', LoggerPretty.COLOR_CYAN, message, data);
    }
    info(message, data) {
        this.log('info', LoggerPretty.COLOR_GREEN, message, data);
    }
    trace(message, data) {
        this.log('trace', LoggerPretty.COLOR_BLUE, message, data);
    }
    warn(message, data) {
        this.log('warn', LoggerPretty.COLOR_YELLOW, message, data);
    }
    log(level, color, message, data) {
        if (types_1.Logger.getLevelOrdinal(level) >= this.levelOrdinal &&
            (!data || !('actor' in data) || !this.actors || this.actors[data.actor])) {
            process.stderr.write(LoggerPretty.withColor(`[${new Date().toISOString()}]  ${level.toUpperCase()}: ${message} ${objectInspect(data)}\n`, color));
        }
    }
    /**
     * Return a string in a given color
     * @param str The string that should be printed in
     * @param color A given color
     */
    static withColor(str, color) {
        return `${color}${str}${LoggerPretty.COLOR_RESET}`;
    }
}
exports.LoggerPretty = LoggerPretty;
LoggerPretty.COLOR_RESET = '\u001B[0m';
LoggerPretty.COLOR_RED = '\u001B[31m';
LoggerPretty.COLOR_GREEN = '\u001B[32m';
LoggerPretty.COLOR_YELLOW = '\u001B[33m';
LoggerPretty.COLOR_BLUE = '\u001B[34m';
LoggerPretty.COLOR_MAGENTA = '\u001B[35m';
LoggerPretty.COLOR_CYAN = '\u001B[36m';
LoggerPretty.COLOR_GRAY = '\u001B[90m';
//# sourceMappingURL=LoggerPretty.js.map