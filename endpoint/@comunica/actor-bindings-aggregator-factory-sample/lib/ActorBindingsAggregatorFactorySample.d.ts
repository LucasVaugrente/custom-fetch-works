import type { IActionBindingsAggregatorFactory, IActorBindingsAggregatorFactoryArgs, IActorBindingsAggregatorFactoryOutput } from '@comunica/bus-bindings-aggregator-factory';
import { ActorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Sample Expression Evaluator Aggregate Actor.
 */
export declare class ActorBindingsAggregatorFactorySample extends ActorBindingsAggregatorFactory {
    constructor(args: IActorBindingsAggregatorFactoryArgs);
    test(action: IActionBindingsAggregatorFactory): Promise<TestResult<IActorTest>>;
    run({ context, expr }: IActionBindingsAggregatorFactory): Promise<IActorBindingsAggregatorFactoryOutput>;
}
