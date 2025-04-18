import type { IActionRdfParseHtml, IActorRdfParseHtmlOutput, IActorRdfParseHtmlArgs } from '@comunica/bus-rdf-parse-html';
import { ActorRdfParseHtml } from '@comunica/bus-rdf-parse-html';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica RDFa RDF Parse Html Actor.
 */
export declare class ActorRdfParseHtmlRdfa extends ActorRdfParseHtml {
    constructor(args: IActorRdfParseHtmlArgs);
    test(_action: IActionRdfParseHtml): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfParseHtml): Promise<IActorRdfParseHtmlOutput>;
}
