import type { MediatorRdfJoinEntriesSort } from '@comunica/bus-rdf-join-entries-sort';
import type { MediatorRdfJoinSelectivity } from '@comunica/bus-rdf-join-selectivity';
import type { IAction, IActorArgs, Mediate, TestResult } from '@comunica/core';
import { Actor } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IQueryOperationResultBindings, MetadataBindings, Bindings, IActionContext, IJoinEntry, IJoinEntryWithMetadata, ComunicaDataFactory, MetadataVariable, LogicalJoinType } from '@comunica/types';
import { MetadataValidationState } from '@comunica/utils-metadata';
import type * as RDF from '@rdfjs/types';
/**
 * A comunica actor for joining 2 binding streams.
 *
 * Actor types:
 * * Input:  IActionRdfJoin:                The streams that need to be joined.
 * * Test:   IMediatorTypeJoinCoefficients: Join coefficients.
 * * Output: IActorRdfJoinOutput:           The resulting joined stream.
 *
 * @see IActionRdfJoin
 * @see IActorQueryOperationOutput
 */
export declare abstract class ActorRdfJoin<TS extends IActorRdfJoinTestSideData = IActorRdfJoinTestSideData> extends Actor<IActionRdfJoin, IMediatorTypeJoinCoefficients, IQueryOperationResultBindings, TS> {
    readonly mediatorJoinSelectivity: MediatorRdfJoinSelectivity;
    /**
     * If this actor will be logged in the debugger and physical query plan logger
     */
    includeInLogs: boolean;
    readonly logicalType: LogicalJoinType;
    readonly physicalName: string;
    /**
     * Can be used by subclasses to indicate the max or min number of streams that can be joined.
     * 0 for infinity.
     * By default, this indicates the max number, but can be inverted by setting limitEntriesMin to true.
     */
    protected readonly limitEntries: number;
    /**
     * If true, the limitEntries field is a lower limit,
     * otherwise, it is an upper limit.
     */
    protected readonly limitEntriesMin: boolean;
    /**
     * If this actor can handle undefs overlapping variable bindings.
     */
    protected readonly canHandleUndefs: boolean;
    /**
     * If this join operator will not invoke any other join or query operations below,
     * and can therefore be considered a leaf of the join plan.
     */
    protected readonly isLeaf: boolean;
    /**
     * If this join operator must only be used for join entries with (at least partially) common variables.
     */
    protected readonly requiresVariableOverlap?: boolean;
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF joining failed: none of the configured actors were able to handle the join type ${action.type}} busFailMessage
     * @param options - Actor-specific join options.
     */
    constructor(args: IActorRdfJoinArgs<TS>, options: IActorRdfJoinInternalOptions);
    /**
     * Returns an array containing all the variable names that occur in all bindings streams.
     * @param {MetadataBindings[]} metadatas An array of optional metadata objects for the entries.
     * @returns {RDF.Variable[]} An array of variables.
     */
    static overlappingVariables(metadatas: MetadataBindings[]): MetadataVariable[];
    /**
     * Returns the variables that will occur in the joined bindings.
     * @param dataFactory The data factory.
     * @param {MetadataBindings[]} metadatas An array of metadata objects for the entries.
     * @param optional If an optional join is being performed.
     * @returns {RDF.Variable[]} An array of joined variables.
     */
    static joinVariables(dataFactory: ComunicaDataFactory, metadatas: MetadataBindings[], optional?: boolean): MetadataVariable[];
    /**
     * Returns the result of joining bindings, or `null` if no join is possible.
     * @param {Bindings[]} bindings
     * @returns {Bindings}
     */
    static joinBindings(...bindings: Bindings[]): Bindings | null;
    /**
     * Get the estimated number of items from the given metadata.
     * @param {Record<string, any>} metadata A metadata object.
     * @return {number} The estimated number of items, or `Infinity` if cardinality is falsy.
     */
    static getCardinality(metadata: MetadataBindings): RDF.QueryResultCardinality;
    /**
     * Obtain the metadata from all given join entries.
     * @param entries Join entries.
     */
    static getMetadatas(entries: IJoinEntry[]): Promise<MetadataBindings[]>;
    /**
     * Obtain the join entries witt metadata from all given join entries.
     * @param entries Join entries.
     */
    static getEntriesWithMetadatas(entries: IJoinEntry[]): Promise<IJoinEntryWithMetadata[]>;
    /**
     * Calculate the time to initiate a request for the given metadata entries.
     * @param metadatas An array of checked metadata.
     */
    static getRequestInitialTimes(metadatas: MetadataBindings[]): number[];
    /**
     * Calculate the time to receive a single item for the given metadata entries.
     * @param metadatas An array of checked metadata.
     */
    static getRequestItemTimes(metadatas: MetadataBindings[]): number[];
    /**
     * Construct a metadata validation state for the given metadata entries.
     * @param metadatas An array of checked metadata.
     */
    constructState(metadatas: MetadataBindings[]): MetadataValidationState;
    /**
     * Helper function to create a new metadata object for the join result.
     * For required metadata entries that are not provided, sane defaults are calculated.
     * @param entries Join entries.
     * @param metadatas Metadata of the join entries.
     * @param context The action context.
     * @param partialMetadata Partial metadata entries.
     * @param optional If metadata for an optional operation must be calculated.
     */
    constructResultMetadata(entries: IJoinEntry[], metadatas: MetadataBindings[], context: IActionContext, partialMetadata?: Partial<MetadataBindings>, optional?: boolean): Promise<MetadataBindings>;
    /**
     * Order the given join entries using the join-entries-sort bus.
     * @param {MediatorRdfJoinEntriesSort} mediatorJoinEntriesSort A mediator for sorting join entries.
     * @param {IJoinEntryWithMetadata[]} entries An array of join entries.
     * @param context The action context.
     * @return {IJoinEntryWithMetadata[]} The sorted join entries.
     */
    static sortJoinEntries(mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort, entries: IJoinEntryWithMetadata[], context: IActionContext): Promise<TestResult<IJoinEntryWithMetadata[]>>;
    /**
     * Default test function for join actors.
     * Checks whether all iterators have metadata.
     * If yes: call the abstract getIterations method, if not: return Infinity.
     * @param {IActionRdfJoin} action The input action containing the relevant iterators
     * @returns {Promise<IMediatorTypeJoinCoefficients>} The join coefficients.
     */
    test(action: IActionRdfJoin): Promise<TestResult<IMediatorTypeJoinCoefficients, TS>>;
    /**
     * Returns default input for 0 or 1 entries. Calls the getOutput function otherwise
     * @param {IActionRdfJoin} action
     * @param sideData Side data from the test method
     * @returns {Promise<IQueryOperationResultBindings>} A bindings result.
     */
    run(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<IQueryOperationResultBindings>;
    /**
     * Returns the resulting output for joining the given entries.
     * This is called after removing the trivial cases in run.
     * @param {IActionRdfJoin} action
     * @param sideData Side data from the test method
     * @returns {Promise<IActorRdfJoinOutputInner>}
     */
    protected abstract getOutput(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<IActorRdfJoinOutputInner>;
    /**
     * Calculate the join coefficients.
     * @param {IActionRdfJoin} action Join action
     * @param sideData The test side data.
     * @returns {IMediatorTypeJoinCoefficients} The join coefficient estimates.
     */
    protected abstract getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, TS>>;
}
export interface IActorRdfJoinArgs<TS extends IActorRdfJoinTestSideData = IActorRdfJoinTestSideData> extends IActorArgs<IActionRdfJoin, IMediatorTypeJoinCoefficients, IQueryOperationResultBindings, TS> {
    mediatorJoinSelectivity: MediatorRdfJoinSelectivity;
}
export interface IActorRdfJoinInternalOptions {
    /**
     * The logical join type this actor can handle.
     */
    logicalType: LogicalJoinType;
    /**
     * The physical name of join operation this actor implements.
     * This is used for debug and query plan logs.
     */
    physicalName: string;
    /**
     * Can be used by subclasses to indicate the max or min number of streams that can be joined.
     * 0 for infinity.
     * By default, this indicates the max number, but can be inverted by setting limitEntriesMin to true.
     */
    limitEntries?: number;
    /**
     * If true, the limitEntries field is a lower limit,
     * otherwise, it is an upper limit.
     * Defaults to false.
     */
    limitEntriesMin?: boolean;
    /**
     * If this actor can handle undefs overlapping variable bindings.
     * Defaults to false.
     */
    canHandleUndefs?: boolean;
    /**
     * If this join operator will not invoke any other join or query operations below,
     * and can therefore be considered a leaf of the join plan.
     * Defaults to true.
     */
    isLeaf?: boolean;
    /**
     * If this join operator must only be used for join entries with (at least partially) common variables.
     */
    requiresVariableOverlap?: boolean;
}
export interface IActionRdfJoin extends IAction {
    /**
     * The logical join type.
     */
    type: LogicalJoinType;
    /**
     * The array of streams to join.
     */
    entries: IJoinEntry[];
}
export interface IActorRdfJoinOutputInner {
    /**
     * The join result.
     */
    result: IQueryOperationResultBindings;
    /**
     * Optional metadata that will be included as metadata within the physical query plan output.
     */
    physicalPlanMetadata?: any;
}
export interface IActorRdfJoinTestSideData {
    metadatas: MetadataBindings[];
}
export type MediatorRdfJoin = Mediate<IActionRdfJoin, IQueryOperationResultBindings, IMediatorTypeJoinCoefficients>;
export { LogicalJoinType } from '@comunica/types';
