"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareEvaluatorActionContext = void 0;
const context_entries_1 = require("@comunica/context-entries");
const lru_cache_1 = require("lru-cache");
const DateTimeHelpers_1 = require("./DateTimeHelpers");
function prepareEvaluatorActionContext(orgContext) {
    let context = orgContext;
    // Handle two variants of providing extension functions
    if (context.has(context_entries_1.KeysInitQuery.extensionFunctionCreator) && context.has(context_entries_1.KeysInitQuery.extensionFunctions)) {
        throw new Error('Illegal simultaneous usage of extensionFunctionCreator and extensionFunctions in context');
    }
    if (context.has(context_entries_1.KeysInitQuery.extensionFunctionCreator)) {
        context = context.set(context_entries_1.KeysExpressionEvaluator.extensionFunctionCreator, context.get(context_entries_1.KeysInitQuery.extensionFunctionCreator));
    }
    else if (context.has(context_entries_1.KeysInitQuery.extensionFunctions)) {
        const extensionFunctions = context.getSafe(context_entries_1.KeysInitQuery.extensionFunctions);
        context = context.set(context_entries_1.KeysExpressionEvaluator.extensionFunctionCreator, async (functionNamedNode) => extensionFunctions[functionNamedNode.value]);
    }
    else {
        // eslint-disable-next-line unicorn/no-useless-undefined
        context = context.setDefault(context_entries_1.KeysExpressionEvaluator.extensionFunctionCreator, async () => undefined);
    }
    context = context.setDefault(context_entries_1.KeysExpressionEvaluator.defaultTimeZone, (0, DateTimeHelpers_1.extractTimeZone)(context.getSafe(context_entries_1.KeysInitQuery.queryTimestamp)));
    context = context.setDefault(context_entries_1.KeysExpressionEvaluator.superTypeProvider, {
        cache: new lru_cache_1.LRUCache({ max: 1_000 }),
        discoverer: () => 'term',
    });
    return context;
}
exports.prepareEvaluatorActionContext = prepareEvaluatorActionContext;
//# sourceMappingURL=Context.js.map