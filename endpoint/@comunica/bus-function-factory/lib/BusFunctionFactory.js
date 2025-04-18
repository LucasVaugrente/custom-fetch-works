"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusFunctionFactory = void 0;
const core_1 = require("@comunica/core");
/**
 * Bus inspired by BusIndexed but specific for function factory.
 *
 * The implementation differs. In BusIndexed, each actor is indexed only once.
 * Here, a single actor can be indexed multiple times (max 2).
 */
class BusFunctionFactory extends core_1.BusIndexed {
    constructor(args) {
        super({
            ...args,
            actorIdentifierFields: ['functionNames'],
            actionIdentifierFields: ['functionName'],
        });
    }
}
exports.BusFunctionFactory = BusFunctionFactory;
//# sourceMappingURL=BusFunctionFactory.js.map