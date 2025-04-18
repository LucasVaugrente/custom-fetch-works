import type { MediatorHttp } from '@comunica/bus-http';
import type { IQuadDestination } from '@comunica/bus-rdf-update-quads';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
/**
 * A quad destination that represents a resource that is patchable via SPARQL Update.
 */
export declare class QuadDestinationPatchSparqlUpdate implements IQuadDestination {
    private readonly url;
    private readonly context;
    private readonly mediatorHttp;
    constructor(url: string, context: IActionContext, mediatorHttp: MediatorHttp);
    update(quadStreams: {
        insert?: AsyncIterator<RDF.Quad>;
        delete?: AsyncIterator<RDF.Quad>;
    }): Promise<void>;
    private createCombinedQuadsQuery;
    private createQuadsQuery;
    private wrapSparqlUpdateRequest;
    deleteGraphs(_graphs: RDF.DefaultGraph | 'NAMED' | 'ALL' | RDF.NamedNode[], _requireExistence: boolean, _dropGraphs: boolean): Promise<void>;
    createGraphs(_graphs: RDF.NamedNode[], _requireNonExistence: boolean): Promise<void>;
}
