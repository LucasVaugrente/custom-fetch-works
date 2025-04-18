"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataAll = void 0;
const bus_rdf_metadata_1 = require("@comunica/bus-rdf-metadata");
const core_1 = require("@comunica/core");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica All RDF Metadata Actor.
 */
class ActorRdfMetadataAll extends bus_rdf_metadata_1.ActorRdfMetadata {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const data = new readable_stream_1.Readable({ objectMode: true });
        const metadata = new readable_stream_1.Readable({ objectMode: true });
        // Forward errors (attach them immediately as they could arrive earlier)
        action.quads.on('error', (error) => {
            data.emit('error', error);
            metadata.emit('error', error);
        });
        // Terminate both streams on-end
        action.quads.on('end', () => {
            data.push(null);
            metadata.push(null);
        });
        const read = data._read = metadata._read = (size) => {
            while (size > 0) {
                const item = action.quads.read();
                if (item === null) {
                    return action.quads.once('readable', () => read(size));
                }
                size--;
                data.push(item);
                metadata.push(item);
            }
        };
        return { data, metadata };
    }
}
exports.ActorRdfMetadataAll = ActorRdfMetadataAll;
//# sourceMappingURL=ActorRdfMetadataAll.js.map