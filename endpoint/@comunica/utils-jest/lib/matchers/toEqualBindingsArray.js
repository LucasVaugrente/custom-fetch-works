"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const toEqualBindings_1 = require("./toEqualBindings");
function bindingsArrayToString(bindings) {
    return `[ ${bindings.map(term => (0, utils_bindings_factory_1.bindingsToString)(term)).join(', ')} ]`;
}
exports.default = {
    toEqualBindingsArray(received, actual, ignoreOrder = false) {
        if (received.length !== actual.length) {
            return {
                message: () => `expected ${bindingsArrayToString(received)} to equal ${bindingsArrayToString(actual)}`,
                pass: false,
            };
        }
        // Sort both streams if order should be ignored
        if (ignoreOrder) {
            const comparatorVariables = (left, right) => left.value.localeCompare(right.value);
            const comparatorBindings = (left, right) => (0, utils_bindings_factory_1.bindingsToCompactString)(left, [...left.keys()].sort(comparatorVariables))
                .localeCompare((0, utils_bindings_factory_1.bindingsToCompactString)(right, [...right.keys()].sort(comparatorVariables)));
            received.sort(comparatorBindings);
            actual.sort(comparatorBindings);
        }
        for (const [i, element] of received.entries()) {
            const sub = toEqualBindings_1.default.toEqualBindings(element, actual[i]);
            if (!sub.pass) {
                return {
                    message: () => `expected ${bindingsArrayToString(received)} to equal ${bindingsArrayToString(actual)}\nIndex ${i} is different.`,
                    pass: false,
                };
            }
        }
        return {
            message: () => `expected ${bindingsArrayToString(received)} not to equal ${bindingsArrayToString(actual)}`,
            pass: true,
        };
    },
};
//# sourceMappingURL=toEqualBindingsArray.js.map