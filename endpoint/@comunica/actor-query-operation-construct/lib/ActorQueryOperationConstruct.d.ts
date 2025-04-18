import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Construct Query Operation Actor.
 */
export declare class ActorQueryOperationConstruct extends ActorQueryOperationTypedMediated<Algebra.Construct> {
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    /**
     * Find all variables in a list of triple patterns.
     * @param {Algebra.Pattern[]} patterns An array of triple patterns.
     * @return {RDF.Variable[]} The variables in the triple patterns.
     */
    static getVariables(patterns: RDF.BaseQuad[]): RDF.Variable[];
    testOperation(_operation: Algebra.Construct, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operationOriginal: Algebra.Construct, context: IActionContext): Promise<IQueryOperationResult>;
}
