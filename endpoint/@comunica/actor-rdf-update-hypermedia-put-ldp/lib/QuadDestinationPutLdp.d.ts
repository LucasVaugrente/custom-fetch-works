import type { MediatorHttp } from '@comunica/bus-http';
import type { MediatorRdfSerialize, MediatorRdfSerializeMediaTypes } from '@comunica/bus-rdf-serialize';
import type { IQuadDestination } from '@comunica/bus-rdf-update-quads';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
/**
 * A quad destination that represents a resource that can be PUT.
 */
export declare class QuadDestinationPutLdp implements IQuadDestination {
    private readonly url;
    private readonly context;
    private readonly mediaTypes;
    private readonly mediatorHttp;
    readonly mediatorRdfSerializeMediatypes: MediatorRdfSerializeMediaTypes;
    private readonly mediatorRdfSerialize;
    constructor(url: string, context: IActionContext, mediaTypes: string[], mediatorHttp: MediatorHttp, mediatorRdfSerializeMediatypes: MediatorRdfSerializeMediaTypes, mediatorRdfSerialize: MediatorRdfSerialize);
    update(quadStreams: {
        insert?: AsyncIterator<RDF.Quad>;
        delete?: AsyncIterator<RDF.Quad>;
    }): Promise<void>;
    wrapRdfUpdateRequest(type: 'INSERT' | 'DELETE', quads: AsyncIterator<RDF.Quad>): Promise<void>;
    deleteGraphs(_graphs: RDF.DefaultGraph | 'NAMED' | 'ALL' | RDF.NamedNode[], _requireExistence: boolean, _dropGraphs: boolean): Promise<void>;
    createGraphs(_graphs: RDF.NamedNode[], _requireNonExistence: boolean): Promise<void>;
}
