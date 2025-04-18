"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationConstruct = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const rdf_terms_1 = require("rdf-terms");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const BindingsToQuadsIterator_1 = require("./BindingsToQuadsIterator");
/**
 * A comunica Construct Query Operation Actor.
 */
class ActorQueryOperationConstruct extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'construct');
    }
    /**
     * Find all variables in a list of triple patterns.
     * @param {Algebra.Pattern[]} patterns An array of triple patterns.
     * @return {RDF.Variable[]} The variables in the triple patterns.
     */
    static getVariables(patterns) {
        return (0, rdf_terms_1.uniqTerms)([].concat
            .apply([], patterns.map(pattern => (0, rdf_terms_1.getVariables)((0, rdf_terms_1.getTermsNested)(pattern)))));
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operationOriginal, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        // Apply a projection on our CONSTRUCT variables first, as the query may contain other variables as well.
        const variables = ActorQueryOperationConstruct.getVariables(operationOriginal.template);
        const operation = { type: sparqlalgebrajs_1.Algebra.types.PROJECT, input: operationOriginal.input, variables };
        // Evaluate the input query
        const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation, context }));
        // Construct triples using the result based on the pattern.
        // If it's a DESCRIBE query don't apply the blank node localisation.
        const quadStream = new BindingsToQuadsIterator_1.BindingsToQuadsIterator(dataFactory, operationOriginal.template, output.bindingsStream);
        // Let the final metadata contain the estimated number of triples
        const metadata = () => output.metadata().then(meta => ({
            ...meta,
            order: undefined,
            cardinality: {
                type: meta.cardinality.type,
                value: meta.cardinality.value * operationOriginal.template.length,
            },
            availableOrders: undefined,
        }));
        return {
            metadata,
            quadStream,
            type: 'quads',
        };
    }
}
exports.ActorQueryOperationConstruct = ActorQueryOperationConstruct;
//# sourceMappingURL=ActorQueryOperationConstruct.js.map