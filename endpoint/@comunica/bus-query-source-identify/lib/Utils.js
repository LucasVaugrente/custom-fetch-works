"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMatchingQuotedQuads = exports.quadsOrderToBindingsOrder = exports.quadsMetadataToBindingsMetadata = exports.setMetadata = exports.getDuplicateElementLinks = exports.getVariables = exports.isTermVariable = exports.quadsToBindings = void 0;
const utils_iterator_1 = require("@comunica/utils-iterator");
const utils_metadata_1 = require("@comunica/utils-metadata");
const rdf_string_1 = require("rdf-string");
const rdf_terms_1 = require("rdf-terms");
const QuadTermUtil_1 = require("rdf-terms/lib/QuadTermUtil");
/**
 * Convert an iterator of quads to an iterator of bindings.
 * @param quads The quads to convert.
 * @param pattern The pattern to get variables from to determine bindings.
 *                All quads are also assumed to match the pattern.
 * @param dataFactory The data factory.
 * @param bindingsFactory The factory for creating bindings.
 * @param unionDefaultGraph If union default graph mode is enabled.
 *                          If true, variable graphs will match all graphs, including the default graph.
 *                          If false, variable graphs will only match named graphs, and not the default graph.
 */
function quadsToBindings(quads, pattern, dataFactory, bindingsFactory, unionDefaultGraph) {
    const variables = getVariables(pattern);
    // If non-default-graph triples need to be filtered out
    const filterNonDefaultQuads = pattern.graph.termType === 'Variable' && !unionDefaultGraph;
    // Detect duplicate variables in the pattern
    const duplicateElementLinks = getDuplicateElementLinks(pattern);
    // Convenience datastructure for mapping quad elements to variables
    const elementVariables = (0, rdf_terms_1.reduceTermsNested)(pattern, (acc, term, keys) => {
        if (term.termType === 'Variable') {
            acc[keys.join('_')] = term.value;
        }
        return acc;
    }, {});
    // Optionally filter, and construct bindings
    let filteredOutput = quads;
    // SPARQL query semantics allow graph variables to only match with named graphs, excluding the default graph
    // But this is not the case when using union default graph semantics
    if (filterNonDefaultQuads) {
        filteredOutput = filteredOutput.filter(quad => quad.graph.termType !== 'DefaultGraph');
    }
    // If there are duplicate variables in the search pattern,
    // make sure that we filter out the triples that don't have equal values for those triple elements,
    // as the rdf-resolve-quad-pattern bus ignores variable names.
    if (duplicateElementLinks) {
        filteredOutput = filteredOutput.filter((quad) => {
            for (const keyLeft in duplicateElementLinks) {
                const keysLeft = keyLeft.split('_');
                const valueLeft = (0, rdf_terms_1.getValueNestedPath)(quad, keysLeft);
                for (const keysRight of duplicateElementLinks[keyLeft]) {
                    if (!valueLeft.equals((0, rdf_terms_1.getValueNestedPath)(quad, keysRight))) {
                        return false;
                    }
                }
            }
            return true;
        });
    }
    // Wrap it in a ClosableIterator, so we can propagate destroy calls
    const it = new utils_iterator_1.ClosableIterator(filteredOutput.map(quad => bindingsFactory
        .bindings(Object.keys(elementVariables).map((key) => {
        const keys = key.split('_');
        const variable = elementVariables[key];
        const term = (0, rdf_terms_1.getValueNestedPath)(quad, keys);
        return [dataFactory.variable(variable), term];
    }))), {
        onClose: () => quads.destroy(),
    });
    // Set the metadata property
    setMetadata(dataFactory, it, quads, elementVariables, variables, filterNonDefaultQuads || Boolean(duplicateElementLinks));
    return it;
}
exports.quadsToBindings = quadsToBindings;
/**
 * Check if a term is a variable.
 * @param {RDF.Term} term An RDF term.
 * @return {any} If the term is a variable or blank node.
 */
function isTermVariable(term) {
    return term.termType === 'Variable';
}
exports.isTermVariable = isTermVariable;
/**
 * Get all variables in the given pattern.
 * No duplicates are returned.
 * @param {RDF.BaseQuad} pattern A quad pattern.
 */
function getVariables(pattern) {
    return (0, rdf_terms_1.uniqTerms)((0, rdf_terms_1.getTermsNested)(pattern).filter(isTermVariable));
}
exports.getVariables = getVariables;
/**
 * A helper function to find a hash with quad elements that have duplicate variables.
 *
 * @param {RDF.Quad} pattern A quad pattern.
 *
 * @return {{[p: string]: string[]}} If no equal variable names are present in the four terms, this returns undefined.
 *                                   Otherwise, this maps quad elements paths (['subject'], ['predicate'], ['object'],
 *                                   ['graph'])
 *                                   to the list of quad elements it shares a variable name with.
 *                                   For quoted triples, paths such as ['subject', 'object'] may occur.
 *                                   If no links for a certain element exist, this element will
 *                                   not be included in the hash.
 *                                   Note 1: Quad elements will never have a link to themselves.
 *                                           So this can never occur: { subject: [[ 'subject']] },
 *                                           instead 'null' would be returned.
 *                                   Note 2: Links only exist in one direction,
 *                                           this means that { subject: [[ 'predicate']], predicate: [[ 'subject' ]] }
 *                                           will not occur, instead only { subject: [[ 'predicate']] }
 *                                           will be returned.
 *                                   Note 3: Keys can also be paths, but they are delimited by '_', such as:
 *                                           { subject_object_subject: [[ 'predicate']] }
 */
