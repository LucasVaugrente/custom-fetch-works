"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinEntriesSort = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-join-entries-sort events.
 *
 * Actor types:
 * * Input:  IActionRdfJoinEntriesSort:      Join entries.
 * * Test:   IActorTest:                     Test result.
 * * Output: IActorRdfJoinEntriesSortOutput: The sorted join entries.
 *
 * @see IActionRdfJoinEntriesSort
 * @see IActorTest
 * @see IActorRdfJoinEntriesSortOutput
 */
class ActorRdfJoinEntriesSort extends core_1.Actor {
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Sorting join entries failed: none of the configured actors were able to sort} busFailMessage
     */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfJoinEntriesSort = ActorRdfJoinEntriesSort;
//# sourceMappingURL=ActorRdfJoinEntriesSort.js.map