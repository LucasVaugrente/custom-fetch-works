"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadDestinationPutLdp = void 0;
const bus_http_1 = require("@comunica/bus-http");
/**
 * A quad destination that represents a resource that can be PUT.
 */
class QuadDestinationPutLdp {
    constructor(url, context, mediaTypes, mediatorHttp, mediatorRdfSerializeMediatypes, mediatorRdfSerialize) {
        this.url = url;
        this.context = context;
        this.mediaTypes = mediaTypes;
        this.mediatorHttp = mediatorHttp;
        this.mediatorRdfSerializeMediatypes = mediatorRdfSerializeMediatypes;
        this.mediatorRdfSerialize = mediatorRdfSerialize;
    }
    async update(quadStreams) {
        if (quadStreams.delete) {
            throw new Error(`Put-based LDP destinations don't support deletions`);
        }
        if (quadStreams.insert) {
            await this.wrapRdfUpdateRequest('INSERT', quadStreams.insert);
        }
    }
    async wrapRdfUpdateRequest(type, quads) {
        // Determine media type for serialization
        const { mediaTypes } = await this.mediatorRdfSerializeMediatypes.mediate({ context: this.context, mediaTypes: true });
        const availableMediaTypes = this.mediaTypes
            .filter(mediaType => mediaType in mediaTypes);
        // Fallback to our own preferred media type
        const mediaType = availableMediaTypes.length > 0 ?
            availableMediaTypes[0] :
            Object.keys(mediaTypes).sort((typeA, typeB) => mediaTypes[typeB] - mediaTypes[typeA])[0];
        // Serialize quads
        const { handle: { data } } = await this.mediatorRdfSerialize.mediate({
            context: this.context,
            handle: { quadStream: quads, context: this.context },
            handleMediaType: mediaType,
        });
        // Send data in (LDP) PUT request
        const headers = new Headers({ 'content-type': mediaType });
        const httpResponse = await this.mediatorHttp.mediate({
            context: this.context,
            init: {
                headers,
                method: 'PUT',
                body: bus_http_1.ActorHttp.toWebReadableStream(data),
            },
            input: this.url,
        });
        await (0, bus_http_1.validateAndCloseHttpResponse)(this.url, httpResponse);
    }
    async deleteGraphs(_graphs, _requireExistence, _dropGraphs) {
        throw new Error(`Put-based LDP destinations don't support named graphs`);
    }
    async createGraphs(_graphs, _requireNonExistence) {
        throw new Error(`Put-based LDP destinations don't support named graphs`);
    }
}
exports.QuadDestinationPutLdp = QuadDestinationPutLdp;
//# sourceMappingURL=QuadDestinationPutLdp.js.map