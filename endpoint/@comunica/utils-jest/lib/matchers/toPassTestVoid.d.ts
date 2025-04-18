import type { TestResult } from '@comunica/core';
declare const _default: {
    toPassTestVoid(received: TestResult<any>): {
        message: () => string;
        pass: boolean;
    };
};
export default _default;
