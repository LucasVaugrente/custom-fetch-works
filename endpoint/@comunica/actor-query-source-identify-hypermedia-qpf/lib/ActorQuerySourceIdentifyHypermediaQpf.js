"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifyHypermediaQpf = void 0;
const bus_query_source_identify_hypermedia_1 = require("@comunica/bus-query-source-identify-hypermedia");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const QuerySourceQpf_1 = require("./QuerySourceQpf");
/**
 * A comunica QPF Query Source Identify Hypermedia Actor.
 */
class ActorQuerySourceIdentifyHypermediaQpf extends bus_query_source_identify_hypermedia_1.ActorQuerySourceIdentifyHypermedia {
    constructor(args) {
        super(args, 'qpf');
    }
    async test(action) {
        if (action.forceSourceType && (action.forceSourceType !== 'qpf' && action.forceSourceType !== 'brtpf')) {
            return (0, core_1.failTest)(`Actor ${this.name} is not able to handle source type ${action.forceSourceType}.`);
        }
        return this.testMetadata(action);
    }
    async testMetadata(action) {
        const { searchForm } = await this.createSource(action.url, action.metadata, action.context, action.forceSourceType === 'brtpf');
        if (!searchForm) {
            return (0, core_1.failTest)('Illegal state: found no TPF/QPF search form anymore in metadata.');
        }
        if (action.handledDatasets && action.handledDatasets[searchForm.dataset]) {
            return (0, core_1.failTest)(`Actor ${this.name} can only be applied for the first page of a QPF dataset.`);
        }
        return (0, core_1.passTest)({ filterFactor: 1 });
    }
    /**
     * Look for the search form
     * @param {IActionRdfResolveHypermedia} action the metadata to look for the form.
     * @return {Promise<IActorRdfResolveHypermediaOutput>} A promise resolving to a hypermedia form.
     */
    async run(action) {
        this.logInfo(action.context, `Identified as qpf source: ${action.url}`);
        const source = await this.createSource(action.url, action.metadata, action.context, action.forceSourceType === 'brtpf', action.quads);
        return { source, dataset: source.searchForm.dataset };
    }
    async createSource(url, metadata, context, bindingsRestricted, quads) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        return new QuerySourceQpf_1.QuerySourceQpf(this.mediatorMetadata, this.mediatorMetadataExtract, this.mediatorDereferenceRdf, dataFactory, algebraFactory, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory), this.subjectUri, this.predicateUri, this.objectUri, this.graphUri, url, metadata, bindingsRestricted, quads);
    }
}
exports.ActorQuerySourceIdentifyHypermediaQpf = ActorQuerySourceIdentifyHypermediaQpf;
//# sourceMappingURL=ActorQuerySourceIdentifyHypermediaQpf.js.map