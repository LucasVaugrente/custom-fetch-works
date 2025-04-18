#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgsRunner_1 = require("../lib/ArgsRunner");
const process = require('process/');
const argv = process.argv.slice(2);
if (argv.length === 0 || /^--?h(elp)?$/u.test(argv[0])) {
    process.stdout.write('usage: runner-cli config.json [args...]`n');
    process.exit(1);
}
const configResourceUrl = argv.shift();
// eslint-disable-next-line max-len
(0, ArgsRunner_1.runArgs)(configResourceUrl, argv, process.stdin, process.stdout, process.stderr, (code) => process.exit(code), process.env);
//# sourceMappingURL=run.js.map