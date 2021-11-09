import {logger} from '@appium/support';

/**
 * @abstract
 */
export default class BasePlugin {
  /**
   * Plugins can define new methods for the Appium server to map to command names, of the same
   * format as used in Appium's routes.js, for example, this would be a valid newMethodMap:
   * @type {Record<string,import('express').IRoute}
   * @example
   * {
   *   '/session/:sessionId/new_method': {
   *     GET: {command: 'getNewThing'},
   *     POST: {command: 'setNewThing', payloadParams: {required: ['someParam']}}
   *   }
   * }
   */
  static newMethodMap = {};

  constructor (pluginName, opts = {}) {
    this.name = pluginName;
    this.logger = logger.getLogger(`Plugin [${pluginName}]`);

    // allow for args to be used by plugins
    this.opts = opts;
  }

  /**
   * Override to return a validator object used to validate CLI args passed into appium as
   * --plugin-args='{"yourPluginName": {"argName": argVal, ...}}'
   */
  static get argsConstraints () {
    return {};
  }

  /**
   * Optionally updates an Appium express app and http server, by calling methods that may mutate
   * those objects. For example, you could call:
   *
   * expressApp.get('/foo', handler)
   *
   * In order to add a new route to Appium with this plugin. Or, you could add new listeners to the
   * httpServer object.
   *
   * @param {import('express').Application} expressApp - the Express 'app' object used by Appium for route handling
   * @param {import('http').Server} httpServer - the node HTTP server that hosts the app
   */
  // eslint-disable-next-line no-unused-vars, require-await
  static async updateServer (expressApp, httpServer) {
    // throw new TypeError('Not yet implemented!');
  }

  /**
   * Handle an Appium command, optionally running and using or throwing away the value of the
   * original Appium behavior (or the behavior of the next plugin in a plugin chain).
   *
   * @param {function} next - a reference to an async function which encapsulates what would
   * normally happen if this plugin were not handling a command. If this is the only plugin
   * handling the command, `await next()` would therefore trigger the normal handling logic in the
   * driver which is in use. If another plugin is registered, it would run *that* plugin's `handle`
   * method and return the result for use here. Note that if this plugin does *not* call
   * `await next()`, then the normal command logic will not be run, and this plugin is responsible
   * for managing new command timeouts and command logging, for example:
   *   `driver.stopNewCommandTimeout()` -- before running plugin logic
   *   `driver.startNewCommandTimeout()` -- after running plugin logic
   *   `driver._eventHistory.commands.push({cmd: cmdName, startTime, endTime}) -- after running
   *   plugin logic
   * @param {BaseDriver} driver - the instance of the Appium driver currently handling commands
   * @param {...object} args - the args that would be applied to the normal command
   *
   * @return {object} - the result to pass to the user
   */
  /*async <cmdName> (next, driver, ...args) {
    return await next();
  }*/

  /**
   * You could also handle all commands generically by implementing 'handle'
   *
   * @param {() => Promise<void>} next - A reference to an async function which
   * encapsulates what would normally happen if this plugin were not handling a
   * command.
   * @param {BaseDriver} driver - the instance of the Appium driver currently
   * handling commands
   * @param {string} cmdName - the name of the command being handled
   * @param {...object} args - the args that would be applied to the command
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line no-unused-vars
  async handle (next, driver, cmdName, ...args) {
    return await next();
  }

  /**
   * @param {method} string
   * @param {route} string
   * @param {any} body
   * @returns {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  shouldAvoidProxy (method, route, body) {
    throw new TypeError('Not yet implemented!');
  }
}

/**
 * @typedef {import('@appium/base-driver').BaseDriver} BaseDriver
 */
