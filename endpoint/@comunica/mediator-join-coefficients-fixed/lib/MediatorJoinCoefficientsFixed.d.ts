import type { ActorRdfJoin, IActionRdfJoin, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import type { IActorReply, IMediatorArgs, TestResult } from '@comunica/core';
import { Mediator } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IQueryOperationResult } from '@comunica/types';
/**
 * A mediator that mediates over actors implementing the Join Coefficients mediator type and assigns fixed weights
 * to calculate an overall score and pick the actor with the lowest score.
 */
export declare class MediatorJoinCoefficientsFixed extends Mediator<ActorRdfJoin, IActionRdfJoin, IMediatorTypeJoinCoefficients, IQueryOperationResult, IActorRdfJoinTestSideData> {
    readonly cpuWeight: number;
    readonly memoryWeight: number;
    readonly timeWeight: number;
    readonly ioWeight: number;
    constructor(args: IMediatorJoinCoefficientsFixedArgs);
    protected mediateWith(action: IActionRdfJoin, testResults: IActorReply<ActorRdfJoin, IActionRdfJoin, IMediatorTypeJoinCoefficients, IQueryOperationResult, IActorRdfJoinTestSideData>[]): Promise<TestResult<ActorRdfJoin, IActorRdfJoinTestSideData>>;
}
export interface IMediatorJoinCoefficientsFixedArgs extends IMediatorArgs<ActorRdfJoin, IActionRdfJoin, IMediatorTypeJoinCoefficients, IQueryOperationResult, IActorRdfJoinTestSideData> {
    /**
     * Weight for the CPU cost
     */
    cpuWeight: number;
    /**
     * Weight for the memory cost
     */
    memoryWeight: number;
    /**
     * Weight for the execution time cost
     */
    timeWeight: number;
    /**
     * Weight for the I/O cost
     */
    ioWeight: number;
}
