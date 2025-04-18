"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationGroupSources = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Group Sources Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationGroupSources extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if ((0, utils_query_operation_1.getOperationSource)(action.operation)) {
            return (0, core_1.failTest)(`Actor ${this.name} does not work with top-level operation sources.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return { operation: await this.groupOperation(action.operation, action.context), context: action.context };
    }
    /**
     * Group operations belonging to the same source together, only if that source accepts the grouped operations.
     * This grouping will be done recursively for the whole operation tree.
     * Operations annotated with sources are considered leaves in the tree.
     * @param operation An operation to group.
     * @param context The action context.
     */
    async groupOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Return operation as-is if the operation already has a single source, or if the operation has no children.
        if ((0, utils_query_operation_1.getOperationSource)(operation) ?? !('input' in operation)) {
            return operation;
        }
        // If operation has a single input, move source annotation upwards if the source can handle it.
        if (!Array.isArray(operation.input)) {
            const groupedInput = await this.groupOperation(operation.input, context);
            if (groupedInput.metadata?.scopedSource) {
                const source = (0, utils_query_operation_1.getOperationSource)(groupedInput);
                if ((0, utils_query_operation_1.doesShapeAcceptOperation)(await source.source.getSelectorShape(context), operation)) {
                    this.logDebug(context, `Hoist 1 source-specific operation into a single ${operation.type} operation for ${source.source.toString()}`);
                    (0, utils_query_operation_1.removeOperationSource)(groupedInput);
                    operation = (0, utils_query_operation_1.assignOperationSource)(operation, source);
                }
            }
            return { ...operation, input: groupedInput };
        }
        // If operation has multiple inputs, cluster source annotations.
        const inputs = await Promise.all(operation.input
            .map(subInput => this.groupOperation(subInput, context)));
        const clusters = this.clusterOperationsWithEqualSources(inputs);
        // If we just have a single cluster, move the source annotation upwards
        if (clusters.length === 1) {
            const newInputs = clusters[0];
            const source = (0, utils_query_operation_1.getOperationSource)(clusters[0][0]);
            return {
                ...await this.moveSourceAnnotationUpwardsIfPossible(operation, newInputs, source, context),
                input: newInputs,
            };
        }
        // If the number of clusters is equal to the number of original inputs, do nothing.
        if (clusters.length === inputs.length) {
            return { ...operation, input: inputs };
        }
        // If we have multiple clusters, created nested multi-operations
        let multiFactoryMethod;
        switch (operation.type) {
            case sparqlalgebrajs_1.Algebra.types.JOIN:
                multiFactoryMethod = algebraFactory.createJoin.bind(algebraFactory);
                break;
            case sparqlalgebrajs_1.Algebra.types.UNION:
                multiFactoryMethod = algebraFactory.createUnion.bind(algebraFactory);
                break;
            case sparqlalgebrajs_1.Algebra.types.ALT:
                multiFactoryMethod = algebraFactory.createAlt.bind(algebraFactory);
                break;
            case sparqlalgebrajs_1.Algebra.types.SEQ:
                multiFactoryMethod = algebraFactory.createSeq.bind(algebraFactory);
                break;
            default:
                // While LeftJoin and Minus are also multi-operations,
                // these can never occur because they only have 2 inputs,
                // so these cases will always be captured by one of the 2 if-cases above
                // (clusters.length === 1 or clusters.length === input.length)
                // In all other cases, error
                throw new Error(`Unsupported operation '${operation.type}' detected while grouping sources`);
        }
        return await this.groupOperationMulti(clusters, multiFactoryMethod, context);
    }
    async groupOperationMulti(clusters, factoryMethod, context) {
        let flatten = true;
        const nestedMerges = await Promise.all(clusters.map(async (cluster) => {
            const source = (0, utils_query_operation_1.getOperationSource)(cluster[0]);
            const merged = await this
                .moveSourceAnnotationUpwardsIfPossible(factoryMethod(cluster, true), cluster, source, context);
            if ((0, utils_query_operation_1.getOperationSource)(merged)) {
                flatten = false;
            }
            return merged;
        }));
        return factoryMethod(nestedMerges, flatten);
    }
    /**
     * Cluster the given operations by equal source annotations.
     * @param operationsIn An array of operations to cluster.
     */
    clusterOperationsWithEqualSources(operationsIn) {
        // Operations can have a source, or no source at all
        const sourceOperations = new Map();
        const sourcelessOperations = [];
        // Cluster by source
        for (const operation of operationsIn) {
            const source = (0, utils_query_operation_1.getOperationSource)(operation);
            if (source) {
                if (!sourceOperations.has(source)) {
                    sourceOperations.set(source, []);
                }
                sourceOperations.get(source).push(operation);
            }
            else {
                sourcelessOperations.push(operation);
            }
        }
        // Return clusters
        const clusters = [];
        if (sourcelessOperations.length > 0) {
            clusters.push(sourcelessOperations);
        }
        for (const [source, operations] of sourceOperations.entries()) {
            clusters.push(operations
                .map(operation => (0, utils_query_operation_1.assignOperationSource)(operation, source)));
        }
        return clusters;
    }
    /**
     * If the given source accepts the grouped operation, annotate the grouped operation with the source,
     * and remove the source annotation from the seperate input operations.
     * Otherwise, return the grouped operation unchanged.
     * @param operation A grouped operation consisting of all given input operations.
     * @param inputs An array of operations that share the same source annotation.
     * @param source The common source.
     * @param context The action context.
     */
    async moveSourceAnnotationUpwardsIfPossible(operation, inputs, source, context) {
        if (source && (0, utils_query_operation_1.doesShapeAcceptOperation)(await source.source.getSelectorShape(context), operation)) {
            this.logDebug(context, `Hoist ${inputs.length} source-specific operations into a single ${operation.type} operation for ${source.source.toString()}`);
            operation = (0, utils_query_operation_1.assignOperationSource)(operation, source);
            for (const input of inputs) {
                (0, utils_query_operation_1.removeOperationSource)(input);
            }
        }
        return operation;
    }
}
exports.ActorOptimizeQueryOperationGroupSources = ActorOptimizeQueryOperationGroupSources;
//# sourceMappingURL=ActorOptimizeQueryOperationGroupSources.js.map