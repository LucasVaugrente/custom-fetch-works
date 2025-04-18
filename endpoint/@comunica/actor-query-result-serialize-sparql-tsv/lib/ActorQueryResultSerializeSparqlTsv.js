"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeSparqlTsv = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
const rdf_string_ttl_1 = require("rdf-string-ttl");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica SPARQL TSV Query Result Serialize Actor.
 */
class ActorQueryResultSerializeSparqlTsv extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/tab-separated-values": 0.75
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/tab-separated-values": "http://www.w3.org/ns/formats/SPARQL_Results_TSV"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    /**
     * Converts an RDF term to its TSV representation.
     * @param {RDF.Term} value An RDF term.
     * @return {string} A string representation of the given value.
     */
    static bindingToTsvBindings(value) {
        if (!value) {
            return '';
        }
        // Escape tab, newline and carriage return characters
        return (0, rdf_string_ttl_1.termToString)(value)
            .replaceAll('\t', '\\t')
            .replaceAll('\n', '\\n')
            .replaceAll('\r', '\\r');
    }
    async testHandleChecked(action, _context) {
        if (action.type !== 'bindings') {
            return (0, core_1.failTest)('This actor can only handle bindings streams.');
        }
        return (0, core_1.passTestVoid)();
    }
    async runHandle(action, _mediaType, _context) {
        const bindingsAction = action;
        const data = new readable_stream_1.Readable();
        // Write head
        const metadata = await bindingsAction.metadata();
        data.push(`${metadata.variables.map(variable => variable.variable.value).join('\t')}\n`);
        // Write Bindings
        data.wrap(bindingsAction.bindingsStream.map((bindings) => `${metadata.variables
            .map(key => ActorQueryResultSerializeSparqlTsv
            .bindingToTsvBindings(bindings.get(key.variable)))
            .join('\t')}\n`));
        return { data };
    }
}
exports.ActorQueryResultSerializeSparqlTsv = ActorQueryResultSerializeSparqlTsv;
//# sourceMappingURL=ActorQueryResultSerializeSparqlTsv.js.map