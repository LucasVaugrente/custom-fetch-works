"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorMergeBindingsContextUnion = void 0;
const bus_merge_bindings_context_1 = require("@comunica/bus-merge-bindings-context");
const core_1 = require("@comunica/core");
const SetUnionBindingsContextMergeHandler_1 = require("./SetUnionBindingsContextMergeHandler");
/**
 * A comunica Union Merge Bindings Context Actor.
 */
class ActorMergeBindingsContextUnion extends bus_merge_bindings_context_1.ActorMergeBindingsContext {
    constructor(args) {
        super(args);
        this.contextKey = args.contextKey;
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(_action) {
        // Merge function: Union with set semantics
        const mergeHandlers = {};
        mergeHandlers[this.contextKey] = new SetUnionBindingsContextMergeHandler_1.SetUnionBindingsContextMergeHandler();
        return { mergeHandlers };
    }
}
exports.ActorMergeBindingsContextUnion = ActorMergeBindingsContextUnion;
//# sourceMappingURL=ActorMergeBindingsContextUnion.js.map