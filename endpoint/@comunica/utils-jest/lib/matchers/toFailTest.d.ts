import type { TestResult } from '@comunica/core';
declare const _default: {
    toFailTest(received: TestResult<any>, actual: string): {
        message: () => string;
        pass: boolean;
    };
};
export default _default;
