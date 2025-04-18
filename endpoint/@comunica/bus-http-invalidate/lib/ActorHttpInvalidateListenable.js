"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpInvalidateListenable = void 0;
const core_1 = require("@comunica/core");
const ActorHttpInvalidate_1 = require("./ActorHttpInvalidate");
/**
 * An ActorHttpInvalidate actor that allows listeners to be attached.
 *
 * @see ActorHttpInvalidate
 */
class ActorHttpInvalidateListenable extends ActorHttpInvalidate_1.ActorHttpInvalidate {
    constructor(args) {
        super(args);
        this.invalidateListeners = [];
        this.invalidateListeners = [];
    }
    addInvalidateListener(listener) {
        this.invalidateListeners.push(listener);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        for (const listener of this.invalidateListeners) {
            listener(action);
        }
        return {};
    }
}
exports.ActorHttpInvalidateListenable = ActorHttpInvalidateListenable;
//# sourceMappingURL=ActorHttpInvalidateListenable.js.map