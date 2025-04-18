"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifyHypermediaSparql = void 0;
const bus_query_source_identify_hypermedia_1 = require("@comunica/bus-query-source-identify-hypermedia");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const QuerySourceSparql_1 = require("./QuerySourceSparql");
/**
 * A comunica SPARQL Query Source Identify Hypermedia Actor.
 */
class ActorQuerySourceIdentifyHypermediaSparql extends bus_query_source_identify_hypermedia_1.ActorQuerySourceIdentifyHypermedia {
    constructor(args) {
        super(args, 'sparql');
    }
    async testMetadata(action) {
        if (!action.forceSourceType && !action.metadata.sparqlService &&
            !(this.checkUrlSuffix && action.url.endsWith('/sparql'))) {
            return (0, core_1.failTest)(`Actor ${this.name} could not detect a SPARQL service description or URL ending on /sparql.`);
        }
        return (0, core_1.passTest)({ filterFactor: 1 });
    }
    async run(action) {
        this.logInfo(action.context, `Identified ${action.url} as sparql source with service URL: ${action.metadata.sparqlService || action.url}`);
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const source = new QuerySourceSparql_1.QuerySourceSparql(action.forceSourceType ? action.url : action.metadata.sparqlService || action.url, action.context, this.mediatorHttp, this.bindMethod, dataFactory, algebraFactory, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory), this.forceHttpGet, this.cacheSize, this.countTimeout);
        return { source };
    }
}
exports.ActorQuerySourceIdentifyHypermediaSparql = ActorQuerySourceIdentifyHypermediaSparql;
//# sourceMappingURL=ActorQuerySourceIdentifyHypermediaSparql.js.map