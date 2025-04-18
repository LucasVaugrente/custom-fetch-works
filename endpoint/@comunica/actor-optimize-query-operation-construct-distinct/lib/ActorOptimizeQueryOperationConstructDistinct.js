"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationConstructDistinct = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const Keys_1 = require("@comunica/context-entries/lib/Keys");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Construct Distinct Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationConstructDistinct extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (!action.context.has(Keys_1.KeysInitQuery.distinctConstruct)) {
            return (0, core_1.failTest)(`${this.name} was not enabled by the query.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const operation = sparqlalgebrajs_1.Util.mapOperation(action.operation, {
            construct(op, factory) {
                return {
                    recurse: false,
                    result: factory.createDistinct(factory.createConstruct(op.input, op.template)),
                };
            },
        });
        return { operation, context: action.context.delete(Keys_1.KeysInitQuery.distinctConstruct) };
    }
}
exports.ActorOptimizeQueryOperationConstructDistinct = ActorOptimizeQueryOperationConstructDistinct;
//# sourceMappingURL=ActorOptimizeQueryOperationConstructDistinct.js.map