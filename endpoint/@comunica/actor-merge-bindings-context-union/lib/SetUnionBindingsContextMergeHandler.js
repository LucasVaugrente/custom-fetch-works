"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUnionBindingsContextMergeHandler = void 0;
class SetUnionBindingsContextMergeHandler {
    run(...inputSets) {
        return [...new Set(inputSets.flat())];
    }
}
exports.SetUnionBindingsContextMergeHandler = SetUnionBindingsContextMergeHandler;
//# sourceMappingURL=SetUnionBindingsContextMergeHandler.js.map