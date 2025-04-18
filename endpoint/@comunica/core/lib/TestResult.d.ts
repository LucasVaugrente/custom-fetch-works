/**
 * A test result represents the result of an actor test that can either be passed or failed.
 *
 * Test results are immutable.
 */
export type TestResult<T, TS = undefined> = TestResultPassed<T, TS> | TestResultFailed;
/**
 * Create a new test result that represents a passed value.
 * @param value The value the test passed with.
 */
export declare function passTest<T>(value: T): TestResultPassed<T, undefined>;
/**
 * Create a new test result that represents a passed void value.
 */
export declare function passTestVoid(): TestResultPassed<any, undefined>;
/**
 * Create a new test result that represents a passed value with side data.
 * @param value The value the test passed with.
 * @param sideData Additional data to pass to the run phase.
 */
export declare function passTestWithSideData<T, S>(value: T, sideData: S): TestResultPassed<T, S>;
/**
 * Create a new test result that represents a passed void value with side data.
 * @param sideData Additional data to pass to the run phase.
 */
export declare function passTestVoidWithSideData<TS>(sideData: TS): TestResultPassed<any, TS>;
/**
 * Create a new test result that represents a test failure.
 * @param message The error message that describes the failure.
 */
export declare function failTest(message: string): TestResultFailed;
/**
 * A passed test result.
 * This should not be constructed manually.
 * Instead, `testPass` should be used.
 */
export declare class TestResultPassed<T, TS> {
    protected readonly value: T;
    protected readonly sideData: TS;
    constructor(passValue: T, sideData: TS);
    /**
     * Check if the test has passed.
     * If true, it will contain a value.
     */
    isPassed(): this is TestResultPassed<T, TS>;
    /**
     * Check if the test has failed.
     * If true, it will contain a failure message.
     */
    isFailed(): this is TestResultFailed;
    /**
     * Get the value of the passed test, or undefined if the test failed.
     */
    get(): T;
    /**
     * Get the value of the passed test, or throw an error if the test failed.
     */
    getOrThrow(): T;
    /**
     * The side data that will be passed to run.
     */
    getSideData(): TS;
    /**
     * Get the failure message callback of the failed test, or undefined if the test passed.
     */
    getFailMessage(): undefined;
    /**
     * For passed tests, map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     *
     * @param mapper A function that will transform the passed value.
     */
    map<T2>(mapper: (value: T, sideData: TS) => T2): TestResultPassed<T2, TS>;
    /**
     * For passed tests, asynchronously map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     *
     * @param mapper A function that will transform the passed value.
     */
    mapAsync<T2>(mapper: (value: T, sideData: TS) => Promise<T2>): Promise<TestResultPassed<T2, TS>>;
}
/**
 * A failed test result.
 * This should not be constructed manually.
 * Instead, `testFail` should be used.
 */
export declare class TestResultFailed {
    protected readonly failMessage: string;
    constructor(failMessage: string);
    /**
     * Check if the test has passed.
     * If true, it will contain a value.
     */
    isPassed(): this is TestResultPassed<any, any>;
    /**
     * Check if the test has failed.
     * If true, it will contain a failure message.
     */
    isFailed(): this is TestResultFailed;
    /**
     * Get the value of the passed test, or undefined if the test failed.
     */
    get(): undefined;
    /**
     * Get the value of the passed test, or throw an error if the test failed.
     */
    getOrThrow(): never;
    /**
     * The side data that will be passed to run.
     */
    getSideData(): never;
    /**
     * Get the failure message callback of the failed test, or undefined if the test passed.
     */
    getFailMessage(): string;
    /**
     * For passed tests, map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     */
    map(): TestResultFailed;
    /**
     * For passed tests, asynchronously map the passed value to another value.
     * Failed tests will remain unchanged.
     *
     * This will not mutate the test result, and instead return a new test result.
     */
    mapAsync(): Promise<TestResultFailed>;
}
