import type { IActionFunctionFactory, IActorFunctionFactoryArgs, IActorFunctionFactoryOutput, IActorFunctionFactoryOutputTerm, MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import { ActorFunctionFactoryDedicated } from '@comunica/bus-function-factory';
interface IActorFunctionFactoryExpressionFunctionNotInArgs extends IActorFunctionFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica ExpressionFunctionNotIn Function Factory Actor.
 */
export declare class ActorFunctionFactoryExpressionNotIn extends ActorFunctionFactoryDedicated {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorFunctionFactoryExpressionFunctionNotInArgs);
    run<T extends IActionFunctionFactory>(args: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
export {};
