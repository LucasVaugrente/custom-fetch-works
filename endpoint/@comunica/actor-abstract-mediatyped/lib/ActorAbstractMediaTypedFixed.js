"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorAbstractMediaTypedFixed = void 0;
const core_1 = require("@comunica/core");
const ActorAbstractMediaTyped_1 = require("./ActorAbstractMediaTyped");
class ActorAbstractMediaTypedFixed extends ActorAbstractMediaTyped_1.ActorAbstractMediaTyped {
    constructor(args) {
        super(args);
        const scale = this.priorityScale || this.priorityScale === 0 ? this.priorityScale : 1;
        if (this.mediaTypePriorities) {
            for (const [_index, [key, value]] of Object.entries(this.mediaTypePriorities).entries()) {
                this.mediaTypePriorities[key] = scale * value;
            }
        }
        this.mediaTypePriorities = Object.freeze(this.mediaTypePriorities);
        this.mediaTypeFormats = Object.freeze(this.mediaTypeFormats);
    }
    async testHandle(action, mediaType, context) {
        if (!mediaType || !(mediaType in this.mediaTypePriorities)) {
            return (0, core_1.failTest)(`Unrecognized media type: ${mediaType}`);
        }
        return await this.testHandleChecked(action, context);
    }
    async testMediaType(_context) {
        return (0, core_1.passTestVoid)();
    }
    async getMediaTypes(_context) {
        return this.mediaTypePriorities;
    }
    async testMediaTypeFormats(_context) {
        return (0, core_1.passTestVoid)();
    }
    async getMediaTypeFormats(_context) {
        return this.mediaTypeFormats;
    }
}
exports.ActorAbstractMediaTypedFixed = ActorAbstractMediaTypedFixed;
//# sourceMappingURL=ActorAbstractMediaTypedFixed.js.map