"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationExtend = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Extend Query Operation Actor.
 *
 * See https://www.w3.org/TR/sparql11-query/#sparqlAlgebra;
 */
class ActorQueryOperationExtend extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'extend');
        this.mediatorExpressionEvaluatorFactory = args.mediatorExpressionEvaluatorFactory;
    }
    async testOperation() {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const { expression, input, variable } = operation;
        const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation: input, context }));
        // Throw if the variable has already been bound
        if ((await output.metadata()).variables.some(innerVariable => innerVariable.variable.equals(variable))) {
            throw new Error(`Illegal binding to variable '${variable.value}' that has already been bound`);
        }
        const evaluator = await this.mediatorExpressionEvaluatorFactory
            .mediate({ algExpr: expression, context });
        // Transform the stream by extending each Bindings with the expression result
        const transform = async (bindings, next, push) => {
            try {
                const result = await evaluator.evaluate(bindings);
                // Extend operation is undefined when the key already exists
                // We just override it here.
                const extended = bindings.set(variable, result);
                push(extended);
            }
            catch (error) {
                if ((0, utils_expression_evaluator_1.isExpressionError)(error)) {
                    // Errors silently don't actually extend according to the spec
                    push(bindings);
                    // But let's warn anyway
                    this.logWarn(context, `Expression error for extend operation (${error.message})` +
                        `with bindings '${(0, utils_bindings_factory_1.bindingsToString)(bindings)}'`);
                }
                else {
                    bindingsStream.emit('error', error);
                }
            }
            next();
        };
        // eslint-disable-next-line ts/no-misused-promises
        const bindingsStream = output.bindingsStream.transform({ autoStart: false, transform });
        return {
            type: 'bindings',
            bindingsStream,
            async metadata() {
                const outputMetadata = await output.metadata();
                return { ...outputMetadata, variables: [...outputMetadata.variables, { variable, canBeUndef: false }] };
            },
        };
    }
}
exports.ActorQueryOperationExtend = ActorQueryOperationExtend;
//# sourceMappingURL=ActorQueryOperationExtend.js.map