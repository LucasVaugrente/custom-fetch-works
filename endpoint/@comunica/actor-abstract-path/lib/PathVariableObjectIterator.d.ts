import type { MediatorQueryOperation } from '@comunica/bus-query-operation';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { BufferedIterator } from 'asynciterator';
import type { Algebra, Factory } from 'sparqlalgebrajs';
/**
 * An iterator that implements the multi-length property path operation (* and +)
 * for a fixed subject and predicate, and a variable object.
 */
export declare class PathVariableObjectIterator extends BufferedIterator<RDF.Term> {
    private readonly algebraFactory;
    private readonly subject;
    private readonly predicate;
    private readonly graph;
    private readonly context;
    private readonly mediatorQueryOperation;
    private readonly maxRunningOperations;
    private readonly termHashes;
    private readonly runningOperations;
    private readonly pendingOperations;
    constructor(algebraFactory: Factory, subject: RDF.Term, predicate: Algebra.PropertyPathSymbol, graph: RDF.Term, context: IActionContext, mediatorQueryOperation: MediatorQueryOperation, emitFirstSubject: boolean, maxRunningOperations?: number);
    protected _end(destroy?: boolean): void;
    protected _push(item: RDF.Term, pushAsResult?: boolean): void;
    protected _read(count: number, done: () => void): void;
}
