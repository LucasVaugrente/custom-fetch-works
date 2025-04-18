"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceHttp = void 0;
const ActorDereferenceHttpBase_1 = require("./ActorDereferenceHttpBase");
/**
 * The browser variant of {@link ActorDereferenceHttp}.
 */
class ActorDereferenceHttp extends ActorDereferenceHttpBase_1.ActorDereferenceHttpBase {
    getMaxAcceptHeaderLength() {
        return this.maxAcceptHeaderLengthBrowser;
    }
}
exports.ActorDereferenceHttp = ActorDereferenceHttp;
//# sourceMappingURL=ActorDereferenceHttp-browser.js.map