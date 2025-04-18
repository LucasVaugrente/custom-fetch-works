/**
 * A very simple XML serializer
 */
export declare class XmlSerializer {
    private readonly stack;
    static header: string;
    constructor();
    /**
     *
     * @param name should be a valid XML tag name
     * @param attributes keys should be valid attribute names
     */
    open(name: string, attributes?: Record<string, string>): string;
    close(): string;
    serializeNode(node: IXmlNode): string;
    private identation;
    private formatTag;
    private escape;
}
export interface IXmlNode {
    name: string;
    attributes?: Record<string, string>;
    children?: (IXmlNode[]) | string;
}
