"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayify_stream_1 = require("arrayify-stream");
const toEqualBindingsArray_1 = require("./toEqualBindingsArray");
exports.default = {
    async toEqualBindingsStream(received, actual, ignoreOrder = false) {
        return toEqualBindingsArray_1.default.toEqualBindingsArray(await (0, arrayify_stream_1.default)(received), actual, ignoreOrder);
    },
};
//# sourceMappingURL=toEqualBindingsStream.js.map