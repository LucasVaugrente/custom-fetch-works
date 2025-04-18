import type { IBindingsContextMergeHandler } from '@comunica/bus-merge-bindings-context';
export declare class SetUnionBindingsContextMergeHandler implements IBindingsContextMergeHandler<any> {
    run(...inputSets: any[][]): any[];
}
