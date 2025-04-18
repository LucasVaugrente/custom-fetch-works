"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingsIndexDef = void 0;
/**
 * A simple efficient hash-based index for maintaining bindings,
 * and checking whether or not a bindings is contained in this index.
 *
 * This can not handle bindings with undefined values.
 */
class BindingsIndexDef {
    constructor(keys, hashFn) {
        this.keys = keys.map(v => v.variable);
        this.hashFn = hashFn;
        this.index = {};
    }
    put(bindings, value) {
        return this.index[this.hashFn(bindings, this.keys)] = value;
    }
    get(bindings) {
        const v = this.getFirst(bindings);
        return v ? [v] : [];
    }
    getFirst(bindings) {
        return this.index[this.hashFn(bindings, this.keys)];
    }
    values() {
        return Object.values(this.index);
    }
}
exports.BindingsIndexDef = BindingsIndexDef;
//# sourceMappingURL=BindingsIndexDef.js.map