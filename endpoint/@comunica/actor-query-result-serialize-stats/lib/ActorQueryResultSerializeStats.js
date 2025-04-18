"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeStats = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
const readable_stream_1 = require("readable-stream");
/**
 * Serializes SPARQL results for testing and debugging.
 */
class ActorQueryResultSerializeStats extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {{ "stats": 0.5 }} mediaTypePriorities
     *   \ @defaultNested {{ "stats": "https://comunica.linkeddatafragments.org/#results_stats" }} mediaTypeFormats
     *   \ @defaultNested {<default_observer> a <caqrsst:components/ActionObserverHttp.jsonld#ActionObserverHttp>} httpObserver
     */
    constructor(args) {
        super(args);
    }
    /* eslint-enable max-len */
    async testHandleChecked(action, _context) {
        if (!['bindings', 'quads'].includes(action.type)) {
            return (0, core_1.failTest)('This actor can only handle bindings streams or quad streams.');
        }
        return (0, core_1.passTestVoid)();
    }
    pushHeader(data) {
        const header = ['Result', 'Delay (ms)', 'HTTP requests',
        ].join(',');
        data.push(`${header}\n`);
    }
    createStat(startTime, result) {
        const row = [result, this.delay(startTime), this.httpObserver.requests,
        ].join(',');
        return `${row}\n`;
    }
    createSpecialLine(label, startTime) {
        const line = [label, this.delay(startTime), this.httpObserver.requests,
        ].join(',');
        return `${line}\n`;
    }
    async runHandle(action, _mediaType, _context) {
        const data = new readable_stream_1.Readable();
        const resultStream = action.type === 'bindings' ?
            action.bindingsStream :
            action.quadStream;
        const startTime = action.context.getSafe(context_entries_1.KeysInitQuery.queryTimestampHighResolution);
        let result = 1;
        function* end(cb) {
            yield cb();
        }
        const stream = (0, asynciterator_1.wrap)(resultStream)
            .map(() => this.createStat(startTime, result++))
            .prepend([this.createSpecialLine('PLANNING', startTime)])
            .append((0, asynciterator_1.wrap)(end(() => this.createSpecialLine('TOTAL', startTime))));
        this.pushHeader(data);
        data.wrap(stream);
        return { data };
    }
    now() {
        return performance.now();
    }
    delay(startTime) {
        return this.now() - startTime;
    }
}
exports.ActorQueryResultSerializeStats = ActorQueryResultSerializeStats;
//# sourceMappingURL=ActorQueryResultSerializeStats.js.map