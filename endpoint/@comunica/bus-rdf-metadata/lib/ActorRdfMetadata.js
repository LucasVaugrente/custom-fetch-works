"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadata = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-metadata events.
 *
 * Actor types:
 * * Input:  IActionRdfMetadata:      An RDF quad stream.
 * * Test:   <none>
 * * Output: IActorRdfMetadataOutput: An RDF quad data stream and RDF quad metadata stream.
 *
 * @see IActionDereferenceRdf
 * @see IActorDereferenceRdfOutput
 */
class ActorRdfMetadata extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Metadata splicing failed: none of the configured actors were able to splice metadata from ${action.url}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfMetadata = ActorRdfMetadata;
//# sourceMappingURL=ActorRdfMetadata.js.map