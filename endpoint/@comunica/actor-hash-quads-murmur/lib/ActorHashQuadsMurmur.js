"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHashQuadsMurmur = void 0;
const bus_hash_quads_1 = require("@comunica/bus-hash-quads");
const core_1 = require("@comunica/core");
// eslint-disable-next-line ts/no-require-imports,ts/no-var-requires
const MurmurHash3 = require('imurmurhash');
/**
 * A comunica Murmur Hash Quads Actor.
 */
class ActorHashQuadsMurmur extends bus_hash_quads_1.ActorHashQuads {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(_action) {
        return {
            hashFunction: (quad) => {
                const hash = MurmurHash3(quad.subject.value);
                hash.hash(quad.predicate.value);
                hash.hash(quad.object.value);
                hash.hash(quad.graph.value);
                return hash.result();
            },
        };
    }
}
exports.ActorHashQuadsMurmur = ActorHashQuadsMurmur;
//# sourceMappingURL=ActorHashQuadsMurmur.js.map