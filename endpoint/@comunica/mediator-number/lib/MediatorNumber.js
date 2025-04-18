"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorNumber = void 0;
const core_1 = require("@comunica/core");
/**
 * A mediator that can mediate over a single number field.
 *
 * It takes the required 'field' and 'type' parameters.
 * The 'field' parameter represents the field name of the test result field over which must be mediated.
 * The 'type' parameter
 */
class MediatorNumber extends core_1.Mediator {
    constructor(args) {
        super(args);
        this.indexPicker = this.createIndexPicker();
    }
    /**
     * @return {(tests: T[]) => number} A function that returns the index of the test result
     *                                  that has been chosen by this mediator.
     */
    createIndexPicker() {
        switch (this.type) {
            case 'min':
                return (tests) => tests.reduce((prev, curr, i) => {
                    const val = this.getOrDefault(curr[this.field], Number.POSITIVE_INFINITY);
                    return val !== null && (Number.isNaN(prev[0]) || prev[0] > val) ? [val, i] : prev;
                }, [Number.NaN, -1])[1];
            case 'max':
                return (tests) => tests.reduce((prev, curr, i) => {
                    const val = this.getOrDefault(curr[this.field], Number.NEGATIVE_INFINITY);
                    return val !== null && (Number.isNaN(prev[0]) || prev[0] < val) ? [val, i] : prev;
                }, [Number.NaN, -1])[1];
            default:
                // eslint-disable-next-line ts/restrict-template-expressions
                throw new Error(`No valid "type" value was given, must be either 'min' or 'max', but got: ${this.type}`);
        }
    }
    getOrDefault(value, defaultValue) {
        // eslint-disable-next-line ts/prefer-nullish-coalescing
        return value === undefined ? defaultValue : value;
    }
    async mediateWith(action, testResults) {
        let wrappedResults = await Promise.all(testResults.map(({ reply }) => reply));
        // Collect failures if we want to ignore them
        const failures = [];
        if (this.ignoreFailures) {
            const dummy = {};
            dummy[this.field] = null;
            wrappedResults = wrappedResults.map((result) => {
                if (result.isFailed()) {
                    failures.push(result.getFailMessage());
                    return (0, core_1.passTestWithSideData)(dummy, undefined);
                }
                return result;
            });
        }
        // Resolve values
        const sideDatas = [];
        const results = wrappedResults.map((result, i) => {
            const value = result.getOrThrow();
            sideDatas[i] = result.getSideData();
            return value;
        });
        // Determine one value
        const index = this.indexPicker(results);
        if (index < 0) {
            return (0, core_1.failTest)(this.constructFailureMessage(action, failures));
        }
        return (0, core_1.passTestWithSideData)(testResults[index].actor, sideDatas[index]);
    }
}
exports.MediatorNumber = MediatorNumber;
//# sourceMappingURL=MediatorNumber.js.map