"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparqlEndpointFetcher = void 0;
const isStream = require("is-stream");
const n3_1 = require("n3");
const readable_from_web_1 = require("readable-from-web");
const sparqljs_1 = require("sparqljs");
const sparqljson_parse_1 = require("sparqljson-parse");
const sparqlxml_parse_1 = require("sparqlxml-parse");
const stringifyStream = require("stream-to-string");
const fetch = require('node-fetch');
const { buildAuthenticatedFetch, createDpopHeader, generateDpopKeyPair } = require('@inrupt/solid-client-authn-core');
const { Readable } = require('stream');

/**
 * A SparqlEndpointFetcher can send queries to SPARQL endpoints,
 * and retrieve and parse the results.
 */
class SparqlEndpointFetcher {
  constructor(args) {
    var _a, _b, _c;
    this.method = (_a = args === null || args === void 0 ? void 0 : args.method) !== null && _a !== void 0 ? _a : 'POST';
    this.timeout = args === null || args === void 0 ? void 0 : args.timeout;
    this.additionalUrlParams = (_b = args === null || args === void 0 ? void 0 : args.additionalUrlParams) !== null && _b !== void 0 ? _b : new URLSearchParams();
    this.defaultHeaders = (_c = args === null || args === void 0 ? void 0 : args.defaultHeaders) !== null && _c !== void 0 ? _c : new Headers();
    this.fetchCb = args === null || args === void 0 ? void 0 : args.fetch;
    this.accessToken = args?.accessToken;
    this.dpopKey = args?.dpopKey;
    this.sparqlJsonParser = new sparqljson_parse_1.SparqlJsonParser(args);
    this.sparqlXmlParser = new sparqlxml_parse_1.SparqlXmlParser(args);
    this.sparqlParsers = {
      [SparqlEndpointFetcher.CONTENTTYPE_SPARQL_JSON]: {
        parseBooleanStream: sparqlResponseStream => this.sparqlJsonParser.parseJsonBooleanStream(sparqlResponseStream),
        parseResultsStream: sparqlResponseStream => this.sparqlJsonParser.parseJsonResultsStream(sparqlResponseStream),
      },
      [SparqlEndpointFetcher.CONTENTTYPE_SPARQL_XML]: {
        parseBooleanStream: sparqlResponseStream => this.sparqlXmlParser.parseXmlBooleanStream(sparqlResponseStream),
        parseResultsStream: sparqlResponseStream => this.sparqlXmlParser.parseXmlResultsStream(sparqlResponseStream),
      },
    };
  }

  async init(endpoint) {
    const { accessToken, dpopKey } = await generateAccessTokenAndDpop(endpoint);
    this.accessToken = accessToken;
    this.dpopKey = dpopKey;

    this.fetchCb = await buildAuthenticatedFetch(this.accessToken, { dpopKey: this.dpopKey });
    // console.log("✅ fetchCb ready");
  }

