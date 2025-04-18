"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultFailed = exports.TestResultPassed = exports.failTest = exports.passTestVoidWithSideData = exports.passTestWithSideData = exports.passTestVoid = exports.passTest = void 0;
/**
 * Create a new test result that represents a passed value.
 * @param value The value the test passed with.
 */
function passTest(value) {
    return new TestResultPassed(value, undefined);
}
exports.passTest = passTest;
/**
 * Create a new test result that represents a passed void value.
 */
function passTestVoid() {
    return new TestResultPassed(true, undefined);
}
exports.passTestVoid = passTestVoid;
/**
 * Create a new test result that represents a passed value with side data.
 * @param value The value the test passed with.
 * @param sideData Additional data to pass to the run phase.
 */
function passTestWithSideData(value, sideData) {
    return new TestResultPassed(value, sideData);
}
exports.passTestWithSideData = passTestWithSideData;
/**
 * Create a new test result that represents a passed void value with side data.
 * @param sideData Additional data to pass to the run phase.
 */
function passTestVoidWithSideData(sideData) {
    return new TestResultPassed(true, sideData);
}
exports.passTestVoidWithSideData = passTestVoidWithSideData;
/**
 * Create a new test result that represents a test failure.
 * @param message The error message that describes the failure.
 */
function failTest(message) {
    return new TestResultFailed(message);
}
exports.failTest = failTest;
/**
 * A passed test result.
 * This should not be constructed manually.
 * Instead, `testPass` should be used.
 */
class TestResultPassed {
    constructor(passValue, sideData) {
        this.value = passValue;
        this.sideData = sideData;
    }
    /**
     * Check if the test has passed.
     * If true, it will contain a value.
     */
    isPassed() {
        return true;
    }
    /**
     * Check if the test has failed.
     * If true, it will contain a failure message.
     */
    isFailed() {
        return false;
    }
    /**
     * Get the value of the passed test, or undefined if the test failed.
     */
    get() {
        return this.value;
    }
    /**
     * Get the value of the passed test, or throw an error if the test failed.
     */
    getOrThrow() {
        return this.value;
    }
    /**
     * The side data that will be passed to run.
     */
    getSideData() {
        return this.sideData;
    }
    /**
     * Get the failure message callback of the failed test, or undefined if the test passed.
     */
    getFailMessage() {
        return undefined;
    }
    /**
     * For passed tests, map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     *
     * @param mapper A function that will transform the passed value.
     */
    map(mapper) {
        return new TestResultPassed(mapper(this.value, this.sideData), this.sideData);
    }
    /**
     * For passed tests, asynchronously map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     *
     * @param mapper A function that will transform the passed value.
     */
    async mapAsync(mapper) {
        return new TestResultPassed(await mapper(this.value, this.sideData), this.sideData);
    }
}
exports.TestResultPassed = TestResultPassed;
/**
 * A failed test result.
 * This should not be constructed manually.
 * Instead, `testFail` should be used.
 */
class TestResultFailed {
    constructor(failMessage) {
        this.failMessage = failMessage;
    }
    /**
     * Check if the test has passed.
     * If true, it will contain a value.
     */
    isPassed() {
        return false;
    }
    /**
     * Check if the test has failed.
     * If true, it will contain a failure message.
     */
    isFailed() {
        return true;
    }
    /**
     * Get the value of the passed test, or undefined if the test failed.
     */
    get() {
        return undefined;
    }
    /**
     * Get the value of the passed test, or throw an error if the test failed.
     */
    getOrThrow() {
        throw new Error(this.getFailMessage());
    }
    /**
     * The side data that will be passed to run.
     */
    getSideData() {
        throw new Error(this.getFailMessage());
    }
    /**
     * Get the failure message callback of the failed test, or undefined if the test passed.
     */
    getFailMessage() {
        return this.failMessage;
    }
    /**
     * For passed tests, map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     */
    map() {
        return this;
    }
    /**
     * For passed tests, asynchronously map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     */
    async mapAsync() {
        return this;
    }
}
exports.TestResultFailed = TestResultFailed;
//# sourceMappingURL=TestResult.js.map