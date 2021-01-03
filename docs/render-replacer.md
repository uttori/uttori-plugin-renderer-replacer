<a name="ReplacerRenderer"></a>

## ReplacerRenderer
Uttori Replacer Renderer

**Kind**: global class  

* [ReplacerRenderer](#ReplacerRenderer)
    * [.configKey](#ReplacerRenderer.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#ReplacerRenderer.defaultConfig) ⇒ <code>object</code>
    * [.validateConfig(config, _context)](#ReplacerRenderer.validateConfig)
    * [.register(context)](#ReplacerRenderer.register)
    * [.renderContent(content, context)](#ReplacerRenderer.renderContent) ⇒ <code>string</code>
    * [.renderCollection(collection, context)](#ReplacerRenderer.renderCollection) ⇒ <code>Array.&lt;object&gt;</code>
    * [.render(content, config)](#ReplacerRenderer.render) ⇒ <code>string</code>

<a name="ReplacerRenderer.configKey"></a>

### ReplacerRenderer.configKey ⇒ <code>string</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  
**Returns**: <code>string</code> - The configuration key.  
**Example** *(ReplacerRenderer.configKey)*  
```js
const config = { ...ReplacerRenderer.defaultConfig(), ...context.config[ReplacerRenderer.configKey] };
```
<a name="ReplacerRenderer.defaultConfig"></a>

### ReplacerRenderer.defaultConfig() ⇒ <code>object</code>
The default configuration.

**Kind**: static method of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  
**Returns**: <code>object</code> - The configuration.  
**Example** *(ReplacerRenderer.defaultConfig())*  
```js
const config = { ...ReplacerRenderer.defaultConfig(), ...context.config[ReplacerRenderer.configKey] };
```
<a name="ReplacerRenderer.validateConfig"></a>

### ReplacerRenderer.validateConfig(config, _context)
Validates the provided configuration for required entries.

**Kind**: static method of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | A configuration object. |
| config.configKey | <code>object</code> | A configuration object specifically for this plugin. |
| _context | <code>object</code> | Unused |

**Example** *(ReplacerRenderer.validateConfig(config, _context))*  
```js
ReplacerRenderer.validateConfig({ ... });
```
<a name="ReplacerRenderer.register"></a>

### ReplacerRenderer.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

**Example** *(ReplacerRenderer.register(context))*  
```js
const context = {
  hooks: {
    on: (event, callback) => { ... },
  },
  config: {
    [ReplacerRenderer.configKey]: {
      ...,
      events: {
        renderContent: ['render-content', 'render-meta-description'],
        renderCollection: ['render-search-results'],
        validateConfig: ['validate-config'],
      },
    },
  },
};
ReplacerRenderer.register(context);
```
<a name="ReplacerRenderer.renderContent"></a>

### ReplacerRenderer.renderContent(content, context) ⇒ <code>string</code>
Replace content in a provided string with a provided context.

**Kind**: static method of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  
**Returns**: <code>string</code> - The rendered content.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Content to be converted to HTML. |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |

**Example** *(ReplacerRenderer.renderContent(content, context))*  
```js
const context = {
  config: {
    [ReplacerRenderer.configKey]: {
      ...,
    },
  },
};
ReplacerRenderer.renderContent(content, context);
```
<a name="ReplacerRenderer.renderCollection"></a>

### ReplacerRenderer.renderCollection(collection, context) ⇒ <code>Array.&lt;object&gt;</code>
Replace content in a collection of Uttori documents with a provided context.

**Kind**: static method of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  
**Returns**: <code>Array.&lt;object&gt;</code> - } The rendered documents.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.&lt;object&gt;</code> | A collection of Uttori documents. |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |

**Example** *(ReplacerRenderer.renderCollection(collection, context))*  
```js
const context = {
  config: {
    [ReplacerRenderer.configKey]: {
      ...,
    },
  },
};
ReplacerRenderer.renderCollection(collection, context);
```
<a name="ReplacerRenderer.render"></a>

### ReplacerRenderer.render(content, config) ⇒ <code>string</code>
Replace content in a provided string with a provided set of rules.

**Kind**: static method of [<code>ReplacerRenderer</code>](#ReplacerRenderer)  
**Returns**: <code>string</code> - The rendered content.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Content to be searched through to make replacements. |
| config | <code>object</code> | A provided configuration to use. |

**Example** *(ReplacerRenderer.render(content, config))*  
```js
const html = ReplacerRenderer.render(content, config);
```
