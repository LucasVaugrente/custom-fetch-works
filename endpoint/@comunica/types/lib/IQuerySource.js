"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----- Examples of FragmentSelectorShapes -----
// const AF = new Factory();
// const DF = new DataFactory();
// const shapeTpf: FragmentSelectorShape = {
//   type: 'operation',
//   operation: { pattern: AF.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o')) },
//   variablesOptional: [
//     DF.variable('s'),
//     DF.variable('p'),
//     DF.variable('o'),
//   ],
// };
//
// const shapeQpf: FragmentSelectorShape = {
//   type: 'operation',
//   operation: { pattern: AF.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o'), DF.variable('g')) },
//   variablesOptional: [
//     DF.variable('s'),
//     DF.variable('p'),
//     DF.variable('o'),
//     DF.variable('g'),
//   ],
// };
//
// const shapeBrTpf: FragmentSelectorShape = {
//   type: 'operation',
//   operation: { pattern: AF.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o')) },
//   variablesOptional: [
//     DF.variable('s'),
//     DF.variable('p'),
//     DF.variable('o'),
//   ],
//   addBindings: true,
// };
//
// const shapeSparqlEp: FragmentSelectorShape = { // Same as SaGe
//   type: 'disjunction',
//   children: [
//     {
//       type: 'operation',
//       operation: { type: Algebra.types.PROJECT },
//     },
//     {
//       type: 'operation',
//       operation: { type: Algebra.types.CONSTRUCT },
//     },
//     {
//       type: 'operation',
//       operation: { type: Algebra.types.DESCRIBE },
//     },
//     {
//       type: 'operation',
//       operation: { type: Algebra.types.ASK },
//     },
//     {
//       type: 'operation',
//       operation: { type: Algebra.types.COMPOSITE_UPDATE },
//     },
//   ],
// };
//
// // Example of request:
// //   Find ?s matching "?s dbo:country dbr:norway. ?s dbo:award ?o2. ?s dbo:birthDate ?o3."
// const shapeSpf: FragmentSelectorShape = {
//   type: 'operation',
//   operation: { type: Algebra.types.BGP },
//   scopedVariables: [
//     DF.variable('s'),
//   ],
//   children: [
//     {
//       type: 'arity',
//       min: 1,
//       max: Number.POSITIVE_INFINITY,
//       child: {
//         type: 'operation',
//         operation: { pattern: AF.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o')) },
//         variablesOptional: [
//           DF.variable('p'),
//           DF.variable('o'),
//         ],
//       },
//     },
//   ],
//   addBindings: true,
// };
//
// // Example of requests:
// //   - brTPF
// //   - Find all ?s and ?o matching "?s db:country ?o"
// const shapeSmartKg: FragmentSelectorShape = {
//   type: 'disjunction',
//   children: [
//     {
//       type: 'operation',
//       operation: { pattern: AF.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o')) },
//       variablesOptional: [
//         DF.variable('s'),
//         DF.variable('p'),
//         DF.variable('o'),
//       ],
//       addBindings: true,
//     },
//     {
//       type: 'operation',
//       operation: { type: Algebra.types.BGP },
//       children: [
//         {
//           type: 'arity',
//           min: 1,
//           max: Number.POSITIVE_INFINITY,
//           child: {
//             type: 'operation',
//             operation: { pattern: AF.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o')) },
//             variablesRequired: [
//               DF.variable('p'),
//             ],
//           },
//         },
//       ],
//     },
//   ],
// };
//# sourceMappingURL=IQuerySource.js.map