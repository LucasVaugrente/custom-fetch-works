"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeTable = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const rdf_string_1 = require("rdf-string");
const rdf_terms_1 = require("rdf-terms");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica Table Sparql Serialize Actor.
 */
class ActorQueryResultSerializeTable extends bus_query_result_serialize_1.ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{ "table": 0.6 }} mediaTypePriorities
     *   \ @defaultNested {{ "table": "https://comunica.linkeddatafragments.org/#results_table" }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
        this.padding = ActorQueryResultSerializeTable.repeat(' ', this.columnWidth);
    }
    static repeat(str, count) {
        return str.repeat(count);
    }
    async testHandleChecked(action, _context) {
        if (!['bindings', 'quads'].includes(action.type)) {
            return (0, core_1.failTest)('This actor can only handle bindings or quad streams.');
        }
        return (0, core_1.passTestVoid)();
    }
    termToString(term) {
        return term.termType === 'Quad' ? (0, rdf_string_1.termToString)(term) : term.value;
    }
    pad(str) {
        if (str.length <= this.columnWidth) {
            return str + this.padding.slice(str.length);
        }
        return `${str.slice(0, this.columnWidth - 1)}…`;
    }
    pushHeader(data, labels) {
        const header = labels.map(label => this.pad(label.value)).join(' ');
        data.push(`${header}\n${ActorQueryResultSerializeTable.repeat('-', header.length)}\n`);
    }
    createRow(labels, bindings) {
        return `${labels
            .map(label => bindings.has(label) ? this.termToString(bindings.get(label)) : '')
            .map(label => this.pad(label))
            .join(' ')}\n`;
    }
    async runHandle(action, _mediaType, _context) {
        const data = new readable_stream_1.Readable();
        let resultStream;
        if (action.type === 'bindings') {
            resultStream = action.bindingsStream.map(bindings => this.createRow(labels, bindings));
            const labels = (await action.metadata()).variables.map(v => v.variable);
            this.pushHeader(data, labels);
        }
        else {
            resultStream = action.quadStream.map(quad => `${(0, rdf_terms_1.getTerms)(quad).map(term => this.pad(this.termToString(term))).join(' ')}\n`);
            const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
            this.pushHeader(data, rdf_terms_1.QUAD_TERM_NAMES.map(name => dataFactory.variable(name)));
        }
        data.wrap(resultStream);
        return { data };
    }
}
exports.ActorQueryResultSerializeTable = ActorQueryResultSerializeTable;
//# sourceMappingURL=ActorQueryResultSerializeTable.js.map