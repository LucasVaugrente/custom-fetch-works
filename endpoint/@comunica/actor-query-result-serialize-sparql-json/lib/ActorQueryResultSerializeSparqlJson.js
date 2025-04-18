"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeSparqlJson = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica sparql-results+xml Serialize Actor.
 */
class ActorQueryResultSerializeSparqlJson extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/sparql-results+json": 0.8
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/sparql-results+json": "http://www.w3.org/ns/formats/SPARQL_Results_JSON"
     *     }} mediaTypeFormats
     *   \ @defaultNested {true} emitMetadata
     *   \ @defaultNested {<default_observer> a <caqrssj:components/ActionObserverHttp.jsonld#ActionObserverHttp>} httpObserver
     */
    constructor(args) {
        super(args);
    }
    /* eslint-enable max-len */
    /**
     * Converts an RDF term to its JSON representation.
     * @param {RDF.Term} value An RDF term.
     * @return {any} A JSON object.
     */
    static bindingToJsonBindings(value) {
        if (value.termType === 'Literal') {
            const literal = value;
            const jsonValue = { value: literal.value, type: 'literal' };
            const { language, datatype } = literal;
            if (language) {
                jsonValue['xml:lang'] = language;
            }
            else if (datatype && datatype.value !== 'http://www.w3.org/2001/XMLSchema#string') {
                jsonValue.datatype = datatype.value;
            }
            return jsonValue;
        }
        if (value.termType === 'BlankNode') {
            return { value: value.value, type: 'bnode' };
        }
        if (value.termType === 'Quad') {
            return {
                value: {
                    subject: ActorQueryResultSerializeSparqlJson.bindingToJsonBindings(value.subject),
                    predicate: ActorQueryResultSerializeSparqlJson.bindingToJsonBindings(value.predicate),
                    object: ActorQueryResultSerializeSparqlJson.bindingToJsonBindings(value.object),
                },
                type: 'triple',
            };
        }
        return { value: value.value, type: 'uri' };
    }
    async testHandleChecked(action, _context) {
        if (!['bindings', 'boolean'].includes(action.type)) {
            return (0, core_1.failTest)('This actor can only handle bindings streams or booleans.');
        }
        return (0, core_1.passTestVoid)();
    }
    async runHandle(action, _mediaType, _context) {
        const data = new readable_stream_1.Readable();
        // Write head
        const head = {};
        if (action.type === 'bindings') {
            const metadata = await action.metadata();
            if (metadata.variables.length > 0) {
                head.vars = metadata.variables.map(variable => variable.variable.value);
            }
        }
        data.push(`{"head": ${JSON.stringify(head)},\n`);
        if (action.type === 'bindings') {
            const resultStream = action.bindingsStream;
            data.push('"results": { "bindings": [\n');
            let first = true;
            function* end(cb) {
                yield cb();
            }
            // Write bindings
            data.wrap(
            // JSON SPARQL results spec does not allow unbound variables and blank node bindings
            (0, asynciterator_1.wrap)(resultStream).map((bindings) => {
                const res = `${first ? '' : ',\n'}${JSON.stringify(Object.fromEntries([...bindings]
                    .map(([key, value]) => [key.value, ActorQueryResultSerializeSparqlJson.bindingToJsonBindings(value)])))}`;
                first = false;
                return res;
            }).append((0, asynciterator_1.wrap)(end(() => `\n]}${this.emitMetadata ? `,\n"metadata": { "httpRequests": ${this.httpObserver.requests} }` : ''}}\n`))));
        }
        else {
            data.wrap((0, asynciterator_1.wrap)(action.execute().then(value => [`"boolean":${value}\n}\n`])));
        }
        return { data };
    }
}
exports.ActorQueryResultSerializeSparqlJson = ActorQueryResultSerializeSparqlJson;
//# sourceMappingURL=ActorQueryResultSerializeSparqlJson.js.map