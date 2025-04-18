"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationJoinConnected = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Join Connected Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationJoinConnected extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = sparqlalgebrajs_1.Util.mapOperation(action.operation, {
            join(op, factory) {
                return {
                    recurse: false,
                    result: ActorOptimizeQueryOperationJoinConnected.cluster(op, factory),
                };
            },
        }, algebraFactory);
        return { operation, context: action.context };
    }
    /**
     * Iteratively cluster join entries based on their overlapping variables.
     * @param op A join operation.
     * @param factory An algebra factory.
     */
    static cluster(op, factory) {
        // Initialize each entry to be in a separate cluster
        const initialClusters = op.input.map(subOp => ({
            inScopeVariables: Object.fromEntries(sparqlalgebrajs_1.Util.inScopeVariables(subOp).map(variable => [variable.value, true])),
            entries: [subOp],
        }));
        // Iteratively merge clusters until they don't change anymore
        let oldClusters;
        let newClusters = initialClusters;
        do {
            oldClusters = newClusters;
            newClusters = ActorOptimizeQueryOperationJoinConnected.clusterIteration(oldClusters);
        } while (oldClusters.length !== newClusters.length);
        // Create new join operation of latest clusters
        const subJoins = newClusters
            .map(cluster => cluster.entries.length === 1 ? cluster.entries[0] : factory.createJoin(cluster.entries));
        return subJoins.length === 1 ? subJoins[0] : factory.createJoin(subJoins, false);
    }
    /**
     * Perform a single clustering iteration.
     * Clusters will be joined if they have overlapping variables.
     * @param oldCluster
     */
    static clusterIteration(oldCluster) {
        const newClusters = [];
        for (const entry of oldCluster) {
            // Try to add entry to a join cluster
            let joined = false;
            for (const newEntry of newClusters) {
                if (ActorOptimizeQueryOperationJoinConnected
                    .haveOverlappingVariables(entry.inScopeVariables, newEntry.inScopeVariables)) {
                    newEntry.entries = [...newEntry.entries, ...entry.entries];
                    newEntry.inScopeVariables = { ...newEntry.inScopeVariables, ...entry.inScopeVariables };
                    joined = true;
                    break;
                }
            }
            // If none was found, create new cluster
            if (!joined) {
                newClusters.push({
                    inScopeVariables: entry.inScopeVariables,
                    entries: entry.entries,
                });
            }
        }
        return newClusters;
    }
    /**
     * Check if the two given variable objects are overlapping.
     * @param variablesA A variables objects.
     * @param variablesB A variables objects.
     */
    static haveOverlappingVariables(variablesA, variablesB) {
        for (const variableA of Object.keys(variablesA)) {
            if (variablesB[variableA]) {
                return true;
            }
        }
        return false;
    }
}
exports.ActorOptimizeQueryOperationJoinConnected = ActorOptimizeQueryOperationJoinConnected;
//# sourceMappingURL=ActorOptimizeQueryOperationJoinConnected.js.map