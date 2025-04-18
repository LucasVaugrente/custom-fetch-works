import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResultBindings, Bindings, IActionContext, MetadataBindings, IQuerySourceWrapper, ComunicaDataFactory } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import { BufferedIterator } from 'asynciterator';
import type { Factory } from 'sparqlalgebrajs';
import { Algebra } from 'sparqlalgebrajs';
/**
 * An abstract actor that handles Path operations.
 *
 * Provides multiple helper functions used by the Path operation actors.
 */
export declare abstract class ActorAbstractPath extends ActorQueryOperationTypedMediated<Algebra.Path> {
    protected readonly predicateType: string;
    protected constructor(args: IActorQueryOperationTypedMediatedArgs, predicateType: string);
    testOperation(operation: Algebra.Path, _context: IActionContext): Promise<TestResult<IActorTest>>;
    generateVariable(dataFactory: ComunicaDataFactory, path?: Algebra.Path, name?: string): RDF.Variable;
    isPathArbitraryLengthDistinct(algebraFactory: Factory, context: IActionContext, path: Algebra.Path): Promise<{
        context: IActionContext;
        operation: IQueryOperationResultBindings | undefined;
    }>;
    private predicateStarGraphVariable;
    /**
     * Returns an iterator with Bindings of the query subject predicate* ?o or subject predicate+ ?o
     * If graph is a variable, it will also be in those bindings
     * @param {Term} subject Term of where we start the predicate* search.
     * @param {Algebra.PropertyPathSymbol} predicate Predicate of the *-path.
     * @param {Variable} object Variable of the zeroOrMore-query.
     * @param {Term} graph The graph in which we search for the pattern. (Possibly a variable)
     * @param {ActionContext} context The context to pass to sub-opertations
     * @param emitFirstSubject If the path operation is predicate*, otherwise it is predicate+.
     * @param algebraFactory The algebra factory.
     * @param bindingsFactory The data factory.
     * @return {Promise<AsyncIterator<Bindings>} Iterator to where all bindings of query should have been pushed.
     */
    getObjectsPredicateStarEval(subject: RDF.Term, predicate: Algebra.PropertyPathSymbol, object: RDF.Variable, graph: RDF.Term, context: IActionContext, emitFirstSubject: boolean, algebraFactory: Factory, bindingsFactory: BindingsFactory): Promise<IPathResultStream>;
    /**
     * Pushes all terms to iterator `it` that are a solution of object predicate* ?o.
     * @param algebraFactory The algebra factory.
     * @param {Term} object Term of where we start the predicate* search.
     * @param {Algebra.PropertyPathSymbol} predicate Predicate of the *-path.
     * @param {Term} graph The graph in which we search for the pattern.
     * @param {ActionContext} context
     * @param {Record<string, Term>} termHashes Remembers the objects we've already searched for.
     * @param {BufferedIterator<Term>} it Iterator to push terms to.
     * @param {any} counter Counts how many searches are in progress to close it when needed (when counter == 0).
     * @return {Promise<IPathResultStream['metadata']>} The results metadata.
     */
    getObjectsPredicateStar(algebraFactory: Factory, object: RDF.Term, predicate: Algebra.PropertyPathSymbol, graph: RDF.Term, context: IActionContext, termHashes: Record<string, RDF.Term>, it: BufferedIterator<RDF.Term>, counter: any): Promise<IPathResultStream['metadata'] | undefined>;
    /**
     * Pushes all terms to iterator `it` that are a solution of ?s predicate* ?o.
     * @param {string} subjectVar String representation of subjectVariable
     * @param {string} objectVar String representation of objectVariable
     * @param {Term} subjectVal Term of where we start the predicate* search.
     * @param {Term} objectVal Found solution for an object, start for the new step.
     * @param {Algebra.PropertyPathSymbol} predicate Predicate of the *-path.
     * @param {Term} graph The graph in which we search for the pattern.
     * @param {ActionContext} context
     * @param {{[id: string]: Promise<Term[]>}} termHashesGlobal
     * Remembers solutions for when objectVal is already been calculated, can be reused when same objectVal occurs
     * @param {{[id: string]: Term}} termHashesCurrentSubject
     * Remembers the pairs we've already searched for, can stop searching if so.
     * @param {BufferedIterator<Bindings>} it Iterator to push terms to.
     * @param {any} counter Counts how many searches are in progress to close it when needed (when counter == 0).
     * @param algebraFactory The algebra factory.
     * @param bindingsFactory The bindings factory.
     * @return {Promise<void>} All solutions of query should have been pushed to it by then.
     */
    getSubjectAndObjectBindingsPredicateStar(subjectVar: RDF.Variable, objectVar: RDF.Variable, subjectVal: RDF.Term, objectVal: RDF.Term, predicate: Algebra.PropertyPathSymbol, graph: RDF.Term, context: IActionContext, termHashesGlobal: Record<string, Promise<RDF.Term[]>>, termHashesCurrentSubject: Record<string, boolean>, it: BufferedIterator<Bindings>, counter: any, algebraFactory: Factory, bindingsFactory: BindingsFactory): Promise<void>;
    /**
     * Find all sources recursively contained in the given path operation.
     * @param operation
     */
    getPathSources(operation: Algebra.PropertyPathSymbol): IQuerySourceWrapper[];
    assignPatternSources(algebraFactory: Factory, pattern: Algebra.Pattern, sources: IQuerySourceWrapper[]): Algebra.Operation;
}
export interface IPathResultStream {
    bindingsStream: AsyncIterator<Bindings>;
    metadata: () => Promise<MetadataBindings>;
}
