import type { IActionContext, IActionContextKey } from '@comunica/types';
/**
 * Implementation of {@link IActionContext} using Immutable.js.
 */
export declare class ActionContext implements IActionContext {
    private readonly map;
    constructor(data?: Record<string, any>);
    /**
     * Will only set the value if the key is not already set.
     */
    setDefault<V>(key: IActionContextKey<V>, value: V): IActionContext;
    set<V>(key: IActionContextKey<V>, value: V): IActionContext;
    setRaw(key: string, value: any): IActionContext;
    delete<V>(key: IActionContextKey<V>): IActionContext;
    get<V>(key: IActionContextKey<V>): V | undefined;
    getRaw(key: string): any | undefined;
    getSafe<V>(key: IActionContextKey<V>): V;
    has<V>(key: IActionContextKey<V>): boolean;
    hasRaw(key: string): boolean;
    merge(...contexts: IActionContext[]): IActionContext;
    keys(): IActionContextKey<any>[];
    toJS(): any;
    toString(): string;
    /**
     * Convert the given object to an action context object if it is not an action context object yet.
     * If it already is an action context object, return the object as-is.
     * @param maybeActionContext An action context or record.
     * @return {ActionContext} An action context object.
     */
    static ensureActionContext(maybeActionContext?: IActionContext | Record<string, any>): IActionContext;
}
/**
 * Simple implementation of {@link IActionContextKey}.
 */
export declare class ActionContextKey<V> implements IActionContextKey<V> {
    /**
     * A unique context key name.
     */
    readonly name: string;
    readonly dummy: V | undefined;
    constructor(name: string);
}
