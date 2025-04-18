"use strict";
/* ! @license MIT ©2013-2016 Ruben Verborgh, Ghent University - imec */
/* Single-function HTTP(S) request module for browsers */
/* Translated from https://github.com/LinkedDataFragments/Client.js/blob/master/lib/browser/Request.js */
Object.defineProperty(exports, "__esModule", { value: true });
const node_events_1 = require("node:events");
const node_stream_1 = require("node:stream");
const http_link_header_1 = require("http-link-header");
// Headers we cannot send (see https://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method)
const UNSAFE_REQUEST_HEADERS = { 'accept-encoding': true, 'user-agent': true, referer: true };
class Requester {
    constructor() {
        this.negotiatedResources = {};
    }
    // Creates an HTTP request with the given settings
    createRequest(settings) {
        // PERFORMANCE HACK:
        // Reduce OPTIONS preflight requests by removing the Accept-Datetime header
        // on requests for resources that are presumed to have been time-negotiated
        if (this.negotiatedResources[this.removeQuery(settings.url)]) {
            settings.headers.delete('accept-datetime');
        }
        // Create the actual XMLHttpRequest
        const request = new XMLHttpRequest();
        const reqHeaders = settings.headers;
        request.open(settings.method, settings.url, true);
        request.timeout = settings.timeout;
        request.withCredentials = settings.withCredentials;
        // eslint-disable-next-line unicorn/no-array-for-each
        reqHeaders.forEach((value, key) => {
            if (!(key in UNSAFE_REQUEST_HEADERS) && value) {
                request.setRequestHeader(key, value);
            }
        });
        // Create a proxy for the XMLHttpRequest
        const requestProxy = new node_events_1.EventEmitter();
        requestProxy.abort = () => {
            request.abort();
        };
        // Handle the arrival of a response
        request.onload = () => {
            // Convert the response into an iterator
            const response = new node_stream_1.Readable();
            response.push(request.responseText || '');
            response.push(null);
            response.statusCode = request.status;
            response.responseUrl = request.responseURL;
            // Parse the response headers
            const resHeaders = this.convertRequestHeadersToFetchHeaders(response.headers);
            response.headers = resHeaders;
            const rawHeaders = request.getAllResponseHeaders() || '';
            const headerMatcher = /^([^\n\r:]+):[\t ]*([^\n\r]*)$/gmu;
            let match = headerMatcher.exec(rawHeaders);
            while (match) {
                resHeaders.set(match[1].toLowerCase(), match[2]);
                match = headerMatcher.exec(rawHeaders);
            }
            // Emit the response
            requestProxy.emit('response', response);
            // If the resource was time-negotiated, store its queryless URI
            // to enable the PERFORMANCE HACK explained above
            if (reqHeaders.has('accept-datetime') && resHeaders.has('memento-datetime')) {
                const resource = this.removeQuery(resHeaders.get('content-location') ?? settings.url);
                if (!this.negotiatedResources[resource]) {
                    // Ensure the resource is not a timegate
                    const header = resHeaders.get('link');
                    const tg = header && (0, http_link_header_1.parse)(header)?.get('rel', 'timegate');
                    const timegate = this.removeQuery(tg && tg.length > 0 ? tg[0].uri : undefined);
                    if (resource !== timegate) {
                        this.negotiatedResources[resource] = true;
                    }
                }
            }
        };
        // Report errors and timeouts
        request.onerror = () => {
            requestProxy.emit('error', new Error(`Error requesting ${settings.url}`));
        };
        request.ontimeout = () => {
            requestProxy.emit('error', new Error(`Timeout requesting ${settings.url}`));
        };
        // Execute the request
        if (settings.body) {
            if (settings.body instanceof URLSearchParams) {
                request.send(settings.body.toString());
            }
            else if (typeof settings.body === 'string') {
                request.send(settings.body);
            }
            else {
                settings.body.blob()
                    .then((blob) => request.send(blob))
                    .catch((error) => requestProxy.emit('error', error));
            }
        }
        else {
            request.send();
        }
        return requestProxy;
    }
    // Wrap headers into an header object type
    convertRequestHeadersToFetchHeaders(headers) {
        const responseHeaders = new Headers();
        for (const key in headers) {
            responseHeaders.append(key, headers[key]);
        }
        return responseHeaders;
    }
    // Removes the query string from a URL
    removeQuery(url) {
        return url ? url.replace(/\?.*$/u, '') : '';
    }
}
exports.default = Requester;
//# sourceMappingURL=Requester-browser.js.map