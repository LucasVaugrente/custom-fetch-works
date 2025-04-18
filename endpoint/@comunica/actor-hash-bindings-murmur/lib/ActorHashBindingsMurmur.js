"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHashBindingsMurmur = void 0;
const bus_hash_bindings_1 = require("@comunica/bus-hash-bindings");
const core_1 = require("@comunica/core");
// eslint-disable-next-line ts/no-require-imports,ts/no-var-requires
const MurmurHash3 = require('imurmurhash');
/**
 * A comunica Murmur Hash Bindings Actor.
 */
class ActorHashBindingsMurmur extends bus_hash_bindings_1.ActorHashBindings {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(_action) {
        return {
            hashFunction: (bindings, variables) => {
                let hash = MurmurHash3();
                for (const variable of variables) {
                    hash = hash.hash(bindings.get(variable)?.value ?? 'UNDEF');
                }
                return hash.result();
            },
        };
    }
}
exports.ActorHashBindingsMurmur = ActorHashBindingsMurmur;
//# sourceMappingURL=ActorHashBindingsMurmur.js.map