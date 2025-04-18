"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticBase = void 0;
/**
 * Base class for statistics with event emitter logic implemented. Statistic tracker implementations
 * should only define their updateStatistic function.
 */
class StatisticBase {
    constructor() {
        this.listeners = [];
    }
    on(listener) {
        this.listeners.push(listener);
        return this;
    }
    removeListener(listener) {
        if (!this.listeners || this.listeners.length === 0) {
            return this;
        }
        for (let i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i] === listener) {
                this.listeners.splice(i, 1);
            }
        }
        return this;
    }
    emit(data) {
        if (!this.listeners || this.listeners.length === 0) {
            return false;
        }
        for (const listener of this.listeners) {
            listener(data);
        }
        return true;
    }
    getListeners() {
        return this.listeners;
    }
}
exports.StatisticBase = StatisticBase;
//# sourceMappingURL=StatisticBase.js.map