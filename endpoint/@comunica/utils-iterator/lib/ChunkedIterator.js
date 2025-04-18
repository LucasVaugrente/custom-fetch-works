"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkedIterator = void 0;
const asynciterator_1 = require("asynciterator");
/**
 * Splits an iterator into chunks based on a given block size.
 */
class ChunkedIterator extends asynciterator_1.TransformIterator {
    constructor(source, blockSize, options) {
        super(source, options);
        this.chunk = [];
        this.blockSize = blockSize;
    }
    consumeChunkAsIterator() {
        const it = new asynciterator_1.ArrayIterator(this.chunk, { autoStart: false });
        this.chunk = [];
        return it;
    }
    _transform(item, done, push) {
        this.chunk.push(item);
        if (this.chunk.length >= this.blockSize) {
            push(this.consumeChunkAsIterator());
        }
        done();
    }
    _flush(done) {
        if (this.chunk.length > 0) {
            this._push(this.consumeChunkAsIterator());
        }
        super._flush(done);
    }
}
exports.ChunkedIterator = ChunkedIterator;
//# sourceMappingURL=ChunkedIterator.js.map