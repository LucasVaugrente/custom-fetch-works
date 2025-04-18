"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.instantiateComponent = void 0;
const componentsjs_1 = require("componentsjs");
const process = require('process/');
/**
 * Helper functions to setup instances from a given comunica config file.
 * This config file must be understandable by the Components.js framework.
 *
 * @link https://www.npmjs.com/package/lsd-components
 */
/**
 * Instantiate the given component.
 *
 * @param {string} configResourceUrl    The URL or local path to a Components.js config file.
 * @param {string} instanceUri          A URI identifying the component to instantiate.
 * @param {ISetupProperties} properties Properties to pass to the Components.js manager.
 * @return {Promise<any>}               A promise that resolves to the instance.
 */
async function instantiateComponent(configResourceUrl, instanceUri, properties) {
    // Handle optional arguments
    if (!properties) {
        properties = {};
    }
    const propertiesActual = { mainModulePath: process.cwd(), ...properties };
    // Instantiate the given config file
    const manager = await componentsjs_1.ComponentsManager.build(propertiesActual);
    await manager.configRegistry.register(configResourceUrl);
    return await manager.instantiate(instanceUri);
}
exports.instantiateComponent = instantiateComponent;
/**
 * Run the given config file.
 * This will initialize the runner, and deinitialize it once it has finished
 *
 * @param {string} configResourceUrl    The URL or local path to a Components.js config file.
 * @param {any[]} action                The action to pass to the runner.
 * @param {string} runnerUri            An optional URI identifying the runner.
 * @param {ISetupProperties} properties Properties to pass to the Components.js loader.
 * @return {Promise<any>}               A promise that resolves when the runner has been initialized.
 */
async function run(configResourceUrl, action, runnerUri, properties) {
    if (!runnerUri) {
        runnerUri = 'urn:comunica:default:Runner';
    }
    const runner = await instantiateComponent(configResourceUrl, runnerUri, properties);
    return await runner.run(action);
}
exports.run = run;
//# sourceMappingURL=Setup.js.map