"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_utils_1 = require("@jest/expect-utils");
// eslint-disable-next-line ts/no-require-imports,ts/no-var-requires
const inspect = require('object-inspect');
exports.default = {
    toPassTest(received, actual) {
        if (!received.isPassed()) {
            return {
                message: () => `expected a failed test result "${received.getFailMessage()}" to pass to value "${inspect(actual)}"`,
                pass: false,
            };
        }
        if (!(0, expect_utils_1.equals)(received.get(), actual)) {
            return {
                message: () => `expected a passed test result "${inspect(received.get())}" to pass to value "${inspect(actual)}"`,
                pass: false,
            };
        }
        return {
            message: () => `expected passed test result "${inspect(received.get())}" not to pass`,
            pass: true,
        };
    },
};
//# sourceMappingURL=toPassTest.js.map