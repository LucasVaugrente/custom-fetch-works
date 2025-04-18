"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeSimple = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
const rdf_string_1 = require("rdf-string");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica Simple Sparql Serialize Actor.
 */
class ActorQueryResultSerializeSimple extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{ "simple": 0.9 }} mediaTypePriorities
     *   \ @defaultNested {{ "simple": "https://comunica.linkeddatafragments.org/#results_simple" }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async testHandleChecked(action, _context) {
        if (!['bindings', 'quads', 'boolean', 'void'].includes(action.type)) {
            return (0, core_1.failTest)('This actor can only handle bindings streams, quad streams, booleans, or updates.');
        }
        return (0, core_1.passTestVoid)();
    }
    static termToString(term) {
        return term.termType === 'Quad' ? (0, rdf_string_1.termToString)(term) : term.value;
    }
    async runHandle(action, _mediaType, _context) {
        const data = new readable_stream_1.Readable();
        if (action.type === 'bindings') {
            data.wrap(action.bindingsStream.map((bindings) => `${[...bindings].map(([key, value]) => `?${key.value}: ${ActorQueryResultSerializeSimple.termToString(value)}`).join('\n')}\n\n`));
        }
        else if (action.type === 'quads') {
            data.wrap(action.quadStream.map(quad => `subject: ${ActorQueryResultSerializeSimple.termToString(quad.subject)}\n` +
                `predicate: ${ActorQueryResultSerializeSimple.termToString(quad.predicate)}\n` +
                `object: ${ActorQueryResultSerializeSimple.termToString(quad.object)}\n` +
                `graph: ${ActorQueryResultSerializeSimple.termToString(quad.graph)}\n\n`));
        }
        else {
            data.wrap((0, asynciterator_1.wrap)(action.type === 'boolean' ?
                action.execute().then(value => [`${value}\n`]) :
                action.execute().then(() => ['ok\n'])));
        }
        return { data };
    }
}
exports.ActorQueryResultSerializeSimple = ActorQueryResultSerializeSimple;
//# sourceMappingURL=ActorQueryResultSerializeSimple.js.map