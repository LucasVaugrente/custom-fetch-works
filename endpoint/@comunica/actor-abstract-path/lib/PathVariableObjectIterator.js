"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathVariableObjectIterator = void 0;
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const rdf_string_1 = require("rdf-string");
/**
 * An iterator that implements the multi-length property path operation (* and +)
 * for a fixed subject and predicate, and a variable object.
 */
class PathVariableObjectIterator extends asynciterator_1.BufferedIterator {
    constructor(algebraFactory, subject, predicate, graph, context, mediatorQueryOperation, emitFirstSubject, maxRunningOperations = 16) {
        // The autoStart flag must be true to kickstart metadata collection
        super({ autoStart: true });
        this.algebraFactory = algebraFactory;
        this.subject = subject;
        this.predicate = predicate;
        this.graph = graph;
        this.context = context;
        this.mediatorQueryOperation = mediatorQueryOperation;
        this.maxRunningOperations = maxRunningOperations;
        this.termHashes = new Map();
        this.runningOperations = [];
        this.pendingOperations = [];
        // Push the subject as starting point
        this._push(this.subject, emitFirstSubject);
    }
    _end(destroy) {
        // Close all running iterators
        for (const it of this.runningOperations) {
            it.destroy();
        }
        super._end(destroy);
    }
    _push(item, pushAsResult = true) {
        let termString;
        if (pushAsResult) {
            // Don't push if this subject was already found
            termString = (0, rdf_string_1.termToString)(item);
            if (this.termHashes.has(termString)) {
                return;
            }
        }
        // Add a pending path operation for this item
        const variable = this.algebraFactory.dataFactory.variable('b');
        this.pendingOperations.push({
            variable,
            operation: this.algebraFactory.createPath(item, this.predicate, variable, this.graph),
        });
        // Otherwise, push the subject
        if (termString) {
            this.termHashes.set(termString, item);
            super._push(item);
        }
    }
    _read(count, done) {
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        (async function () {
            // Open as many operations as possible
            while (self.runningOperations.length < self.maxRunningOperations) {
                if (self.pendingOperations.length === 0) {
                    break;
                }
                const pendingOperation = self.pendingOperations.pop();
                const results = (0, utils_query_operation_1.getSafeBindings)(await self.mediatorQueryOperation.mediate({ operation: pendingOperation.operation, context: self.context }));
                const runningOperation = results.bindingsStream.transform({
                    autoStart: false,
                    transform(bindings, next, push) {
                        const newTerm = bindings.get(pendingOperation.variable);
                        push(newTerm);
                        next();
                    },
                });
                if (!runningOperation.done) {
                    self.runningOperations.push(runningOperation);
                    runningOperation.on('error', error => self.destroy(error));
                    runningOperation.on('readable', () => {
                        self.readable = true;
                        self._fillBufferAsync();
                    });
                    runningOperation.on('end', () => {
                        self.runningOperations.splice(self.runningOperations.indexOf(runningOperation), 1);
                        self.readable = true;
                        self._fillBufferAsync();
                    });
                }
                self.setProperty('metadata', results.metadata);
            }
            // Try to read `count` items (based on UnionIterator)
            let lastCount = 0;
            let item;
            // eslint-disable-next-line no-cond-assign
            while (lastCount !== (lastCount = count)) {
                // Prioritize the operations that have been added first
                for (let i = 0; i < self.runningOperations.length && count > 0; i++) {
                    // eslint-disable-next-line no-cond-assign
                    if ((item = self.runningOperations[i].read()) !== null) {
                        count--;
                        self._push(item);
                    }
                }
            }
            // Close if everything has been read
            if (self.runningOperations.length === 0 && self.pendingOperations.length === 0) {
                self.close();
            }
        })().then(() => {
            done();
        }, error => this.destroy(error));
    }
}
exports.PathVariableObjectIterator = PathVariableObjectIterator;
//# sourceMappingURL=PathVariableObjectIterator.js.map