"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosableIterator = void 0;
const asynciterator_1 = require("asynciterator");
/**
 * An AsyncIterator with a callback for when this iterator is closed in any way.
 * In contrast to ClosableTransformIterator, this does not add the overhead of a TransformIterator.
 */
class ClosableIterator extends asynciterator_1.AsyncIterator {
    constructor(source, options) {
        super();
        this.onClose = options.onClose;
        this._source = source;
        // Wire up the source for reading
        this._source[asynciterator_1.DESTINATION] = this;
        this._source.on('end', destinationClose);
        this._source.on('error', destinationEmitError);
        this._source.on('readable', destinationSetReadable);
        this.readable = this._source.readable;
    }
    read() {
        const ret = this._source.read();
        if (!ret) {
            // Mark as non-readable if ret was null
            this.readable = false;
            // Close this iterator if the source is empty
            if (this._source.done) {
                this.close();
            }
        }
        return ret;
    }
    _end(destroy) {
        this.onClose();
        this._source.removeListener('end', destinationClose);
        this._source.removeListener('error', destinationEmitError);
        this._source.removeListener('readable', destinationSetReadable);
        delete this._source[asynciterator_1.DESTINATION];
        this._source.destroy();
        super._end(destroy);
    }
}
exports.ClosableIterator = ClosableIterator;
// Helpers below are copied from AsyncIterator, as they are not exported from there.
function destinationSetReadable() {
    this[asynciterator_1.DESTINATION].readable = true;
}
function destinationEmitError(error) {
    this[asynciterator_1.DESTINATION].emit('error', error);
}
function destinationClose() {
    this[asynciterator_1.DESTINATION].close();
}
//# sourceMappingURL=ClosableIterator.js.map