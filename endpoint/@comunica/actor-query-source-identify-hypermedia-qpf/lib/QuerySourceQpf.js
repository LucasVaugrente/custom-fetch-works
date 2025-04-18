"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySourceQpf = void 0;
const bus_query_source_identify_1 = require("@comunica/bus-query-source-identify");
const context_entries_1 = require("@comunica/context-entries");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
const rdf_string_1 = require("rdf-string");
const rdf_string_ttl_1 = require("rdf-string-ttl");
const rdf_terms_1 = require("rdf-terms");
class QuerySourceQpf {
    constructor(mediatorMetadata, mediatorMetadataExtract, mediatorDereferenceRdf, dataFactory, algebraFactory, bindingsFactory, subjectUri, predicateUri, objectUri, graphUri, url, metadata, bindingsRestricted, initialQuads) {
        this.referenceValue = url;
        this.mediatorMetadata = mediatorMetadata;
        this.mediatorMetadataExtract = mediatorMetadataExtract;
        this.mediatorDereferenceRdf = mediatorDereferenceRdf;
        this.dataFactory = dataFactory;
        this.algebraFactory = algebraFactory;
        this.bindingsFactory = bindingsFactory;
        this.subjectUri = subjectUri;
        this.predicateUri = predicateUri;
        this.objectUri = objectUri;
        this.graphUri = graphUri;
        this.url = url;
        this.bindingsRestricted = bindingsRestricted;
        this.cachedQuads = {};
        this.searchForm = this.getSearchForm(metadata);
        this.defaultGraph = metadata.defaultGraph ? this.dataFactory.namedNode(metadata.defaultGraph) : undefined;
        if (initialQuads) {
            let wrappedQuads = (0, asynciterator_1.wrap)(initialQuads);
            if (this.defaultGraph) {
                wrappedQuads = this.reverseMapQuadsToDefaultGraph(wrappedQuads);
            }
            metadata = { ...metadata, state: new utils_metadata_1.MetadataValidationState() };
            wrappedQuads.setProperty('metadata', metadata);
            this.cacheQuads(wrappedQuads, this.dataFactory.variable(''), this.dataFactory.variable(''), this.dataFactory.variable(''), this.dataFactory.variable(''));
        }
        this.selectorShape = this.bindingsRestricted ?
            {
                type: 'operation',
                operation: {
                    operationType: 'pattern',
                    pattern: this.algebraFactory.createPattern(this.dataFactory.variable('s'), this.dataFactory.variable('p'), this.dataFactory.variable('o'), this.dataFactory.variable('g')),
                },
                variablesOptional: [
                    this.dataFactory.variable('s'),
                    this.dataFactory.variable('p'),
                    this.dataFactory.variable('o'),
                    this.dataFactory.variable('g'),
                ],
                filterBindings: true,
            } :
            {
                type: 'operation',
                operation: {
                    operationType: 'pattern',
                    pattern: this.algebraFactory.createPattern(this.dataFactory.variable('s'), this.dataFactory.variable('p'), this.dataFactory.variable('o'), this.dataFactory.variable('g')),
                },
                variablesOptional: [
                    this.dataFactory.variable('s'),
                    this.dataFactory.variable('p'),
                    this.dataFactory.variable('o'),
                    this.dataFactory.variable('g'),
                ],
            };
    }
    async getSelectorShape() {
        return this.selectorShape;
    }
    queryBindings(operation, context, options) {
        if (operation.type !== 'pattern') {
            throw new Error(`Attempted to pass non-pattern operation '${operation.type}' to QuerySourceQpf`);
        }
        const unionDefaultGraph = Boolean(context.get(context_entries_1.KeysQueryOperation.unionDefaultGraph));
        // Create an async iterator from the matched quad stream
        let it = this.match(operation.subject, operation.predicate, operation.object, operation.graph, unionDefaultGraph, context, options);
        it = (0, bus_query_source_identify_1.filterMatchingQuotedQuads)(operation, it);
        return (0, bus_query_source_identify_1.quadsToBindings)(it, operation, this.dataFactory, this.bindingsFactory, unionDefaultGraph);
    }
    /**
     * Get a first QPF search form.
     * @param {{[p: string]: any}} metadata A metadata object.
     * @return {ISearchForm} A search form, or null if none could be found.
     */
    getSearchForm(metadata) {
        if (!metadata.searchForms || !metadata.searchForms.values) {
            return;
        }
        // Find a quad pattern or triple pattern search form
        const { searchForms } = metadata;
        for (const searchForm of searchForms.values) {
            if (this.graphUri &&
                this.subjectUri in searchForm.mappings &&
                this.predicateUri in searchForm.mappings &&
                this.objectUri in searchForm.mappings &&
                this.graphUri in searchForm.mappings &&
                Object.keys(searchForm.mappings).length === 4) {
                return searchForm;
            }
            if (this.subjectUri in searchForm.mappings &&
                this.predicateUri in searchForm.mappings &&
                this.objectUri in searchForm.mappings &&
                Object.keys(searchForm.mappings).length === 3) {
                return searchForm;
            }
        }
    }
    /**
     * Create a QPF fragment IRI for the given quad pattern.
     * @param {ISearchForm} searchForm A search form.
     * @param {Term} subject A term.
     * @param {Term} predicate A term.
     * @param {Term} object A term.
     * @param {Term} graph A term.
     * @return {string} A URI.
     */
    createFragmentUri(searchForm, subject, predicate, object, graph) {
        const entries = {};
        const input = [
            { uri: this.subjectUri, term: subject },
            { uri: this.predicateUri, term: predicate },
            { uri: this.objectUri, term: object },
            { uri: this.graphUri, term: graph },
        ];
        for (const entry of input) {
            // If bindingsRestricted, also pass variables, so the server knows how to bind values.
            if (entry.uri && (this.bindingsRestricted || (entry.term.termType !== 'Variable' &&
                (entry.term.termType !== 'Quad' || (0, rdf_terms_1.everyTermsNested)(entry.term, value => value.termType !== 'Variable'))))) {
                entries[entry.uri] = (0, rdf_string_1.termToString)(entry.term);
            }
        }
        return searchForm.getUri(entries);
    }
    match(subject, predicate, object, graph, unionDefaultGraph, context, options) {
        // If we are querying the default graph,
        // and the source has an overridden value for the default graph (such as QPF can provide),
        // we override the graph parameter with that value.
        let modifiedGraph = false;
        if (graph.termType === 'DefaultGraph') {
            if (this.defaultGraph) {
                modifiedGraph = true;
                graph = this.defaultGraph;
            }
            else if (Object.keys(this.searchForm.mappings).length === 4 && !this.defaultGraph) {
                // If the sd:defaultGraph is not declared on a QPF endpoint
                if (unionDefaultGraph) {
                    // With union-default-graph, take union of graphs.
                    graph = this.dataFactory.variable('g');
                }
                else {
                    // Without union-default-graph, the default graph must be empty.
                    const quads = new asynciterator_1.ArrayIterator([], { autoStart: false });
                    quads.setProperty('metadata', {
                        state: new utils_metadata_1.MetadataValidationState(),
                        requestTime: 0,
                        cardinality: { type: 'exact', value: 0 },
                        first: null,
                        next: null,
                        last: null,
                    });
                    return quads;
                }
            }
            else if (Object.keys(this.searchForm.mappings).length === 3) {
                // If have a TPF endpoint, set graph to variable so we could get the cached triples
                graph = this.dataFactory.variable('g');
            }
        }
        // Try to emit from cache (skip if filtering bindings)
        if (!options?.filterBindings) {
            const cached = this.getCachedQuads(subject, predicate, object, graph);
            if (cached) {
                return cached;
            }
        }
        // Kickstart metadata collection, because the quads iterator is lazy
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        let quads;
        const dataStreamPromise = (async function () {
            let url = self.createFragmentUri(self.searchForm, subject, predicate, object, graph);
            // Handle bindings-restricted interfaces
            if (options?.filterBindings) {
                url = await self.getBindingsRestrictedLink(subject, predicate, object, graph, url, options.filterBindings);
            }
            const dereferenceRdfOutput = await self.mediatorDereferenceRdf.mediate({ context, url });
            url = dereferenceRdfOutput.url;
            // Determine the metadata
            const rdfMetadataOuput = await self.mediatorMetadata.mediate({ context, url, quads: dereferenceRdfOutput.data, triples: dereferenceRdfOutput.metadata?.triples });
            // Extract the metadata
            const { metadata } = await self.mediatorMetadataExtract
                .mediate({
                context,
                url,
                metadata: rdfMetadataOuput.metadata,
                requestTime: dereferenceRdfOutput.requestTime,
            });
            quads.setProperty('metadata', { ...metadata, state: new utils_metadata_1.MetadataValidationState(), subsetOf: self.url });
            // While we could resolve this before metadata extraction, we do it afterwards to ensure metadata emission
            // before the end event is emitted.
            return rdfMetadataOuput.data;
        })();
        quads = new asynciterator_1.TransformIterator(async () => {
            const dataStream = await dataStreamPromise;
            // The server is free to send any data in its response (such as metadata),
            // including quads that do not match the given matter.
            // Therefore, we have to filter away all non-matching quads here.
            const actualDefaultGraph = this.dataFactory.defaultGraph();
            let filteredOutput = (0, asynciterator_1.wrap)(dataStream)
                .transform({
                filter(quad) {
                    if ((0, rdf_terms_1.matchPattern)(quad, subject, predicate, object, graph)) {
                        return true;
                    }
                    // Special case: if we are querying in the default graph, and we had an overridden default graph,
                    // also accept that incoming triples may be defined in the actual default graph
                    return modifiedGraph && (0, rdf_terms_1.matchPattern)(quad, subject, predicate, object, actualDefaultGraph);
                },
            });
            if (modifiedGraph || graph.termType === 'Variable') {
                // Reverse-map the overridden default graph back to the actual default graph
                filteredOutput = this.reverseMapQuadsToDefaultGraph(filteredOutput);
            }
            return filteredOutput;
        }, { autoStart: false });
        // Skip cache if filtering bindings
        if (options?.filterBindings) {
            return quads;
        }
        this.cacheQuads(quads, subject, predicate, object, graph);
        return this.getCachedQuads(subject, predicate, object, graph);
    }
    /**
     * If we add bindings for brTPF, append it to the URL.
     * We have to hardcode this because brTPF doesn't expose a URL template for passing bindings.
     * @param subject The subject.
     * @param predicate The predicate.
     * @param object The object.
     * @param graph The graph.
     * @param url The original QPF URL.
     * @param filterBindings The bindings to restrict with.
     * @param filterBindings.bindings The bindings stream.
     * @param filterBindings.metadata The bindings metadata.
     * @protected
     */
    async getBindingsRestrictedLink(subject, predicate, object, graph, url, filterBindings) {
        // Determine values
        const values = [];
        for (const binding of await filterBindings.bindings.toArray()) {
            const value = ['('];
            for (const variable of filterBindings.metadata.variables) {
                const term = binding.get(variable.variable);
                value.push(term ? (0, rdf_string_ttl_1.termToString)(term) : 'UNDEF');
                value.push(' ');
            }
            value.push(')');
            values.push(value.join(''));
        }
        if (values.length === 0) {
            // This is a hack to force an empty result page,
            // because the brTPF server returns a server error when passing 0 bindings.
            values.push('(<ex:comunica:unknown>)');
        }
        // Append to URL (brTPF uses the SPARQL VALUES syntax, without the VALUES prefix)
        const valuesUrl = encodeURIComponent(`(${filterBindings.metadata.variables.map(variable => `?${variable.variable.value}`).join(' ')}) { ${values.join(' ')} }`);
        return `${url}&values=${valuesUrl}`;
    }
    reverseMapQuadsToDefaultGraph(quads) {
        const actualDefaultGraph = this.dataFactory.defaultGraph();
        return quads.map(quad => (0, rdf_terms_1.mapTerms)(quad, (term, key) => key === 'graph' && term.equals(this.defaultGraph) ? actualDefaultGraph : term));
    }
    getPatternId(subject, predicate, object, graph) {
        return JSON.stringify({
            s: subject.termType === 'Variable' ? '' : _termToString(subject),
            p: predicate.termType === 'Variable' ? '' : _termToString(predicate),
            o: object.termType === 'Variable' ? '' : _termToString(object),
            g: graph.termType === 'Variable' ? '' : _termToString(graph),
        });
    }
    cacheQuads(quads, subject, predicate, object, graph) {
        const patternId = this.getPatternId(subject, predicate, object, graph);
        this.cachedQuads[patternId] = quads.clone();
    }
    getCachedQuads(subject, predicate, object, graph) {
        const patternId = this.getPatternId(subject, predicate, object, graph);
        const quads = this.cachedQuads[patternId];
        if (quads) {
            return quads.clone();
        }
    }
    queryQuads(_operation, _context) {
        throw new Error('queryQuads is not implemented in QuerySourceQpf');
    }
    queryBoolean(_operation, _context) {
        throw new Error('queryBoolean is not implemented in QuerySourceQpf');
    }
    queryVoid(_operation, _context) {
        throw new Error('queryVoid is not implemented in QuerySourceQpf');
    }
}
exports.QuerySourceQpf = QuerySourceQpf;
function _termToString(term) {
    return term.termType === 'DefaultGraph' ?
        // Any character that cannot be present in a URL will do
        '|' :
        (0, rdf_string_1.termToString)(term);
}
//# sourceMappingURL=QuerySourceQpf.js.map