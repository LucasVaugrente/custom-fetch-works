import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationArgs, IActorOptimizeQueryOperationOutput } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { FragmentSelectorShape, IActionContext, IQuerySourceWrapper } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { Factory, Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Filter Pushdown Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationFilterPushdown extends ActorOptimizeQueryOperation {
    private readonly aggressivePushdown;
    private readonly maxIterations;
    private readonly splitConjunctive;
    private readonly mergeConjunctive;
    private readonly pushIntoLeftJoins;
    private readonly pushEqualityIntoPatterns;
    constructor(args: IActorOptimizeQueryOperationFilterPushdownArgs);
    test(_action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
    /**
     * Check if the given filter operation must be attempted to push down, based on the following criteria:
     * - Always push down if aggressive mode is enabled
     * - Push down if the filter is extremely selective
     * - Push down if federated and at least one accepts the filter
     * @param operation The filter operation
     * @param sources The query sources in the operation
     * @param sourceShapes A mapping of sources to selector shapes.
     */
    shouldAttemptPushDown(operation: Algebra.Filter, sources: IQuerySourceWrapper[], sourceShapes: Map<IQuerySourceWrapper, FragmentSelectorShape>): boolean;
    /**
     * Collected all sources that are defined within the given operation of children recursively.
     * @param operation An operation.
     */
    getSources(operation: Algebra.Operation): IQuerySourceWrapper[];
    /**
     * Get all variables inside the given expression.
     * @param expression An expression.
     * @return An array of variables, or undefined if the expression is unsupported for pushdown.
     */
    getExpressionVariables(expression: Algebra.Expression): RDF.Variable[];
    protected getOverlappingOperations(operation: Algebra.Operation, expressionVariables: RDF.Variable[]): {
        fullyOverlapping: Algebra.Operation[];
        partiallyOverlapping: Algebra.Operation[];
        notOverlapping: Algebra.Operation[];
    };
    /**
     * Recursively push down the given expression into the given operation if possible.
     * Different operators have different semantics for choosing whether or not to push down,
     * and how this pushdown is done.
     * For every passed operator, it is checked whether or not the filter will have any effect on the operation.
     * If not, the filter is voided.
     * @param expression An expression to push down.
     * @param expressionVariables The variables inside the given expression.
     * @param operation The operation to push down into.
     * @param factory An algebra factory.
     * @param context The action context.
     * @return A tuple indicating if the operation was modified and the modified operation.
     */
    filterPushdown(expression: Algebra.Expression, expressionVariables: RDF.Variable[], operation: Algebra.Operation, factory: Factory, context: IActionContext): [boolean, Algebra.Operation];
    /**
     * Check if the given expression is a simple equals operation with one variable and one non-literal
     * (or literal with canonical lexical form) term that can be pushed into a pattern.
     * @param expression The current expression.
     * @return The variable and term to fill into the pattern, or undefined.
     */
    getEqualityExpressionPushableIntoPattern(expression: Algebra.Expression): {
        variable: RDF.Variable;
        term: RDF.Term;
    } | undefined;
    /**
     * Check if the given term is a literal with datatype that where all values
     * can only have one possible lexical representation.
     * In other words, no variants of values exist that should be considered equal.
     * For example: "01"^xsd:number and "1"^xsd:number will return false.
     * @param term An RDF term.
     * @protected
     */
    protected isLiteralWithCanonicalLexicalForm(term: RDF.Term): boolean;
    /**
     * Check if there is an overlap between the two given lists of variables.
     * @param varsA A list of variables.
     * @param varsB A list of variables.
     */
    variablesIntersect(varsA: RDF.Variable[], varsB: RDF.Variable[]): boolean;
    /**
     * Check if all variables from the first list are included in the second list.
     * The second list may contain other variables as well.
     * @param varsNeedles A list of variables to search for.
     * @param varsHaystack A list of variables to search in.
     */
    variablesSubSetOf(varsNeedles: RDF.Variable[], varsHaystack: RDF.Variable[]): boolean;
    /**
     * Check if an expression is simply 'false'.
     * @param expression An expression.
     */
    isExpressionFalse(expression: Algebra.Expression): boolean;
    /**
     * Get all directly nested filter expressions.
     * As soon as a non-filter is found, it is returned as the input field.
     * @param op A filter expression.
     */
    getNestedFilterExpressions(op: Algebra.Filter): {
        nestedExpressions: Algebra.Expression[];
        input: Algebra.Operation;
    };
}
export interface IActorOptimizeQueryOperationFilterPushdownArgs extends IActorOptimizeQueryOperationArgs {
    /**
     * If filters should be pushed down as deep as possible.
     * If false, filters will only be pushed down if the source(s) accept them,
     * or if the filter is very selective.
     * @range {boolean}
     * @default {false}
     */
    aggressivePushdown: boolean;
    /**
     * The maximum number of full iterations across the query can be done for attempting to push down filters.
     * @default {10}
     */
    maxIterations: number;
    /**
     * If conjunctive filters should be split into nested filters before applying filter pushdown.
     * This can enable pushing down deeper.
     * @range {boolean}
     * @default {true}
     */
    splitConjunctive: boolean;
    /**
     * If nested filters should be merged into conjunctive filters after applying filter pushdown.
     * @range {boolean}
     * @default {true}
     */
    mergeConjunctive: boolean;
    /**
     * If filters should be pushed into left-joins.
     * @range {boolean}
     * @default {true}
     */
    pushIntoLeftJoins: boolean;
    /**
     * If simple equality filters should be pushed into patterns and paths.
     * This only applies to equality filters with terms that are not literals that have no canonical lexical form.
     * @range {boolean}
     * @default {true}
     */
    pushEqualityIntoPatterns: boolean;
}
