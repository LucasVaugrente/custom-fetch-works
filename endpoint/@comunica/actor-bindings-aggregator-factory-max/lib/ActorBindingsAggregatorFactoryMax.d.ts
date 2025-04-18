import type { IActionBindingsAggregatorFactory, IActorBindingsAggregatorFactoryArgs, IActorBindingsAggregatorFactoryOutput } from '@comunica/bus-bindings-aggregator-factory';
import { ActorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { MediatorTermComparatorFactory } from '@comunica/bus-term-comparator-factory';
import type { IActorTest, TestResult } from '@comunica/core';
export interface IActorBindingsAggregatorFactoryMaxArgs extends IActorBindingsAggregatorFactoryArgs {
    mediatorTermComparatorFactory: MediatorTermComparatorFactory;
}
/**
 * A comunica Max Expression Evaluator Aggregate Actor.
 */
export declare class ActorBindingsAggregatorFactoryMax extends ActorBindingsAggregatorFactory {
    private readonly mediatorTermComparatorFactory;
    constructor(args: IActorBindingsAggregatorFactoryMaxArgs);
    test(action: IActionBindingsAggregatorFactory): Promise<TestResult<IActorTest>>;
    run({ expr, context }: IActionBindingsAggregatorFactory): Promise<IActorBindingsAggregatorFactoryOutput>;
}
