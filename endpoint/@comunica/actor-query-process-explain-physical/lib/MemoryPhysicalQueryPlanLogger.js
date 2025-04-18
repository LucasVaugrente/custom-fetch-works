"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToString = exports.MemoryPhysicalQueryPlanLogger = void 0;
const rdf_string_1 = require("rdf-string");
/**
 * A physical query plan logger that stores everything in memory.
 */
class MemoryPhysicalQueryPlanLogger {
    constructor() {
        this.planNodes = new Map();
    }
    logOperation(logicalOperator, physicalOperator, node, parentNode, actor, metadata) {
        const planNode = {
            actor,
            logicalOperator,
            physicalOperator,
            rawNode: node,
            children: [],
            metadata,
        };
        this.planNodes.set(node, planNode);
        if (this.rootNode) {
            if (!parentNode) {
                throw new Error(`Detected more than one parent-less node`);
            }
            const planParentNode = this.planNodes.get(parentNode);
            if (!planParentNode) {
                throw new Error(`Could not find parent node`);
            }
            planParentNode.children.push(planNode);
        }
        else {
            if (parentNode) {
                throw new Error(`No root node has been set yet, while a parent is being referenced`);
            }
            this.rootNode = planNode;
        }
    }
    stashChildren(node, filter) {
        const planNode = this.planNodes.get(node);
        if (!planNode) {
            throw new Error(`Could not find plan node`);
        }
        planNode.children = filter ? planNode.children.filter(filter) : [];
    }
    unstashChild(node, parentNode) {
        const planNode = this.planNodes.get(node);
        if (planNode) {
            const planParentNode = this.planNodes.get(parentNode);
            if (!planParentNode) {
                throw new Error(`Could not find plan parent node`);
            }
            planParentNode.children.push(planNode);
        }
    }
    appendMetadata(node, metadata) {
        const planNode = this.planNodes.get(node);
        if (planNode) {
            planNode.metadata = {
                ...planNode.metadata,
                ...metadata,
            };
        }
    }
    toJson() {
        return this.rootNode ? this.planNodeToJson(this.rootNode) : {};
    }
    planNodeToJson(node) {
        const data = {
            logical: node.logicalOperator,
            physical: node.physicalOperator,
            ...this.getLogicalMetadata(node.rawNode),
            ...this.compactMetadata(node.metadata),
        };
        if (node.children.length > 0) {
            data.children = node.children.map(child => this.planNodeToJson(child));
        }
        // Special case: compact children for bind joins.
        if (data.physical === 'bind' && data.children) {
            // Group children by query plan format
            const childrenGrouped = {};
            for (const child of data.children) {
                const lastSubChild = child.children?.at(-1) ?? child;
                const key = this.getPlanHash(lastSubChild).join(',');
                if (!childrenGrouped[key]) {
                    childrenGrouped[key] = [];
                }
                childrenGrouped[key].push(child);
            }
            // Compact query plan occurrences
            const childrenCompact = [];
            for (const children of Object.values(childrenGrouped)) {
                childrenCompact.push({
                    occurrences: children.length,
                    firstOccurrence: children[0],
                });
            }
            // Replace children with compacted representation
            data.childrenCompact = childrenCompact;
            delete data.children;
        }
        return data;
    }
    getPlanHash(node) {
        let entries = [`${node.logical}-${node.physical}`];
        if (node.children) {
            entries = [
                ...entries,
                ...node.children.flatMap(child => this.getPlanHash(child)),
            ];
        }
        else if (node.childrenCompact) {
            entries = [
                ...entries,
                ...node.childrenCompact.flatMap(child => this.getPlanHash(child.firstOccurrence)),
            ];
        }
        return entries;
    }
    compactMetadata(metadata) {
        return Object.fromEntries(Object.entries(metadata)
            .map(([key, value]) => [key, this.compactMetadataValue(value)]));
    }
    compactMetadataValue(value) {
        return value && typeof value === 'object' && 'termType' in value ? this.getLogicalMetadata(value) : value;
    }
    getLogicalMetadata(rawNode) {
        const data = {};
        if ('type' in rawNode) {
            const operation = rawNode;
            if (operation.metadata?.scopedSource) {
                data.source = operation.metadata.scopedSource.source.toString();
            }
            // eslint-disable-next-line ts/switch-exhaustiveness-check
            switch (operation.type) {
                case 'pattern':
                    data.pattern = this.quadToString(operation);
                    break;
                case 'project':
                    data.variables = operation.variables.map(variable => variable.value);
                    break;
            }
        }
        return data;
    }
    quadToString(quad) {
        return `${(0, rdf_string_1.termToString)(quad.subject)} ${(0, rdf_string_1.termToString)(quad.predicate)} ${(0, rdf_string_1.termToString)(quad.object)}${quad.graph.termType === 'DefaultGraph' ? '' : ` ${(0, rdf_string_1.termToString)(quad.graph)}`}`;
    }
    toCompactString() {
        const node = this.toJson();
        const lines = [];
        const sources = new Map();
        if ('logical' in node) {
            this.nodeToCompactString(lines, sources, '', node);
        }
        else {
            lines.push('Empty');
        }
        if (sources.size > 0) {
            lines.push('');
            lines.push('sources:');
            for (const [key, id] of sources.entries()) {
                lines.push(`  ${id}: ${key}`);
            }
        }
        return lines.join('\n');
    }
    nodeToCompactString(lines, sources, indent, node, metadata) {
        let sourceId;
        if (node.source) {
            sourceId = sources.get(node.source);
            if (sourceId === undefined) {
                sourceId = sources.size;
                sources.set(node.source, sourceId);
            }
        }
        lines.push(`${indent}${node.logical}${node.physical ? `(${node.physical})` : ''}${node.pattern ? ` (${node.pattern})` : ''}${node.variables ? ` (${node.variables.join(',')})` : ''}${node.bindOperation ? ` bindOperation:(${node.bindOperation.pattern}) bindCardEst:${node.bindOperationCardinality.type === 'estimate' ? '~' : ''}${numberToString(node.bindOperationCardinality.value)}` : ''}${node.cardinality ? ` cardEst:${node.cardinality.type === 'estimate' ? '~' : ''}${numberToString(node.cardinality.value)}` : ''}${node.source ? ` src:${sourceId}` : ''}${node.cardinalityReal ? ` cardReal:${node.cardinalityReal}` : ''}${node.timeSelf ? ` timeSelf:${numberToString(node.timeSelf)}ms` : ''}${node.timeLife ? ` timeLife:${numberToString(node.timeLife)}ms` : ''}${metadata ? ` ${metadata}` : ''}`);
        for (const child of node.children ?? []) {
            this.nodeToCompactString(lines, sources, `${indent}  `, child);
        }
        for (const child of node.childrenCompact ?? []) {
            this.nodeToCompactString(lines, sources, `${indent}  `, child.firstOccurrence, `compacted-occurrences:${child.occurrences}`);
        }
    }
}
exports.MemoryPhysicalQueryPlanLogger = MemoryPhysicalQueryPlanLogger;
function numberToString(value) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 });
}
exports.numberToString = numberToString;
//# sourceMappingURL=MemoryPhysicalQueryPlanLogger.js.map