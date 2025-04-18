"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinSingle = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
/**
 * A comunica Single RDF Join Actor.
 */
class ActorRdfJoinSingle extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'single',
            limitEntries: 1,
        });
        this.includeInLogs = false;
    }
    async test(action) {
        // Allow joining of one or zero streams
        if (action.entries.length !== 1) {
            return (0, core_1.failTest)(`Actor ${this.name} can only join a single entry`);
        }
        return await this.getJoinCoefficients(action, undefined);
    }
    async getOutput(action) {
        return {
            result: action.entries[0].output,
        };
    }
    async getJoinCoefficients(action, sideData) {
        return (0, core_1.passTestWithSideData)({
            iterations: 0,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: 0,
        }, sideData);
    }
}
exports.ActorRdfJoinSingle = ActorRdfJoinSingle;
//# sourceMappingURL=ActorRdfJoinSingle.js.map