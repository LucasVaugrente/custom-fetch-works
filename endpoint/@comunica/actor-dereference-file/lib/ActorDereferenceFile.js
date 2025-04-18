"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceFile = void 0;
const node_fs_1 = require("node:fs");
const node_url_1 = require("node:url");
const bus_dereference_1 = require("@comunica/bus-dereference");
const core_1 = require("@comunica/core");
/**
 * A comunica File Dereference Actor.
 */
class ActorDereferenceFile extends bus_dereference_1.ActorDereference {
    constructor(args) {
        super(args);
    }
    async test({ url }) {
        try {
            (0, node_fs_1.accessSync)(getPath(url), node_fs_1.constants.F_OK);
        }
        catch (error) {
            // eslint-disable-next-line ts/restrict-template-expressions
            return (0, core_1.failTest)(`This actor only works on existing local files. (${error})`);
        }
        return (0, core_1.passTestVoid)();
    }
    static isURI(str) {
        const URIRegex = /\w[\w+.-]*:.*/u;
        return URIRegex.exec(str) !== null;
    }
    async run({ url }) {
        const requestTimeStart = Date.now();
        return {
            data: (0, node_fs_1.createReadStream)(getPath(url)),
            // This should always be after the creation of the read stream
            requestTime: Date.now() - requestTimeStart,
            exists: true,
            url: ActorDereferenceFile.isURI(url) ? url : (0, node_url_1.pathToFileURL)(url).href,
        };
    }
}
exports.ActorDereferenceFile = ActorDereferenceFile;
const getPath = (url) => url.startsWith('file://') ? (0, node_url_1.fileURLToPath)(url) : url;
//# sourceMappingURL=ActorDereferenceFile.js.map