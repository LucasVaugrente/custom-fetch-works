import type { IActionInit, IActorOutputInit } from '@comunica/bus-init';
import type { IQueryContextCommon } from '@comunica/types';
import type { IActorInitQueryBaseArgs } from './ActorInitQueryBase';
import { ActorInitQueryBase } from './ActorInitQueryBase';
/**
 * A comunica Query Init Actor.
 */
export declare class ActorInitQuery<QueryContext extends IQueryContextCommon = IQueryContextCommon> extends ActorInitQueryBase {
    constructor(args: IActorInitQueryBaseArgs);
    run(action: IActionInit): Promise<IActorOutputInit>;
}
