import type * as RDF from '@rdfjs/types';
declare const _default: {
    toEqualBindingsArray(received: RDF.Bindings[], actual: RDF.Bindings[], ignoreOrder?: boolean): {
        message: () => string;
        pass: boolean;
    };
};
export default _default;
