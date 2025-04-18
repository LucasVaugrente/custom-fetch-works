import type { ICliArgsHandler } from '@comunica/types';
import type { Argv } from 'yargs';
/**
 * CLI arguments handler that handles options for HTTP servers.
 */
export declare class CliArgsHandlerHttp implements ICliArgsHandler {
    populateYargs(argumentsBuilder: Argv<any>): Argv<any>;
    handleArgs(_args: Record<string, any>, _context: Record<string, any>): Promise<void>;
}
