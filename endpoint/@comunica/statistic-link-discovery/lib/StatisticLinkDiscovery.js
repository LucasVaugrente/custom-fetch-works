"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticLinkDiscovery = void 0;
const context_entries_1 = require("@comunica/context-entries");
const statistic_base_1 = require("@comunica/statistic-base");
class StatisticLinkDiscovery extends statistic_base_1.StatisticBase {
    constructor() {
        super();
        this.count = 0;
        this.metadata = {};
        this.key = context_entries_1.KeysStatistics.discoveredLinks;
    }
    updateStatistic(link, parent) {
        const discoveredLinkMetadata = {
            ...link.metadata,
            discoveredTimestamp: performance.now(),
            discoverOrder: this.count,
        };
        // Retain previous metadata if this link has already been discovered, and add any metadata in the passed link
        this.metadata[link.url] = this.metadata[link.url] ?
            [...this.metadata[link.url], discoveredLinkMetadata] :
            [discoveredLinkMetadata];
        this.emit({
            edge: [parent.url, link.url],
            metadataChild: this.metadata[link.url],
            metadataParent: this.metadata[parent.url],
        });
        this.count++;
        return true;
    }
}
exports.StatisticLinkDiscovery = StatisticLinkDiscovery;
//# sourceMappingURL=StatisticLinkDiscovery.js.map