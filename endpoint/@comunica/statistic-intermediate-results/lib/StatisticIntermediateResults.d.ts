import type { ActionContextKey } from '@comunica/core';
import { StatisticBase } from '@comunica/statistic-base';
import type { PartialResult, IStatisticBase } from '@comunica/types';
export declare class StatisticIntermediateResults extends StatisticBase<PartialResult> {
    key: ActionContextKey<IStatisticBase<PartialResult>>;
    updateStatistic(intermediateResult: PartialResult): boolean;
}
