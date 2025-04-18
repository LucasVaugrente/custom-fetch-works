import type { IQuadDestination } from '@comunica/bus-rdf-update-quads';
import type { ComunicaDataFactory } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
/**
 * A quad destination that wraps around an {@link RDF.Store}.
 */
export declare class RdfJsQuadDestination implements IQuadDestination {
    private readonly dataFactory;
    private readonly store;
    constructor(dataFactory: ComunicaDataFactory, store: RDF.Store);
    update(quadStreams: {
        insert?: AsyncIterator<RDF.Quad>;
        delete?: AsyncIterator<RDF.Quad>;
    }): Promise<void>;
    deleteGraphs(graphs: RDF.DefaultGraph | 'NAMED' | 'ALL' | RDF.NamedNode[], _requireExistence: boolean, _dropGraphs: boolean): Promise<void>;
    createGraphs(graphs: RDF.NamedNode[], requireNonExistence: boolean): Promise<void>;
}
