"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorIteratorTransform = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for transform-iterator events.
 *
 * Actor types:
 *  Input:  IActionIteratorTransform: Data that denotes what type of stream is being wrapped,
 *   what actor produced this stream, and the stream itself
 * * Test:   <none>
 * * Output: IActorIteratorTransformOutput: The transformed stream and additional metadata.
 *
 * @see IActionIteratorTransform
 * @see IActorIteratorTransformOutput
 */
class ActorIteratorTransform extends core_1.Actor {
    /**
     * @param args - @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     */
    constructor(args) {
        super(args);
    }
    async run(action) {
        if (action.type === 'bindings') {
            const { stream, metadata } = await this.transformIteratorBindings(action);
            return {
                type: action.type,
                operation: action.operation,
                stream,
                metadata,
                originalAction: action.originalAction,
                context: action.context,
            };
        }
        const { stream, metadata } = await this.transformIteratorQuads(action);
        return {
            type: action.type,
            operation: action.operation,
            stream,
            metadata,
            originalAction: action.originalAction,
            context: action.context,
        };
    }
    async test(action) {
        if (this.wraps && !this.wraps.includes(action.operation)) {
            return (0, core_1.failTest)(`Operation type not supported in configuration of ${this.name}`);
        }
        return this.testIteratorTransform(action);
    }
}
exports.ActorIteratorTransform = ActorIteratorTransform;
//# sourceMappingURL=ActorIteratorTransform.js.map