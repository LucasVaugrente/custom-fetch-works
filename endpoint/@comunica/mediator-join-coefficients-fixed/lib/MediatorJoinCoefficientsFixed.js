"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorJoinCoefficientsFixed = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A mediator that mediates over actors implementing the Join Coefficients mediator type and assigns fixed weights
 * to calculate an overall score and pick the actor with the lowest score.
 */
class MediatorJoinCoefficientsFixed extends core_1.Mediator {
    constructor(args) {
        super(args);
    }
    async mediateWith(action, testResults) {
        // Obtain test results
        const errors = [];
        const promises = testResults.map(({ reply }) => reply);
        const results = (await Promise.all(promises)).map((testResult) => {
            if (testResult.isFailed()) {
                errors.push(testResult.getFailMessage());
                // eslint-disable-next-line array-callback-return
                return;
            }
            return { value: testResult.get(), sideData: testResult.getSideData() };
        });
        // Calculate costs
        let costs = results
            // eslint-disable-next-line array-callback-return
            .map((result) => {
            if (result) {
                return result.value.iterations * this.cpuWeight +
                    result.value.persistedItems * this.memoryWeight +
                    result.value.blockingItems * this.timeWeight +
                    result.value.requestTime * this.ioWeight;
            }
        });
        const maxCost = Math.max(...costs.filter(cost => cost !== undefined));
        // If we have a limit indicator in the context,
        // increase cost of entries that have a number of iterations that is higher than the limit AND block items.
        // In these cases, join operators that produce results early on will be preferred.
        const limitIndicator = action.context.get(context_entries_1.KeysQueryOperation.limitIndicator);
        if (limitIndicator) {
            costs = costs.map((cost, i) => {
                if (cost !== undefined && (results[i]?.value).blockingItems > 0 &&
                    (results[i]?.value).iterations > limitIndicator) {
                    return cost + maxCost;
                }
                return cost;
            });
        }
        // Determine index with lowest cost
        let minIndex = -1;
        let minValue = Number.POSITIVE_INFINITY;
        for (const [i, cost] of costs.entries()) {
            if (cost !== undefined && (minIndex === -1 || cost < minValue)) {
                minIndex = i;
                minValue = cost;
            }
        }
        // Reject if all actors rejected
        if (minIndex < 0) {
            return (0, core_1.failTest)(this.constructFailureMessage(action, errors));
        }
        // Return actor with lowest cost
        const bestActor = testResults[minIndex].actor;
        // Emit calculations in logger
        if (bestActor.includeInLogs) {
            core_1.Actor.getContextLogger(action.context)?.debug(`Determined physical join operator '${bestActor.logicalType}-${bestActor.physicalName}'`, {
                entries: action.entries.length,
                variables: await Promise.all(action.entries
                    .map(async (entry) => (await entry.output.metadata()).variables.map(variable => variable.variable.value))),
                costs: Object.fromEntries(costs.map((coeff, i) => [
                    `${testResults[i].actor.logicalType}-${testResults[i].actor.physicalName}`,
                    coeff,
                ]).filter(entry => entry[1] !== undefined)),
                coefficients: Object.fromEntries(results.map((result, i) => [
                    `${testResults[i].actor.logicalType}-${testResults[i].actor.physicalName}`,
                    result?.value,
                ]).filter(entry => entry[1] !== undefined)),
            });
        }
        return (0, core_1.passTestWithSideData)(bestActor, results[minIndex].sideData);
    }
}
exports.MediatorJoinCoefficientsFixed = MediatorJoinCoefficientsFixed;
//# sourceMappingURL=MediatorJoinCoefficientsFixed.js.map