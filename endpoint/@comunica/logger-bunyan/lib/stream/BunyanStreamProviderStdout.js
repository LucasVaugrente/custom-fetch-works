"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BunyanStreamProviderStdout = void 0;
const BunyanStreamProvider_1 = require("./BunyanStreamProvider");
const process = require('process/');
/**
 * A stdout bunyan stream provider.
 */
class BunyanStreamProviderStdout extends BunyanStreamProvider_1.BunyanStreamProvider {
    constructor(args) {
        super(args);
    }
    createStream() {
        return { name: this.name, stream: process.stdout, level: this.level };
    }
}
exports.BunyanStreamProviderStdout = BunyanStreamProviderStdout;
//# sourceMappingURL=BunyanStreamProviderStdout.js.map