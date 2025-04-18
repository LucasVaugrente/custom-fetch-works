import type { Stream } from 'bunyan';
import type { IBunyanStreamProviderArgs } from './BunyanStreamProvider';
import { BunyanStreamProvider } from './BunyanStreamProvider';
/**
 * A stderr bunyan stream provider.
 */
export declare class BunyanStreamProviderStderr extends BunyanStreamProvider {
    constructor(args: IBunyanStreamProviderArgs);
    createStream(): Stream;
}
