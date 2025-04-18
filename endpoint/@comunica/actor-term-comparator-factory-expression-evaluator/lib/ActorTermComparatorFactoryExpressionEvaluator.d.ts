import type { IActionTermComparatorFactory, IActorTermComparatorFactoryOutput } from '@comunica/bus-term-comparator-factory';
import { ActorTermComparatorFactory } from '@comunica/bus-term-comparator-factory';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Expression Evaluator Based Term Comparator Factory Actor.
 */
export declare class ActorTermComparatorFactoryExpressionEvaluator extends ActorTermComparatorFactory {
    test(_action: IActionTermComparatorFactory): Promise<TestResult<IActorTest>>;
    /**
     * Context item superTypeProvider can be expected here
     * @param context IActionTermComparatorFactory
     * @param context.context IActionContext
     */
    run({ context }: IActionTermComparatorFactory): Promise<IActorTermComparatorFactoryOutput>;
}
