"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deskolemizeOperation = exports.deskolemizeQuad = exports.deskolemizeTermNestedThrowing = exports.deskolemizeTerm = exports.skolemizeBindingsStream = exports.skolemizeQuadStream = exports.skolemizeBindings = exports.skolemizeQuad = exports.skolemizeTerm = exports.getSourceId = exports.SKOLEM_PREFIX = void 0;
const utils_data_factory_1 = require("@comunica/utils-data-factory");
const rdf_terms_1 = require("rdf-terms");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
exports.SKOLEM_PREFIX = 'urn:comunica_skolem:source_';
/**
 * Get the unique, deterministic id for the given source.
 * @param sourceIds ID's of datasources, see KeysRdfResolveQuadPattern.sourceIds.
 * @param source A data source.
 * @return The id of the given source.
 */
function getSourceId(sourceIds, source) {
    let sourceId = sourceIds.get(source.referenceValue);
    if (sourceId === undefined) {
        sourceId = `${sourceIds.size}`;
        sourceIds.set(source.referenceValue, sourceId);
    }
    return sourceId;
}
exports.getSourceId = getSourceId;
/**
 * If the given term is a blank node, return a deterministic named node for it
 * based on the source id and the blank node value.
 * @param dataFactory The data factory.
 * @param term Any RDF term.
 * @param sourceId A source identifier.
 * @return If the given term was a blank node, this will return a skolemized named node, otherwise the original term.
 */
function skolemizeTerm(dataFactory, term, sourceId) {
    if (term.termType === 'BlankNode') {
        return new utils_data_factory_1.BlankNodeScoped(`bc_${sourceId}_${term.value}`, dataFactory.namedNode(`${exports.SKOLEM_PREFIX}${sourceId}:${term.value}`));
    }
    return term;
}
exports.skolemizeTerm = skolemizeTerm;
/**
 * Skolemize all terms in the given quad.
 * @param dataFactory The data factory.
 * @param quad An RDF quad.
 * @param sourceId A source identifier.
 * @return The skolemized quad.
 */
function skolemizeQuad(dataFactory, quad, sourceId) {
    return (0, rdf_terms_1.mapTermsNested)(quad, term => skolemizeTerm(dataFactory, term, sourceId));
}
exports.skolemizeQuad = skolemizeQuad;
/**
 * Skolemize all terms in the given bindings.
 * @param dataFactory The data factory.
 * @param bindings An RDF bindings object.
 * @param sourceId A source identifier.
 * @return The skolemized bindings.
 */
function skolemizeBindings(dataFactory, bindings, sourceId) {
    return bindings.map((term) => {
        if (term.termType === 'Quad') {
            return skolemizeQuad(dataFactory, term, sourceId);
        }
        return skolemizeTerm(dataFactory, term, sourceId);
    });
}
exports.skolemizeBindings = skolemizeBindings;
/**
 * Skolemize all terms in the given quad stream.
 * @param dataFactory The data factory.
 * @param iterator An RDF quad stream.
 * @param sourceId A source identifier.
 * @return The skolemized quad stream.
 */
function skolemizeQuadStream(dataFactory, iterator, sourceId) {
    const ret = iterator.map(quad => skolemizeQuad(dataFactory, quad, sourceId));
    function inheritMetadata() {
        iterator.getProperty('metadata', (metadata) => {
            ret.setProperty('metadata', metadata);
            metadata.state.addInvalidateListener(inheritMetadata);
        });
    }
    inheritMetadata();
    return ret;
}
exports.skolemizeQuadStream = skolemizeQuadStream;
/**
 * Skolemize all terms in the given bindings stream.
 * @param dataFactory The data factory.
 * @param iterator An RDF bindings stream.
 * @param sourceId A source identifier.
 * @return The skolemized bindings stream.
 */
function skolemizeBindingsStream(dataFactory, iterator, sourceId) {
    const ret = iterator.map(bindings => skolemizeBindings(dataFactory, bindings, sourceId));
    function inheritMetadata() {
        iterator.getProperty('metadata', (metadata) => {
            ret.setProperty('metadata', metadata);
            metadata.state.addInvalidateListener(inheritMetadata);
        });
    }
    inheritMetadata();
    return ret;
}
exports.skolemizeBindingsStream = skolemizeBindingsStream;
/**
 * If a given term was a skolemized named node for the given source id,
 * deskolemize it again to a blank node.
 * If the given term was a skolemized named node for another source, return false.
 * If the given term was not a skolemized named node, return the original term.
 * @param dataFactory The data factory.
 * @param term Any RDF term.
 * @param sourceId A source identifier.
 */
