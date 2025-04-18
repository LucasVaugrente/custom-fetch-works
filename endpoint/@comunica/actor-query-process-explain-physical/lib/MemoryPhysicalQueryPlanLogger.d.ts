import type { IPhysicalQueryPlanLogger, IPlanNode } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
/**
 * A physical query plan logger that stores everything in memory.
 */
export declare class MemoryPhysicalQueryPlanLogger implements IPhysicalQueryPlanLogger {
    private readonly planNodes;
    private rootNode;
    constructor();
    logOperation(logicalOperator: string, physicalOperator: string | undefined, node: any, parentNode: any, actor: string, metadata: any): void;
    stashChildren(node: any, filter?: (planNodeFilter: IPlanNode) => boolean): void;
    unstashChild(node: any, parentNode: any): void;
    appendMetadata(node: any, metadata: any): void;
    toJson(): IPlanNodeJson | Record<string, never>;
    private planNodeToJson;
    private getPlanHash;
    private compactMetadata;
    private compactMetadataValue;
    private getLogicalMetadata;
    private quadToString;
    toCompactString(): string;
    nodeToCompactString(lines: string[], sources: Map<string, number>, indent: string, node: IPlanNodeJson, metadata?: string): void;
}
export declare function numberToString(value: number): string;
interface IPlanNodeJson extends IPlanNodeJsonLogicalMetadata {
    logical: string;
    physical?: string;
    [metadataKey: string]: any;
    children?: IPlanNodeJson[];
    childrenCompact?: IPlanNodeJsonChildCompact[];
}
interface IPlanNodeJsonChildCompact {
    occurrences: number;
    firstOccurrence: IPlanNodeJson;
}
interface IPlanNodeJsonLogicalMetadata {
    pattern?: string;
    source?: string;
    variables?: string[];
    cardinality?: RDF.QueryResultCardinality;
}
export {};
