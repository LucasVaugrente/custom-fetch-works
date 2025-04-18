import type { IActionFunctionFactory, IActorFunctionFactoryArgs, IActorFunctionFactoryOutput, IActorFunctionFactoryOutputTerm, MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import { ActorFunctionFactoryDedicated } from '@comunica/bus-function-factory';
interface IActorFunctionFactoryTermFunctionLesserThanEqualArgs extends IActorFunctionFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica TermFunctionLesserThanEqual Function Factory Actor.
 */
export declare class ActorFunctionFactoryTermLesserThanEqual extends ActorFunctionFactoryDedicated {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorFunctionFactoryTermFunctionLesserThanEqualArgs);
    run<T extends IActionFunctionFactory>(args: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
export {};
