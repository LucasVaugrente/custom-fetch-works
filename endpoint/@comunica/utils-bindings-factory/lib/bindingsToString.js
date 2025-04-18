"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindingsToCompactString = exports.bindingsToString = void 0;
const rdf_string_1 = require("rdf-string");
/**
 * Convert a bindings object to a human-readable string.
 * @param bindings A bindings object.
 */
function bindingsToString(bindings) {
    const raw = {};
    for (const key of bindings.keys()) {
        raw[key.value] = (0, rdf_string_1.termToString)(bindings.get(key));
    }
    return JSON.stringify(raw, null, '  ');
}
exports.bindingsToString = bindingsToString;
/**
 * Convert a bindings object to a compact string.
 * This is mainly useful for internal indexing purposes.
 *
 * This function is guaranteed to not produce clashing bindings for unequal terms.
 *
 * This function will not sort the variables and expects them to be in the same order for every call.
 *
 * @param bindings A bindings object.
 * @param variables The variables to consider when converting the bindings to a string.
 */
function bindingsToCompactString(bindings, variables) {
    return variables
        .map((variable) => {
        const term = bindings.get(variable);
        if (term) {
            return (0, rdf_string_1.termToString)(term);
        }
        return '';
    })
        .join('');
}
exports.bindingsToCompactString = bindingsToCompactString;
//# sourceMappingURL=bindingsToString.js.map