import type { IActionExpressionEvaluatorFactory, IActorExpressionEvaluatorFactoryArgs, IActorExpressionEvaluatorFactoryOutput } from '@comunica/bus-expression-evaluator-factory';
import { ActorExpressionEvaluatorFactory } from '@comunica/bus-expression-evaluator-factory';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Default Expression Evaluator Factory Actor.
 */
export declare class ActorExpressionEvaluatorFactoryDefault extends ActorExpressionEvaluatorFactory {
    constructor(args: IActorExpressionEvaluatorFactoryArgs);
    test(_action: IActionExpressionEvaluatorFactory): Promise<TestResult<IActorTest>>;
    run(action: IActionExpressionEvaluatorFactory): Promise<IActorExpressionEvaluatorFactoryOutput>;
}
