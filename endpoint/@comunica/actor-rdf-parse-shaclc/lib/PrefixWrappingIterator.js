"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixWrappingIterator = void 0;
const asynciterator_1 = require("asynciterator");
/**
 * An iterator that emits prefixes on the first read call where prefixes are available
 */
class PrefixWrappingIterator extends asynciterator_1.WrappingIterator {
    constructor(source) {
        super(source?.then((src) => {
            this.prefixes = src.prefixes;
            return src;
        }));
    }
    read() {
        // On the first read where the prefixes are available, emit them
        if (this.prefixes) {
            for (const args of Object.entries(this.prefixes)) {
                this.emit('prefix', ...args);
            }
            delete this.prefixes;
        }
        return super.read();
    }
}
exports.PrefixWrappingIterator = PrefixWrappingIterator;
//# sourceMappingURL=PrefixWrappingIterator.js.map