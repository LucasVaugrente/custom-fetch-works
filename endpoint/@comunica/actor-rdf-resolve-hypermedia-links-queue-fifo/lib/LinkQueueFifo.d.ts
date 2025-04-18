import type { ILinkQueue } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import type { ILink } from '@comunica/types';
/**
 * A link queue in FIFO (first-in first-out) order.
 */
export declare class LinkQueueFifo implements ILinkQueue {
    readonly links: ILink[];
    push(link: ILink): boolean;
    getSize(): number;
    isEmpty(): boolean;
    pop(): ILink | undefined;
    peek(): ILink | undefined;
}
