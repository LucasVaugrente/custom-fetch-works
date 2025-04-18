import type { GeneralSuperTypeDict, ISuperTypeProvider, TermExpression, TermType } from '@comunica/types';
import type { ArgumentType } from '../functions/OverloadTree';
import type { KnownLiteralTypes } from './Consts';
import { TypeAlias } from './Consts';
export type OverrideType = KnownLiteralTypes | 'term';
/**
 * Types that are not mentioned just map to 'term'.
 * When editing this, make sure type promotion and substitution don't start interfering.
 * e.g. when saying something like string -> stringly -> anyUri -> term.
 * This would make substitution on types that promote to each other possible. We and the specs don't want that!
 * A DAG will be created based on this. Make sure it doesn't have any cycles!
 */
export declare const extensionTableInput: Record<KnownLiteralTypes, OverrideType>;
type SuperTypeDict = Record<KnownLiteralTypes, number> & {
    __depth: number;
};
type SuperTypeDictTable = Record<KnownLiteralTypes, SuperTypeDict>;
export declare const superTypeDictTable: SuperTypeDictTable;
/**
 * This will return the super types of a type and cache them.
 * @param type IRI we will decide the super types of.
 * @param openWorldType the enabler that provides a way to find super types.
 */
export declare function getSuperTypes(type: string, openWorldType: ISuperTypeProvider): GeneralSuperTypeDict;
export declare function extensionTableInit(): void;
export declare const typeAliasCheck: Record<TypeAlias, boolean>;
export declare function asTypeAlias(type: string): TypeAlias | undefined;
export declare function asKnownLiteralType(type: string): KnownLiteralTypes | undefined;
export declare function asOverrideType(type: string): OverrideType | undefined;
export declare function asGeneralType(type: string): 'term' | TermType | undefined;
/**
 * Internal type of @see isSubTypeOf This only takes knownTypes but doesn't need an enabler
 */
export declare function isInternalSubType(baseType: OverrideType, argumentType: KnownLiteralTypes): boolean;
/**
 * This function can be used to check the base type is a restriction on a type in the dict.
 * If we want to check if type x is a restriction on string we do this by calling:
 * 'http://www.w3.org/2001/XMLSchema#string' in getSuperTypeDict(X, superTypeProvider)
 * @param baseType
 * @param superTypeProvider
 */
export declare function getSuperTypeDict(baseType: string, superTypeProvider: ISuperTypeProvider): GeneralSuperTypeDict;
/**
 * This function needs to be O(1)! The execution time of this function is vital!
 * We define typeA isSubtypeOf typeA as true.
 * If you find yourself using this function a lot (e.g. in a case) please use getSuperTypeDict instead.
 * @param baseType type you want to provide.
 * @param argumentType type you want to provide @param baseType to.
 * @param superTypeProvider the enabler to discover super types of unknown types.
 */
export declare function isSubTypeOf(baseType: string, argumentType: KnownLiteralTypes, superTypeProvider: ISuperTypeProvider): boolean;
export declare const typePromotion: Partial<Record<ArgumentType, {
    typeToPromote: KnownLiteralTypes;
    conversionFunction: (arg: TermExpression) => TermExpression;
}[]>>;
export {};
