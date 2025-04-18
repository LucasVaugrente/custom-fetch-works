"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTypes = exports.ActorRdfJoinSelectivityVariableCounting = void 0;
const bus_rdf_join_selectivity_1 = require("@comunica/bus-rdf-join-selectivity");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Variable Counting RDF Join Selectivity Actor.
 * Based on the "variable counting predicates" heuristic from
 * "SPARQL basic graph pattern optimization using selectivity estimation."
 */
class ActorRdfJoinSelectivityVariableCounting extends bus_rdf_join_selectivity_1.ActorRdfJoinSelectivity {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTest)({ accuracy: 0.5 });
    }
    static getPatternCost(pattern) {
        let cost = 1;
        if (pattern.subject.termType === 'Variable') {
            cost += 4;
        }
        if (pattern.predicate.termType === 'Variable' || pattern.type === sparqlalgebrajs_1.Algebra.types.PATH) {
            cost += 1;
        }
        if (pattern.object.termType === 'Variable') {
            cost += 2;
        }
        if (pattern.graph.termType === 'Variable') {
            cost += 1;
        }
        return cost / 9;
    }
    static getJoinTypes(operation1, operation2) {
        const joinTypes = [];
        // Check operation1.subject
        if (operation1.subject.termType === 'Variable') {
            if (operation1.subject.equals(operation2.subject)) {
                joinTypes.push(JoinTypes.unboundSS);
            }
            if (operation2.type === 'pattern' && operation1.subject.equals(operation2.predicate)) {
                joinTypes.push(JoinTypes.unboundSP);
            }
            if (operation1.subject.equals(operation2.object)) {
                joinTypes.push(JoinTypes.unboundSO);
            }
            if (operation1.subject.equals(operation2.graph)) {
                joinTypes.push(JoinTypes.unboundSG);
            }
        }
        else {
            if (operation1.subject.equals(operation2.subject)) {
                joinTypes.push(JoinTypes.boundSS);
            }
            if (operation2.type === 'pattern' && operation1.subject.equals(operation2.predicate)) {
                joinTypes.push(JoinTypes.boundSP);
            }
            if (operation1.subject.equals(operation2.object)) {
                joinTypes.push(JoinTypes.boundSO);
            }
            if (operation1.subject.equals(operation2.graph)) {
                joinTypes.push(JoinTypes.boundSG);
            }
        }
        // Check operation1.predicate
        if (operation1.type === 'pattern') {
            if (operation1.predicate.termType === 'Variable') {
                if (operation1.predicate.equals(operation2.subject)) {
                    joinTypes.push(JoinTypes.unboundPS);
                }
                if (operation2.type === 'pattern' && operation1.predicate.equals(operation2.predicate)) {
                    joinTypes.push(JoinTypes.unboundPP);
                }
                if (operation1.predicate.equals(operation2.object)) {
                    joinTypes.push(JoinTypes.unboundPO);
                }
                if (operation1.predicate.equals(operation2.graph)) {
                    joinTypes.push(JoinTypes.unboundPG);
                }
            }
            else {
                if (operation1.predicate.equals(operation2.subject)) {
                    joinTypes.push(JoinTypes.boundPS);
                }
                if (operation2.type === 'pattern' && operation1.predicate.equals(operation2.predicate)) {
                    joinTypes.push(JoinTypes.boundPP);
                }
                if (operation1.predicate.equals(operation2.object)) {
                    joinTypes.push(JoinTypes.boundPO);
                }
                if (operation1.predicate.equals(operation2.graph)) {
                    joinTypes.push(JoinTypes.boundPG);
                }
            }
        }
        // Check operation1.object
        if (operation1.object.termType === 'Variable') {
            if (operation1.object.equals(operation2.subject)) {
                joinTypes.push(JoinTypes.unboundOS);
            }
            if (operation2.type === 'pattern' && operation1.object.equals(operation2.predicate)) {
                joinTypes.push(JoinTypes.unboundOP);
            }
            if (operation1.object.equals(operation2.object)) {
                joinTypes.push(JoinTypes.unboundOO);
            }
            if (operation1.object.equals(operation2.graph)) {
                joinTypes.push(JoinTypes.unboundOG);
            }
        }
        else {
            if (operation1.object.equals(operation2.subject)) {
                joinTypes.push(JoinTypes.boundOS);
            }
            if (operation2.type === 'pattern' && operation1.object.equals(operation2.predicate)) {
                joinTypes.push(JoinTypes.boundOP);
            }
            if (operation1.object.equals(operation2.object)) {
                joinTypes.push(JoinTypes.boundOO);
            }
            if (operation1.object.equals(operation2.graph)) {
                joinTypes.push(JoinTypes.boundOG);
            }
        }
        // Check operation1.graph
        if (operation1.graph.termType === 'Variable') {
            if (operation1.graph.equals(operation2.subject)) {
                joinTypes.push(JoinTypes.unboundGS);
            }
            if (operation2.type === 'pattern' && operation1.graph.equals(operation2.predicate)) {
                joinTypes.push(JoinTypes.unboundGP);
            }
            if (operation1.graph.equals(operation2.object)) {
                joinTypes.push(JoinTypes.unboundGO);
            }
            if (operation1.graph.equals(operation2.graph)) {
                joinTypes.push(JoinTypes.unboundGG);
            }
        }
        else {
            if (operation1.graph.equals(operation2.subject)) {
                joinTypes.push(JoinTypes.boundGS);
            }
            if (operation2.type === 'pattern' && operation1.graph.equals(operation2.predicate)) {
                joinTypes.push(JoinTypes.boundGP);
            }
            if (operation1.graph.equals(operation2.object)) {
                joinTypes.push(JoinTypes.boundGO);
            }
            if (operation1.graph.equals(operation2.graph)) {
                joinTypes.push(JoinTypes.boundGG);
            }
        }
        return joinTypes;
    }
    static getOperationsPairwiseJoinCost(operation1, operation2) {
        let cost = ActorRdfJoinSelectivityVariableCounting.MAX_PAIRWISE_COST;
        for (const joinType of ActorRdfJoinSelectivityVariableCounting.getJoinTypes(operation1, operation2)) {
            switch (joinType) {
                case JoinTypes.boundSS:
                    cost -= 2 * 2;
                    break;
                case JoinTypes.boundSP:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundSO:
                    cost -= 1 * 2;
                    break;
                case JoinTypes.boundSG:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundPS:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundPP:
                    // Special case: patterns with equal (bound) predicates have the highest cost
                    return 1;
                case JoinTypes.boundPO:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundPG:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundOS:
                    cost -= 1 * 2;
                    break;
                case JoinTypes.boundOP:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundOO:
                    cost -= 1 * 2;
                    break;
                case JoinTypes.boundOG:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundGS:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundGP:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundGO:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.boundGG:
                    cost -= 3 * 2;
                    break;
                case JoinTypes.unboundSS:
                    cost -= 2;
                    break;
                case JoinTypes.unboundSP:
                    cost -= 3;
                    break;
                case JoinTypes.unboundSO:
                    cost -= 1;
                    break;
                case JoinTypes.unboundSG:
                    cost -= 3;
                    break;
                case JoinTypes.unboundPS:
                    cost -= 3;
                    break;
                case JoinTypes.unboundPP:
                    cost -= 3;
                    break;
                case JoinTypes.unboundPO:
                    cost -= 3;
                    break;
                case JoinTypes.unboundPG:
                    cost -= 3;
                    break;
                case JoinTypes.unboundOS:
                    cost -= 1;
                    break;
                case JoinTypes.unboundOP:
                    cost -= 3;
                    break;
                case JoinTypes.unboundOO:
                    cost -= 1;
                    break;
                case JoinTypes.unboundOG:
                    cost -= 3;
                    break;
                case JoinTypes.unboundGS:
                    cost -= 3;
                    break;
                case JoinTypes.unboundGP:
                    cost -= 3;
                    break;
                case JoinTypes.unboundGO:
                    cost -= 3;
                    break;
                case JoinTypes.unboundGG:
                    cost -= 3;
                    break;
            }
        }
        return cost / ActorRdfJoinSelectivityVariableCounting.MAX_PAIRWISE_COST;
    }
    static getOperationsJoinCost(operations) {
        // Determine all operations that select values (patterns and paths)
        const patterns = [];
        for (const operation of operations) {
            sparqlalgebrajs_1.Util.recurseOperation(operation, {
                [sparqlalgebrajs_1.Algebra.types.PATTERN](pattern) {
                    patterns.push(pattern);
                    return false;
                },
                [sparqlalgebrajs_1.Algebra.types.PATH](path) {
                    patterns.push(path);
                    return false;
                },
            });
        }
        // Determine pairwise costs
        let totalCost = 0;
        let costEntries = 0;
        for (const pattern1 of patterns) {
            for (const pattern2 of patterns) {
                if (pattern1 !== pattern2) {
                    totalCost += ActorRdfJoinSelectivityVariableCounting.getOperationsPairwiseJoinCost(pattern1, pattern2);
                    costEntries++;
                }
            }
        }
        // If there are no overlapping patterns, the cost is 1
        if (costEntries === 0) {
            return 1;
        }
        // Combine all pairwise costs, and multiply with costs of each pattern separately
        return totalCost / costEntries * patterns
            .reduce((factor, pattern) => factor * ActorRdfJoinSelectivityVariableCounting.getPatternCost(pattern), 1);
    }
    async run(action) {
        if (action.entries.length <= 1) {
            return { selectivity: 1 };
        }
        return {
            selectivity: ActorRdfJoinSelectivityVariableCounting
                .getOperationsJoinCost(action.entries.map(entry => entry.operation)),
        };
    }
}
exports.ActorRdfJoinSelectivityVariableCounting = ActorRdfJoinSelectivityVariableCounting;
// Calculated as sum of unbound join type costs times 2 (best-case)
ActorRdfJoinSelectivityVariableCounting.MAX_PAIRWISE_COST = 41 * 2;
var JoinTypes;
(function (JoinTypes) {
    JoinTypes[JoinTypes["boundSS"] = 0] = "boundSS";
    JoinTypes[JoinTypes["boundSP"] = 1] = "boundSP";
    JoinTypes[JoinTypes["boundSO"] = 2] = "boundSO";
    JoinTypes[JoinTypes["boundSG"] = 3] = "boundSG";
    JoinTypes[JoinTypes["boundPS"] = 4] = "boundPS";
    JoinTypes[JoinTypes["boundPP"] = 5] = "boundPP";
    JoinTypes[JoinTypes["boundPO"] = 6] = "boundPO";
    JoinTypes[JoinTypes["boundPG"] = 7] = "boundPG";
    JoinTypes[JoinTypes["boundOS"] = 8] = "boundOS";
    JoinTypes[JoinTypes["boundOP"] = 9] = "boundOP";
    JoinTypes[JoinTypes["boundOO"] = 10] = "boundOO";
    JoinTypes[JoinTypes["boundOG"] = 11] = "boundOG";
    JoinTypes[JoinTypes["boundGS"] = 12] = "boundGS";
    JoinTypes[JoinTypes["boundGP"] = 13] = "boundGP";
    JoinTypes[JoinTypes["boundGO"] = 14] = "boundGO";
    JoinTypes[JoinTypes["boundGG"] = 15] = "boundGG";
    JoinTypes[JoinTypes["unboundSS"] = 16] = "unboundSS";
    JoinTypes[JoinTypes["unboundSP"] = 17] = "unboundSP";
    JoinTypes[JoinTypes["unboundSO"] = 18] = "unboundSO";
    JoinTypes[JoinTypes["unboundSG"] = 19] = "unboundSG";
    JoinTypes[JoinTypes["unboundPS"] = 20] = "unboundPS";
    JoinTypes[JoinTypes["unboundPP"] = 21] = "unboundPP";
    JoinTypes[JoinTypes["unboundPO"] = 22] = "unboundPO";
    JoinTypes[JoinTypes["unboundPG"] = 23] = "unboundPG";
    JoinTypes[JoinTypes["unboundOS"] = 24] = "unboundOS";
    JoinTypes[JoinTypes["unboundOP"] = 25] = "unboundOP";
    JoinTypes[JoinTypes["unboundOO"] = 26] = "unboundOO";
    JoinTypes[JoinTypes["unboundOG"] = 27] = "unboundOG";
    JoinTypes[JoinTypes["unboundGS"] = 28] = "unboundGS";
    JoinTypes[JoinTypes["unboundGP"] = 29] = "unboundGP";
    JoinTypes[JoinTypes["unboundGO"] = 30] = "unboundGO";
    JoinTypes[JoinTypes["unboundGG"] = 31] = "unboundGG";
})(JoinTypes || (exports.JoinTypes = JoinTypes = {}));
//# sourceMappingURL=ActorRdfJoinSelectivityVariableCounting.js.map