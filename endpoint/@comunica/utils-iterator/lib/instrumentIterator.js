"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentIterator = void 0;
/**
 * Profile an iterator by monkey-patching its `_read` and `read` methods.
 * @param iterator
 */
function instrumentIterator(iterator) {
    const counters = {
        count: 0,
        timeSelf: 0,
        timeLife: 0,
    };
    instrumentIteratorInner(iterator, counters, true);
    return new Promise((resolve) => {
        iterator.on('end', () => {
            resolve(counters);
        });
    });
}
exports.instrumentIterator = instrumentIterator;
function instrumentIteratorInner(iterator, counter, top) {
    if (!('_profileInstrumented' in iterator)) {
        // Only patch an iterator once.
        iterator._profileInstrumented = true;
        // Patch _read
        if ('_read' in iterator) {
            const readOld = iterator._read;
            iterator._read = (count, done) => {
                const startTime = performance.now();
                readOld.call(iterator, count, () => {
                    counter.timeSelf += performance.now() - startTime;
                    done();
                });
            };
        }
        // Patch read
        if ('read' in iterator) {
            // eslint-disable-next-line ts/unbound-method
            const readOld = iterator.read;
            iterator.read = () => {
                const startTime = performance.now();
                const ret = readOld.call(iterator);
                if (top && ret) {
                    counter.count++;
                }
                counter.timeSelf += performance.now() - startTime;
                return ret;
            };
        }
        // Measure total time
        if (top) {
            const startTime = performance.now();
            iterator.on('end', () => {
                counter.timeLife = performance.now() - startTime;
            });
        }
        // Also patch children
        if ('_source' in iterator) {
            instrumentIteratorInner(iterator._source, counter, false);
        }
    }
}
//# sourceMappingURL=instrumentIterator.js.map