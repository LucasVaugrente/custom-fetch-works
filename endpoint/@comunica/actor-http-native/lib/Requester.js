"use strict";
/* ! @license MIT ©2016 Ruben Verborgh, Ghent University - imec */
/* Single-function HTTP(S) request module */
/* Translated from https://github.com/LinkedDataFragments/Client.js/blob/master/lib/util/Request.js */
Object.defineProperty(exports, "__esModule", { value: true });
const node_events_1 = require("node:events");
const url = require("node:url");
const zlib = require("node:zlib");
const bus_http_1 = require("@comunica/bus-http");
const { http } = require('follow-redirects');
const { https } = require('follow-redirects');
// Decode encoded streams with these decoders
const DECODERS = { gzip: zlib.createGunzip, deflate: zlib.createInflate };
class Requester {
    constructor(agentOptions) {
        this.agents = {
            http: new http.Agent(agentOptions ?? {}),
            https: new https.Agent(agentOptions ?? {}),
        };
    }
    // Creates an HTTP request with the given settings
    createRequest(settings) {
        // Parse the request URL
        if (settings.url) {
            // eslint-disable-next-line node/no-deprecated-api
            settings = { ...url.parse(settings.url), ...settings };
        }
        // Emit the response through a proxy
        const requestProxy = new node_events_1.EventEmitter();
        const requester = settings.protocol === 'http:' ? http : https;
        settings.agents = this.agents;
        // Unpacking headers object into a plain object
        const headersObject = {};
        if (settings.headers) {
            // eslint-disable-next-line unicorn/no-array-for-each
            settings.headers.forEach((value, key) => {
                headersObject[key] = value;
            });
        }
        settings.headers = headersObject;
        const request = requester.request(settings, (response) => {
            response = this.decode(response);
            settings.headers = response.headers;
            response.setEncoding('utf8');
            // This was removed compared to the original LDF client implementation
            // response.pause(); // exit flow mode
            requestProxy.emit('response', response);
        });
        request.on('error', error => requestProxy.emit('error', error));
        if (settings.body) {
            if (settings.body instanceof URLSearchParams) {
                request.write(settings.body.toString());
                request.end();
            }
            else if (typeof settings.body === 'string') {
                request.write(settings.body);
                request.end();
            }
            else {
                bus_http_1.ActorHttp.toNodeReadable(settings.body).pipe(request);
            }
        }
        else {
            request.end();
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
    // Returns a decompressed stream from the HTTP response
    decode(response) {
        const encoding = response.headers['content-encoding'];
        if (encoding) {
            if (encoding in DECODERS) {
                // Decode the stream
                const decoded = DECODERS[encoding]();
                response.pipe(decoded);
                // Copy response properties
                decoded.statusCode = response.statusCode;
                decoded.headers = this.convertRequestHeadersToFetchHeaders(response.headers);
                return decoded;
            }
            // Error when no suitable decoder found
            setTimeout(() => {
                response.emit('error', new Error(`Unsupported encoding: ${encoding}`));
            });
        }
        response.headers = this.convertRequestHeadersToFetchHeaders(response.headers);
        return response;
    }
}
exports.default = Requester;
//# sourceMappingURL=Requester.js.map