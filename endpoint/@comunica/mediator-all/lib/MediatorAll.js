"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorAll = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica mediator that runs all actors that resolve their test.
 * This mediator will always resolve to the first actor's output.
 */
class MediatorAll extends core_1.Mediator {
    constructor(args) {
        super(args);
    }
    async mediate(action) {
        // Collect all actors that resolve their test
        const passedResults = [];
        let testResults;
        try {
            testResults = this.publish(action);
        }
        catch {
            testResults = [];
        }
        for (const testResult of testResults) {
            const reply = await testResult.reply;
            if (reply.isPassed()) {
                passedResults.push({ actor: testResult.actor, sideData: reply.getSideData() });
            }
        }
        // Send action to all valid actors
        const outputs = await Promise.all(passedResults.map(result => result.actor.runObservable(action, result.sideData)));
        return outputs[0];
    }
    async mediateWith() {
        throw new Error('Unsupported operation: MediatorAll#mediateWith');
    }
}
exports.MediatorAll = MediatorAll;
//# sourceMappingURL=MediatorAll.js.map