import type { ILink } from '@comunica/types';
import type { ILinkQueue } from './ILinkQueue';
/**
 * A link queue that wraps a given link queue.
 */
export declare class LinkQueueWrapper<T extends ILinkQueue = ILinkQueue> implements ILinkQueue {
    protected readonly linkQueue: T;
    constructor(linkQueue: T);
    push(link: ILink, parent: ILink): boolean;
    getSize(): number;
    isEmpty(): boolean;
    pop(): ILink | undefined;
    peek(): ILink | undefined;
}
