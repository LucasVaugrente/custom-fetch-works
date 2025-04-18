import type * as RDF from '@rdfjs/types';
/**
 * A blank node that is scoped to a set of bindings.
 */
export declare class BlankNodeBindingsScoped implements RDF.BlankNode {
    readonly termType = "BlankNode";
    readonly singleBindingsScope = true;
    readonly value: string;
    constructor(value: string);
    equals(other: RDF.Term | null | undefined): boolean;
}
