"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionDatatype = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-datatype
 */
class TermFunctionDatatype extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.DATATYPE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.DATATYPE)
                .onLiteral1(() => lit => new utils_expression_evaluator_1.NamedNode(lit.dataType))
                .collect(),
        });
    }
}
exports.TermFunctionDatatype = TermFunctionDatatype;
//# sourceMappingURL=TermFunctionDatatype.js.map