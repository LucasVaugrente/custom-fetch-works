#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_init_query_1 = require("@comunica/actor-init-query");
const process = require('process/');
// eslint-disable-next-line node/no-path-concat
const defaultConfigPath = `${__dirname}/../config/config-default.json`;
// eslint-disable-next-line node/no-path-concat
actor_init_query_1.HttpServiceSparqlEndpoint.runArgsInProcess(process.argv.slice(2), process.stdout, process.stderr, `${__dirname}/../`, process.env, defaultConfigPath, code => process.exit(code))
    .catch(error => process.stderr.write(`${error.message}/n`));
//# sourceMappingURL=http.js.map