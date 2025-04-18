"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorTermComparatorFactory = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for term-comparator-factory events.
 *
 * Actor types:
 * * Input:  IActionTermComparatorFactory: the Query Operation Mediator and Function Factory Mediator.
 * * Test:   <none>
 * * Output: IActorTermComparatorFactoryOutput: An object that can order RDF terms.
 *
 * @see IActionTermComparatorFactory
 * @see IActorTermComparatorFactoryOutput
 */
class ActorTermComparatorFactory extends core_1.Actor {
    /**
     * @param args -
     *  \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *  \ @defaultNested {Creation of term comparator failed} busFailMessage
     */
    constructor(args) {
        super(args);
        this.mediatorQueryOperation = args.mediatorQueryOperation;
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
        this.mediatorMergeBindingsContext = args.mediatorMergeBindingsContext;
    }
}
exports.ActorTermComparatorFactory = ActorTermComparatorFactory;
//# sourceMappingURL=ActorTermComparatorFactory.js.map