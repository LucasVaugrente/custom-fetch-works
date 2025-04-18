"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const types_1 = require("@comunica/types");
class Aggregate {
    constructor(name, expression) {
        this.name = name;
        this.expression = expression;
        this.expressionType = types_1.ExpressionType.Aggregate;
    }
}
exports.Aggregate = Aggregate;
//# sourceMappingURL=Aggregate.js.map