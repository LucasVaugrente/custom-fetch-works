"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeTree = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const readable_stream_1 = require("readable-stream");
const sparqljson_to_tree_1 = require("sparqljson-to-tree");
/**
 * A comunica Tree Query Result Serialize Actor.
 */
class ActorQueryResultSerializeTree extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{ "tree": 0.5 }} mediaTypePriorities
     *   \ @defaultNested {{ "tree": "https://comunica.linkeddatafragments.org/#results_tree" }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    /**
     *
     * @param {BindingsStream} bindingsStream
     * @param context
     * @param {IConverterSettings} converterSettings
     * @return {Promise<string>}
     */
    static async bindingsStreamToGraphQl(bindingsStream, context, converterSettings) {
        const actionContext = core_1.ActionContext.ensureActionContext(context);
        const converter = new sparqljson_to_tree_1.Converter(converterSettings);
        const schema = {
            singularizeVariables: actionContext.get(context_entries_1.KeysInitQuery.graphqlSingularizeVariables) ?? {},
        };
        return converter.bindingsToTree(await bindingsStream.map((bindings) => Object.fromEntries([...bindings]
            .map(([key, value]) => [key.value, value]))).toArray(), schema);
    }
    async testHandleChecked(action) {
        if (action.type !== 'bindings') {
            return (0, core_1.failTest)('This actor can only handle bindings streams.');
        }
        return (0, core_1.passTestVoid)();
    }
    async runHandle(action, _mediaType) {
        const data = new readable_stream_1.Readable();
        data._read = () => {
            data._read = () => { };
            ActorQueryResultSerializeTree.bindingsStreamToGraphQl(action.bindingsStream, action.context, { materializeRdfJsTerms: true })
                .then((result) => {
                data.push(JSON.stringify(result, null, '  '));
                data.push(null);
            })
                .catch(error => data.emit('error', error));
        };
        return { data };
    }
}
exports.ActorQueryResultSerializeTree = ActorQueryResultSerializeTree;
//# sourceMappingURL=ActorQueryResultSerializeTree.js.map