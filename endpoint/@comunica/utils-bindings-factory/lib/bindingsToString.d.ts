import type * as RDF from '@rdfjs/types';
/**
 * Convert a bindings object to a human-readable string.
 * @param bindings A bindings object.
 */
export declare function bindingsToString(bindings: RDF.Bindings): string;
/**
 * Convert a bindings object to a compact string.
 * This is mainly useful for internal indexing purposes.
 *
 * This function is guaranteed to not produce clashing bindings for unequal terms.
 *
 * This function will not sort the variables and expects them to be in the same order for every call.
 *
 * @param bindings A bindings object.
 * @param variables The variables to consider when converting the bindings to a string.
 */
export declare function bindingsToCompactString(bindings: RDF.Bindings, variables: RDF.Variable[]): string;
