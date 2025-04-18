"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachifyMetadata = exports.validateMetadataBindings = exports.validateMetadataQuads = exports.getMetadataBindings = exports.getMetadataQuads = void 0;
/**
 * Return a cached callback to the metadata from the given quad stream as a promise.
 * @param data A quad stream.
 */
function getMetadataQuads(data) {
    return cachifyMetadata(() => new Promise((resolve, reject) => {
        data.getProperty('metadata', (metadata) => resolve(metadata));
        data.on('error', reject);
    }).then(metadataRaw => validateMetadataQuads(metadataRaw)));
}
exports.getMetadataQuads = getMetadataQuads;
/**
 * Return a cached callback to the metadata from the given bindings stream as a promise.
 * @param data A bindings stream.
 */
function getMetadataBindings(data) {
    return cachifyMetadata(() => new Promise((resolve, reject) => {
        data.getProperty('metadata', (metadata) => resolve(metadata));
        data.on('error', reject);
    }).then(metadataRaw => validateMetadataBindings(metadataRaw)));
}
exports.getMetadataBindings = getMetadataBindings;
/**
 * Ensure that the given raw metadata object contains all required metadata entries.
 * @param metadataRaw A raw metadata object.
 */
function validateMetadataQuads(metadataRaw) {
    for (const key of ['cardinality']) {
        if (!(key in metadataRaw)) {
            throw new Error(`Invalid metadata: missing ${key} in ${JSON.stringify(metadataRaw)}`);
        }
    }
    return metadataRaw;
}
exports.validateMetadataQuads = validateMetadataQuads;
/**
 * Ensure that the given raw metadata object contains all required metadata entries.
 * @param metadataRaw A raw metadata object.
 */
function validateMetadataBindings(metadataRaw) {
    for (const key of ['cardinality', 'variables']) {
        if (!(key in metadataRaw)) {
            throw new Error(`Invalid metadata: missing ${key} in ${JSON.stringify(metadataRaw)}`);
        }
    }
    return metadataRaw;
}
exports.validateMetadataBindings = validateMetadataBindings;
/**
 * Convert a metadata callback to a lazy callback where the response value is cached.
 * @param {() => Promise<IMetadata>} metadata A metadata callback
 * @return {() => Promise<{[p: string]: any}>} The callback where the response will be cached.
 */
function cachifyMetadata(metadata) {
    let lastReturn;
    return () => {
        if (!lastReturn) {
            lastReturn = metadata();
            lastReturn
                .then(lastReturnValue => lastReturnValue.state.addInvalidateListener(() => {
                lastReturn = undefined;
            }))
                .catch(() => {
                // Ignore error
            });
        }
        return lastReturn;
    };
}
exports.cachifyMetadata = cachifyMetadata;
//# sourceMappingURL=Utils.js.map