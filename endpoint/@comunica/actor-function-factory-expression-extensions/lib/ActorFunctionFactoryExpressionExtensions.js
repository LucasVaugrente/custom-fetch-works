"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionExtensions = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const rdf_data_factory_1 = require("rdf-data-factory");
const NamedExtension_1 = require("./NamedExtension");
/**
 * A comunica Expression Function Extensions Function Factory Actor.
 */
class ActorFunctionFactoryExpressionExtensions extends bus_function_factory_1.ActorFunctionFactory {
    constructor(args) {
        super(args);
    }
    async test({ context, functionName }) {
        const extensionFinder = context.getSafe(context_entries_1.KeysExpressionEvaluator.extensionFunctionCreator);
        const definition = await extensionFinder(new rdf_data_factory_1.DataFactory().namedNode(functionName));
        if (definition) {
            return (0, core_1.passTestVoid)();
        }
        return (0, core_1.failTest)(`Actor ${this.name} can only provide non-termExpression implementations for functions that are provided through config entries like: ${context_entries_1.KeysInitQuery.extensionFunctionCreator.name} or ${context_entries_1.KeysInitQuery.extensionFunctions.name}`);
    }
    async run({ context, functionName }) {
        const extensionFinder = context.getSafe(context_entries_1.KeysExpressionEvaluator.extensionFunctionCreator);
        const definition = await extensionFinder(new rdf_data_factory_1.DataFactory().namedNode(functionName));
        return new NamedExtension_1.NamedExtension({
            operator: functionName,
            functionDefinition: definition,
        });
    }
}
exports.ActorFunctionFactoryExpressionExtensions = ActorFunctionFactoryExpressionExtensions;
//# sourceMappingURL=ActorFunctionFactoryExpressionExtensions.js.map