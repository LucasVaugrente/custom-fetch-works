"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticLinkDereference = void 0;
const context_entries_1 = require("@comunica/context-entries");
const statistic_base_1 = require("@comunica/statistic-base");
class StatisticLinkDereference extends statistic_base_1.StatisticBase {
    constructor() {
        super();
        this.count = 0;
        this.key = context_entries_1.KeysStatistics.dereferencedLinks;
    }
    updateStatistic(link, source) {
        this.emit({
            url: link.url,
            metadata: {
                type: source.constructor.name,
                dereferencedTimestamp: performance.now(),
                dereferenceOrder: this.count,
                ...link.metadata,
            },
            context: link.context,
            transform: link.transform,
        });
        this.count++;
        return true;
    }
}
exports.StatisticLinkDereference = StatisticLinkDereference;
//# sourceMappingURL=StatisticLinkDereference.js.map