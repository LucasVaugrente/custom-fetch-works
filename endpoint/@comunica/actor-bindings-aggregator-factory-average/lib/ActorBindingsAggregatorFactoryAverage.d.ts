import type { IActionBindingsAggregatorFactory, IActorBindingsAggregatorFactoryArgs, IActorBindingsAggregatorFactoryOutput } from '@comunica/bus-bindings-aggregator-factory';
import { ActorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import type { IActorTest, TestResult } from '@comunica/core';
export interface IActorBindingsAggregatorFactoryAverageArgs extends IActorBindingsAggregatorFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica Average Expression Evaluator Aggregate Actor.
 */
export declare class ActorBindingsAggregatorFactoryAverage extends ActorBindingsAggregatorFactory {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorBindingsAggregatorFactoryAverageArgs);
    test(action: IActionBindingsAggregatorFactory): Promise<TestResult<IActorTest>>;
    run({ context, expr }: IActionBindingsAggregatorFactory): Promise<IActorBindingsAggregatorFactoryOutput>;
}
