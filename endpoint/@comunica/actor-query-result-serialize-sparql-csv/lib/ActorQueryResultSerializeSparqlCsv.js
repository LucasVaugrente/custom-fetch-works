"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeSparqlCsv = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica SPARQL CSV Query Result Serialize Actor.
 */
class ActorQueryResultSerializeSparqlCsv extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/csv": 0.75
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/csv": "http://www.w3.org/ns/formats/SPARQL_Results_CSV"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    /**
     * Converts an RDF term to its CSV representation.
     * @param {RDF.Term} value An RDF term.
     * @return {string} A string representation of the given value.
     */
    static bindingToCsvBindings(value) {
        if (!value) {
            return '';
        }
        let stringValue = value.value;
        if (value.termType === 'Literal') {
            // This is a lossy representation, since language and datatype are not encoded in here.
            stringValue = `${stringValue}`;
        }
        else if (value.termType === 'BlankNode') {
            stringValue = `_:${stringValue}`;
        }
        else if (value.termType === 'Quad') {
            let object = ActorQueryResultSerializeSparqlCsv.bindingToCsvBindings(value.object);
            if (value.object.termType === 'Literal') {
                // If object is a literal, it must be put in quotes, and internal quotes must be escaped
                object = `"${object.replaceAll('"', '""')}"`;
            }
            stringValue = `<< ${ActorQueryResultSerializeSparqlCsv.bindingToCsvBindings(value.subject)} ${ActorQueryResultSerializeSparqlCsv.bindingToCsvBindings(value.predicate)} ${object} >>`;
        }
        else {
            stringValue = `<${stringValue}>`;
        }
        // If a value contains certain characters, put it between double quotes
        if (/[",\n\r]/u.test(stringValue)) {
            // Within quote strings, " is written using a pair of quotation marks "".
            stringValue = `"${stringValue.replaceAll('"', '""')}"`;
        }
        return stringValue;
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
        const metadata = await bindingsAction.metadata();
        // Write head
        data.push(`${metadata.variables.map(variable => variable.variable.value).join(',')}\r\n`);
        // Write body
        data.wrap(bindingsAction.bindingsStream.map((bindings) => `${metadata.variables
            .map(key => ActorQueryResultSerializeSparqlCsv.bindingToCsvBindings(bindings.get(key.variable)))
            .join(',')}\r\n`));
        return { data };
    }
}
exports.ActorQueryResultSerializeSparqlCsv = ActorQueryResultSerializeSparqlCsv;
//# sourceMappingURL=ActorQueryResultSerializeSparqlCsv.js.map