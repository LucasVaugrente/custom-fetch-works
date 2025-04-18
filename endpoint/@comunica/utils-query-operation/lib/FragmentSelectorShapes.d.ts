import type { FragmentSelectorShape } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * Check if the given shape accepts the given query operation.
 * @param shape A shape to test the query operation against.
 * @param operation A query operation to test.
 * @param options Additional options to consider.
 * @param options.joinBindings If additional bindings will be pushed down to the source for joining.
 * @param options.filterBindings If additional bindings will be pushed down to the source for filtering.
 */
export declare function doesShapeAcceptOperation(shape: FragmentSelectorShape, operation: Algebra.Operation, options?: FragmentSelectorShapeTestFlags): boolean;
export type FragmentSelectorShapeTestFlags = {
    joinBindings?: boolean;
    filterBindings?: boolean;
};