function getDuplicateElementLinks(pattern) {
    // Collect a variable to quad elements mapping.
    const variableElements = {};
    let duplicateVariables = false;
    (0, rdf_terms_1.forEachTermsNested)(pattern, (value, keys) => {
        if (value.termType === 'Variable') {
            const val = (0, rdf_string_1.termToString)(value);
            const length = (variableElements[val] || (variableElements[val] = [])).push(keys);
            duplicateVariables = duplicateVariables || length > 1;
        }
    });
    if (!duplicateVariables) {
        return;
    }
    // Collect quad element to elements with equal variables mapping.
    const duplicateElementLinks = {};
    for (const variable in variableElements) {
        const elements = variableElements[variable];
        const remainingElements = elements.slice(1);
        // Only store the elements that have at least one equal element.
        if (remainingElements.length > 0) {
            duplicateElementLinks[elements[0].join('_')] = remainingElements;
        }
    }
    return duplicateElementLinks;
}
exports.getDuplicateElementLinks = getDuplicateElementLinks;
/**
 * Set the metadata of the bindings stream derived from the metadata of the quads stream.
 * @param dataFactory The data factory.
 * @param {BindingsStream} bindings The bindings stream that will receive the metadata property.
 * @param {AsyncIterator<Quad>} quads The quads stream that is guaranteed to emit the metadata property.
 * @param elementVariables Mapping of quad term name to variable name.
 * @param variables Variables to include in the metadata
 * @param forceEstimateCardinality Set the cardinality to estimate
 * @return {() => Promise<{[p: string]: any}>} A lazy promise behind a callback resolving to a metadata object.
 */
function setMetadata(dataFactory, bindings, quads, elementVariables, variables, forceEstimateCardinality) {
    const getMetadataCb = (metadataRaw) => {
        if (forceEstimateCardinality) {
            metadataRaw.cardinality.type = 'estimate';
        }
        bindings.setProperty('metadata', quadsMetadataToBindingsMetadata(dataFactory, (0, utils_metadata_1.validateMetadataQuads)(metadataRaw), elementVariables, variables));
        // Propagate metadata invalidations
        if (metadataRaw.state) {
            metadataRaw.state.addInvalidateListener(() => {
                setMetadata(dataFactory, bindings, quads, elementVariables, variables, forceEstimateCardinality);
            });
        }
    };
    const metadata = quads.getProperty('metadata');
    if (metadata) {
        // This is to enforce sync metadata setting, because AsyncIterator will always call it async,
        // even if the property was already defined.
        getMetadataCb(metadata);
    }
    else {
        quads.getProperty('metadata', getMetadataCb);
    }
}
exports.setMetadata = setMetadata;
/**
 * Convert the metadata of quads to the metadata of bindings.
 * @param dataFactory The data factory.
 * @param metadataQuads Quads metadata.
 * @param elementVariables A mapping from quad elements to variables.
 * @param variables The variables in the bindings.
 */
function quadsMetadataToBindingsMetadata(dataFactory, metadataQuads, elementVariables, variables) {
    return {
        ...metadataQuads,
        order: metadataQuads.order ?
            quadsOrderToBindingsOrder(dataFactory, metadataQuads.order, elementVariables) :
            undefined,
        availableOrders: metadataQuads.availableOrders ?
            metadataQuads.availableOrders.map(orderDef => ({
                cost: orderDef.cost,
                terms: quadsOrderToBindingsOrder(dataFactory, orderDef.terms, elementVariables),
            })) :
            undefined,
        variables: variables.map(variable => ({ variable, canBeUndef: false })),
    };
}
exports.quadsMetadataToBindingsMetadata = quadsMetadataToBindingsMetadata;
/**
 * Convert the quads order metadata element to a bindings order metadata element.
 * @param dataFactory The data factory.
 * @param quadsOrder Quads order.
 * @param elementVariables A mapping from quad elements to variables.
 */
function quadsOrderToBindingsOrder(dataFactory, quadsOrder, elementVariables) {
    const mappedVariables = {};
    return quadsOrder.map((entry) => {
        // Omit entries that do not map to a variable
        const variableName = elementVariables[entry.term];
        if (!variableName) {
            // eslint-disable-next-line array-callback-return
            return;
        }
        // Omit entries that have been mapped already
        if (mappedVariables[variableName]) {
            // eslint-disable-next-line array-callback-return
            return;
        }
        mappedVariables[variableName] = true;
        return {
            term: dataFactory.variable(variableName),
            direction: entry.direction,
        };
    }).filter(Boolean);
}
exports.quadsOrderToBindingsOrder = quadsOrderToBindingsOrder;
/**
 * Perform post-match-filtering if the source does not support quoted triple filtering,
 * but we have a variable inside a quoted triple.
 * @param pattern The current quad pattern operation.
 * @param it The iterator to filter.
 */
function filterMatchingQuotedQuads(pattern, it) {
    if ((0, rdf_terms_1.someTerms)(pattern, term => term.termType === 'Quad')) {
        it = it.filter(quad => (0, QuadTermUtil_1.matchPatternMappings)(quad, pattern));
    }
    return it;
}
exports.filterMatchingQuotedQuads = filterMatchingQuotedQuads;
//# sourceMappingURL=Utils.js.map