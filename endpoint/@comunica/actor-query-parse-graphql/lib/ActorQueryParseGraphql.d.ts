import type { IActionQueryParse, IActorQueryParseArgs, IActorQueryParseOutput } from '@comunica/bus-query-parse';
import { ActorQueryParse } from '@comunica/bus-query-parse';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica GraphQL SPARQL Parse Actor.
 */
export declare class ActorQueryParseGraphql extends ActorQueryParse {
    private readonly graphqlToSparql;
    constructor(args: IActorQueryParseArgs);
    test(action: IActionQueryParse): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryParse): Promise<IActorQueryParseOutput>;
}
