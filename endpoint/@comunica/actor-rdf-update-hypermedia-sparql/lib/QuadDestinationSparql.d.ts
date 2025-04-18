import type { MediatorHttp } from '@comunica/bus-http';
import type { IQuadDestination } from '@comunica/bus-rdf-update-quads';
import type { ComunicaDataFactory, IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
/**
 * A quad destination that represents an LDP resource.
 */
export declare class QuadDestinationSparql implements IQuadDestination {
    private readonly url;
    private readonly context;
    private readonly mediatorHttp;
    private readonly endpointFetcher;
    constructor(url: string, context: IActionContext, mediatorHttp: MediatorHttp, dataFactory: ComunicaDataFactory);
    update(quadStreams: {
        insert?: AsyncIterator<RDF.Quad>;
        delete?: AsyncIterator<RDF.Quad>;
    }): Promise<void>;
    private createCombinedQuadsQuery;
    private createQuadsQuery;
    private wrapSparqlUpdateRequest;
    deleteGraphs(graphsIn: RDF.DefaultGraph | 'NAMED' | 'ALL' | RDF.NamedNode[], requireExistence: boolean, dropGraphs: boolean): Promise<void>;
    createGraphs(graphs: RDF.NamedNode[], requireNonExistence: boolean): Promise<void>;
}
