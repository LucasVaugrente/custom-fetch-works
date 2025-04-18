"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
function fail(received, actual) {
    return {
        message: () => `expected ${(0, utils_bindings_factory_1.bindingsToString)(received)} and ${(0, utils_bindings_factory_1.bindingsToString)(actual)} to be equal`,
        pass: false,
    };
}
function succeed(received, actual) {
    return {
        message: () => `expected ${(0, utils_bindings_factory_1.bindingsToString)(received)} and ${(0, utils_bindings_factory_1.bindingsToString)(actual)} not to be equal`,
        pass: true,
    };
}
exports.default = {
    toEqualBindings(received, actual) {
        if (!received.equals(actual)) {
            return fail(received, actual);
        }
        return succeed(received, actual);
    },
};
//# sourceMappingURL=toEqualBindings.js.map