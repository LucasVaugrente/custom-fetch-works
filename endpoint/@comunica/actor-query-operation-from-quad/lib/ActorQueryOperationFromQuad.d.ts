import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { Algebra, Factory } from 'sparqlalgebrajs';
/**
 * A comunica From Query Operation Actor.
 */
export declare class ActorQueryOperationFromQuad extends ActorQueryOperationTypedMediated<Algebra.From> {
    private static readonly ALGEBRA_TYPES;
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    /**
     * Create a deep copy of the given operation.
     * @param {Operation} operation An operation.
     * @param {(subOperation: Operation) => Operation} recursiveCb A callback for recursive operation calls.
     * @return {Operation} The copied operation.
     */
    static copyOperation(operation: Algebra.Operation, recursiveCb: (subOperation: Algebra.Operation) => Algebra.Operation): Algebra.Operation;
    /**
     * Recursively transform the given operation to use the given graphs as default graph
     * This will (possibly) create a new operation and not modify the given operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation} operation An operation.
     * @param {RDF.Term[]} defaultGraphs Graph terms.
     * @return {Operation} A new operation.
     */
    static applyOperationDefaultGraph(algebraFactory: Factory, operation: Algebra.Operation, defaultGraphs: RDF.Term[]): Algebra.Operation;
    /**
     * Recursively transform the given operation to use the given graphs as named graph
     * This will (possibly) create a new operation and not modify the given operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation} operation An operation.
     * @param {RDF.Term[]} namedGraphs Graph terms.
     * @param {RDF.Term[]} defaultGraphs Default graph terms.
     * @return {Operation} A new operation.
     */
    static applyOperationNamedGraph(algebraFactory: Factory, operation: Algebra.Operation, namedGraphs: RDF.NamedNode[], defaultGraphs: RDF.Term[]): Algebra.Operation;
    /**
     * Transform the given array of operations into a join operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation[]} operations An array of operations, must contain at least one operation.
     * @return {Join} A join operation.
     */
    static joinOperations(algebraFactory: Factory, operations: Algebra.Operation[]): Algebra.Operation;
    /**
     * Transform the given array of operations into a union operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation[]} operations An array of operations, must contain at least one operation.
     * @return {Union} A union operation.
     */
    static unionOperations(algebraFactory: Factory, operations: Algebra.Operation[]): Algebra.Operation;
    /**
     * Transform an operation based on the default and named graphs in the pattern.
     *
     * FROM sets the default graph.
     * If multiple are available, take the union of the operation for all of them at quad-pattern level.
     *
     * FROM NAMED indicates which named graphs are available.
     * This will rewrite the query so that only triples from the given named graphs can be selected.
     *
     * @package
     * @param algebraFactory The algebra factory.
     * @param {From} pattern A from operation.
     * @return {Operation} The transformed operation.
     */
    static createOperation(algebraFactory: Factory, pattern: Algebra.From): Algebra.Operation;
    testOperation(_operation: Algebra.From, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operationOriginal: Algebra.From, context: IActionContext): Promise<IQueryOperationResult>;
}
