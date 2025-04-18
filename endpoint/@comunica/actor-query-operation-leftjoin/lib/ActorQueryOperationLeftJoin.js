"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationLeftJoin = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica LeftJoin Query Operation Actor.
 */
class ActorQueryOperationLeftJoin extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'leftjoin');
        this.mediatorExpressionEvaluatorFactory = args.mediatorExpressionEvaluatorFactory;
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operationOriginal, context) {
        // Delegate to join bus
        const entries = (await Promise.all(operationOriginal.input
            .map(async (subOperation) => ({
            output: await this.mediatorQueryOperation.mediate({ operation: subOperation, context }),
            operation: subOperation,
        }))))
            .map(({ output, operation }) => ({
            output: (0, utils_query_operation_1.getSafeBindings)(output),
            operation,
        }));
        const joined = await this.mediatorJoin.mediate({ type: 'optional', entries, context });
        // If the pattern contains an expression, filter the resulting stream
        if (operationOriginal.expression) {
            const rightMetadata = await entries[1].output.metadata();
            const expressionVariables = rightMetadata.variables;
            const evaluator = await this.mediatorExpressionEvaluatorFactory
                .mediate({ algExpr: operationOriginal.expression, context });
            const bindingsStream = joined.bindingsStream
                .transform({
                autoStart: false,
                // eslint-disable-next-line ts/no-misused-promises
                transform: async (bindings, done, push) => {
                    // If variables of the right-hand entry are missing, we skip expression evaluation
                    if (!expressionVariables.every(variable => bindings.has(variable.variable.value))) {
                        push(bindings);
                        return done();
                    }
                    try {
                        const result = await evaluator.evaluateAsEBV(bindings);
                        if (result) {
                            push(bindings);
                        }
                    }
                    catch (error) {
                        // We ignore all Expression errors.
                        // Other errors (likely programming mistakes) are still propagated.
                        // Left Join is defined in terms of Filter (https://www.w3.org/TR/sparql11-query/#defn_algJoin),
                        // and Filter requires this (https://www.w3.org/TR/sparql11-query/#expressions).
                        if ((0, utils_expression_evaluator_1.isExpressionError)(error)) {
                            // In many cases, this is a user error, where the user should manually cast the variable to a string.
                            // In order to help users debug this, we should report these errors via the logger as warnings.
                            this.logWarn(context, 'Error occurred while filtering.', () => ({ error, bindings: (0, utils_bindings_factory_1.bindingsToString)(bindings) }));
                        }
                        else {
                            bindingsStream.emit('error', error);
                        }
                    }
                    done();
                },
            });
            joined.bindingsStream = bindingsStream;
        }
        return joined;
    }
}
exports.ActorQueryOperationLeftJoin = ActorQueryOperationLeftJoin;
//# sourceMappingURL=ActorQueryOperationLeftJoin.js.map