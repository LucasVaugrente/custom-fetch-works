"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asTermType = void 0;
function asTermType(type) {
    if (type === 'namedNode' || type === 'literal' || type === 'blankNode' || type === 'quad') {
        return type;
    }
    return undefined;
}
exports.asTermType = asTermType;
//# sourceMappingURL=Expressions.js.map