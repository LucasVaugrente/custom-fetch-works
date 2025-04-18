import type { TestResult } from '@comunica/core';
declare const _default: {
    toPassTest(received: TestResult<any>, actual: any): {
        message: () => string;
        pass: boolean;
    };
};
export default _default;
