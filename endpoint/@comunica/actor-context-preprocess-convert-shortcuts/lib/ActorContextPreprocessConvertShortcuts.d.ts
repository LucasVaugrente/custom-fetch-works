import type { IActorContextPreprocessOutput, IActorContextPreprocessArgs } from '@comunica/bus-context-preprocess';
import { ActorContextPreprocess } from '@comunica/bus-context-preprocess';
import type { IAction, IActorTest, TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica Convert Shortcuts Context Preprocess Actor.
 */
export declare class ActorContextPreprocessConvertShortcuts extends ActorContextPreprocess {
    readonly contextKeyShortcuts: Record<string, string>;
    constructor(args: IActorContextPreprocessConvertShortcutsArgs);
    test(_action: IAction): Promise<TestResult<IActorTest>>;
    run(action: IAction): Promise<IActorContextPreprocessOutput>;
    static expandShortcuts(context: IActionContext, contextKeyShortcuts: Record<string, string>): IActionContext;
}
export interface IActorContextPreprocessConvertShortcutsArgs extends IActorContextPreprocessArgs {
    /**
     * A record of context shortcuts to full context keys (as defined in @comunica/context-entries).
     * @range {json}
     * @default {{
     *   "sources": "@comunica/actor-init-query:querySourcesUnidentified",
     *   "destination": "@comunica/bus-rdf-update-quads:destination",
     *   "initialBindings": "@comunica/actor-init-query:initialBindings",
     *   "queryFormat": "@comunica/actor-init-query:queryFormat",
     *   "baseIRI": "@comunica/actor-init-query:baseIRI",
     *   "log": "@comunica/core:log",
     *   "datetime": "@comunica/actor-http-memento:datetime",
     *   "queryTimestamp": "@comunica/actor-init-query:queryTimestamp",
     *   "queryTimestampHighResolution": "@comunica/actor-init-query:queryTimestampHighResolution",
     *   "httpProxyHandler": "@comunica/actor-http-proxy:httpProxyHandler",
     *   "lenient": "@comunica/actor-init-query:lenient",
     *   "httpIncludeCredentials": "@comunica/bus-http:include-credentials",
     *   "httpAuth": "@comunica/bus-http:auth",
     *   "httpTimeout": "@comunica/bus-http:http-timeout",
     *   "httpBodyTimeout": "@comunica/bus-http:http-body-timeout",
     *   "httpRetryCount": "@comunica/bus-http:http-retry-count",
     *   "httpRetryDelayFallback": "@comunica/bus-http:http-retry-delay-fallback",
     *   "httpRetryDelayLimit": "@comunica/bus-http:http-retry-delay-limit",
     *   "fetch": "@comunica/bus-http:fetch",
     *   "recoverBrokenLinks": "@comunica/bus-http-wayback:recover-broken-links",
     *   "readOnly": "@comunica/bus-query-operation:readOnly",
     *   "extensionFunctions": "@comunica/actor-init-query:extensionFunctions",
     *   "extensionFunctionCreator": "@comunica/actor-init-query:extensionFunctionCreator",
     *   "functionArgumentsCache": "@comunica/actor-init-query:functionArgumentsCache",
     *   "explain": "@comunica/actor-init-query:explain",
     *   "unionDefaultGraph": "@comunica/bus-query-operation:unionDefaultGraph",
     *   "traverse": "@comunica/bus-query-source-identify:traverse",
     *   "invalidateCache": "@comunica/actor-init-query:invalidateCache",
     *   "dataFactory": "@comunica/actor-init-query:dataFactory",
     *   "distinctConstruct": "@comunica/actor-init-query:distinctConstruct"
     * }}
     */
    contextKeyShortcuts: Record<string, string>;
}