function deskolemizeTerm(dataFactory, term, sourceId) {
    if (term.termType === 'BlankNode' && 'skolemized' in term) {
        term = term.skolemized;
    }
    if (term.termType === 'NamedNode' && term.value.startsWith(exports.SKOLEM_PREFIX)) {
        const colonSeparator = term.value.indexOf(':', exports.SKOLEM_PREFIX.length);
        const termSourceId = term.value.slice(exports.SKOLEM_PREFIX.length, colonSeparator);
        // We had a skolemized term
        if (termSourceId === sourceId) {
            // It came from the correct source
            const termLabel = term.value.slice(colonSeparator + 1, term.value.length);
            return dataFactory.blankNode(termLabel);
        }
        // It came from a different source
        return null;
    }
    return term;
}
exports.deskolemizeTerm = deskolemizeTerm;
function deskolemizeTermNestedThrowing(dataFactory, term, sourceId) {
    if (term.termType === 'Quad') {
        return (0, rdf_terms_1.mapTermsNested)(term, (subTerm) => {
            const deskolemized = deskolemizeTerm(dataFactory, subTerm, sourceId);
            if (!deskolemized) {
                throw new Error(`Skolemized term is not in scope for this source`);
            }
            return deskolemized;
        });
    }
    const ret = deskolemizeTerm(dataFactory, term, sourceId);
    if (ret === null) {
        throw new Error(`Skolemized term is not in scope for this source`);
    }
    return ret;
}
exports.deskolemizeTermNestedThrowing = deskolemizeTermNestedThrowing;
/**
 * Deskolemize all terms in the given quad.
 * @param dataFactory The data factory.
 * @param quad An RDF quad.
 * @param sourceId A source identifier.
 * @return The deskolemized quad.
 */
function deskolemizeQuad(dataFactory, quad, sourceId) {
    return (0, rdf_terms_1.mapTermsNested)(quad, (term) => {
        const newTerm = deskolemizeTerm(dataFactory, term, sourceId);
        // If the term was skolemized in a different source then don't deskolemize it
        return newTerm ?? term;
    });
}
exports.deskolemizeQuad = deskolemizeQuad;
/**
 * Deskolemize all terms in the given quad.
 * Will return undefined if there is at least one blank node not in scope for this sourceId.
 * @param dataFactory The data factory.
 * @param operation An algebra operation.
 * @param sourceId A source identifier.
 */
function deskolemizeOperation(dataFactory, operation, sourceId) {
    const algebraFactory = new sparqlalgebrajs_1.Factory();
    try {
        return sparqlalgebrajs_1.Util.mapOperation(operation, {
            [sparqlalgebrajs_1.Algebra.types.PATTERN](op, factory) {
                return {
                    result: Object.assign(factory.createPattern(deskolemizeTermNestedThrowing(dataFactory, op.subject, sourceId), deskolemizeTermNestedThrowing(dataFactory, op.predicate, sourceId), deskolemizeTermNestedThrowing(dataFactory, op.object, sourceId), deskolemizeTermNestedThrowing(dataFactory, op.graph, sourceId)), { metadata: op.metadata }),
                    recurse: false,
                };
            },
            [sparqlalgebrajs_1.Algebra.types.PATH](op, factory) {
                return {
                    result: Object.assign(factory.createPath(deskolemizeTermNestedThrowing(dataFactory, op.subject, sourceId), op.predicate, deskolemizeTermNestedThrowing(dataFactory, op.object, sourceId), deskolemizeTermNestedThrowing(dataFactory, op.graph, sourceId)), { metadata: op.metadata }),
                    recurse: false,
                };
            },
        }, algebraFactory);
    }
    catch {
        // Return undefined for skolemized terms not in scope for this source
    }
}
exports.deskolemizeOperation = deskolemizeOperation;
//# sourceMappingURL=utils.js.map