"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeSparqlXml = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
const readable_stream_1 = require("readable-stream");
const XmlSerializer_1 = require("./XmlSerializer");
/**
 * A comunica sparql-results+xml Serialize Actor.
 */
class ActorQueryResultSerializeSparqlXml extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/sparql-results+xml": 0.8
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/sparql-results+xml": "http://www.w3.org/ns/formats/SPARQL_Results_XML"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    /**
     * Converts an RDF term to its object-based XML representation.
     * @param {RDF.Term} value An RDF term.
     * @param {string} key A variable name, '?' must be included as a prefix.
     * @return {IXmlNode} An object-based XML tag.
     */
    static bindingToXmlBindings(value, key) {
        return { name: 'binding', attributes: { name: key.value }, children: [this.valueToXmlValue(value)] };
    }
    static valueToXmlValue(value) {
        let attributes;
        switch (value.termType) {
            case 'Literal':
                if (value.language) {
                    attributes = { 'xml:lang': value.language };
                }
                else if (value.datatype && value.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string') {
                    attributes = { datatype: value.datatype.value };
                }
                else {
                    attributes = {};
                }
                return { name: 'literal', attributes, children: value.value };
            case 'BlankNode':
                return { name: 'bnode', children: value.value };
            case 'Quad':
                return {
                    name: 'triple',
                    children: [
                        { name: 'subject', children: [this.valueToXmlValue(value.subject)] },
                        { name: 'predicate', children: [this.valueToXmlValue(value.predicate)] },
                        { name: 'object', children: [this.valueToXmlValue(value.object)] },
                    ],
                };
            default:
                return { name: 'uri', children: value.value };
        }
    }
    async testHandleChecked(action, _context) {
        if (!['bindings', 'boolean'].includes(action.type)) {
            return (0, core_1.failTest)('This actor can only handle bindings streams or booleans.');
        }
        return (0, core_1.passTestVoid)();
    }
    async runHandle(action, _mediaType, _context) {
        const data = new readable_stream_1.Readable();
        data._read = () => {
            // Do nothing
        };
        const serializer = new XmlSerializer_1.XmlSerializer();
        const metadata = await action.metadata();
        data.push(XmlSerializer_1.XmlSerializer.header);
        data.push(serializer.open('sparql', { xmlns: 'http://www.w3.org/2005/sparql-results#' }));
        data.push(serializer.serializeNode({
            name: 'head',
            children: metadata.variables
                .map(variable => ({ name: 'variable', attributes: { name: variable.variable.value } })),
        }));
        if (action.type === 'bindings') {
            function* end() {
                yield serializer.close();
                yield serializer.close();
            }
            data.push(serializer.open('results'));
            const stream = (0, asynciterator_1.wrap)(action.bindingsStream).map((bindings) => serializer.serializeNode({
                name: 'result',
                children: [...bindings].map(([key, value]) => ActorQueryResultSerializeSparqlXml.bindingToXmlBindings(value, key)),
            })).append((0, asynciterator_1.wrap)(end()));
            data.wrap(stream);
        }
        else {
            try {
                const result = await action.execute();
                data.push(serializer.serializeNode({ name: 'boolean', children: result.toString() }));
                data.push(serializer.close());
                setTimeout(() => data.push(null));
            }
            catch (error) {
                setTimeout(() => data.emit('error', error));
            }
        }
        return { data };
    }
}
exports.ActorQueryResultSerializeSparqlXml = ActorQueryResultSerializeSparqlXml;
//# sourceMappingURL=ActorQueryResultSerializeSparqlXml.js.map