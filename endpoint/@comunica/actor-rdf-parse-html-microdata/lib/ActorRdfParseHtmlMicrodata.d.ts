import type { IActionRdfParseHtml, IActorRdfParseHtmlArgs, IActorRdfParseHtmlOutput } from '@comunica/bus-rdf-parse-html';
import { ActorRdfParseHtml } from '@comunica/bus-rdf-parse-html';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Microdata RDF Parse Html Actor.
 */
export declare class ActorRdfParseHtmlMicrodata extends ActorRdfParseHtml {
    constructor(args: IActorRdfParseHtmlArgs);
    test(_action: IActionRdfParseHtml): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfParseHtml): Promise<IActorRdfParseHtmlOutput>;
}
