import type { IActionFunctionFactory, IActorFunctionFactoryArgs, IActorFunctionFactoryOutput, IActorFunctionFactoryOutputTerm } from '@comunica/bus-function-factory';
import { ActorFunctionFactoryDedicated } from '@comunica/bus-function-factory';
/**
 * A comunica ExpressionFunctionLogicalOr Function Factory Actor.
 */
export declare class ActorFunctionFactoryExpressionLogicalOr extends ActorFunctionFactoryDedicated {
    constructor(args: IActorFunctionFactoryArgs);
    run<T extends IActionFunctionFactory>(_: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
