import type { IActorArgsMediaTypedFixed } from '@comunica/actor-abstract-mediatyped';
import { ActorAbstractMediaTypedFixed } from '@comunica/actor-abstract-mediatyped';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type { IActionSparqlSerialize, IActorQueryResultSerializeOutput, ActorQueryResultSerialize } from './ActorQueryResultSerialize';
/**
 * A base actor for listening to SPARQL serialize events that has fixed media types.
 *
 * Actor types:
 * * Input:  IActionSparqlSerializeOrMediaType:      A serialize input or a media type input.
 * * Test:   <none>
 * * Output: IActorQueryResultSerializeOutputOrMediaType: The serialized quads.
 *
 * @see IActionInit
 */
export declare abstract class ActorQueryResultSerializeFixedMediaTypes extends ActorAbstractMediaTypedFixed<IActionSparqlSerialize, IActorTest, IActorQueryResultSerializeOutput> implements IActorQueryResultSerializeFixedMediaTypesArgs, ActorQueryResultSerialize {
    /**
     * TODO: rm this (and eslint-disable) once we remove the abstract media typed actor
     * @param args -
     *   \ @defaultNested {<cbqrs:components/ActorQueryResultSerialize.jsonld#ActorQueryResultSerialize_default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}} busFailMessage
     */
    constructor(args: IActorQueryResultSerializeFixedMediaTypesArgs);
    testHandleChecked(_action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
}
export interface IActorQueryResultSerializeFixedMediaTypesArgs extends IActorArgsMediaTypedFixed<IActionSparqlSerialize, IActorTest, IActorQueryResultSerializeOutput> {
}
