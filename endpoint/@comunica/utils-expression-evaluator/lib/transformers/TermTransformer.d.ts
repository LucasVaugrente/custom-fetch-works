import type { Expression, ISuperTypeProvider } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { Algebra as Alg } from 'sparqlalgebrajs';
import * as E from '../expressions';
export interface ITermTransformer {
    transformRDFTermUnsafe: (term: RDF.Term) => E.Term;
    transformLiteral: (lit: RDF.Literal) => E.Literal<any>;
}
export declare class TermTransformer implements ITermTransformer {
    protected readonly superTypeProvider: ISuperTypeProvider;
    constructor(superTypeProvider: ISuperTypeProvider);
    /**
     * Transforms an RDF term to the internal representation of a term,
     * assuming it is not a variable, which would be an expression (internally).
     *
     * @param term RDF term to transform into internal representation of a term
     */
    transformRDFTermUnsafe(term: RDF.Term): E.Term;
    protected transformTerm(term: Alg.TermExpression): Expression;
    /**
     * @param lit the rdf literal we want to transform to an internal Literal expression.
     */
    transformLiteral(lit: RDF.Literal): E.Literal<any>;
}
