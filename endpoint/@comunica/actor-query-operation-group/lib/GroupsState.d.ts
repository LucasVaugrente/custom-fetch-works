import type { IBindingsAggregator, MediatorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { Bindings, IActionContext } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A simple type alias for strings that should be hashes of Bindings
 */
export type BindingsHash = string;
/**
 * A state container for a single group
 *
 * @property {Bindings} bindings - The binding entries on which we group
 */
export interface IGroup {
    bindings: Bindings;
    aggregators: Record<string, IBindingsAggregator>;
}
/**
 * A state manager for the groups constructed by consuming the bindings-stream.
 */
export declare class GroupsState {
    private readonly pattern;
    private readonly mediatorBindingsAggregatorFactory;
    private readonly context;
    private readonly bindingsFactory;
    private readonly variables;
    private readonly groups;
    private readonly groupsInitializer;
    private readonly groupVariables;
    private readonly distinctHashes;
    private waitCounter;
    private waitResolver;
    private resultHasBeenCalled;
    constructor(pattern: Algebra.Group, mediatorBindingsAggregatorFactory: MediatorBindingsAggregatorFactory, context: IActionContext, bindingsFactory: BindingsFactory, variables: RDF.Variable[]);
    /**
     * - Consumes a stream binding
     * - Find the corresponding group and create one if need be
     * - Feeds the binding to the group's aggregators
     *
     * @param {Bindings} bindings - The Bindings to consume
     */
    consumeBindings(bindings: Bindings): Promise<void>;
    private subtractWaitCounterAndCollect;
    private handleResultCollection;
    private resultCheck;
    /**
     * Collect the result of the final state. This returns a Bindings per group,
     * and a (possibly empty) Bindings in case no Bindings have been consumed yet.
     * You can only call this method once, after calling this method,
     * calling any function on this will result in an error being thrown.
     */
    collectResults(): Promise<Bindings[]>;
    /**
     * @param {Bindings} bindings - Bindings to hash
     */
    private hashBindings;
}
