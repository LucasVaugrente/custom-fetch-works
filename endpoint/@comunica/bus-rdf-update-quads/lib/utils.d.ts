import type { IActionContext, IDataDestination } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
/**
 * Check if the given data destination is a string or RDF store.
 * @param dataDestination A data destination.
 */
export declare function isDataDestinationRawType(dataDestination: IDataDestination): dataDestination is string | RDF.Store;
/**
 * Get the data destination type.
 * @param dataDestination A data destination.
 */
export declare function getDataDestinationType(dataDestination: IDataDestination): string | undefined;
/**
 * Get the data destination value.
 * @param dataDestination A data destination.
 */
export declare function getDataDestinationValue(dataDestination: IDataDestination): string | RDF.Store;
/**
 * Get the context of the given destination, merged with the given context.
 * @param dataDestination A data destination.
 * @param context A context to merge with.
 */
export declare function getDataDestinationContext(dataDestination: IDataDestination, context: IActionContext): IActionContext;
/**
 * Get the source destination from the given context.
 * @param {ActionContext} context An optional context.
 * @return {IDataDestination} The destination or undefined.
 */
export declare function getContextDestination(context: IActionContext): IDataDestination | undefined;
/**
 * Get the destination's raw URL value from the given context.
 * @param {IDataDestination} destination A destination.
 * @return {string} The URL or undefined.
 */
export declare function getContextDestinationUrl(destination?: IDataDestination): string | undefined;
