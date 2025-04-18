import type { BindingsStream } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
declare const _default: {
    toEqualBindingsStream(received: BindingsStream, actual: RDF.Bindings[], ignoreOrder?: boolean): Promise<{
        message: () => string;
        pass: boolean;
    }>;
};
export default _default;
