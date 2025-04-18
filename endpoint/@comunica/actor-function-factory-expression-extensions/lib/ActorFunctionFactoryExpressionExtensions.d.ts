import type { IActionFunctionFactory, IActorFunctionFactoryOutput, IActorFunctionFactoryArgs, IActorFunctionFactoryOutputTerm } from '@comunica/bus-function-factory';
import { ActorFunctionFactory } from '@comunica/bus-function-factory';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Expression Function Extensions Function Factory Actor.
 */
export declare class ActorFunctionFactoryExpressionExtensions extends ActorFunctionFactory {
    constructor(args: IActorFunctionFactoryArgs);
    test({ context, functionName }: IActionFunctionFactory): Promise<TestResult<IActorTest>>;
    run<T extends IActionFunctionFactory>({ context, functionName }: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
