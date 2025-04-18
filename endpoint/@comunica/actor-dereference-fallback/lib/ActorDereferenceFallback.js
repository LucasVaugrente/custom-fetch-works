"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceFallback = void 0;
const bus_dereference_1 = require("@comunica/bus-dereference");
const core_1 = require("@comunica/core");
/**
 * A comunica Fallback Dereference Actor.
 */
class ActorDereferenceFallback extends bus_dereference_1.ActorDereference {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return this.handleDereferenceErrors(action, new Error(`Could not dereference '${action.url}'`));
    }
}
exports.ActorDereferenceFallback = ActorDereferenceFallback;
//# sourceMappingURL=ActorDereferenceFallback.js.map