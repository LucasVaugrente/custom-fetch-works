import type { ActionContextKey } from '@comunica/core';
import { StatisticBase } from '@comunica/statistic-base';
import type { ILink, IQuerySource, IStatisticBase } from '@comunica/types';
export declare class StatisticLinkDereference extends StatisticBase<ILink> {
    count: number;
    key: ActionContextKey<IStatisticBase<ILink>>;
    constructor();
    updateStatistic(link: ILink, source: IQuerySource): boolean;
}
