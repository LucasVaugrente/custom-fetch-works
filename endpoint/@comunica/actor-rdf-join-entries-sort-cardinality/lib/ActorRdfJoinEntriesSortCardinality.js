"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinEntriesSortCardinality = void 0;
const bus_rdf_join_entries_sort_1 = require("@comunica/bus-rdf-join-entries-sort");
const core_1 = require("@comunica/core");
/**
 * An actor that sorts join entries by increasing cardinality.
 */
class ActorRdfJoinEntriesSortCardinality extends bus_rdf_join_entries_sort_1.ActorRdfJoinEntriesSort {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const entries = [...action.entries]
            .sort((entryLeft, entryRight) => entryLeft.metadata.cardinality.value - entryRight.metadata.cardinality.value);
        return { entries };
    }
}
exports.ActorRdfJoinEntriesSortCardinality = ActorRdfJoinEntriesSortCardinality;
//# sourceMappingURL=ActorRdfJoinEntriesSortCardinality.js.map