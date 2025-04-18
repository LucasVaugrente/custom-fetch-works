import type { IActionQueryProcess, IActorQueryProcessOutput, IActorQueryProcessArgs, IQueryProcessSequential } from '@comunica/bus-query-process';
import { ActorQueryProcess } from '@comunica/bus-query-process';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Explain Parsed Query Process Actor.
 */
export declare class ActorQueryProcessExplainParsed extends ActorQueryProcess {
    readonly queryProcessor: IQueryProcessSequential;
    constructor(args: IActorQueryProcessExplainParsedArgs);
    test(action: IActionQueryProcess): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryProcess): Promise<IActorQueryProcessOutput>;
}
export interface IActorQueryProcessExplainParsedArgs extends IActorQueryProcessArgs {
    queryProcessor: IQueryProcessSequential;
}
