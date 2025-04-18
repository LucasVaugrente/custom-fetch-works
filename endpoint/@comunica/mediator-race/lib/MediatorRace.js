"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorRace = void 0;
const core_1 = require("@comunica/core");
/**
 * A mediator that picks the first actor that resolves its test.
 */
class MediatorRace extends core_1.Mediator {
    constructor(args) {
        super(args);
    }
    mediateWith(action, testResults) {
        return new Promise((resolve, reject) => {
            const errors = [];
            for (const testResult of testResults) {
                testResult.reply.then((reply) => {
                    if (reply.isPassed()) {
                        resolve((0, core_1.passTestWithSideData)(testResult.actor, reply.getSideData()));
                    }
                    else {
                        errors.push(reply.getFailMessage());
                        if (errors.length === testResults.length) {
                            resolve((0, core_1.failTest)(this.constructFailureMessage(action, errors)));
                        }
                    }
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    }
}
exports.MediatorRace = MediatorRace;
//# sourceMappingURL=MediatorRace.js.map