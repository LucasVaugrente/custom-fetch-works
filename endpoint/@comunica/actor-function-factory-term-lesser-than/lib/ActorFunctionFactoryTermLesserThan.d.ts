import type { IActionFunctionFactory, IActorFunctionFactoryArgs, IActorFunctionFactoryOutput, IActorFunctionFactoryOutputTerm, MediatorFunctionFactoryUnsafe } from '@comunica/bus-function-factory';
import { ActorFunctionFactoryDedicated } from '@comunica/bus-function-factory';
interface IActorFunctionFactoryTermFunctionLesserThanArgs extends IActorFunctionFactoryArgs {
    mediatorFunctionFactory: MediatorFunctionFactoryUnsafe;
}
/**
 * A comunica TermFunctionLesserThan Function Factory Actor.
 */
export declare class ActorFunctionFactoryTermLesserThan extends ActorFunctionFactoryDedicated {
    private readonly mediatorFunctionFactory;
    constructor(args: IActorFunctionFactoryTermFunctionLesserThanArgs);
    run<T extends IActionFunctionFactory>(args: T): Promise<T extends {
        requireTermExpression: true;
    } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput>;
}
export {};
