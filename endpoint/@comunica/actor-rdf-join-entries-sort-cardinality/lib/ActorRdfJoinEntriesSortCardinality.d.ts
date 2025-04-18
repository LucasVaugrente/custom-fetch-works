import type { IActionRdfJoinEntriesSort, IActorRdfJoinEntriesSortOutput } from '@comunica/bus-rdf-join-entries-sort';
import { ActorRdfJoinEntriesSort } from '@comunica/bus-rdf-join-entries-sort';
import type { IActorArgs, IActorTest, TestResult } from '@comunica/core';
/**
 * An actor that sorts join entries by increasing cardinality.
 */
export declare class ActorRdfJoinEntriesSortCardinality extends ActorRdfJoinEntriesSort {
    constructor(args: IActorArgs<IActionRdfJoinEntriesSort, IActorTest, IActorRdfJoinEntriesSortOutput>);
    test(_action: IActionRdfJoinEntriesSort): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfJoinEntriesSort): Promise<IActorRdfJoinEntriesSortOutput>;
}
