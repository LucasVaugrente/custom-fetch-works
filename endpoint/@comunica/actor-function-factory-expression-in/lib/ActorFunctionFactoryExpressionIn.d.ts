import type { IActionFunctionFactory, IActorFunctionFactoryArgs, IActorFunctionFactoryOutput, IActorFunctionFactoryOutputTerm, MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import { ActorFunctionFactoryDedicated } from '@comunica/bus-function-factory';
interface IActorFunctionFactoryExpressionFunctionInArgs extends IActorFunctionFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica ExpressionFunctionIn Function Factory Actor.
 */
export declare class ActorFunctionFactoryExpressionIn extends ActorFunctionFactoryDedicated {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorFunctionFactoryExpressionFunctionInArgs);
    run<T extends IActionFunctionFactory>(args: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
export {};
