"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryDedicated = void 0;
const core_1 = require("@comunica/core");
const ActorFunctionFactory_1 = require("./ActorFunctionFactory");
/**
 * A base implementation for function factory actors for a dedicated operator.
 */
class ActorFunctionFactoryDedicated extends ActorFunctionFactory_1.ActorFunctionFactory {
    constructor(args) {
        super(args);
    }
    async test(action) {
        // Name must match, if this is a term function, all is fine, if not, look whether term-function is not requested.
        if (this.functionNames.includes(action.functionName) && (this.termFunction || !action.requireTermExpression)) {
            return (0, core_1.passTestVoid)();
        }
        return (0, core_1.failTest)(`Actor ${this.name} can not provide implementation for "${action.functionName}", only for ${this.termFunction ? '' : 'non-termExpression '}${this.functionNames.join(' and ')}.`);
    }
}
exports.ActorFunctionFactoryDedicated = ActorFunctionFactoryDedicated;
//# sourceMappingURL=ActorFunctionFactoryDedicated.js.map