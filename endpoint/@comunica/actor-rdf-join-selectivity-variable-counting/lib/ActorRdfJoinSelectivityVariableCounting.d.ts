import type { IActionRdfJoinSelectivity, IActorRdfJoinSelectivityOutput } from '@comunica/bus-rdf-join-selectivity';
import { ActorRdfJoinSelectivity } from '@comunica/bus-rdf-join-selectivity';
import type { IActorArgs, TestResult } from '@comunica/core';
import type { IMediatorTypeAccuracy } from '@comunica/mediatortype-accuracy';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Variable Counting RDF Join Selectivity Actor.
 * Based on the "variable counting predicates" heuristic from
 * "SPARQL basic graph pattern optimization using selectivity estimation."
 */
export declare class ActorRdfJoinSelectivityVariableCounting extends ActorRdfJoinSelectivity {
    static MAX_PAIRWISE_COST: number;
    constructor(args: IActorArgs<IActionRdfJoinSelectivity, IMediatorTypeAccuracy, IActorRdfJoinSelectivityOutput>);
    test(_action: IActionRdfJoinSelectivity): Promise<TestResult<IMediatorTypeAccuracy>>;
    static getPatternCost(pattern: Algebra.Pattern | Algebra.Path): number;
    static getJoinTypes(operation1: Algebra.Pattern | Algebra.Path, operation2: Algebra.Pattern | Algebra.Path): JoinTypes[];
    static getOperationsPairwiseJoinCost(operation1: Algebra.Pattern | Algebra.Path, operation2: Algebra.Pattern | Algebra.Path): number;
    static getOperationsJoinCost(operations: Algebra.Operation[]): number;
    run(action: IActionRdfJoinSelectivity): Promise<IActorRdfJoinSelectivityOutput>;
}
export declare enum JoinTypes {
    boundSS = 0,
    boundSP = 1,
    boundSO = 2,
    boundSG = 3,
    boundPS = 4,
    boundPP = 5,
    boundPO = 6,
    boundPG = 7,
    boundOS = 8,
    boundOP = 9,
    boundOO = 10,
    boundOG = 11,
    boundGS = 12,
    boundGP = 13,
    boundGO = 14,
    boundGG = 15,
    unboundSS = 16,
    unboundSP = 17,
    unboundSO = 18,
    unboundSG = 19,
    unboundPS = 20,
    unboundPP = 21,
    unboundPO = 22,
    unboundPG = 23,
    unboundOS = 24,
    unboundOP = 25,
    unboundOO = 26,
    unboundOG = 27,
    unboundGS = 28,
    unboundGP = 29,
    unboundGO = 30,
    unboundGG = 31
}
