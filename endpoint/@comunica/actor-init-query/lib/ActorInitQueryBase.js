"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorInitQueryBase = void 0;
const bus_init_1 = require("@comunica/bus-init");
const core_1 = require("@comunica/core");
/**
 * A browser-safe comunica Query Init Actor.
 */
class ActorInitQueryBase extends bus_init_1.ActorInit {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(_action) {
        throw new Error('ActorInitSparql#run is not supported in the browser.');
    }
}
exports.ActorInitQueryBase = ActorInitQueryBase;
//# sourceMappingURL=ActorInitQueryBase.js.map