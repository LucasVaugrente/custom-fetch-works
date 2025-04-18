import type { Bindings } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { Algebra, Factory } from 'sparqlalgebrajs';
/**
 * Materialize a term with the given binding.
 *
 * If the given term is a variable,
 * and that variable exist in the given bindings object,
 * the value of that binding is returned.
 * In all other cases, the term itself is returned.
 *
 * @param {RDF.Term} term A term.
 * @param {Bindings} bindings A bindings object.
 * @return {RDF.Term} The materialized term.
 */
export declare function materializeTerm(term: RDF.Term, bindings: Bindings): RDF.Term;
/**
 * Materialize the given operation (recursively) with the given bindings.
 * Essentially, the variables in the given operation
 * which don't appear in the projection operation will be replaced
 * by the terms bound to the variables in the given bindings.
 * @param {Algebra.Operation} operation SPARQL algebra operation.
 * And the variables that appear in the projection operation
 * will be added to a new values operation.
 * @param {Bindings} bindings A bindings object.
 * @param algebraFactory The algebra factory.
 * @param bindingsFactory The bindings factory.
 * @param options Options for materializations.
 * @param options.strictTargetVariables If target variable bindings (such as on SELECT or BIND) should not be allowed.
 * @param options.bindFilter If filter expressions should be materialized.
 * @param options.originalBindings The bindings object as it was at the top level call of materializeOperation.
 * @return Algebra.Operation A new operation materialized with the given bindings.
 */
export declare function materializeOperation(operation: Algebra.Operation, bindings: Bindings, algebraFactory: Factory, bindingsFactory: BindingsFactory, options?: {
    strictTargetVariables?: boolean;
    bindFilter?: boolean;
    originalBindings?: Bindings;
}): Algebra.Operation;
