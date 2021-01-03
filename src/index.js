let debug = () => {}; try { debug = require('debug')('Uttori.Plugin.Render.Replacer'); } catch {}

/**
 * Uttori Replacer Renderer
 *
 * @example <caption>ReplacerRenderer</caption>
 * const content = ReplacerRenderer.render("...");
 * @class
 */
class ReplacerRenderer {
  /**
   * The configuration key for plugin to look for in the provided configuration.
   *
   * @type {string}
   * @returns {string} The configuration key.
   * @example <caption>ReplacerRenderer.configKey</caption>
   * const config = { ...ReplacerRenderer.defaultConfig(), ...context.config[ReplacerRenderer.configKey] };
   * @static
   */
  static get configKey() {
    return 'uttori-plugin-renderer-replacer';
  }

  /**
   * The default configuration.
   *
   * @returns {object} The configuration.
   * @example <caption>ReplacerRenderer.defaultConfig()</caption>
   * const config = { ...ReplacerRenderer.defaultConfig(), ...context.config[ReplacerRenderer.configKey] };
   * @static
   */
  static defaultConfig() {
    return {
      rules: [],
    };
  }

  /**
   * Validates the provided configuration for required entries.
   *
   * @param {object} config - A configuration object.
   * @param {object} config.configKey - A configuration object specifically for this plugin.
   * @param {object} _context - Unused
   * @example <caption>ReplacerRenderer.validateConfig(config, _context)</caption>
   * ReplacerRenderer.validateConfig({ ... });
   * @static
   */
  static validateConfig(config, _context) {
    debug('Validating config...');
    if (!config || !config[ReplacerRenderer.configKey]) {
      throw new Error(`ReplacerRenderer Config Warning: '${ReplacerRenderer.configKey}' configuration key is missing.`);
    }
    if (!config[ReplacerRenderer.configKey].rules || !Array.isArray(config[ReplacerRenderer.configKey].rules)) {
      throw new Error('ReplacerRenderer Config Warning: \'rules\' configuration key is missing or not an array.');
    }
    debug('Validated config.');
  }

  /**
   * Register the plugin with a provided set of events on a provided Hook system.
   *
   * @param {object} context - A Uttori-like context.
   * @param {object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {object} context.config - A provided configuration to use.
   * @param {object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @example <caption>ReplacerRenderer.register(context)</caption>
   * const context = {
   *   hooks: {
   *     on: (event, callback) => { ... },
   *   },
   *   config: {
   *     [ReplacerRenderer.configKey]: {
   *       ...,
   *       events: {
   *         renderContent: ['render-content', 'render-meta-description'],
   *         renderCollection: ['render-search-results'],
   *         validateConfig: ['validate-config'],
   *       },
   *     },
   *   },
   * };
   * ReplacerRenderer.register(context);
   * @static
   */
  static register(context) {
    if (!context || !context.hooks || typeof context.hooks.on !== 'function') {
      throw new Error("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
    }
    const config = {
      ...ReplacerRenderer.defaultConfig(),
      ...context.config[ReplacerRenderer.configKey],
      uttori: {
        ...ReplacerRenderer.defaultConfig().uttori,
        ...context.config[ReplacerRenderer.configKey].uttori,
      },
    };
    if (!config.events) {
      throw new Error("Missing events to listen to for in 'config.events'.");
    }
    Object.keys(config.events).forEach((method) => {
      config.events[method].forEach((event) => {
        if (typeof ReplacerRenderer[method] !== 'function') {
          debug(`Missing function "${method}" for key "${event}"`);
          return;
        }
        context.hooks.on(event, ReplacerRenderer[method]);
      });
    });
  }

  /**
   * Replace content in a provided string with a provided context.
   *
   * @param {string} content - Content to be converted to HTML.
   * @param {object} context - A Uttori-like context.
   * @param {object} context.config - A provided configuration to use.
   * @returns {string} The rendered content.
   * @example <caption>ReplacerRenderer.renderContent(content, context)</caption>
   * const context = {
   *   config: {
   *     [ReplacerRenderer.configKey]: {
   *       ...,
   *     },
   *   },
   * };
   * ReplacerRenderer.renderContent(content, context);
   * @static
   */
  static renderContent(content, context) {
    debug('renderContent');
    if (!context || !context.config || !context.config[ReplacerRenderer.configKey]) {
      throw new Error('Missing configuration.');
    }
    const config = {
      ...ReplacerRenderer.defaultConfig(),
      ...context.config[ReplacerRenderer.configKey],
      uttori: {
        ...ReplacerRenderer.defaultConfig().uttori,
        ...context.config[ReplacerRenderer.configKey].uttori,
      },
    };
    return ReplacerRenderer.render(content, config);
  }

  /**
   * Replace content in a collection of Uttori documents with a provided context.
   *
   * @param {object[]} collection - A collection of Uttori documents.
   * @param {object} context - A Uttori-like context.
   * @param {object} context.config - A provided configuration to use.
   * @returns {object[]}} The rendered documents.
   * @example <caption>ReplacerRenderer.renderCollection(collection, context)</caption>
   * const context = {
   *   config: {
   *     [ReplacerRenderer.configKey]: {
   *       ...,
   *     },
   *   },
   * };
   * ReplacerRenderer.renderCollection(collection, context);
   * @static
   */
  static renderCollection(collection, context) {
    debug('renderCollection:', collection.length);
    if (!context || !context.config || !context.config[ReplacerRenderer.configKey]) {
      throw new Error('Missing configuration.');
    }
    const config = {
      ...ReplacerRenderer.defaultConfig(),
      ...context.config[ReplacerRenderer.configKey],
      uttori: {
        ...ReplacerRenderer.defaultConfig().uttori,
        ...context.config[ReplacerRenderer.configKey].uttori,
      },
    };
    return collection.map((document) => {
      const html = ReplacerRenderer.render(document.html, config);
      return { ...document, html };
    });
  }

  /**
   * Replace content in a provided string with a provided set of rules.
   *
   * @param {string} content - Content to be searched through to make replacements.
   * @param {object} config - A provided configuration to use.
   * @returns {string} The rendered content.
   * @example <caption>ReplacerRenderer.render(content, config)</caption>
   * const html = ReplacerRenderer.render(content, config);
   * @static
   */
  static render(content, config) {
    if (!content) {
      debug('No input provided, returning a blank string.');
      return '';
    }

    config.rules.forEach((rule) => {
      let search;
      if (typeof rule.test === 'string') {
        // eslint-disable-next-line security/detect-non-literal-regexp
        search = new RegExp(rule.test, 'g');
      } else if (rule.test instanceof RegExp) {
        search = rule.test;
      } else {
        debug('Invalid Rule:', rule);
        return;
      }

      content = content.replace(search, rule.output);
    });

    return content;
  }
}

module.exports = ReplacerRenderer;
