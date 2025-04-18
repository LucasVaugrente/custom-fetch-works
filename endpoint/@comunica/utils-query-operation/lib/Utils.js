"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOperationSource = exports.assignOperationSource = exports.getOperationSource = exports.testReadOnly = exports.validateQueryOutput = exports.getSafeVoid = exports.getSafeBoolean = exports.getSafeQuads = exports.getSafeBindings = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * Safely cast a query operation output to a bindings output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultBindings} A bindings query operation output.
 */
function getSafeBindings(output) {
    validateQueryOutput(output, 'bindings');
    return output;
}
exports.getSafeBindings = getSafeBindings;
/**
 * Safely cast a query operation output to a quads output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultQuads} A quads query operation output.
 */
function getSafeQuads(output) {
    validateQueryOutput(output, 'quads');
    return output;
}
exports.getSafeQuads = getSafeQuads;
/**
 * Safely cast a query operation output to a boolean output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultBoolean} A boolean query operation output.
 */
function getSafeBoolean(output) {
    validateQueryOutput(output, 'boolean');
    return output;
}
exports.getSafeBoolean = getSafeBoolean;
/**
 * Safely cast a query operation output to a void output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultVoid} A void query operation output.
 */
function getSafeVoid(output) {
    validateQueryOutput(output, 'void');
    return output;
}
exports.getSafeVoid = getSafeVoid;
/**
 * Throw an error if the output type does not match the expected type.
 * @param {IQueryOperationResult} output A query operation output.
 * @param {string} expectedType The expected output type.
 */
function validateQueryOutput(output, expectedType) {
    if (output.type !== expectedType) {
        throw new Error(`Invalid query output type: Expected '${expectedType}' but got '${output.type}'`);
    }
}
exports.validateQueryOutput = validateQueryOutput;
/**
 * Test if the context contains the readOnly flag.
 * @param context An action context.
 */
function testReadOnly(context) {
    if (context.get(context_entries_1.KeysQueryOperation.readOnly)) {
        return (0, core_1.failTest)(`Attempted a write operation in read-only mode`);
    }
    return (0, core_1.passTestVoid)();
}
exports.testReadOnly = testReadOnly;
/**
 * Obtain the query source attached to the given operation.
 * @param operation An algebra operation.
 */
function getOperationSource(operation) {
    return operation.metadata?.scopedSource;
}
exports.getOperationSource = getOperationSource;
/**
 * Assign a source wrapper to the given operation.
 * The operation is copied and returned.
 * @param operation An operation.
 * @param source A source wrapper.
 */
function assignOperationSource(operation, source) {
    operation = { ...operation };
    operation.metadata = operation.metadata ? { ...operation.metadata } : {};
    operation.metadata.scopedSource = source;
    return operation;
}
exports.assignOperationSource = assignOperationSource;
/**
 * Remove the source wrapper from the given operation.
 * The operation is mutated.
 * @param operation An operation.
 */
function removeOperationSource(operation) {
    delete operation.metadata?.scopedSource;
    if (operation.metadata && Object.keys(operation.metadata).length === 0) {
        delete operation.metadata;
    }
}
exports.removeOperationSource = removeOperationSource;
//# sourceMappingURL=Utils.js.map