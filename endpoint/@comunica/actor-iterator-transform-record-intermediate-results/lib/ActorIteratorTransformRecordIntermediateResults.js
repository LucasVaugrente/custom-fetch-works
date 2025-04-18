"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorIteratorTransformRecordIntermediateResults = void 0;
const bus_iterator_transform_1 = require("@comunica/bus-iterator-transform");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A comunica Record Intermediate Results Iterator Transform Actor.
 * This actor updates the intermediate result statistic when an intermediate result is produced.
 */
class ActorIteratorTransformRecordIntermediateResults extends bus_iterator_transform_1.ActorIteratorTransform {
    constructor(args) {
        super(args);
    }
    async transformIteratorBindings(action) {
        const statisticIntermediateResults = action.context
            .getSafe(context_entries_1.KeysStatistics.intermediateResults);
        const output = action.stream.map((data) => {
            statisticIntermediateResults.updateStatistic({
                type: action.type,
                data,
                metadata: {
                    operation: action.operation,
                    metadata: action.metadata,
                },
            });
            return data;
        });
        return { stream: output, metadata: action.metadata };
    }
    async transformIteratorQuads(action) {
        const statisticIntermediateResults = action.context
            .getSafe(context_entries_1.KeysStatistics.intermediateResults);
        const output = action.stream.map((data) => {
            statisticIntermediateResults.updateStatistic({
                type: action.type,
                data,
                metadata: {
                    operation: action.operation,
                    metadata: action.metadata,
                },
            });
            return data;
        });
        return { stream: output, metadata: action.metadata };
    }
    async testIteratorTransform(_action) {
        return (0, core_1.passTestVoid)();
    }
}
exports.ActorIteratorTransformRecordIntermediateResults = ActorIteratorTransformRecordIntermediateResults;
//# sourceMappingURL=ActorIteratorTransformRecordIntermediateResults.js.map