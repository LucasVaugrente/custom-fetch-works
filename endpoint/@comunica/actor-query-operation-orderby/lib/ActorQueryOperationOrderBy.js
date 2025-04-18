"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationOrderBy = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const SortIterator_1 = require("./SortIterator");
/**
 * A comunica OrderBy Query Operation Actor.
 */
class ActorQueryOperationOrderBy extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'orderby');
        this.window = args.window ?? Number.POSITIVE_INFINITY;
        this.mediatorExpressionEvaluatorFactory = args.mediatorExpressionEvaluatorFactory;
        this.mediatorTermComparatorFactory = args.mediatorTermComparatorFactory;
    }
    async testOperation() {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const outputRaw = await this.mediatorQueryOperation.mediate({ operation: operation.input, context });
        const output = (0, utils_query_operation_1.getSafeBindings)(outputRaw);
        const options = { window: this.window };
        let { bindingsStream } = output;
        // Sorting backwards since the first one is the most important therefore should be ordered last.
        const orderByEvaluator = await this.mediatorTermComparatorFactory.mediate({ context });
        for (let i = operation.expressions.length - 1; i >= 0; i--) {
            let expr = operation.expressions[i];
            const isAscending = this.isAscending(expr);
            expr = this.extractSortExpression(expr);
            // Transform the stream by annotating it with the expr result
            const evaluator = await this.mediatorExpressionEvaluatorFactory
                .mediate({ algExpr: expr, context });
            const transform = async (bindings, next, push) => {
                try {
                    const result = await evaluator.evaluate(bindings);
                    push({ bindings, result });
                }
                catch (error) {
                    // We ignore all Expression errors.
                    // Other errors (likely programming mistakes) are still propagated.
                    // I can't recall where this is defined in the spec.
                    if (!(0, utils_expression_evaluator_1.isExpressionError)(error)) {
                        bindingsStream.emit('error', error);
                    }
                    push({ bindings, result: undefined });
                }
                next();
            };
            // eslint-disable-next-line ts/no-misused-promises
            const transformedStream = bindingsStream.transform({ transform });
            // Sort the annoted stream
            const sortedStream = new SortIterator_1.SortIterator(transformedStream, (left, right) => {
                let compare = orderByEvaluator.orderTypes(left.result, right.result);
                if (!isAscending) {
                    compare *= -1;
                }
                return compare;
            }, options);
            // Remove the annotation
            bindingsStream = sortedStream.map(({ bindings }) => bindings);
        }
        return {
            type: 'bindings',
            bindingsStream,
            metadata: output.metadata,
        };
    }
    // Remove descending operator if necessary
    extractSortExpression(expr) {
        const { expressionType, operator } = expr;
        if (expressionType !== sparqlalgebrajs_1.Algebra.expressionTypes.OPERATOR) {
            return expr;
        }
        return operator === 'desc' ?
            expr.args[0] :
            expr;
    }
    isAscending(expr) {
        const { expressionType, operator } = expr;
        if (expressionType !== sparqlalgebrajs_1.Algebra.expressionTypes.OPERATOR) {
            return true;
        }
        return operator !== 'desc';
    }
}
exports.ActorQueryOperationOrderBy = ActorQueryOperationOrderBy;
//# sourceMappingURL=ActorQueryOperationOrderBy.js.map