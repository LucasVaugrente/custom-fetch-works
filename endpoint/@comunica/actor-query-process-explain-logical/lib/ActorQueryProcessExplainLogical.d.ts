import type { IActionQueryProcess, IActorQueryProcessOutput, IActorQueryProcessArgs, IQueryProcessSequential } from '@comunica/bus-query-process';
import { ActorQueryProcess } from '@comunica/bus-query-process';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Explain Logical Query Process Actor.
 */
export declare class ActorQueryProcessExplainLogical extends ActorQueryProcess {
    readonly queryProcessor: IQueryProcessSequential;
    constructor(args: IActorQueryProcessExplainLogicalArgs);
    test(action: IActionQueryProcess): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryProcess): Promise<IActorQueryProcessOutput>;
}
export interface IActorQueryProcessExplainLogicalArgs extends IActorQueryProcessArgs {
    queryProcessor: IQueryProcessSequential;
}
