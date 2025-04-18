"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BunyanStreamProviderStderr = void 0;
const BunyanStreamProvider_1 = require("./BunyanStreamProvider");
const process = require('process/');
/**
 * A stderr bunyan stream provider.
 */
class BunyanStreamProviderStderr extends BunyanStreamProvider_1.BunyanStreamProvider {
    constructor(args) {
        super(args);
    }
    createStream() {
        return { name: this.name, stream: process.stderr, level: this.level };
    }
}
exports.BunyanStreamProviderStderr = BunyanStreamProviderStderr;
//# sourceMappingURL=BunyanStreamProviderStderr.js.map