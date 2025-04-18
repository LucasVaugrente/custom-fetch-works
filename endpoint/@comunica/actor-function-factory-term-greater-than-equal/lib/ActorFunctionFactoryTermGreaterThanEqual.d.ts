import type { IActionFunctionFactory, IActorFunctionFactoryArgs, IActorFunctionFactoryOutput, IActorFunctionFactoryOutputTerm, MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import { ActorFunctionFactoryDedicated } from '@comunica/bus-function-factory';
interface IActorFunctionFactoryTermFunctionGreaterThanEqualArgs extends IActorFunctionFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica TermFunctionGreaterThanEqual Function Factory Actor.
 */
export declare class ActorFunctionFactoryTermGreaterThanEqual extends ActorFunctionFactoryDedicated {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorFunctionFactoryTermFunctionGreaterThanEqualArgs);
    run<T extends IActionFunctionFactory>(args: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
export {};
