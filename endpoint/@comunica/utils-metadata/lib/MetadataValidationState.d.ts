import type { IMetadataValidationState } from '@comunica/types';
/**
 * Reusable implementation for metadata validation states.
 */
export declare class MetadataValidationState implements IMetadataValidationState {
    private readonly invalidateListeners;
    valid: boolean;
    addInvalidateListener(listener: () => void): void;
    invalidate(): void;
}
