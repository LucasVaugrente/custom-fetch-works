import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionFunctionFactory, IActorFunctionFactoryArgs } from './ActorFunctionFactory';
import { ActorFunctionFactory } from './ActorFunctionFactory';
type StringArray = [string, ...string[]];
/**
 * A base implementation for function factory actors for a dedicated operator.
 */
export declare abstract class ActorFunctionFactoryDedicated extends ActorFunctionFactory {
    readonly functionNames: StringArray;
    readonly termFunction: boolean;
    protected constructor(args: IActorFunctionFactoryDedicatedArgs);
    test(action: IActionFunctionFactory): Promise<TestResult<IActorTest>>;
}
export interface IActorFunctionFactoryDedicatedArgs extends IActorFunctionFactoryArgs {
    functionNames: StringArray;
    termFunction: boolean;
}
export {};
