import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Slice Query Operation Actor.
 */
export declare class ActorQueryOperationSlice extends ActorQueryOperationTypedMediated<Algebra.Slice> {
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    testOperation(_operation: Algebra.Slice, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Slice, context: IActionContext): Promise<IQueryOperationResult>;
    private sliceStream;
    private sliceMetadata;
}