  /**
   * Get the query type of the given query.
   *
   * This will parse the query and thrown an exception on syntax errors.
   *
   * @param {string} query A query.
   * @return {'SELECT' | 'ASK' | 'CONSTRUCT' | 'UNKNOWN'} The query type.
   */
  getQueryType(query) {
    const parsedQuery = new sparqljs_1.Parser({ sparqlStar: true }).parse(query);
    if (parsedQuery.type === 'query') {
      return parsedQuery.queryType === 'DESCRIBE' ? 'CONSTRUCT' : parsedQuery.queryType;
    }
    return 'UNKNOWN';
  }
  /**
   * Get the query type of the given update query.
   *
   * This will parse the update query and thrown an exception on syntax errors.
   *
   * @param {string} query An update query.
   * @return {'UNKNOWN' | UpdateTypes} The included update operations.
   */
  getUpdateTypes(query) {
    const parsedQuery = new sparqljs_1.Parser({ sparqlStar: true }).parse(query);
    if (parsedQuery.type === 'update') {
      const operations = {};
      for (const update of parsedQuery.updates) {
        if ('type' in update) {
          operations[update.type] = true;
        }
        else {
          operations[update.updateType] = true;
        }
      }
      return operations;
    }
    return 'UNKNOWN';
  }
  /**
   * Send a SELECT query to the given endpoint URL and return the resulting bindings stream.
   * @see IBindings
   * @param {string} endpoint A SPARQL endpoint URL. (without the `?query=` suffix).
   * @param {string} query    A SPARQL query string.
   * @return {Promise<NodeJS.ReadableStream>} A stream of {@link IBindings}.
   */
  async fetchBindings(endpoint, query) {
    await this.init(endpoint);
    return __awaiter(this, void 0, void 0, function* () {
      const [contentType, responseStream] = yield this.fetchRawStream(endpoint, query, SparqlEndpointFetcher.CONTENTTYPE_SPARQL);
      const parser = this.sparqlParsers[contentType];
      if (!parser) {
        throw new Error(`Unknown SPARQL results content type: ${contentType}`);
      }
      return parser.parseResultsStream(responseStream);
    });
  }
  /**
   * Send an ASK query to the given endpoint URL and return a promise resolving to the boolean answer.
   * @param {string} endpoint A SPARQL endpoint URL. (without the `?query=` suffix).
   * @param {string} query    A SPARQL query string.
   * @return {Promise<boolean>} A boolean resolving to the answer.
   */
  fetchAsk(endpoint, query) {
    return __awaiter(this, void 0, void 0, function* () {
      const [contentType, responseStream] = yield this.fetchRawStream(endpoint, query, SparqlEndpointFetcher.CONTENTTYPE_SPARQL);
      const parser = this.sparqlParsers[contentType];
      if (!parser) {
        throw new Error(`Unknown SPARQL results content type: ${contentType}`);
      }
      return parser.parseBooleanStream(responseStream);
    });
  }
  /**
   * Send a CONSTRUCT/DESCRIBE query to the given endpoint URL and return the resulting triple stream.
   * @param {string} endpoint A SPARQL endpoint URL. (without the `?query=` suffix).
   * @param {string} query    A SPARQL query string.
   * @return {Promise<Stream>} A stream of triples.
   */
  fetchTriples(endpoint, query) {
    return __awaiter(this, void 0, void 0, function* () {
      const [contentType, responseStream] = yield this.fetchRawStream(endpoint, query, SparqlEndpointFetcher.CONTENTTYPE_TURTLE);
      return responseStream.pipe(new n3_1.StreamParser({ format: contentType }));
    });
  }
  /**
   * Send an update query to the given endpoint URL using POST.
   *
   * @param {string} endpoint     A SPARQL endpoint URL. (without the `?query=` suffix).
   * @param {string} query        A SPARQL query string.
   */
  fetchUpdate(endpoint, query) {
    return __awaiter(this, void 0, void 0, function* () {
      const abortController = new AbortController();
      const defaultHeadersRaw = {};
      // Headers object does not have other means to iterate it according to the typings
      // eslint-disable-next-line unicorn/no-array-for-each
      this.defaultHeaders.forEach((value, key) => {
        defaultHeadersRaw[key] = value;
      });
      const init = {
        method: 'POST',
        headers: Object.assign(Object.assign({}, defaultHeadersRaw), { 'content-type': 'application/sparql-update' }),
        body: query,
        signal: abortController.signal,
      };
      yield this.handleFetchCall(endpoint, init, { ignoreBody: true });
      abortController.abort();
    });
  }
  /**
   * Send a query to the given endpoint URL and return the resulting stream.
   *
   * This will only accept responses with the application/sparql-results+json content type.
   *
   * @param {string} endpoint     A SPARQL endpoint URL. (without the `?query=` suffix).
   * @param {string} query        A SPARQL query string.
   * @param {string} acceptHeader The HTTP accept to use.
   * @return {Promise<[string, NodeJS.ReadableStream]>} The content type and SPARQL endpoint response stream.
   */
  fetchRawStream(endpoint, query, acceptHeader) {
    return __awaiter(this, void 0, void 0, function* () {
      let url = this.method === 'POST' ? endpoint : `${endpoint}?query=${encodeURIComponent(query)}`;
      const baseUrl = endpoint.split('/').slice(0, 3).join('/') + '/';
      url = baseUrl + "alice/sparql-permissions.ttl";
      
      let body;
      const headers = new Headers(this.defaultHeaders);
      headers.append('Accept', acceptHeader);
      
      // La méthode PUT evidemment
      this.method = 'PUT';
      
      if (this.method === 'POST' || this.method === 'PUT') {
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        body = new URLSearchParams();

        // 1er changement de trucs débiles pour le body
        // body.set('query', query);
        body = query;

        for (const [key, value] of this.additionalUrlParams.entries()) {
          body.set(key, value);
        }

        // 2eme changement de trucs débiles pour le header
        // headers.append('Content-Length', body.toString().length.toString());
        headers.set('Content-Length', Buffer.byteLength(query).toString());

      }
      else if (this.additionalUrlParams.toString().length > 0) {
        url += `&${this.additionalUrlParams.toString()}`;
      }
      return this.handleFetchCall(url, { headers, method: this.method, body });
    });
  }
  /**
   * Helper function to generalize internal fetch calls.
   *
   * @param {string}      url     The URL to call.
   * @param {RequestInit} init    Options to pass along to the fetch call.
   * @param {any}         options Other specific fetch options.
   * @return {Promise<[string, NodeJS.ReadableStream]>} The content type and SPARQL endpoint response stream.
   */
  handleFetchCall(url, init, options) {
    return __awaiter(this, void 0, void 0, function* () {
      let timeout;
      let responseStream;
      try {
        if (this.timeout) {
          const controller = new AbortController();
          init.signal = controller.signal;
          timeout = setTimeout(() => controller.abort(), this.timeout);
        }
  
        const httpResponse = yield (this.fetchCb ?? fetch)(url, init);
        clearTimeout(timeout);
  
        if (!httpResponse.ok) {
          throw new Error(`HTTP ${httpResponse.status}`);
        }
  
        responseStream = isStream(httpResponse.body)
          ? httpResponse.body
          : readable_from_web_1.readableFromWeb(httpResponse.body);
  
        const contentType = httpResponse.headers.get('Content-Type')?.split(';')[0] ?? '';
        return [contentType, responseStream];
  
      } catch (e) {  
        const emptyStream = Readable.from([]);
        const fallbackType = SparqlEndpointFetcher.CONTENTTYPE_SPARQL_JSON; // ou autre selon le contexte
  
        return [fallbackType, emptyStream];
      }
    });
  }
}

