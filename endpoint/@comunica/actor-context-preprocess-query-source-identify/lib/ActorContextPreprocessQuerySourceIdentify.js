"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorContextPreprocessQuerySourceIdentify = void 0;
const bus_context_preprocess_1 = require("@comunica/bus-context-preprocess");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const lru_cache_1 = require("lru-cache");
/**
 * A comunica Query Source Identify Context Preprocess Actor.
 */
class ActorContextPreprocessQuerySourceIdentify extends bus_context_preprocess_1.ActorContextPreprocess {
    constructor(args) {
        super(args);
        this.cache = this.cacheSize ? new lru_cache_1.LRUCache({ max: this.cacheSize }) : undefined;
        const cache = this.cache;
        if (cache) {
            this.httpInvalidator.addInvalidateListener(({ url }) => url ? cache.delete(url) : cache.clear());
        }
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        let context = action.context;
        // Rewrite sources
        if (context.has(context_entries_1.KeysInitQuery.querySourcesUnidentified)) {
            const querySourcesUnidentified = action.context
                .get(context_entries_1.KeysInitQuery.querySourcesUnidentified);
            const querySourcesUnidentifiedExpanded = await Promise.all(querySourcesUnidentified
                .map(querySource => this.expandSource(querySource)));
            const querySources = await Promise.all(querySourcesUnidentifiedExpanded
                .map(async (querySourceUnidentified) => this.identifySource(querySourceUnidentified, action.context)));
            // When identifying sources in preprocess actor, we record this as a dereference seed document event
            const statisticDereferenceLinks = action.context
                .get(context_entries_1.KeysStatistics.dereferencedLinks);
            if (statisticDereferenceLinks) {
                for (const querySource of querySources) {
                    statisticDereferenceLinks.updateStatistic({
                        url: querySource.source.referenceValue,
                        metadata: {
                            seed: true,
                        },
                    }, querySource.source);
                }
            }
            context = action.context
                .delete(context_entries_1.KeysInitQuery.querySourcesUnidentified)
                .set(context_entries_1.KeysQueryOperation.querySources, querySources);
        }
        return { context };
    }
    async expandSource(querySource) {
        if (typeof querySource === 'string' || 'match' in querySource) {
            return { value: querySource };
        }
        return {
            ...querySource,
            context: (await this.mediatorContextPreprocess.mediate({
                context: core_1.ActionContext.ensureActionContext(querySource.context ?? {}),
            })).context,
        };
    }
    identifySource(querySourceUnidentified, context) {
        let sourcePromise;
        // Try to read from cache
        // Only sources based on string values (e.g. URLs) are supported!
        if (typeof querySourceUnidentified.value === 'string' && this.cache) {
            sourcePromise = this.cache.get(querySourceUnidentified.value);
        }
        // If not in cache, identify the source
        if (!sourcePromise) {
            sourcePromise = this.mediatorQuerySourceIdentify.mediate({ querySourceUnidentified, context })
                .then(({ querySource }) => querySource);
            // Set in cache
            if (typeof querySourceUnidentified.value === 'string' && this.cache) {
                this.cache.set(querySourceUnidentified.value, sourcePromise);
            }
        }
        return sourcePromise;
    }
}
exports.ActorContextPreprocessQuerySourceIdentify = ActorContextPreprocessQuerySourceIdentify;
//# sourceMappingURL=ActorContextPreprocessQuerySourceIdentify.js.map