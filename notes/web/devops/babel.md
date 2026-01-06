---
sidebar_position: 6
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, DevOps, Babel]
---

# Babel

```bash
babel example.js -o compiled.js
babel src -d lib -s
```

## Babel Node

A read-eval-print loop(REPL) can replace node REPL.

## Babel Core

提供 babel 转码 API

```bash
npm install babel-core --save
```

```ts
const babel = require('babel-core')

// 字符串转码
babel.transform('code();', options)
// => { code, map, ast }

// 文件转码 (异步)
babel.transformFile('filename.js', options, (err, result) => {
  process(err)
  return result // => { code, map, ast }
})

// 文件转码 (同步)
babel.transformFileSync('filename.js', options)
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options)
// => { code, map, ast }
```

## CodeMod Tool

Use Babel to refactor code:

- [JSCodeshift](https://github.com/facebook/jscodeshift)
- [ReactCodemod](https://github.com/reactjs/react-codemod)

## Babel Transform Plugin

- Visitor pattern with Babel.
- Named `babel-plugin-transform-xxx`.

```json
{
  "main": "index.js"
}
```

```ts
// index.js
module.exports = (babel) => {
  const t = babel.types
  let isJSXExisted = false
  let isMeactContextEnabled = false

  return {
    visitor: {
      Program: {
        exit(path) {
          if (isJSXExisted === true && isMeactContextEnabled === false)
            throw path.buildCodeFrameError(`Meact isn't in current context!`)
        },
      },
      ImportDeclaration(path, state) {
        if (path.node.specifiers[0].local.name === 'Meact')
          isMeactContextEnabled = true
      },
      MemberExpression(path, state) {
        if (
          path.node.object.name === 'React'
          && path.node.property.name === 'createElement'
        ) {
          isJSXExisted = true
          path.replaceWith(
            t.MemberExpression(
              t.identifier('Meact'),
              t.identifier('createElement')
            )
          )
        }
      },
    },
  }
}
```

Babel plugins:

- Define [plugin](https://github.com/FormidableLabs/babel-plugin-transform-define).

## Babel Preset Plugin

- Just like `.babelrc.js`.
- Named `babel-preset-xxx`.

```json
// package.json
{
  "main": "index.js",
  "dependencies": {
    "babel-plugin-transform-meact-jsx": "^0.1.2",
    "@babel/plugin-proposal-object-rest-spread": "^7.0.0",
    "@babel/plugin-transform-react-jsx": "^7.0.0",
    "@babel/plugin-transform-runtime": "^7.0.0",
    "@babel/preset-env": "^7.0.0"
  }
}
```

```ts
// index.js
const defaultTargets = {
  android: 30,
  chrome: 35,
  edge: 14,
  explorer: 9,
  firefox: 52,
  safari: 8,
  ucandroid: 1,
}

function buildTargets(options) {
  return Object.assign({}, defaultTargets, options.additionalTargets)
}

module.exports = function buildMeactPreset(context, options) {
  const transpileTargets
    = (options && options.targets) || buildTargets(options || {})

  return {
    presets: [
      require('@babel/preset-env').default(null, {
        targets: transpileTargets,
        modules: false,
      }),
    ],
    plugins: [
      require('@babel/plugin-proposal-object-rest-spread'),
      require('@babel/plugin-transform-react-jsx'),
      require('babel-plugin-transform-meact-jsx'),
      require('@babel/plugin-transform-runtime'),
    ].filter(Boolean),
  }
}
```
