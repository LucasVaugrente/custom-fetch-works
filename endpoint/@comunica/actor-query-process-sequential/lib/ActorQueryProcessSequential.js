"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryProcessSequential = void 0;
const bus_query_process_1 = require("@comunica/bus-query-process");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Sequential Query Process Actor.
 */
class ActorQueryProcessSequential extends bus_query_process_1.ActorQueryProcess {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.context.get(context_entries_1.KeysInitQuery.explain) ?? action.context.get(new core_1.ActionContextKey('explain'))) {
            return (0, core_1.failTest)(`${this.name} is not able to explain queries.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Run all query processing steps in sequence
        let { operation, context } = await this.parse(action.query, action.context);
        ({ operation, context } = await this.optimize(operation, context));
        const output = await this.evaluate(operation, context);
        return { result: output };
    }
    async parse(query, context) {
        // Pre-processing the context
        context = (await this.mediatorContextPreprocess.mediate({ context, initialize: true })).context;
        // Parse query
        let operation;
        if (typeof query === 'string') {
            // Save the original query string in the context
            context = context.set(context_entries_1.KeysInitQuery.queryString, query);
            const baseIRI = context.get(context_entries_1.KeysInitQuery.baseIRI);
            const queryFormat = context.get(context_entries_1.KeysInitQuery.queryFormat);
            const queryParseOutput = await this.mediatorQueryParse.mediate({ context, query, queryFormat, baseIRI });
            operation = queryParseOutput.operation;
            // Update the baseIRI in the context if the query modified it.
            if (queryParseOutput.baseIRI) {
                context = context.set(context_entries_1.KeysInitQuery.baseIRI, queryParseOutput.baseIRI);
            }
        }
        else {
            operation = query;
        }
        // Apply initial bindings in context
        if (context.has(context_entries_1.KeysInitQuery.initialBindings)) {
            const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
            const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
            const bindingsFactory = await utils_bindings_factory_1.BindingsFactory
                .create(this.mediatorMergeBindingsContext, context, dataFactory);
            operation = (0, utils_query_operation_1.materializeOperation)(operation, context.get(context_entries_1.KeysInitQuery.initialBindings), algebraFactory, bindingsFactory);
            // Delete the query string from the context, since our initial query might have changed
            context = context.delete(context_entries_1.KeysInitQuery.queryString);
        }
        return { operation, context };
    }
    async optimize(operation, context) {
        // Save initial query in context
        context = context.set(context_entries_1.KeysInitQuery.query, operation);
        ({ operation, context } = await this.mediatorOptimizeQueryOperation.mediate({ context, operation }));
        // Save original query in context
        context = context.set(context_entries_1.KeysInitQuery.query, operation);
        return { operation, context };
    }
    async evaluate(operation, context) {
        const output = await this.mediatorQueryOperation.mediate({ context, operation });
        output.context = context;
        return output;
    }
}
exports.ActorQueryProcessSequential = ActorQueryProcessSequential;
//# sourceMappingURL=ActorQueryProcessSequential.js.map