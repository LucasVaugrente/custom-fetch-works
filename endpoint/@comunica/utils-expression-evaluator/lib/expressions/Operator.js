"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
const types_1 = require("@comunica/types");
class Operator {
    constructor(name, args, apply) {
        this.name = name;
        this.args = args;
        this.apply = apply;
        this.expressionType = types_1.ExpressionType.Operator;
    }
}
exports.Operator = Operator;
//# sourceMappingURL=Operator.js.map