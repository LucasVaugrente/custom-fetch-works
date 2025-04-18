"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
const types_1 = require("@comunica/types");
class Variable {
    constructor(name) {
        this.expressionType = types_1.ExpressionType.Variable;
        this.name = name;
    }
}
exports.Variable = Variable;
//# sourceMappingURL=Variable.js.map