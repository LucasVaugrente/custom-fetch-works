"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextDestinationUrl = exports.getContextDestination = exports.getDataDestinationContext = exports.getDataDestinationValue = exports.getDataDestinationType = exports.isDataDestinationRawType = void 0;
const context_entries_1 = require("@comunica/context-entries");
/**
 * Check if the given data destination is a string or RDF store.
 * @param dataDestination A data destination.
 */
function isDataDestinationRawType(dataDestination) {
    return typeof dataDestination === 'string' || 'remove' in dataDestination;
}
exports.isDataDestinationRawType = isDataDestinationRawType;
/**
 * Get the data destination type.
 * @param dataDestination A data destination.
 */
function getDataDestinationType(dataDestination) {
    if (typeof dataDestination === 'string') {
        return '';
    }
    return 'remove' in dataDestination ? 'rdfjsStore' : dataDestination.type;
}
exports.getDataDestinationType = getDataDestinationType;
/**
 * Get the data destination value.
 * @param dataDestination A data destination.
 */
function getDataDestinationValue(dataDestination) {
    return isDataDestinationRawType(dataDestination) ? dataDestination : dataDestination.value;
}
exports.getDataDestinationValue = getDataDestinationValue;
/**
 * Get the context of the given destination, merged with the given context.
 * @param dataDestination A data destination.
 * @param context A context to merge with.
 */
function getDataDestinationContext(dataDestination, context) {
    if (typeof dataDestination === 'string' || 'remove' in dataDestination || !dataDestination.context) {
        return context;
    }
    return context.merge(dataDestination.context);
}
exports.getDataDestinationContext = getDataDestinationContext;
/**
 * Get the source destination from the given context.
 * @param {ActionContext} context An optional context.
 * @return {IDataDestination} The destination or undefined.
 */
function getContextDestination(context) {
    return context.get(context_entries_1.KeysRdfUpdateQuads.destination);
}
exports.getContextDestination = getContextDestination;
/**
 * Get the destination's raw URL value from the given context.
 * @param {IDataDestination} destination A destination.
 * @return {string} The URL or undefined.
 */
function getContextDestinationUrl(destination) {
    if (destination) {
        let fileUrl = getDataDestinationValue(destination);
        if (typeof fileUrl === 'string') {
            // Remove hashes from source
            const hashPosition = fileUrl.indexOf('#');
            if (hashPosition >= 0) {
                fileUrl = fileUrl.slice(0, hashPosition);
            }
            return fileUrl;
        }
    }
}
exports.getContextDestinationUrl = getContextDestinationUrl;
//# sourceMappingURL=utils.js.map