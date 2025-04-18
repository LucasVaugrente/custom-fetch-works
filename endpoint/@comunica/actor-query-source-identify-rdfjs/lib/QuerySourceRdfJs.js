"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySourceRdfJs = void 0;
const bus_query_source_identify_1 = require("@comunica/bus-query-source-identify");
const context_entries_1 = require("@comunica/context-entries");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
const rdf_terms_1 = require("rdf-terms");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
class QuerySourceRdfJs {
    constructor(source, dataFactory, bindingsFactory) {
        this.source = source;
        this.referenceValue = source;
        this.dataFactory = dataFactory;
        this.bindingsFactory = bindingsFactory;
        const AF = new sparqlalgebrajs_1.Factory(this.dataFactory);
        this.selectorShape = {
            type: 'operation',
            operation: {
                operationType: 'pattern',
                pattern: AF.createPattern(this.dataFactory.variable('s'), this.dataFactory.variable('p'), this.dataFactory.variable('o')),
            },
            variablesOptional: [
                this.dataFactory.variable('s'),
                this.dataFactory.variable('p'),
                this.dataFactory.variable('o'),
            ],
        };
    }
    static nullifyVariables(term, quotedTripleFiltering) {
        return !term || term.termType === 'Variable' || (!quotedTripleFiltering &&
            term.termType === 'Quad' && (0, rdf_terms_1.someTermsNested)(term, value => value.termType === 'Variable')) ?
            undefined :
            term;
    }
    static hasDuplicateVariables(pattern) {
        const variables = (0, rdf_terms_1.filterTermsNested)(pattern, term => term.termType === 'Variable');
        return variables.length > 1 && (0, rdf_terms_1.uniqTerms)(variables).length < variables.length;
    }
    async getSelectorShape() {
        return this.selectorShape;
    }
    queryBindings(operation, context) {
        if (operation.type !== 'pattern') {
            throw new Error(`Attempted to pass non-pattern operation '${operation.type}' to QuerySourceRdfJs`);
        }
        // Check if the source supports quoted triple filtering
        const quotedTripleFiltering = Boolean(this.source.features?.quotedTripleFiltering);
        // Create an async iterator from the matched quad stream
        const rawStream = this.source.match(QuerySourceRdfJs.nullifyVariables(operation.subject, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.predicate, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.object, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.graph, quotedTripleFiltering));
        let it = rawStream instanceof asynciterator_1.AsyncIterator ?
            rawStream :
            (0, asynciterator_1.wrap)(rawStream, { autoStart: false });
        // Perform post-match-filtering if the source does not support quoted triple filtering.
        if (!quotedTripleFiltering) {
            it = (0, bus_query_source_identify_1.filterMatchingQuotedQuads)(operation, it);
        }
        // Determine metadata
        if (!it.getProperty('metadata')) {
            this.setMetadata(it, operation)
                .catch(error => it.destroy(error));
        }
        return (0, bus_query_source_identify_1.quadsToBindings)(it, operation, this.dataFactory, this.bindingsFactory, Boolean(context.get(context_entries_1.KeysQueryOperation.unionDefaultGraph)));
    }
    async setMetadata(it, operation) {
        // Check if the source supports quoted triple filtering
        const quotedTripleFiltering = Boolean(this.source.features?.quotedTripleFiltering);
        let cardinality;
        if (this.source.countQuads) {
            // If the source provides a dedicated method for determining cardinality, use that.
            cardinality = await this.source.countQuads(QuerySourceRdfJs.nullifyVariables(operation.subject, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.predicate, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.object, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.graph, quotedTripleFiltering));
        }
        else {
            // Otherwise, fallback to a sub-optimal alternative where we just call match again to count the quads.
            // WARNING: we can NOT reuse the original data stream here,
            // because we may lose data elements due to things happening async.
            let i = 0;
            cardinality = await new Promise((resolve, reject) => {
                const matches = this.source.match(QuerySourceRdfJs.nullifyVariables(operation.subject, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.predicate, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.object, quotedTripleFiltering), QuerySourceRdfJs.nullifyVariables(operation.graph, quotedTripleFiltering));
                matches.on('error', reject);
                matches.on('end', () => resolve(i));
                matches.on('data', () => i++);
            });
        }
        // If `match` would require filtering afterwards, our count will be an over-estimate.
        const wouldRequirePostFiltering = (!quotedTripleFiltering &&
            (0, rdf_terms_1.someTerms)(operation, term => term.termType === 'Quad')) ||
            QuerySourceRdfJs.hasDuplicateVariables(operation);
        it.setProperty('metadata', {
            state: new utils_metadata_1.MetadataValidationState(),
            cardinality: { type: wouldRequirePostFiltering ? 'estimate' : 'exact', value: cardinality },
        });
    }
    queryQuads(_operation, _context) {
        throw new Error('queryQuads is not implemented in QuerySourceRdfJs');
    }
    queryBoolean(_operation, _context) {
        throw new Error('queryBoolean is not implemented in QuerySourceRdfJs');
    }
    queryVoid(_operation, _context) {
        throw new Error('queryVoid is not implemented in QuerySourceRdfJs');
    }
    toString() {
        return `QuerySourceRdfJs(${this.source.constructor.name})`;
    }
}
exports.QuerySourceRdfJs = QuerySourceRdfJs;
//# sourceMappingURL=QuerySourceRdfJs.js.map