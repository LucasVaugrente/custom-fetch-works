"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorCombinePipeline = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica mediator that goes over all actors in sequence and forwards I/O.
 * This required the action input and the actor output to be of the same type.
 */
class MediatorCombinePipeline extends core_1.Mediator {
    constructor(args) {
        super(args);
    }
    async mediate(action) {
        let testResults;
        try {
            testResults = this.publish(action);
        }
        catch {
            // If no actors are available, just return the input as output
            return action;
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
        // Delegate test errors.
        const sideDatas = [];
        testResults = await Promise.all(testResults
            .map(async ({ actor, reply }, i) => {
            try {
                const awaitedReply = await reply;
                const value = awaitedReply.getOrThrow();
                sideDatas[i] = awaitedReply.getSideData();
                return { actor, reply: value };
            }
            catch (error) {
                throw new Error(this.constructFailureMessage(action, [error.message]));
            }
        }));
        // Order the test results if ordering is enabled
        if (this.order) {
            // A function used to extract an ordering value from a test result
            const getOrder = (elem) => {
                // If there is a field key use it, otherwise use the input
                // element for ordering
                const value = this.field ? elem[this.field] : elem;
                // Check the ordering value is a number
                if (typeof value !== 'number') {
                    throw new TypeError('Cannot order elements that are not numbers.');
                }
                return value;
            };
            testResults = testResults.sort((actor1, actor2) => (this.order === 'increasing' ? 1 : -1) *
                (getOrder(actor1.reply) - getOrder(actor2.reply)));
        }
        // Pass action to first actor,
        // and each actor output as input to the following actor.
        let handle = action;
        let i = 0;
        for (const { actor } of testResults) {
            handle = { ...handle, ...await actor.runObservable(handle, sideDatas[i++]) };
        }
        // Return the final actor output
        return handle;
    }
    mediateWith() {
        throw new Error('Method not supported.');
    }
}
exports.MediatorCombinePipeline = MediatorCombinePipeline;
//# sourceMappingURL=MediatorCombinePipeline.js.map