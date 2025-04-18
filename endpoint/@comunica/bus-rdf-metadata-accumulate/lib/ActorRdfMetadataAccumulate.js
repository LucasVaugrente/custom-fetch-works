"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataAccumulate = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-metadata-accumulate events.
 *
 * Actor types:
 * * Input:  IActionRdfMetadataAccumulate:      The metadata objects to accumulate,
 *                                              or a trigger for initializing a new value.
 * * Test:   <none>
 * * Output: IActorRdfMetadataAccumulateOutput: The accumulated metadata object.
 *
 * @see IActionRdfMetadataAccumulate
 * @see IActorRdfMetadataAccumulateOutput
 */
class ActorRdfMetadataAccumulate extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Metadata accumulation failed: none of the configured actors were able to accumulate metadata in mode ${action.mode}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfMetadataAccumulate = ActorRdfMetadataAccumulate;
//# sourceMappingURL=ActorRdfMetadataAccumulate.js.map