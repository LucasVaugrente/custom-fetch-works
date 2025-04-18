"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeJson = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
const RdfString = require("rdf-string");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica JSON Query Result Serialize Actor.
 */
class ActorQueryResultSerializeJson extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/json": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/json": "https://comunica.linkeddatafragments.org/#results_JSON"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async testHandleChecked(action, _context) {
        if (!['bindings', 'quads', 'boolean'].includes(action.type)) {
            return (0, core_1.failTest)('This actor can only handle bindings or quad streams.');
        }
        return (0, core_1.passTestVoid)();
    }
    async runHandle(action, _mediaType, _context) {
        const data = new readable_stream_1.Readable();
        data._read = () => {
            // Do nothing
        };
        if (action.type === 'bindings' || action.type === 'quads') {
            let stream = action.type === 'bindings' ?
                (0, asynciterator_1.wrap)(action.bindingsStream)
                    .map(element => JSON.stringify(Object.fromEntries([...element]
                    .map(([key, value]) => [key.value, RdfString.termToString(value)])))) :
                (0, asynciterator_1.wrap)(action.quadStream)
                    .map(element => JSON.stringify(RdfString.quadToStringQuad(element)));
            let empty = true;
            stream = stream.map((element) => {
                const ret = `${empty ? '' : ','}\n${element}`;
                empty = false;
                return ret;
            }).prepend(['[']).append(['\n]\n']);
            data.wrap(stream);
        }
        else {
            try {
                data.push(`${JSON.stringify(await action.execute())}\n`);
                data.push(null);
            }
            catch (error) {
                setTimeout(() => data.emit('error', error));
            }
        }
        return { data };
    }
}
exports.ActorQueryResultSerializeJson = ActorQueryResultSerializeJson;
//# sourceMappingURL=ActorQueryResultSerializeJson.js.map