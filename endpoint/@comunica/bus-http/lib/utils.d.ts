/**
 * Check if the http response is valid, and throw an error if not.
 * @param url The original URL that was to be updated.
 * @param httpResponse The update response.
 */
export declare function validateAndCloseHttpResponse(url: string, httpResponse: Response): Promise<void>;
