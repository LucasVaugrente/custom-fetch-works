"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runArgsInProcessStatic = exports.runArgsInProcess = exports.runArgs = void 0;
const core_1 = require("@comunica/core");
const runner_1 = require("@comunica/runner");
const process = require('process/');
function runArgs(configResourceUrl, argv, stdin, stdout, stderr, exit, env, runnerUri, properties, context) {
    (0, runner_1.run)(configResourceUrl, {
        argv,
        env,
        stdin: stdin,
        context: context ?? new core_1.ActionContext(),
    }, runnerUri, properties)
        .then((results) => {
        // eslint-disable-next-line unicorn/no-array-for-each
        results.forEach((result) => {
            if (result.stdout) {
                result.stdout.on('error', (error) => {
                    stderr.write(errorToString(error, argv));
                    exit(1);
                });
                result.stdout.pipe(stdout);
                result.stdout.on('end', () => {
                    exit(0);
                });
            }
            if (result.stderr) {
                result.stderr.on('error', (error) => {
                    stderr.write(errorToString(error, argv));
                    exit(1);
                });
                result.stderr.pipe(stderr);
                result.stderr.on('end', () => {
                    exit(1);
                });
            }
        });
    }).catch((error) => {
        stderr.write(errorToString(error, argv));
        exit(1);
    });
}
exports.runArgs = runArgs;
function runArgsInProcess(moduleRootPath, defaultConfigPath, options) {
    const argv = process.argv.slice(2);
    runArgs(process.env.COMUNICA_CONFIG ?? defaultConfigPath, argv, process.stdin, process.stdout, process.stderr, (code) => {
        if (options?.onDone) {
            options?.onDone();
        }
        if (code !== 0) {
            process.exit(code);
        }
    }, process.env, undefined, {
        mainModulePath: moduleRootPath,
    }, options?.context);
}
exports.runArgsInProcess = runArgsInProcess;
function runArgsInProcessStatic(actor, options) {
    const argv = process.argv.slice(2);
    actor.run({ argv, env: process.env, stdin: process.stdin, context: options?.context })
        .then((result) => {
        if (result.stdout) {
            result.stdout.on('error', (error) => {
                process.stderr.write(errorToString(error, argv));
                if (options?.onDone) {
                    options?.onDone();
                }
                process.exit(1);
            });
            result.stdout.pipe(process.stdout);
            result.stdout.on('end', () => {
                if (options?.onDone) {
                    options?.onDone();
                }
            });
        }
        if (result.stderr) {
            result.stderr.on('error', (error) => {
                process.stderr.write(errorToString(error, argv));
                if (options?.onDone) {
                    options?.onDone();
                }
                process.exit(1);
            });
            result.stderr.pipe(process.stderr);
            result.stderr.on('end', () => {
                if (options?.onDone) {
                    options?.onDone();
                }
                process.exit(1);
            });
        }
    })
        .catch((error) => {
        process.stderr.write(errorToString(error, argv));
        if (options?.onDone) {
            options?.onDone();
        }
        process.exit(1);
    });
}
exports.runArgsInProcessStatic = runArgsInProcessStatic;
function errorToString(error, argv) {
    return argv.includes('--showStackTrace') ? `${error.stack}\n` : `${error.message}\n`;
}
/* eslint-enable unicorn/no-process-exit */
//# sourceMappingURL=ArgsRunner.js.map