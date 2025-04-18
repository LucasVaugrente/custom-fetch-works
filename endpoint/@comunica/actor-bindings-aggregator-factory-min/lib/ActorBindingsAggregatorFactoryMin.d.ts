import type { IActionBindingsAggregatorFactory, IActorBindingsAggregatorFactoryArgs, IActorBindingsAggregatorFactoryOutput } from '@comunica/bus-bindings-aggregator-factory';
import { ActorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { MediatorTermComparatorFactory } from '@comunica/bus-term-comparator-factory';
import type { IActorTest, TestResult } from '@comunica/core';
export interface IActorBindingsAggregatorFactoryMinArgs extends IActorBindingsAggregatorFactoryArgs {
    mediatorTermComparatorFactory: MediatorTermComparatorFactory;
}
/**
 * A comunica Min Expression Evaluator Aggregate Actor.
 */
export declare class ActorBindingsAggregatorFactoryMin extends ActorBindingsAggregatorFactory {
    private readonly mediatorTermComparatorFactory;
    constructor(args: IActorBindingsAggregatorFactoryMinArgs);
    test(action: IActionBindingsAggregatorFactory): Promise<TestResult<IActorTest>>;
    run({ context, expr }: IActionBindingsAggregatorFactory): Promise<IActorBindingsAggregatorFactoryOutput>;
}
