import type { Stream } from 'bunyan';
import type { IBunyanStreamProviderArgs } from './BunyanStreamProvider';
import { BunyanStreamProvider } from './BunyanStreamProvider';
/**
 * A stdout bunyan stream provider.
 */
export declare class BunyanStreamProviderStdout extends BunyanStreamProvider {
    constructor(args: IBunyanStreamProviderArgs);
    createStream(): Stream;
}
