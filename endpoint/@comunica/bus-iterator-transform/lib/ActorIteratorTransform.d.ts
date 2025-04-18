import type { IAction, IActorArgs, IActorOutput, IActorTest, Mediate, TestResult } from '@comunica/core';
import { Actor } from '@comunica/core';
import type { LogicalJoinType, IActionContext, MetadataBindings, MetadataQuads } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { types } from 'sparqlalgebrajs/lib/algebra';
/**
 * A comunica actor for transform-iterator events.
 *
 * Actor types:
 *  Input:  IActionIteratorTransform: Data that denotes what type of stream is being wrapped,
 *   what actor produced this stream, and the stream itself
 * * Test:   <none>
 * * Output: IActorIteratorTransformOutput: The transformed stream and additional metadata.
 *
 * @see IActionIteratorTransform
 * @see IActorIteratorTransformOutput
 */
export declare abstract class ActorIteratorTransform<TS = undefined> extends Actor<ActionIteratorTransform, IActorTest, ActorIteratorTransformOutput, TS> {
    wraps: possibleOperationTypes[];
    /**
     * @param args - @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     */
    constructor(args: IActorIteratorTransformArgs<TS>);
    run(action: ActionIteratorTransform): Promise<ActorIteratorTransformOutput>;
    test(action: ActionIteratorTransform): Promise<TestResult<IActorTest, TS>>;
    protected abstract testIteratorTransform(action: ActionIteratorTransform): Promise<TestResult<IActorTest, TS>>;
    abstract transformIteratorBindings(action: IActionIteratorTransformBindings): Promise<ITransformIteratorOutput<AsyncIterator<RDF.Bindings>, MetadataBindings>>;
    abstract transformIteratorQuads(action: IActionIteratorTransformQuads): Promise<ITransformIteratorOutput<AsyncIterator<RDF.Quad>, MetadataQuads>>;
}
export interface IActionIteratorTransform<T extends 'bindings' | 'quads', S, M> extends IAction {
    /**
     * Whether the stream produces bindings or quads
     */
    type: T;
    /**
     * The operation that produced the stream
     */
    operation: possibleOperationTypes;
    /**
     * The stream to be transformed by the actor
     */
    stream: S;
    /**
     * Stream metadata
     */
    metadata: () => Promise<M>;
    /**
     * Action that produced the stream
     */
    originalAction: IAction;
}
export interface IActionIteratorTransformBindings extends IActionIteratorTransform<'bindings', AsyncIterator<RDF.Bindings>, MetadataBindings> {
}
export interface IActionIteratorTransformQuads extends IActionIteratorTransform<'quads', AsyncIterator<RDF.Quad>, MetadataQuads> {
}
export type ActionIteratorTransform = IActionIteratorTransformBindings | IActionIteratorTransformQuads;
export interface IActorIteratorTransformOutput<T extends 'bindings' | 'quads', S, M> extends IActorOutput {
    /**
     * Whether the stream produces bindings or quads
     */
    type: T;
    /**
     * The operation that produced the stream
     */
    operation: possibleOperationTypes;
    /**
     * Transformed stream
     */
    stream: S;
    /**
     * Optionally transformed metadata
     */
    metadata: () => Promise<M>;
    /**
     * Action that produced the stream
     */
    originalAction: IAction;
    /**
     * (Unchanged)Context given in action
     */
    context: IActionContext;
}
export interface IActorIteratorTransformBindingsOutput extends IActorIteratorTransformOutput<'bindings', AsyncIterator<RDF.Bindings>, MetadataBindings> {
}
export interface IActorIteratorTransformQuadOutput extends IActorIteratorTransformOutput<'quads', AsyncIterator<RDF.Quad>, MetadataQuads> {
}
export type ActorIteratorTransformOutput = IActorIteratorTransformBindingsOutput | IActorIteratorTransformQuadOutput;
export interface ITransformIteratorOutput<S, M> {
    /**
     * Transformed stream
     */
    stream: S;
    /**
     * Optionally transformed metadata
     */
    metadata: () => Promise<M>;
}
export interface IActorIteratorTransformArgs<TS = undefined> extends IActorArgs<ActionIteratorTransform, IActorTest, ActorIteratorTransformOutput, TS> {
    /**
     * What types of operations the actor will wrap. If undefined the actor wraps every operation
     */
    wraps?: possibleOperationTypes[];
}
export type possibleOperationTypes = types | LogicalJoinType;
export type MediatorIteratorTransform = Mediate<ActionIteratorTransform, ActorIteratorTransformOutput>;
