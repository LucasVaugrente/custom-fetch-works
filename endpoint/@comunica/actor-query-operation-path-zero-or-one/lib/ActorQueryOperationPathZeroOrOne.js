"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathZeroOrOne = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_metadata_1 = require("@comunica/utils-metadata");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path ZeroOrOne Query Operation Actor.
 */
class ActorQueryOperationPathZeroOrOne extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.ZERO_OR_ONE_PATH);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
        const predicate = operation.predicate;
        const sources = this.getPathSources(predicate);
        const extra = [];
        // Both subject and object non-variables
        if (operation.subject.termType !== 'Variable' &&
            operation.object.termType !== 'Variable' &&
            operation.subject.equals(operation.object)) {
            return {
                type: 'bindings',
                bindingsStream: new asynciterator_1.SingletonIterator(bindingsFactory.bindings()),
                metadata: () => Promise.resolve({
                    state: new utils_metadata_1.MetadataValidationState(),
                    cardinality: { type: 'exact', value: 1 },
                    variables: [],
                }),
            };
        }
        // Check if we require a distinct path operation
        const distinct = await this.isPathArbitraryLengthDistinct(algebraFactory, context, operation);
        if (distinct.operation) {
            return distinct.operation;
        }
        context = distinct.context;
        // Create an operator that resolve to the "One" part
        const bindingsOne = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({
            context,
            operation: algebraFactory.createPath(operation.subject, predicate.path, operation.object, operation.graph),
        }));
        // Determine the bindings stream based on the variable-ness of subject and object
        let bindingsStream;
        if (operation.subject.termType === 'Variable' && operation.object.termType === 'Variable') {
            // Both subject and object are variables
            // To determine the "Zero" part, we
            // query ?s ?p ?o. FILTER ?s = ?0, to get all possible namedNodes in de the db
            const varP = this.generateVariable(dataFactory, operation);
            const bindingsZero = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({
                context,
                operation: algebraFactory.createFilter(this.assignPatternSources(algebraFactory, algebraFactory
                    .createPattern(operation.subject, varP, operation.object, operation.graph), sources), algebraFactory.createOperatorExpression('=', [
                    algebraFactory.createTermExpression(operation.subject),
                    algebraFactory.createTermExpression(operation.object),
                ])),
            })).bindingsStream.map(bindings => bindings.delete(varP));
            bindingsStream = new asynciterator_1.UnionIterator([
                bindingsZero,
                bindingsOne.bindingsStream,
            ], { autoStart: false });
        }
        else {
            // If subject or object is not a variable, then determining the "Zero" part is simple.
            if (operation.subject.termType === 'Variable') {
                extra.push(bindingsFactory.bindings([[operation.subject, operation.object]]));
            }
            if (operation.object.termType === 'Variable') {
                extra.push(bindingsFactory.bindings([[operation.object, operation.subject]]));
            }
            bindingsStream = bindingsOne.bindingsStream.prepend(extra);
        }
        const metadata = async () => {
            const innerMetadata = await bindingsOne.metadata();
            return {
                ...innerMetadata,
                cardinality: {
                    ...innerMetadata.cardinality,
                    // Add one to cardinality because we allow *ZERO* or more.
                    value: innerMetadata.cardinality.value + 1,
                },
            };
        };
        return {
            type: 'bindings',
            bindingsStream,
            metadata,
        };
    }
}
exports.ActorQueryOperationPathZeroOrOne = ActorQueryOperationPathZeroOrOne;
//# sourceMappingURL=ActorQueryOperationPathZeroOrOne.js.map