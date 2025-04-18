"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticIntermediateResults = void 0;
const context_entries_1 = require("@comunica/context-entries");
const statistic_base_1 = require("@comunica/statistic-base");
class StatisticIntermediateResults extends statistic_base_1.StatisticBase {
    constructor() {
        super(...arguments);
        this.key = context_entries_1.KeysStatistics.intermediateResults;
    }
    ;
    updateStatistic(intermediateResult) {
        intermediateResult.metadata.time = performance.now();
        this.emit(intermediateResult);
        return true;
    }
}
exports.StatisticIntermediateResults = StatisticIntermediateResults;
//# sourceMappingURL=StatisticIntermediateResults.js.map