"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateHypermedia = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-update-hypermedia events.
 *
 * Actor types:
 * * Input:  IActionRdfUpdateHypermedia:      The metadata in the document.
 * * Test:   <none>
 * * Output: IActorRdfUpdateHypermediaOutput: An RDF destination.
 *
 * @see IActionRdfUpdateHypermedia
 * @see IActorRdfUpdateHypermediaOutput
 */
class ActorRdfUpdateHypermedia extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF hypermedia updating failed: none of the configured actors were able to handle an update for ${action.url}} busFailMessage
     * @param destinationType - The destination type.
     */
    /* eslint-enable max-len */
    constructor(args, destinationType) {
        super(args);
        this.destinationType = destinationType;
    }
    async test(action) {
        if (action.forceDestinationType && this.destinationType !== action.forceDestinationType) {
            return (0, core_1.failTest)(`Actor ${this.name} is not able to handle destination type ${action.forceDestinationType}.`);
        }
        return this.testMetadata(action);
    }
}
exports.ActorRdfUpdateHypermedia = ActorRdfUpdateHypermedia;
//# sourceMappingURL=ActorRdfUpdateHypermedia.js.map