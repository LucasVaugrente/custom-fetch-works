import type { ActionContextKey } from '@comunica/core';
import { StatisticBase } from '@comunica/statistic-base';
import type { IDiscoverEventData, ILink, IStatisticBase } from '@comunica/types';
export declare class StatisticLinkDiscovery extends StatisticBase<IDiscoverEventData> {
    key: ActionContextKey<IStatisticBase<IDiscoverEventData>>;
    count: number;
    metadata: Record<string, Record<any, any>[]>;
    constructor();
    updateStatistic(link: ILink, parent: ILink): boolean;
}
