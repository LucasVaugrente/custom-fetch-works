"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtract = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-metadata-extract events.
 *
 * Actor types:
 * * Input:  IActionRdfMetadataExtract:      A metadata quad stream
 * * Test:   <none>
 * * Output: IActorRdfMetadataExtractOutput: A metadata hash.
 *
 * @see IActionDereferenceRdf
 * @see IActorDereferenceRdfOutput
 */
class ActorRdfMetadataExtract extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfMetadataExtract = ActorRdfMetadataExtract;
//# sourceMappingURL=ActorRdfMetadataExtract.js.map