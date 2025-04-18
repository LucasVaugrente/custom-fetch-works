"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationFilter = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Filter Sparqlee Query Operation Actor.
 */
class ActorQueryOperationFilter extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'filter');
        this.mediatorExpressionEvaluatorFactory = args.mediatorExpressionEvaluatorFactory;
    }
    async testOperation() {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const outputRaw = await this.mediatorQueryOperation.mediate({ operation: operation.input, context });
        const output = (0, utils_query_operation_1.getSafeBindings)(outputRaw);
        (0, utils_query_operation_1.validateQueryOutput)(output, 'bindings');
        const evaluator = await this.mediatorExpressionEvaluatorFactory
            .mediate({ algExpr: operation.expression, context });
        const transform = async (item, next, push) => {
            try {
                const result = await evaluator.evaluateAsEBV(item);
                if (result) {
                    push(item);
                }
            }
            catch (error) {
                // We ignore all Expression errors.
                // Other errors (likely programming mistakes) are still propagated.
                //
                // > Specifically, FILTERs eliminate any solutions that,
                // > when substituted into the expression, either result in
                // > an effective boolean value of false or produce an error.
                // > ...
                // > These errors have no effect outside of FILTER evaluation.
                // https://www.w3.org/TR/sparql11-query/#expressions
                if ((0, utils_expression_evaluator_1.isExpressionError)(error)) {
                    // In many cases, this is a user error, where the user should manually cast the variable to a string.
                    // In order to help users debug this, we should report these errors via the logger as warnings.
                    this.logWarn(context, 'Error occurred while filtering.', () => ({ error, bindings: (0, utils_bindings_factory_1.bindingsToString)(item) }));
                }
                else {
                    bindingsStream.emit('error', error);
                }
            }
            next();
        };
        // eslint-disable-next-line ts/no-misused-promises
        const bindingsStream = output.bindingsStream.transform({ transform, autoStart: false });
        return { type: 'bindings', bindingsStream, metadata: output.metadata };
    }
}
exports.ActorQueryOperationFilter = ActorQueryOperationFilter;
//# sourceMappingURL=ActorQueryOperationFilter.js.map