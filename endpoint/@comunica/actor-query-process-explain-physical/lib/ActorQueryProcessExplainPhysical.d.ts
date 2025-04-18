import type { IActionQueryProcess, IActorQueryProcessOutput, IActorQueryProcessArgs, IQueryProcessSequential } from '@comunica/bus-query-process';
import { ActorQueryProcess } from '@comunica/bus-query-process';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Explain Physical Query Process Actor.
 */
export declare class ActorQueryProcessExplainPhysical extends ActorQueryProcess {
    readonly queryProcessor: IQueryProcessSequential;
    constructor(args: IActorQueryProcessExplainPhysicalArgs);
    test(action: IActionQueryProcess): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryProcess): Promise<IActorQueryProcessOutput>;
}
export interface IActorQueryProcessExplainPhysicalArgs extends IActorQueryProcessArgs {
    queryProcessor: IQueryProcessSequential;
}
