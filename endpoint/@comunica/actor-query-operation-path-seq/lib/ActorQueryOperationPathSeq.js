"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathSeq = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path Seq Query Operation Actor.
 */
class ActorQueryOperationPathSeq extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.SEQ);
    }
    async runOperation(operationOriginal, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const predicate = operationOriginal.predicate;
        let joiner = operationOriginal.subject;
        const generatedVariableNames = [];
        const entries = await Promise.all(predicate.input
            .map((subPredicate, i) => {
            const nextJoiner = i === predicate.input.length - 1 ? operationOriginal.object : this.generateVariable(dataFactory, operationOriginal, `b${i}`);
            const operation = algebraFactory
                .createPath(joiner, subPredicate, nextJoiner, operationOriginal.graph);
            const output = this.mediatorQueryOperation.mediate({
                context,
                operation,
            });
            joiner = nextJoiner;
            if (i < predicate.input.length - 1) {
                generatedVariableNames.push(nextJoiner);
            }
            return { output, operation };
        })
            .map(async ({ output, operation }) => ({
            output: (0, utils_query_operation_1.getSafeBindings)(await output),
            operation,
        })));
        const join = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorJoin
            .mediate({ type: 'inner', entries, context }));
        // Remove the generated variable from the bindings
        const bindingsStream = join.bindingsStream.transform({
            transform(item, next, push) {
                for (const generatedVariableName of generatedVariableNames) {
                    item = item.delete(generatedVariableName);
                }
                push(item);
                next();
            },
        });
        // Remove the generated variable from the list of variables
        return {
            type: 'bindings',
            bindingsStream,
            async metadata() {
                const joinMetadata = await join.metadata();
                const variables = joinMetadata.variables.filter(variable => !generatedVariableNames
                    .some(generatedVariableName => generatedVariableName.value === variable.variable.value));
                return { ...joinMetadata, variables };
            },
        };
    }
}
exports.ActorQueryOperationPathSeq = ActorQueryOperationPathSeq;
//# sourceMappingURL=ActorQueryOperationPathSeq.js.map