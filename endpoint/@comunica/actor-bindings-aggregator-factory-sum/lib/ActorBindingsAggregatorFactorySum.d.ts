import type { IActionBindingsAggregatorFactory, IActorBindingsAggregatorFactoryArgs, IActorBindingsAggregatorFactoryOutput } from '@comunica/bus-bindings-aggregator-factory';
import { ActorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import type { IActorTest, TestResult } from '@comunica/core';
export interface IActorBindingsAggregatorFactorySumArgs extends IActorBindingsAggregatorFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica Sum Expression Evaluator Aggregate Actor.
 */
export declare class ActorBindingsAggregatorFactorySum extends ActorBindingsAggregatorFactory {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorBindingsAggregatorFactorySumArgs);
    test(action: IActionBindingsAggregatorFactory): Promise<TestResult<IActorTest>>;
    run({ expr, context }: IActionBindingsAggregatorFactory): Promise<IActorBindingsAggregatorFactoryOutput>;
}
