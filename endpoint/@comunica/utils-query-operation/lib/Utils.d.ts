import type { TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult, IQueryOperationResultBindings, IQueryOperationResultBoolean, IQueryOperationResultQuads, IQueryOperationResultVoid, IQuerySourceWrapper } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * Safely cast a query operation output to a bindings output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultBindings} A bindings query operation output.
 */
export declare function getSafeBindings(output: IQueryOperationResult): IQueryOperationResultBindings;
/**
 * Safely cast a query operation output to a quads output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultQuads} A quads query operation output.
 */
export declare function getSafeQuads(output: IQueryOperationResult): IQueryOperationResultQuads;
/**
 * Safely cast a query operation output to a boolean output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultBoolean} A boolean query operation output.
 */
export declare function getSafeBoolean(output: IQueryOperationResult): IQueryOperationResultBoolean;
/**
 * Safely cast a query operation output to a void output.
 * This will throw a runtime error if the output is of the incorrect type.
 * @param {IQueryOperationResult} output A query operation output.
 * @return {IQueryOperationResultVoid} A void query operation output.
 */
export declare function getSafeVoid(output: IQueryOperationResult): IQueryOperationResultVoid;
/**
 * Throw an error if the output type does not match the expected type.
 * @param {IQueryOperationResult} output A query operation output.
 * @param {string} expectedType The expected output type.
 */
export declare function validateQueryOutput(output: IQueryOperationResult, expectedType: IQueryOperationResult['type']): void;
/**
 * Test if the context contains the readOnly flag.
 * @param context An action context.
 */
export declare function testReadOnly(context: IActionContext): TestResult<any>;
/**
 * Obtain the query source attached to the given operation.
 * @param operation An algebra operation.
 */
export declare function getOperationSource(operation: Algebra.Operation): IQuerySourceWrapper | undefined;
/**
 * Assign a source wrapper to the given operation.
 * The operation is copied and returned.
 * @param operation An operation.
 * @param source A source wrapper.
 */
export declare function assignOperationSource<O extends Algebra.Operation>(operation: O, source: IQuerySourceWrapper): O;
/**
 * Remove the source wrapper from the given operation.
 * The operation is mutated.
 * @param operation An operation.
 */
export declare function removeOperationSource(operation: Algebra.Operation): void;
