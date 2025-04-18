"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toEqualBindings_1 = require("./toEqualBindings");
const toEqualBindingsArray_1 = require("./toEqualBindingsArray");
const toEqualBindingsStream_1 = require("./toEqualBindingsStream");
const toFailTest_1 = require("./toFailTest");
const toPassTest_1 = require("./toPassTest");
const toPassTestVoid_1 = require("./toPassTestVoid");
exports.default = [
    toEqualBindings_1.default,
    toEqualBindingsArray_1.default,
    toEqualBindingsStream_1.default,
    toPassTest_1.default,
    toPassTestVoid_1.default,
    toFailTest_1.default,
].reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
//# sourceMappingURL=index.js.map