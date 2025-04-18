"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CONTEXT_WRAPPED = exports.ActorQuerySourceIdentifyHypermediaAnnotateSource = void 0;
const bus_query_source_identify_hypermedia_1 = require("@comunica/bus-query-source-identify-hypermedia");
const core_1 = require("@comunica/core");
const QuerySourceAddSourceAttribution_1 = require("./QuerySourceAddSourceAttribution");
/**
 * A comunica None Query Source Identify Hypermedia Actor.
 */
class ActorQuerySourceIdentifyHypermediaAnnotateSource extends bus_query_source_identify_hypermedia_1.ActorQuerySourceIdentifyHypermedia {
    constructor(args) {
        super(args, 'file');
    }
    async testMetadata(action) {
        if (action.context.get(exports.KEY_CONTEXT_WRAPPED)) {
            return (0, core_1.failTest)('Unable to wrap query source multiple times');
        }
        return (0, core_1.passTest)({ filterFactor: Number.POSITIVE_INFINITY });
    }
    async run(action) {
        const context = action.context.set(exports.KEY_CONTEXT_WRAPPED, true);
        action.context = context;
        const { source, dataset } = await this.mediatorQuerySourceIdentifyHypermedia.mediate(action);
        return { source: new QuerySourceAddSourceAttribution_1.QuerySourceAddSourceAttribution(source), dataset };
    }
}
exports.ActorQuerySourceIdentifyHypermediaAnnotateSource = ActorQuerySourceIdentifyHypermediaAnnotateSource;
exports.KEY_CONTEXT_WRAPPED = new core_1.ActionContextKey('@comunica/actor-query-source-identify-hypermedia-annotate-source:wrapped');
//# sourceMappingURL=ActorQuerySourceIdentifyHypermediaAnnotateSource.js.map