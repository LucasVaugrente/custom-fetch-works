"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorCombineUnion = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica mediator that takes the union of all actor results.
 *
 * The actors that are registered first will have priority on setting overlapping fields.
 */
class MediatorCombineUnion extends core_1.Mediator {
    constructor(args) {
        super(args);
        this.combiner = this.createCombiner();
    }
    async mediate(action) {
        let testResults;
        try {
            testResults = this.publish(action);
        }
        catch {
            testResults = [];
        }
        if (this.filterFailures) {
            const _testResults = [];
            for (const result of testResults) {
                const reply = await result.reply;
                if (reply.isPassed()) {
                    _testResults.push(result);
                }
            }
            testResults = _testResults;
        }
        // Delegate reply errors.
        const sideDatas = [];
        await Promise.all(testResults.map(async ({ reply }, i) => {
            const awaited = (await reply);
            const value = awaited.getOrThrow();
            sideDatas[i] = awaited.getSideData();
            return value;
        }));
        // Run action on all actors.
        const results = await Promise.all(testResults
            .map((result, i) => result.actor.runObservable(action, sideDatas[i])));
        // Return the combined results.
        return this.combiner(results);
    }
    mediateWith() {
        throw new Error('Method not supported.');
    }
    createCombiner() {
        return (results) => {
            const data = {};
            data[this.field] = {};
            // eslint-disable-next-line unicorn/prefer-spread
            [{}].concat(results.map((result) => result[this.field]))
                // eslint-disable-next-line unicorn/no-array-for-each
                .forEach((value) => {
                data[this.field] = { ...value, ...data[this.field] };
            });
            return data;
        };
    }
}
exports.MediatorCombineUnion = MediatorCombineUnion;
//# sourceMappingURL=MediatorCombineUnion.js.map