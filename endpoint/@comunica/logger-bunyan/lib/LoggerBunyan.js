"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerBunyan = void 0;
const types_1 = require("@comunica/types");
const BunyanLogger = require("bunyan");
/**
 * A bunyan-based logger implementation.
 */
class LoggerBunyan extends types_1.Logger {
    constructor(args) {
        super();
        args.streams = args.streamProviders.map(provider => provider.createStream());
        this.bunyanLogger = BunyanLogger.createLogger(args);
    }
    fatal(message, data) {
        this.bunyanLogger.fatal(data, message);
    }
    error(message, data) {
        this.bunyanLogger.error(data, message);
    }
    warn(message, data) {
        this.bunyanLogger.warn(data, message);
    }
    info(message, data) {
        this.bunyanLogger.info(data, message);
    }
    debug(message, data) {
        this.bunyanLogger.debug(data, message);
    }
    trace(message, data) {
        this.bunyanLogger.trace(data, message);
    }
}
exports.LoggerBunyan = LoggerBunyan;
//# sourceMappingURL=LoggerBunyan.js.map