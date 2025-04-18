import type { ISearchForm } from '@comunica/actor-rdf-metadata-extract-hydra-controls';
import type { MediatorDereferenceRdf } from '@comunica/bus-dereference-rdf';
import type { MediatorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { MediatorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IQuerySource, BindingsStream, IActionContext, FragmentSelectorShape, IQueryBindingsOptions, MetadataBindings, ComunicaDataFactory } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { Algebra, Factory } from 'sparqlalgebrajs';
export declare class QuerySourceQpf implements IQuerySource {
    protected readonly selectorShape: FragmentSelectorShape;
    readonly searchForm: ISearchForm;
    private readonly mediatorMetadata;
    private readonly mediatorMetadataExtract;
    private readonly mediatorDereferenceRdf;
    private readonly dataFactory;
    private readonly algebraFactory;
    private readonly bindingsFactory;
    readonly referenceValue: string;
    private readonly subjectUri;
    private readonly predicateUri;
    private readonly objectUri;
    private readonly graphUri?;
    private readonly url;
    private readonly defaultGraph?;
    private readonly bindingsRestricted;
    private readonly cachedQuads;
    constructor(mediatorMetadata: MediatorRdfMetadata, mediatorMetadataExtract: MediatorRdfMetadataExtract, mediatorDereferenceRdf: MediatorDereferenceRdf, dataFactory: ComunicaDataFactory, algebraFactory: Factory, bindingsFactory: BindingsFactory, subjectUri: string, predicateUri: string, objectUri: string, graphUri: string | undefined, url: string, metadata: Record<string, any>, bindingsRestricted: boolean, initialQuads?: RDF.Stream);
    getSelectorShape(): Promise<FragmentSelectorShape>;
    queryBindings(operation: Algebra.Operation, context: IActionContext, options?: IQueryBindingsOptions): BindingsStream;
    /**
     * Get a first QPF search form.
     * @param {{[p: string]: any}} metadata A metadata object.
     * @return {ISearchForm} A search form, or null if none could be found.
     */
    getSearchForm(metadata: Record<string, any>): ISearchForm | undefined;
    /**
     * Create a QPF fragment IRI for the given quad pattern.
     * @param {ISearchForm} searchForm A search form.
     * @param {Term} subject A term.
     * @param {Term} predicate A term.
     * @param {Term} object A term.
     * @param {Term} graph A term.
     * @return {string} A URI.
     */
    createFragmentUri(searchForm: ISearchForm, subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph: RDF.Term): string;
    protected match(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph: RDF.Term, unionDefaultGraph: boolean, context: IActionContext, options?: IQueryBindingsOptions): AsyncIterator<RDF.Quad>;
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
    getBindingsRestrictedLink(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph: RDF.Term, url: string, filterBindings: {
        bindings: BindingsStream;
        metadata: MetadataBindings;
    }): Promise<string>;
    protected reverseMapQuadsToDefaultGraph(quads: AsyncIterator<RDF.Quad>): AsyncIterator<RDF.Quad>;
    getPatternId(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph: RDF.Term): string;
    protected cacheQuads(quads: AsyncIterator<RDF.Quad>, subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph: RDF.Term): void;
    protected getCachedQuads(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph: RDF.Term): AsyncIterator<RDF.Quad> | undefined;
    queryQuads(_operation: Algebra.Operation, _context: IActionContext): AsyncIterator<RDF.Quad>;
    queryBoolean(_operation: Algebra.Ask, _context: IActionContext): Promise<boolean>;
    queryVoid(_operation: Algebra.Update, _context: IActionContext): Promise<void>;
}
