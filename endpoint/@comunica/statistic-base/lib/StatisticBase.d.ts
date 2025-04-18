import type { IStatisticBase } from '@comunica/types';
/**
 * Base class for statistics with event emitter logic implemented. Statistic tracker implementations
 * should only define their updateStatistic function.
 */
export declare abstract class StatisticBase<TEventData> implements IStatisticBase<TEventData> {
    private readonly listeners;
    on(listener: (data: TEventData) => any): StatisticBase<TEventData>;
    removeListener(listener: (data: TEventData) => any): StatisticBase<TEventData>;
    emit(data: TEventData): boolean;
    getListeners(): ((data: TEventData) => any)[];
    abstract updateStatistic(...data: any[]): void;
}
