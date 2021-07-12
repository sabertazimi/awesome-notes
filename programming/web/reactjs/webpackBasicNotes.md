# Webpack Basic Notes

<!-- TOC -->

- [Webpack Basic Notes](#webpack-basic-notes)
  - [Config](#config)
    - [Watch Options](#watch-options)
    - [Resolve Path Options](#resolve-path-options)
    - [Flag Options](#flag-options)
    - [Loader Configuration](#loader-configuration)
      - [Babel Loader](#babel-loader)
      - [CSS Loader](#css-loader)
      - [Thread Loader](#thread-loader)
  - [Optimization](#optimization)
    - [Common Libraries](#common-libraries)
    - [Common Chunks](#common-chunks)
    - [Code Minimization](#code-minimization)
    - [Code Spliting](#code-spliting)
    - [Tree Shaking](#tree-shaking)
    - [Building Caches](#building-caches)
    - [Perf Profiling](#perf-profiling)
    - [Commit Linter](#commit-linter)
  - [Plugins](#plugins)
    - [HTML](#html)
    - [JavaScript](#javascript)
    - [CSS](#css)
    - [Images](#images)
    - [Building Work](#building-work)
    - [Bundles UI](#bundles-ui)
    - [DLL Plugins](#dll-plugins)
    - [Other Plugins](#other-plugins)
    - [Custom Plugin](#custom-plugin)
  - [Migrate to 5](#migrate-to-5)
  - [Reference](#reference)

<!-- /TOC -->

## Config

### Watch Options

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Resolve Path Options

```js
{
  resolve: {
    alias: {
      '#': path.resolve(__dirname, '/'),
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
      '~@': path.resolve(__dirname, 'src'),
      'vendor': path.resolve(__dirname, 'src/vendor'),
      '~component': path.resolve(__dirname, 'src/components'),
      '~config': path.resolve(__dirname, 'config'),
    },
    extensions: [
      '.js',
      '.jsx',
    ],
  },
}
```

`jsconfig.json` for vscode resolve path:

```js
{
  'compilerOptions': {
    // This must be specified if 'paths' is set
    'baseUrl': '.',
    // Relative to 'baseUrl'
    'paths': {
      '*': ['*', 'src/*']
    }
  }
}

{
  'compilerOptions': {
    'target': 'es2017',
    'allowSyntheticDefaultImports': false,
    'baseUrl': './',
    'paths': {
      'Config/*': ['src/config/*'],
      'Components/*': ['src/components/*'],
      'Ducks/*': ['src/ducks/*'],
      'Shared/*': ['src/shared/*'],
      'App/*': ['src/*']
    }
  },
  'exclude': ['node_modules', 'dist']
}
```

### Flag Options

- --progress
- --colors
- -p

### Loader Configuration

#### Babel Loader

```js
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: path.resolve('src'),
  use: [
    'thread-loader',
    {
      loader: require.resolve('babel-loader');
    }
  ]
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent:
                '@svgr/webpack?-svgo,+titleProp,+ref![path]',
            },
          },
        },
      ],
      ['lodash'],
    ],
    cacheDirectory: true,
    cacheCompression: false,
    compact: isEnvProduction,
  },
}
```

#### CSS Loader

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
```

#### Thread Loader

```js
use: [
  {
    loader: 'thread-loader',
    // loaders with equal options will share worker pools
    options: {
      // the number of spawned workers, defaults to (number of cpus - 1) or
      // fallback to 1 when require('os').cpus() is undefined
      workers: 2,

      // number of jobs a worker processes in parallel
      // defaults to 20
      workerParallelJobs: 50,

      // additional node.js arguments
      workerNodeArgs: ['--max-old-space-size=1024'],

      // Allow to respawn a dead worker pool
      // respawning slows down the entire compilation
      // and should be set to false for development
      poolRespawn: false,

      // timeout for killing the worker processes when idle
      // defaults to 500 (ms)
      // can be set to Infinity for watching builds to keep workers alive
      poolTimeout: 2000,

      // number of jobs the poll distributes to the workers
      // defaults to 200
      // decrease of less efficient but more fair distribution
      poolParallelJobs: 50,

      // name of the pool
      // can be used to create different pools with elsewise identical options
      name: 'my-pool',
    },
  },
  // your expensive loader (e.g babel-loader)
];
```

```js
const threadLoader = require('thread-loader');

threadLoader.warmup(
  {
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  },
  [
    // modules to load
    // can be any module, i. e.
    'babel-loader',
    'babel-preset-es2015',
    'sass-loader',
  ]
);
```

## Optimization

- CDN
- 服务器端渲染
- 提取公共库
- 代码压缩
- 代码分割: Chunks
- 代码分割: 按需加载
- 多核构建
- 构建缓存

### Common Libraries

```js
externals: {
  moment: 'window.moment',
  antd: 'window.antd',
  lodash: 'window._',
  react: 'window.React',
  'react-dom': 'window.ReactDOM',
}
```

### Common Chunks

```js
new webpack.optimize.CommonsChunkPlugin({
  name: string, // or
  names: string[],
  // The chunk name of the commons chunk.
  // An existing chunk can be selected by passing a name of an existing chunk.
  // If an array of strings is passed this is equal to
  // invoking the plugin multiple times for each chunk name.
  // If omitted and `options.async` or `options.children`
  // is set all chunks are used, otherwise `options.filename`
  // is used as chunk name.
  // When using `options.async` to create common chunks
  // from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // The filename template for the commons chunk.
  // Can contain the same placeholders as `output.filename`.
  // If omitted the original filename is not modified
  // (usually `output.filename` or `output.chunkFilename`).
  // This option is not permitted if you're using `options.async` as well,
  // see below for more details.

  minChunks: number|Infinity|function(module, count) => boolean,
  // The minimum number of chunks which need to contain a module
  // before it's moved into the commons chunk.
  // The number must be greater than or equal 2
  // and lower than or equal to the number of chunks.
  // Passing `Infinity` creates the commons chunk, but moves no modules into it.
  // By providing a `function` you can add custom logic.
  // (Defaults to the number of chunks)

  chunks: string[],
  // Select the source chunks by chunk names.
  // The chunk must be a child of the commons chunk.
  // If omitted all entry chunks are selected.

  children: boolean,
  // If `true` all children of the commons chunk are selected

  deepChildren: boolean,
  // If `true` all descendants of the commons chunk are selected

  async: boolean|string,
  // If `true` a new async commons chunk is created
  // as child of `options.name` and sibling of `options.chunks`.
  // It is loaded in parallel with `options.chunks`.
  // Instead of using `option.filename`,
  // it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // Minimum size of all common module before a commons chunk is created.
});
```

### Code Minimization

```js
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          {
            loader: require.resolve('babel-loader');
          }
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            drop_console: true,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: isEnvProductionProfile,
          keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
```

### Code Spliting

- require.ensure([], () => {});
- async await import

```js
splitChunks: {
  chunks: 'initial',
  cacheGroups: {
    common: {
      chunks: 'initial', // all、async、initial
      minChunks: 5,
      name: 'common',
      priority: 9,
      enforce: true
    },
    vendor: {
      test: /node_modules/,
      chunks: 'initial',
      name: 'vendor',
      priority: 10,
      enforce: true
    }
  }
},
```

### Tree Shaking

1. 尽量不写带有副作用的代码: 诸如编写了立即执行函数, 在函数里又使用了外部变量等
2. 如果对 ES6 语义特性要求不是特别严格, 可以开启 babel 的 loose 模式 etc. 是否真的要不可枚举 class 的属性
3. 如果是开发 JavaScript 库, 使用 rollup(ES6 module export + code flow static analysis),
   并且提供 ES6 module 的版本, 入口文件地址设置到 package.json 的 module 字段
4. 如果 JavaScript 库开发中, 难以避免的产生各种副作用代码, 可以将功能函数或者组件, 打包成单独的文件或目录,
   以便于用户可以通过目录去加载.如有条件，也可为自己的库开发单独的 webpack-loader, 便于用户按需加载

### Building Caches

```js
new HardSourceWebpackPlugin({
  // Either an absolute path or relative to webpack's options.context.
  cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
  // Either a string of object hash function given a webpack config.
  configHash: function(webpackConfig) {
    // node-object-hash on npm can be used to build this.
    return require('node-object-hash')({sort: false}).hash(webpackConfig);
  },
  // Either false, a string, an object, or a project hashing function.
  environmentHash: {
    root: process.cwd(),
    directories: [],
    files: ['package-lock.json', 'yarn.lock'],
  },
  // An object.
  info: {
    // 'none' or 'test'.
    mode: 'none',
    // 'debug', 'log', 'info', 'warn', or 'error'.
    level: 'debug',
  },
  // Clean up large, old caches automatically.
  cachePrune: {
    // Caches younger than `maxAge` are not considered for deletion. They must
    // be at least this (default: 2 days) old in milliseconds.
    maxAge: 2 * 24 * 60 * 60 * 1000,
    // All caches together must be larger than `sizeThreshold` before any
    // caches will be deleted. Together they must be at least this
    // (default: 50 MB) big in bytes.
    sizeThreshold: 50 * 1024 * 1024
  },
}),
```

### Perf Profiling

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  plugins: [new MyPlugin(), new MyOtherPlugin()],
});
```

```bash
npx webpack --mode production --profile --json > stats.json
```

- [Optimize Helper](https://github.com/jakoblind/webpack-optimize-helper)
- [Statics Chart](https://github.com/alexkuz/webpack-chart)

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

## Plugins

### HTML

- [HTML Plugin](https://github.com/jantimon/html-webpack-plugin)

### JavaScript

- [UglifyJS Terser Plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

### CSS

- [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [CSS Minimizer Plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)

### Images

- [ImageMin Plugin](https://github.com/Klathmon/imagemin-webpack-plugin)

### Building Work

- [Thread Loader](https://github.com/webpack-contrib/thread-loader)
- [Hard Source Plugin](https://github.com/mzgoddard/hard-source-webpack-plugin)
- [Speed Measure Plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)

### Bundles UI

- [Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Monitor](https://github.com/webpackmonitor/webpackmonitor)
- [Browser UI](https://github.com/zouhir/jarvis)
- [CLI UI](https://github.com/unjs/webpackbar)

### DLL Plugins

- [AutoDLL Plugin](https://github.com/asfktz/autodll-webpack-plugin)
- DLLReference Plugin

### Other Plugins

- Commons Chunk Plugin
- Preload plugin
- Prefetch plugin
- Define Plugin
- Provide Plugin
- CleanUp Plugin

### Custom Plugin

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process')
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD')
                           .toString().replace(/\s+/, '');
const version = branch.split('/')[1]
const scripts = [
  'https://cdn.bootcss.com/react-dom/16.9.0-rc.0/umd/react-dom.production.min.js',
  'https://cdn.bootcss.com/react/16.9.0/umd/react.production.min.js'
]


class HotLoad {
  apply(compiler) {
    compiler.hooks.beforeRun.tap('UpdateVersion', (compilation) => {
      compilation.options.output.publicPath = `./${version}/`
    })

    compiler.hooks.compilation.tap('HotLoadPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'HotLoadPlugin', (data, cb) => {
          scripts.forEach(src => [
            data.assetTags.scripts.unshift({
              tagName: 'script',
              voidTag: false,
              attributes: { src }
            })
          ])
          cb(null, data)
        }
      )
    })
  }
}

module.exports = HotLoad;
```

## [Migrate to 5](https://webpack.js.org/migrate/5/)

Make sure there's no webpack deprecation warnings.

```bash
node --trace-deprecation node_modules/webpack/bin/webpack.js
```

## Reference

- [Webpakc 4 Tutorial](https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development)
- [Custom Plugin](https://juejin.cn/post/6870055445034172424)
