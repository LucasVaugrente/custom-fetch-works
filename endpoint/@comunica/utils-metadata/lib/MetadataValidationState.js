"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataValidationState = void 0;
/**
 * Reusable implementation for metadata validation states.
 */
class MetadataValidationState {
    constructor() {
        this.invalidateListeners = [];
        this.valid = true;
    }
    addInvalidateListener(listener) {
        this.invalidateListeners.push(listener);
    }
    invalidate() {
        if (this.valid) {
            this.valid = false;
            for (const invalidateListener of this.invalidateListeners) {
                invalidateListener();
            }
        }
    }
}
exports.MetadataValidationState = MetadataValidationState;
//# sourceMappingURL=MetadataValidationState.js.map