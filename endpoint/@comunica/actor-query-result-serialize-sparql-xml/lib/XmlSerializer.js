"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlSerializer = void 0;
/**
 * A very simple XML serializer
 */
class XmlSerializer {
    constructor() {
        this.stack = [];
    }
    /**
     *
     * @param name should be a valid XML tag name
     * @param attributes keys should be valid attribute names
     */
    open(name, attributes) {
        const res = `${this.identation() + this.formatTag(name, attributes, 'open')}\n`;
        this.stack.push(name);
        return res;
    }
    close() {
        const name = this.stack.pop();
        if (name === undefined) {
            throw new Error('There is no tag left to close');
        }
        return `${this.identation() + this.formatTag(name, {}, 'close')}\n`;
    }
    serializeNode(node) {
        if (node.children === undefined) {
            return `${this.identation() + this.formatTag(node.name, node.attributes, 'self-closing')}\n`;
        }
        if (typeof node.children === 'string') {
            return `${this.identation() + this.formatTag(node.name, node.attributes, 'open') + this.escape(node.children) + this.formatTag(node.name, {}, 'close')}\n`;
        }
        const parts = [];
        parts.push(`${this.identation() + this.formatTag(node.name, node.attributes, 'open')}\n`);
        this.stack.push(node.name);
        for (const child of node.children) {
            parts.push(this.serializeNode(child));
        }
        this.stack.pop();
        parts.push(`${this.identation() + this.formatTag(node.name, {}, 'close')}\n`);
        return parts.join('');
    }
    identation() {
        return this.stack.map(_ => '  ').join('');
    }
    formatTag(name, attributes, state) {
        // eslint-disable-next-line ts/restrict-template-expressions
        return `<${state === 'close' ? '/' : ''}${name}${Object.entries(attributes ?? {}).map(attr => ` ${attr[0]}="${this.escape(attr[1])}"`)}${state === 'self-closing' ? '/' : ''}>`;
    }
    escape(text) {
        return text.replaceAll(/["&'<>]/gu, ((char) => {
            switch (char) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        }));
    }
}
exports.XmlSerializer = XmlSerializer;
XmlSerializer.header = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//# sourceMappingURL=XmlSerializer.js.map