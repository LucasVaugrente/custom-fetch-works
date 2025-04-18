"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CONTEXT_WRAPPED = exports.ActorQueryProcessAnnotateSourceBinding = void 0;
const bus_query_process_1 = require("@comunica/bus-query-process");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const rdf_data_factory_1 = require("rdf-data-factory");
/**
 * A comunica Annotate Source Binding Query Process Actor.
 */
class ActorQueryProcessAnnotateSourceBinding extends bus_query_process_1.ActorQueryProcess {
    constructor(args) {
        super(args);
        this.dataFactory = new rdf_data_factory_1.DataFactory();
    }
    async test(action) {
        if (action.context.get(exports.KEY_CONTEXT_WRAPPED)) {
            return (0, core_1.failTest)('Unable to query process multiple times');
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const context = action.context.set(exports.KEY_CONTEXT_WRAPPED, true);
        action.context = context;
        // Run all query processing steps in sequence
        const output = await this.mediatorQueryProcess.mediate(action);
        // Currently this only supports adding source provenance to bindings
        if (output.result.type === 'bindings') {
            output.result.bindingsStream = this.addSourcesToBindings(output.result.bindingsStream);
        }
        return output;
    }
    addSourcesToBindings(iterator) {
        const ret = iterator.map((bindings) => {
            if (bindings instanceof utils_bindings_factory_1.Bindings) {
                // Get sources from bindings context. If no sources are found, this should produce binding with empty literal
                const source = bindings.getContextEntry(context_entries_1.KeysMergeBindingsContext.sourcesBinding);
                const sourceAsLiteral = this.dataFactory.literal(JSON.stringify(source ?? []));
                bindings = bindings.set('_source', sourceAsLiteral);
            }
            return bindings;
        });
        return ret;
    }
}
exports.ActorQueryProcessAnnotateSourceBinding = ActorQueryProcessAnnotateSourceBinding;
exports.KEY_CONTEXT_WRAPPED = new core_1.ActionContextKey('@comunica/actor-query-process-annotate-source-binding:wrapped');
//# sourceMappingURL=ActorQueryProcessAnnotateSourceBinding.js.map