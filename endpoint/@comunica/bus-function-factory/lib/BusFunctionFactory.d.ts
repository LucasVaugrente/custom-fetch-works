import type { IActorTest, IBusArgs } from '@comunica/core';
import { BusIndexed } from '@comunica/core';
import type { ActorFunctionFactory, IActionFunctionFactory, IActorFunctionFactoryOutput } from './ActorFunctionFactory';
/**
 * Bus inspired by BusIndexed but specific for function factory.
 *
 * The implementation differs. In BusIndexed, each actor is indexed only once.
 * Here, a single actor can be indexed multiple times (max 2).
 */
export declare class BusFunctionFactory extends BusIndexed<ActorFunctionFactory, IActionFunctionFactory, IActorTest, IActorFunctionFactoryOutput> {
    constructor(args: IBusArgs);
}
