"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateHypermediaSparql = void 0;
const bus_rdf_update_hypermedia_1 = require("@comunica/bus-rdf-update-hypermedia");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const QuadDestinationSparql_1 = require("./QuadDestinationSparql");
/**
 * A comunica SPARQL RDF Update Hypermedia Actor.
 */
class ActorRdfUpdateHypermediaSparql extends bus_rdf_update_hypermedia_1.ActorRdfUpdateHypermedia {
    constructor(args) {
        super(args, 'sparql');
    }
    async testMetadata(action) {
        if (!action.forceDestinationType && !action.metadata.sparqlService &&
            !(this.checkUrlSuffixSparql && action.url.endsWith('/sparql')) &&
            !(this.checkUrlSuffixUpdate && action.url.endsWith('/update'))) {
            return (0, core_1.failTest)(`Actor ${this.name} could not detect a SPARQL service description or URL ending on /sparql or /update.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        this.logInfo(action.context, `Identified as sparql destination: ${action.url}`);
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        return {
            destination: new QuadDestinationSparql_1.QuadDestinationSparql(action.metadata.sparqlService || action.url, action.context, this.mediatorHttp, dataFactory),
        };
    }
}
exports.ActorRdfUpdateHypermediaSparql = ActorRdfUpdateHypermediaSparql;
//# sourceMappingURL=ActorRdfUpdateHypermediaSparql.js.map