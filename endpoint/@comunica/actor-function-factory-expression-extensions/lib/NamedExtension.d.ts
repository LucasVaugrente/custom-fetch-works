import { ExpressionFunctionBase } from '@comunica/bus-function-factory/lib/implementation/Core';
import type { AsyncExtensionFunction } from '@comunica/types';
interface NamedExtensionArgs {
    operator: string;
    functionDefinition: AsyncExtensionFunction;
}
export declare class NamedExtension extends ExpressionFunctionBase {
    constructor({ operator, functionDefinition }: NamedExtensionArgs);
}
export {};
