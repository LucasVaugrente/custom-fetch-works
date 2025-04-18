import type { IActionQueryParse, IActorQueryParseArgs, IActorQueryParseOutput } from '@comunica/bus-query-parse';
import { ActorQueryParse } from '@comunica/bus-query-parse';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Algebra SPARQL Parse Actor.
 */
export declare class ActorQueryParseSparql extends ActorQueryParse {
    readonly prefixes: Record<string, string>;
    constructor(args: IActorQueryParseSparqlArgs);
    test(action: IActionQueryParse): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryParse): Promise<IActorQueryParseOutput>;
}
export interface IActorQueryParseSparqlArgs extends IActorQueryParseArgs {
    /**
     * Default prefixes to use
     * @range {json}
     * @default {{
     *   "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
     *   "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
     *   "owl": "http://www.w3.org/2002/07/owl#",
     *   "xsd": "http://www.w3.org/2001/XMLSchema#",
     *   "dc": "http://purl.org/dc/terms/",
     *   "dcterms": "http://purl.org/dc/terms/",
     *   "dc11": "http://purl.org/dc/elements/1.1/",
     *   "foaf": "http://xmlns.com/foaf/0.1/",
     *   "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
     *   "dbpedia": "http://dbpedia.org/resource/",
     *   "dbpedia-owl": "http://dbpedia.org/ontology/",
     *   "dbpprop": "http://dbpedia.org/property/",
     *   "schema": "http://schema.org/",
     *   "skos": "http://www.w3.org/2008/05/skos#"
     * }}
     */
    prefixes?: Record<string, string>;
}
