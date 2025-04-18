"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseHtml = void 0;
const bus_rdf_parse_1 = require("@comunica/bus-rdf-parse");
const htmlparser2_1 = require("htmlparser2");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica HTML RDF Parse Actor.
 * It creates an HTML parser, and delegates its events via the bus-rdf-parse-html bus to other HTML parsing actors.
 */
class ActorRdfParseHtml extends bus_rdf_parse_1.ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/html": 1.0,
     *       "application/xhtml+xml": 0.9
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/html": "http://www.w3.org/ns/formats/HTML",
     *       "application/xhtml+xml": "http://www.w3.org/ns/formats/HTML"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async runHandle(action, mediaType, context) {
        const data = new readable_stream_1.Readable({ objectMode: true });
        data._read = () => {
            // Do nothing
        };
        let maxSize = 0;
        // Create callbacks action
        let endBarrier = 1;
        function error(subError) {
            data.emit('error', subError);
        }
        function end() {
            if (--endBarrier === 0) {
                data.push(null);
            }
        }
        const htmlAction = {
            baseIRI: action.metadata?.baseIRI ?? '',
            context,
            emit: (quad) => {
                maxSize--;
                data.push(quad);
            },
            end,
            error,
            headers: action.headers,
        };
        try {
            const outputs = await Promise.all(this.busRdfParseHtml.publish(htmlAction));
            endBarrier += outputs.length;
            const htmlParseListeners = [];
            for (const output of outputs) {
                // eslint-disable-next-line unicorn/no-useless-undefined
                const { htmlParseListener } = await output.actor.run(htmlAction, undefined);
                htmlParseListeners.push(htmlParseListener);
            }
            // Create parser
            const parser = new htmlparser2_1.Parser({
                onclosetag() {
                    try {
                        for (const htmlParseListener of htmlParseListeners) {
                            htmlParseListener.onTagClose();
                        }
                    }
                    catch (error_) {
                        error(error_);
                    }
                },
                onend() {
                    try {
                        for (const htmlParseListener of htmlParseListeners) {
                            htmlParseListener.onEnd();
                        }
                    }
                    catch (error_) {
                        error(error_);
                    }
                    end();
                },
                onopentag(name, attributes) {
                    try {
                        for (const htmlParseListener of htmlParseListeners) {
                            htmlParseListener.onTagOpen(name, attributes);
                        }
                    }
                    catch (error_) {
                        error(error_);
                    }
                },
                ontext(text) {
                    try {
                        for (const htmlParseListener of htmlParseListeners) {
                            htmlParseListener.onText(text);
                        }
                    }
                    catch (error_) {
                        error(error_);
                    }
                },
            }, {
                decodeEntities: true,
                recognizeSelfClosing: true,
                xmlMode: false,
            });
            const read = data._read = (size) => {
                maxSize = Math.max(size, maxSize);
                // eslint-disable-next-line no-unmodified-loop-condition
                while (maxSize > 0) {
                    const item = action.data.read();
                    if (item === null) {
                        action.data.once('readable', () => read(0));
                        return;
                    }
                    parser.write(item.toString());
                }
            };
            action.data
                .on('error', error)
                .on('end', () => parser.end());
        }
        catch (e) {
            setTimeout(() => {
                data.emit('error', e);
            });
        }
        return { data };
    }
}
exports.ActorRdfParseHtml = ActorRdfParseHtml;
//# sourceMappingURL=ActorRdfParseHtml.js.map