# Webpack Basic Notes

<!-- TOC -->

- [Webpack Basic Notes](#webpack-basic-notes)
  - [Config](#config)
    - [Watch Options](#watch-options)
    - [Resolve Options](#resolve-options)
    - [Flag Options](#flag-options)
  - [Optimization](#optimization)
  - [Plugin](#plugin)
  - [Advanced](#advanced)
    - [Code Spliting](#code-spliting)
    - [Tree Shaking](#tree-shaking)
    - [Perf Profiling](#perf-profiling)
    - [Commit Linter](#commit-linter)
    - [Profile Statistics](#profile-statistics)
  - [Reference](#reference)

<!-- /TOC -->

## Config

### Watch Options

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Resolve Options

```js
{
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
    extensions: [
      '.js',
      '.jsx',
    ],
  },
}
```

`jsconfig.json` for vscode

```js
{
  "compilerOptions": {
    // This must be specified if "paths" is set
    "baseUrl": ".",
    // Relative to "baseUrl"
    "paths": {
      "*": ["*", "src/*"]
    }
  }
}

{
  "compilerOptions": {
    "target": "es2017",
    "allowSyntheticDefaultImports": false,
    "baseUrl": "./",
    "paths": {
      "Config/*": ["src/config/*"],
      "Components/*": ["src/components/*"],
      "Ducks/*": ["src/ducks/*"],
      "Shared/*": ["src/shared/*"],
      "App/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### Flag Options

- --progress
- --colors
- -p

## Optimization

- cdn
- 服务器端渲染
- 生产环境全局变量(去除不必要的 build 用 lib/plugin, 如 react-hot-loader)
- 提取公共库(common.js)
- 代码压缩: 压缩 js(去除注释/空行/替换变量名等)
- 代码分割: 按需加载 js
- 代码分割: chunk
- 代码分离: 分离 css(extract-text-webpack-plugin

## Plugin

```js
commonsPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor',
  'vendor.js',
  Infinity
);
uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
});
definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});
providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery'
});
cleanUpPlugin = new WebpackCleanupPlugin({
  exclude: ['stats.json', 'important.js']
});
dllPlugin = new Webpack.DllPlugin({
  path: 'manifest.json',
  name: '[name]',
  context: __dirname
});
dllReferencePlugin = new Webpack.DllReferencePlugin({
  manifest: require('./manifest.json'),
  context: __dirname
});
```

- imageMinPlugin
- preload plugin
- prefetch plugin
- webpack-bundle-analyzer
- webpack-monitor
- [webpack-jarvis - Browser UI](https://github.com/zouhir/jarvis)
- [webpackbar](https://github.com/nuxt/webpackbar)

## Advanced

### Code Spliting

require.ensure([], () => {});

### Tree Shaking

1. 尽量不写带有副作用的代码: 诸如编写了立即执行函数, 在函数里又使用了外部变量等
2. 如果对 ES6 语义特性要求不是特别严格, 可以开启 babel 的 loose 模式 etc. 是否真的要不可枚举 class 的属性
3. 如果是开发 JavaScript 库, 使用 rollup(ES6 module export + code flow static analysis),
   并且提供 ES6 module 的版本, 入口文件地址设置到 package.json 的 module 字段
4. 如果 JavaScript 库开发中, 难以避免的产生各种副作用代码, 可以将功能函数或者组件, 打包成单独的文件或目录,
   以便于用户可以通过目录去加载.如有条件，也可为自己的库开发单独的 webpack-loader, 便于用户按需加载

### Perf Profiling

```bash
npx webpack --mode production --profile --json > stats.json
```

- [Optimize Helper](https://webpack.jakoblind.no/optimize/)
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [webpack-monitor](https://github.com/webpackmonitor/webpackmonitor)

### Commit Linter

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx}": ["eslint --fix", "git add"],
    "src/**/*.scss": ["stylelint --fix", "git add"],
    "src/**/*.css": ["stylelint --fix", "git add"]
  }
}
```

### Profile Statistics

```bash
webpack --profile --json > stats.json
```

- [Webpack Chart](https://github.com/alexkuz/webpack-chart)

## Reference

- [Webpakc 4 Tutorial](https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development)
