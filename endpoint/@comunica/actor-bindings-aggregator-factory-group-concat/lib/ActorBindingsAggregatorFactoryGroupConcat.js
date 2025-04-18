"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactoryGroupConcat = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const GroupConcatAggregator_1 = require("./GroupConcatAggregator");
/**
 * A comunica Group Concat Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactoryGroupConcat extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.expr.aggregator !== 'group_concat') {
            return (0, core_1.failTest)('This actor only supports the \'group_concat\' aggregator.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ context, expr }) {
        return new GroupConcatAggregator_1.GroupConcatAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct, context.getSafe(context_entries_1.KeysInitQuery.dataFactory), expr.separator);
    }
}
exports.ActorBindingsAggregatorFactoryGroupConcat = ActorBindingsAggregatorFactoryGroupConcat;
//# sourceMappingURL=ActorBindingsAggregatorFactoryGroupConcat.js.map