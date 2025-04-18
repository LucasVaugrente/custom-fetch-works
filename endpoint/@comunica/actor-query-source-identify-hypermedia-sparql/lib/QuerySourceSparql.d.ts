import type { MediatorHttp } from '@comunica/bus-http';
import type { BindingsStream, ComunicaDataFactory, FragmentSelectorShape, IActionContext, IQueryBindingsOptions, IQuerySource, MetadataBindings } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { Factory, Algebra } from 'sparqlalgebrajs';
import type { BindMethod } from './ActorQuerySourceIdentifyHypermediaSparql';
export declare class QuerySourceSparql implements IQuerySource {
    protected static readonly SELECTOR_SHAPE: FragmentSelectorShape;
    readonly referenceValue: string;
    private readonly url;
    private readonly context;
    private readonly mediatorHttp;
    private readonly bindMethod;
    private readonly countTimeout;
    private readonly dataFactory;
    private readonly algebraFactory;
    private readonly bindingsFactory;
    private readonly endpointFetcher;
    private readonly cache;
    private lastSourceContext;
    constructor(url: string, context: IActionContext, mediatorHttp: MediatorHttp, bindMethod: BindMethod, dataFactory: ComunicaDataFactory, algebraFactory: Factory, bindingsFactory: BindingsFactory, forceHttpGet: boolean, cacheSize: number, countTimeout: number);
    getSelectorShape(): Promise<FragmentSelectorShape>;
    queryBindings(operationIn: Algebra.Operation, context: IActionContext, options?: IQueryBindingsOptions): BindingsStream;
    queryQuads(operation: Algebra.Operation, context: IActionContext): AsyncIterator<RDF.Quad>;
    queryBoolean(operation: Algebra.Ask, context: IActionContext): Promise<boolean>;
    queryVoid(operation: Algebra.Update, context: IActionContext): Promise<void>;
    protected attachMetadata(target: AsyncIterator<any>, context: IActionContext, operationPromise: Promise<Algebra.Operation>): void;
    /**
     * Create an operation that includes the bindings from the given bindings stream.
     * @param algebraFactory The algebra factory.
     * @param bindMethod A method for adding bindings to an operation.
     * @param operation The operation to bind to.
     * @param addBindings The bindings to add.
     * @param addBindings.bindings The bindings stream.
     * @param addBindings.metadata The bindings metadata.
     */
    static addBindingsToOperation(algebraFactory: Factory, bindMethod: BindMethod, operation: Algebra.Operation, addBindings: {
        bindings: BindingsStream;
        metadata: MetadataBindings;
    }): Promise<Algebra.Operation>;
    /**
     * Convert an operation to a select query for this pattern.
     * @param algebraFactory The algebra factory.
     * @param {Algebra.Operation} operation A query operation.
     * @param {RDF.Variable[]} variables The variables in scope for the operation.
     * @return {string} A select query string.
     */
    static operationToSelectQuery(algebraFactory: Factory, operation: Algebra.Operation, variables: RDF.Variable[]): string;
    /**
     * Convert an operation to a count query for the number of matching triples for this pattern.
     * @param dataFactory The data factory.
     * @param algebraFactory The algebra factory.
     * @param {Algebra.Operation} operation A query operation.
     * @return {string} A count query string.
     */
    static operationToCountQuery(dataFactory: ComunicaDataFactory, algebraFactory: Factory, operation: Algebra.Operation): string;
    /**
     * Convert an operation to a query for this pattern.
     * @param {Algebra.Operation} operation A query operation.
     * @return {string} A query string.
     */
    static operationToQuery(operation: Algebra.Operation): string;
    /**
     * Check if the given operation may produce undefined values.
     * @param operation
     */
    static getOperationUndefs(operation: Algebra.Operation): RDF.Variable[];
    /**
     * Send a SPARQL query to a SPARQL endpoint and retrieve its bindings as a stream.
     * @param {string} endpoint A SPARQL endpoint URL.
     * @param {string} query A SPARQL query string.
     * @param {RDF.Variable[]} variables The expected variables.
     * @param {IActionContext} context The source context.
     * @param undefVariables Variables that may have undefs.
     * @return {BindingsStream} A stream of bindings.
     */
    queryBindingsRemote(endpoint: string, query: string, variables: RDF.Variable[], context: IActionContext, undefVariables: RDF.Variable[]): Promise<BindingsStream>;
    toString(): string;
}