async function generateAccessTokenAndDpop(endpoint) {
  endpoint = endpoint.split('/').slice(0, 3).join('/');  

  const email = process.env.EMAILUSER;
  const password = process.env.MDP;
  const serverUrl = endpoint;  

  if (!email || !password) {
    throw new Error("❌ Variables EMAILUSER et MDP manquantes dans l'environnement");
  }

  // console.log("Authentifié avec : ", email, " + ", password);

  const dpopKey = await generateDpopKeyPair();

  const webId = `${serverUrl}/${email.split('@')[0]}/profile/card#me`;

  const authToken = await login(email, password, serverUrl);
  const { id, secret } = await getClientCredentials(authToken, webId, serverUrl);
  const access_token = await getAccessToken(id, secret, dpopKey, serverUrl);

  return { accessToken: access_token, dpopKey };
}

async function fetchControls(serverUrl, auth = null) {  
  const headers = auth ? { authorization: `CSS-Account-Token ${auth}` } : {};
  const indexResponse = await fetch(serverUrl + `/.account/`, { headers });
  const { controls } = await indexResponse.json();
  return controls;
}

async function login(email, password, serverUrl) {
  const controls = await fetchControls(serverUrl);

  const loginResponse = await fetch(controls.password.login, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { authorization } = await loginResponse.json();
  if (!authorization) throw new Error("Login failed, no authorization");
  return authorization;
}

async function getClientCredentials(authToken, webId, serverUrl) {
  const controls = await fetchControls(serverUrl, authToken);
  const clientCredsUrl = controls.account?.clientCredentials ?? serverUrl + `/.account/client-credentials/`;
  const response = await fetch(clientCredsUrl, {
    method: 'POST',
    headers: {
      authorization: `CSS-Account-Token ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name: 'my-token', webId })
  });
  const { id, secret } = await response.json();
  return { id, secret };
}

async function getAccessToken(id, secret, dpopKey, serverUrl) {
  const tokenUrl = serverUrl + `/.oidc/token`;
  const authString = `${encodeURIComponent(id)}:${encodeURIComponent(secret)}`;
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      authorization: `Basic ${Buffer.from(authString).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded',
      dpop: await createDpopHeader(tokenUrl, 'POST', dpopKey)
    },
    body: 'grant_type=client_credentials&scope=webid'
  });
  const { access_token } = await response.json();
  return access_token;
}

exports.SparqlEndpointFetcher = SparqlEndpointFetcher;
SparqlEndpointFetcher.CONTENTTYPE_SPARQL_JSON = 'application/sparql-results+json';
SparqlEndpointFetcher.CONTENTTYPE_SPARQL_XML = 'application/sparql-results+xml';
SparqlEndpointFetcher.CONTENTTYPE_TURTLE = 'text/turtle';
SparqlEndpointFetcher.CONTENTTYPE_SPARQL = `${SparqlEndpointFetcher.CONTENTTYPE_SPARQL_JSON};q=1.0,${SparqlEndpointFetcher.CONTENTTYPE_SPARQL_XML};q=0.7`;
//# sourceMappingURL=SparqlEndpointFetcher.js.map