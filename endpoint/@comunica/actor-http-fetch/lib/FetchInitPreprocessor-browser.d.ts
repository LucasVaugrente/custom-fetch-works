import type { IFetchInitPreprocessor } from './IFetchInitPreprocessor';
/**
 * Overrides things for fetch requests in browsers
 */
export declare class FetchInitPreprocessor implements IFetchInitPreprocessor {
    handle(init: RequestInit): Promise<RequestInit>;
}
