---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Node]
---

# Node Basic Notes

## Node App Structure

- Main ./index.js, ./server.js, or ./yourEntryFile.js in the root
- Supporting files in ./lib/
- Static HTTP files in ./public/
- Views or templates in ./views/
- Command-line executables in ./bin/
- Tests in ./test/ (or ./spec/ if you’re a Jasmine cool-aid drinker)
- npm scripts in ./scripts/
- Config in ./config/
- Documentation in ./doc/
- Examples in ./examples/
- Performance analysis in ./benchmarks/
- Native C/C++ source in ./source/

## NPM CLI

### NPM Mirrors

[NPM mirror list](https://github.com/cnpm/binary-mirror-config):

```bash
npm config set disturl https://npmmirror.com/mirrors/node/
npm config set chromedriver_cdnurl http://npmmirror.com/mirrors/chromedriver/
npm config set electron_mirror https://npmmirror.com/mirrors/electron/
npm config set electron_builder_binaries_mirror https://npmmirror.com/mirrors/electron-builder-binaries/
npm config set operadriver_cdnurl http://npmmirror.com/mirrors/operadriver/
npm config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/
npm config set profiler_binary_host_mirror http://npmmirror.com/mirrors/node-inspector/
npm config set puppeteer_download_host https://npmmirror.com/mirrors/
npm config set python_mirror https://npmmirror.com/mirrors/python/
npm config set robotjs_binary_host https://npmmirror.com/mirrors/robotjs/
npm config set sass_binary_site https://npmmirror.com/mirrors/node-sass/
npm config set saucectl_install_binary_mirror https://npmmirror.com/mirrors/saucectl/
npm config set sentrycli_cdnurl https://npmmirror.com/mirrors/sentry-cli/
npm config set sharp_binary_host https://npmmirror.com/mirrors/sharp/
npm config set sharp_libvips_binary_host https://npmmirror.com/mirrors/sharp-libvips/
npm config set sqlite3_binary_site https://npmmirror.com/mirrors/sqlite3/
npm config set swc_binary_site https://npmmirror.com/mirrors/node-swc/
```

### Node Version Manager

- [Volta: Install and Run JS Tool Quickly and Seamlessly](https://github.com/volta-cli/volta)
- [FNM: Rust Node Manager](https://github.com/Schniz/fnm)
- [NVM: Node Version Manager](https://github.com/nvm-sh/nvm)

```bash
curl https://get.volta.sh | bash
volta install node
node -v
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

```bash
# Install and use the latest version
nvm install node
nvm use node
nvm alias default node

# Install and use the latest LTS version
nvm install --lts
nvm use --lts
```

```bash
# Install and use specific version
nvm install 16
nvm use 16
nvm ls
```

```bash
# Update to latest version
nvm install 16
nvm install node
```

```bash
# Remove version
nvm uninstall 14
nvm uninstall 12
```

### Basic Steps

```bash
npm adduser
mkdir proj/
# 修改 package.json 可再次运行此命令
# scope for everyone
npm init --scope=<username>

# 修改 package.json 可再次运行此命令(不接模块名为自动更新)
npm install -S <package>
npm install -D <package>
npm prune      # 清除无用包
npm rm --save  # --save 删除文件的同时更新 package.json 文件

npm ls
npm outdated   # 去除过期包
```

### Test Steps

```json
{
  "scripts": {
    "test": "node test.js"
  }
}
```

```bash
npm test
```

### Publish Steps

`latest` or `alpha`:

```bash
npm publish
npm publish --tag [<tag>]
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>]
```

NPM registry token configuration:

```bash
npm config set @orgName:registry https://registry.example.com
npm config set //registry.example.com/:_authToken XXXXXTokenXXXXX
```

Release script from VitePress:

```ts
const fs = require('node:fs')
const path = require('node:path')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const execa = require('execa')
const semver = require('semver')
const currentVersion = require('../package.json').version

const versionIncrements = ['patch', 'minor', 'major']

const inc = i => semver.inc(currentVersion, i)
const bin = name => path.resolve(__dirname, `../node_modules/.bin/${name}`)
function run(bin, args, opts = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts })
}
const step = msg => console.log(chalk.cyan(msg))

async function main() {
  let targetVersion

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom']),
  })

  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion))
    throw new Error(`Invalid target version: ${targetVersion}`)

  const { yes: tagOk } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!tagOk)
    return

  // Update the package version.
  step('\nUpdating the package version...')
  updatePackage(targetVersion)

  // Build the package.
  step('\nBuilding the package...')
  await run('yarn', ['build'])

  // Generate the changelog.
  step('\nGenerating the changelog...')
  await run('yarn', ['changelog'])
  await run('yarn', ['prettier', '--write', 'CHANGELOG.md'])

  const { yes: changelogOk } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Changelog generated. Does it look good?`,
  })

  if (!changelogOk)
    return

  // Commit changes to the Git and create a tag.
  step('\nCommitting changes...')
  await run('git', ['add', 'CHANGELOG.md', 'package.json'])
  await run('git', ['commit', '-m', `release: v${targetVersion}`])
  await run('git', ['tag', `v${targetVersion}`])

  // Publish the package.
  step('\nPublishing the package...')
  await run('yarn', [
    'publish',
    '--new-version',
    targetVersion,
    '--no-commit-hooks',
    '--no-git-tag-version',
  ])
  await run('npm', [
    'publish',
    '--registry',
    'https://registry.npmjs.org',
    '--access',
    'public',
  ])

  // Push to GitHub.
  step('\nPushing to GitHub...')
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}

function updatePackage(version) {
  const pkgPath = path.resolve(path.resolve(__dirname, '..'), 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

  pkg.version = version

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

main().catch(err => console.error(err))
```

### Semantic Version

Semver:

- Patch release: bugfix and other minor changes.
- Minor release: new features not breaking API (backward compatible).
- Major release: new features breaking API (not backward compatible).
- Alpha (α): 预览版 (内部测试版), 会有很多 Bug, 一般只有测试人员使用.
- Beta (β): 测试版 (或者叫公开测试版), 会一直加入新的功能.
- RC (Release Candidate): 最终测试版本, 可能成为最终产品的候选版本.
- 多数开源软件会推出两个 RC 版本, 最后的 RC2 则成为正式版本.

```bash
npm version patch
npm publish

npm version minor
npm publish

npm version major
npm publish
```

### Tab Completion

```bash
npm completion >> ~/.bashrc (or ~/.zshrc)
source ~/.zshrc
```

### Basic Command

best practice: `npm ci` for cache install (speed up installation)

```bash
// With package-lock.json exists:
npm ci
```

remove useless package

```bash
npm prune // uninstall node_modules not in package.json
npm outdated
```

### Link Command

```bash
cd path/to/my-project
npm link path/to/my-utils
```

```bash
# in local B package, build local B binary (npm install -g B)
npm link
# in local A package, set `B` link in package.json to local B binary
npm link B
```

### Security Command

```bash
npm audit fix
npm audit fix --force
```

### NPX Command

Run local node_modules:

```bash
npm install eslint -D
npx eslint .
```

Run global package (not installed):

```bash
npx create-react-app react-app
```

Run specific version:

```bash
npx -p package1@next -p package2@next -c "command"
```

Run scripts with different node version:

```bash
npx -p node@version -- node index.js
```

Run remote repo/gist code:

```bash
npx user/repo#branch
npx gistUrl
```

:::tip NPX Cache

NPX cache packages in `~/.npm/_npx`.

:::

To get latest version package:

```bash
# https://github.com/return-0x0/node-clear-npx-cache.
# https://github.com/npm/cli/issues/2329.
# https://github.com/npm/cli/issues/2395.
# https://github.com/npm/cli/pull/2592.
# https://github.com/facebook/create-react-app/issues/10601.
# https://github.com/facebook/create-react-app/issues/12022.
npx clear-npx-cache
npx create-react-app app
```

### NPM Dependencies

- Dependency Nesting/Hell (NPM v1).
- Dependency Flatten/Hoist (NPM v3).
- Dependency Consistent Lockfile (NPM v5 and Yarn).
- Dependency Hard/Symbol Links (PNPM):
  - Hard links for global `.pnpm` store to save disk storage.
  - Symbol links for local require short path with non-flat `node_modules`
    to rectify **doppelgangers** and **ghost/phantom dependencies** problem.
- `peerDependencies`:
  提示宿主环境去安装满足插件 `peerDependencies` 所指定依赖的包,
  然后在插件 `import` 或者 `require` 所依赖的包的时候,
  永远都是引用宿主环境统一安装的 NPM 包,
  最终解决插件与所依赖包不一致的问题.
- 构建依赖树的过程中, 版本确认需要结合 `package.json` 和 `package-lock.json`:
  - 先确认 `package-lock.json` 安装版本,
    符合规则就以此为准,
    否则由 `package.json` 声明的版本范围重新确认.
  - 若是在开发中手动更改包信息,
    会导致 **lockfile** 版本信息异常,
    也由 `package.json` 重新确认.
  - 确认好的依赖树会存到 `package-lock.json` 文件中.
- 同一个依赖, 更高版本的包会安装到顶层 `node_modules` 目录,
  低版本的包会分散在某些依赖的 `node_modules` 目录.
- **Lockfile** 保证项目依赖结构的确定性, 保障项目在多环境运行的稳定性.

#### NPM Doppelgangers

- Singleton conflict: multiple version of same package in `node_modules`.
- Types conflict: global `types` naming conflict.

#### NPM Ghost Dependency

NPM ghost (phantom) dependency:

- Imported packages from `dependencies of dependencies`:
  When update `dependencies` to minor version,
  `dependencies of dependencies` may get major BREAKING version
  (It's legal for `semver`, when `dependencies` API don't change).
- Imported packages from `devDependencies`:
  When others install your library,
  such imported packages will missing,
  cause they aren't located in library `package.json`.
- Imported packages from root `node_modules` in monorepo.
  When others install your library,
  such imported packages will missing,
  cause they aren't located in library `package.json`.

#### NPM Invalid Dependency

```bash
$ npm ls
package@version invalid
```

Modify `package-lock.json`
to remove locked invalid package version.

### Package JSON

#### Bin

当设置了 `bin` 字段后,
在 `package.json` `script` 字段中,
可以使用简写编写命令
(但是局部安装无法在 shell 下使用, 需 `npx <bin-name>`).

#### Version

```bash
npm version major
npm version minor
npm version patch
```

#### NPM Workspaces

In root `package.json`:

```json
{
  "workspaces": [
    "./packages/*",
    "./css/*",
    "./angular/*",
    "./react/*",
    "./vue/*"
  ]
}
```

In root `cwd`:

```bash
npm i
npm run lint -ws
npm run test -w package-a
npm i lodash -w package-b
npm i -D eslint -w package-c
```

#### Exports Field

`exports` can define [public API](https://zellwk.com/blog/npm-exports):

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "module": "./dist/index.mjs",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "default": "./dist/index.mjs"
    },
    "./package.json": "./package.json"
  },
  "types": "./dist/index.d.ts",
  "browser": "./dist/index.mjs",
  "module": "./dist/index.mjs",
  "main": "./dist/index.cjs"
}
```

`exports` configures JavaScript level,
file `packages/rest/build/gen/util/regexp-tools.js`
can be imported via `@github/rest/gen/util/regexp-tools`:

- Don't need to mention directory `build`/`dist` in module specifiers.
- Don't need to mention `.js`/`.ts` in module specifiers.

```json
{
  "name": "@github/rest",
  "private": true,
  "exports": {
    "./": "./dist/index.js",
    "./gen/*": "./dist/gen/*.js",
    "./client/*": "./dist/client/*.js",
    "./contract": "./dist/contract.js",
    "./state": "./dist/state.js",
    "./package.json": "./package.json"
  }
}
```

```js
import octokit from '@github/rest'
import { Contract } from '@github/rest/contract'
import utils from '@github/rest/gen/utils'
import state from '@github/rest/state'
```

#### Resolutions

Besides `git bisect` for debugging broken version,
revert to last working version with `resolutions` field
will help to [fix broken version too](https://github.com/ant-design/ant-design/pull/48829):

```json
{
  "resolutions": {
    "rc-field-form": "1.44.0"
  }
}
```

### Package Lockfile

[Dependency pinning](https://docs.renovatebot.com/dependency-pinning):

When kept in sync with its associated `package.json`,
a lockfile will further lock down the exact dependencies and sub-dependencies,
so that everyone running `npm i` or `yarn` will install the exact same dependencies.

If the `package.json` contains a range,
and a new in-range version is released that would break the build,
then essentially `package.json` is in a state of **broken**,
even if the lockfile is still holding things together.

- Apps (web or Node.js) that aren't `require()` by other packages
  should pin all types of dependencies for greatest reliability/predictability.
- Libraries that are `consumed`/`required()` by others
  should keep using SemVer ranges for **dependencies** (purge multiple version `node_modules`)
  but can use pinned devDependencies.

### CLI Environment

配置文件以 `.env`/`JS(Object)`/`JSON`/`JSONP`/`XML`/`YML` 格式单独存放,
方便读取.

```bash
# .env file (added to .gitignore)
NODE_ENV=development
PORT=8626
# Set your database/API connection information here
API_KEY=**************************
API_URL=**************************
```

```ts
// config.js
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
}
```

```ts
// server.js
const { port } = require('./config')

console.log(`Your port is ${port}`) // 8626
```

### Corepack

[Corepack](https://github.com/nodejs/corepack) is a tool to help with
managing versions of your package managers (package manager manager).

It exposes binary proxies for each supported package manager.
It will identify whatever package manager is configured for current project,
transparently install it if needed,
and finally run it without requiring explicit user interactions.

```bash
# In npm project
corepack yarn

# In npm project
corepack pnpm
```

```bash
corepack enable yarn
corepack disable pnpm
```

## Yarn

[Yarn Berry](https://yarnpkg.com/getting-started/migration):

```bash
# Modify `/etc/hosts`
npm i -g yarn
cd project/
yarn set version berry
```

Setup basic configuration `.yarnrc.yml`:

```yml
yarnPath: .yarn/releases/yarn-berry.cjs
nodeLinker: node-modules
npmPublishAccess: public
npmPublishRegistry: 'https://registry.npmjs.org'
npmRegistryServer: 'https://registry.npmjs.org'
```

Update `.gitignore` file:

```bash
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp/
.pnp.js
```

### Yarn Configuration

```bash
yarn config set nodeLinker node-modules --home
yarn config set npmPublishAccess public --home
yarn config set npmRegistryServer "https://registry.npmjs.org" --home
yarn config set yarnPath .yarn/releases/yarn-berry.cjs --home
yarn config set unsafeHttpWhitelist --json '["localhost", "*.example.com", "example.com"]'
```

### Yarn Updates

One line to update all deps in monorepo:

```bash
yarn up @types/node
yarn up @types/react
yarn dedupe --strategy highest
```

### Yarn Workspace

```bash
yarn workspace packageName build
```

### Yarn Plugin

```bash
yarn plugin list
```

### Yarn Patch

Modify package in `node_modules` conveniently:

- Run `yarn patch <package>` will create copy of `package` to `tmp/xfs-xxxxxxxx/user/`.
- After modify source code of `package`,
  run `yarn patch-commit /tmp/xfs-xxxxxxxx/user --save`.

### Yarn Berry Read World Case

- [Gatsby](https://github.com/gatsbyjs/gatsby):
  yarn 1 with `.yarn/` directory.
- [Redux ToolKit](https://github.com/reduxjs/redux-toolkit):
  yarn 2.
- [Babel](https://github.com/babel/babel):
  yarn 3.
- [StoryBook](https://github.com/storybookjs/storybook):
  yarn 3.

## PNPM

### PNPM Installation

Using Corepack or npm (recommended installation):

```bash
# Using Corepack.
corepack enable pnpm

# Using npm.
npm install -g pnpm
```

```bash
alias np=pnpm
source ~/.zshrc
which pnpm
pnpm --version
pnpm store path
```

Using a standalone script (without Node.js installed):

```bash
# By script.
wget -qO- https://get.pnpm.io/install.sh | sh -

# By manual download.
mv ./pnpm-linux-x64 ./pnpm
chmod +x ./pnpm
./pnpm setup --force
```

### PNPM Configuration

```bash
pnpm config set registry https://registry.npmmirror.com/
```

## Self-Defined Module

### Basic Modular Pattern

编写具有回调函数参数的模块

- 定义模块

```ts
function foo(x, y, callback) {
  try {
    if (paramNotValid())
      throw new Error('Invalid parameters!')
    else
      callback(null, param)
  } catch (error) {
    callback(error, param)
  }
}
```

- 使用模块

```ts
foo(a, b, (err, param) => {
  if (err)
    processError()
  else
    process()
})
```

### Export Module

```ts
module.exports = function (args) {
  /* ... */
}
```

### CallBack Function

- 向定义最内层回调,可避免回套嵌套

```ts
server.on('request', (req, res) => {
  const render = function (wsData) {
    page = pageRender(req, session, userData, wsData)
  }
  const getWsInfo = function (userData) {
    ws.get(req, render)
  }
  const getDbInfo = function (session) {
    db.get(session.user, getWsInfo)
  }
  const getMemCached = function (req, res) {
    memcached.getSession(req, getDbInfo)
  }
})
```

### Module Resolution

`const x = require('./module')`:

- `/root/src/module.js`
- `/root/src/module/package.json` + `{ "main": "lib/mainModule.js" }`
  = `/root/src/module/lib/mainModule.js`
- `/root/src/module/index.js`

`const x = require('module')`:

- `/root/src/node_modules/module.js`
- `/root/src/node_modules/module/package.json` (if it specifies a `main` property)
- `/root/src/node_modules/module/index.js`
- `/root/node_modules/module.js`
- `/root/node_modules/module/package.json` (if it specifies a `main` property)
- `/root/node_modules/module/index.js`
- `/node_modules/module.js`
- `/node_modules/module/package.json` (if it specifies a `main` property)
- `/node_modules/module/index.js`

## Node Module

- CommonJS 模块在执行阶段同步加载子模块文件,
  ES6 模块在预处理阶段加载子模块文件, ES6 模块在执行阶段也会加载子模块文件, 不过会使用预处理阶段的缓存.
- CommonJS 模块同步加载并执行模块文件, ES6 模块提前加载并执行模块文件.
  异步通常被理解为延后一个时间节点执行, 所以说成异步加载是错误的.
- 从形式上看,
  CommonJS 模块整体导出一个包含若干个变量的对象,
  ES6 模块分开导出单个变量.

### CommonJS Module

- `CommonJS` 模块一般由包管理器提供的运行时实现.
- 由于 `require` 语句直接分割了执行的代码块,
  `CommonJS` 模块的导入导出语句的位置会影响模块代码语句的执行结果.

```ts
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

function Module(id) {
  this.id = id
  this.exports = {}
}

Module.wrapper = [
  '(function(exports, module, Require, __dirname, __filename) {',
  '})',
]

Module._extensions = {
  '.js': function (module) {
    const content = fs.readFileSync(module.id, 'utf8')
    const fnStr = Module.wrapper[0] + content + Module.wrapper[1]
    const fn = vm.runInThisContext(fnStr)
    fn.call(
      module.exports, // Bind `this` to `module.exports`
      module.exports,
      module,
      Require,
      _dirname,
      _filename
    )
  },
  '.json': function (module) {
    const json = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(json) // 把文件的结果放在exports属性上
  },
}

function Require(modulePath) {
  const absPathname = path.resolve(__dirname, modulePath)
  const module = new Module(absPathname)
  tryModuleLoad(module)
  return module.exports
}

function tryModuleLoad(module) {
  const extension = path.extname(module.id)
  Module._extensions[extension](module)
}
```

### EcmaScript Module

- `ES6` 模块借助 `JS` 引擎实现.
  `JS` 引擎实现了 `ES6` 模块的底层核心逻辑.
- `ES6` 模块有 5 种状态,
  分别为 `unlinked`, `linking`, `linked`, `evaluating` and `evaluated`
  (Module Environment Records).
- 由于连接阶段会给导入模块变量创建绑定并初始化为子模块的对应变量,
  子模块的对应变量在评估阶段会先被赋值,
  所以导入模块变量获得了和函数声明变量一样的提升效果.
  `ES6` 模块的 `import/export` 位置不影响模块代码语句的执行结果.
- Experimental `.mjs` file.

## Process Module

### Process Properties

- `process.pid`: 当前进程的进程号.
- `process.version`: Node 的版本, 比如 v0.10.18.
- `process.platform`: 当前系统平台, 比如 Linux.
- `process.title`: 默认值为“node”, 可以自定义该值.
- `process.argv`: 当前进程的命令行参数数组.
- `process.env`: 指向当前 shell 的环境变量, 比如 process.env.HOME.
- `process.execPath`: 运行当前进程的可执行文件的绝对路径.
- `process.stdout`: 指向标准输出.
- `process.stdin`: 指向标准输入.
- `process.stderr`: 指向标准错误.

```ts
process.stdin.resume()
process.stdin.pipe(process.stdout)
```

### Process Events

- Error events:
  - `uncaughtException`.
  - `unhandledRejection`.
- Signal events:
  - `SIGHUP`.
  - `SIGINT`.
  - `SIGQUIT`.
  - `SIGTERM`.
- Exit events:
  - `beforeExit`.
  - `exit`.
- Node HTTP applications graceful shutdown
  [library](https://github.com/godaddy/terminus).

```ts
process.on('uncaughtException', (err) => {
  console.log(`Uncaught exception: ${err.message}.`)
  process.exit(1)
})
process.on('uncaughtException', (reason, promise) => {
  console.log(`Unhandled rejection at ${promise}, reason: ${reason}.`)
  process.exit(1)
})

process.on('SIGHUP', (signal) => {
  console.log(`Process ${process.pid} received a SIGHUP signal.`)
  process.exit(0)
})
process.on('SIGINT', (signal) => {
  console.log(`Process ${process.pid} has been interrupted.`)
  process.exit(0)
})
process.on('SIGQUIT', (signal) => {
  console.log(`Process ${process.pid} received a SIGQUIT signal.`)
  process.exit(0)
})
process.on('SIGTERM', (signal) => {
  console.log(`Process ${process.pid} received a SIGTERM signal.`)
  process.exit(0)
})

process.on('beforeExit', (code) => {
  setTimeout(() => {
    console.log(`Process will exit with code: ${code}.`)
    process.exit(code)
  })
})
process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}.`)
})
```

### Process Information

- process.on()
- process.uptime(): 进程运行时长
- process.getgid/setgid/getuid/setuid();
- process.cwd()
- process.memoryUsage()

### Process Event Loop and Counter

- process.nextTick()

### Child Process

- `cp.spawn()`: 创建子进程, 拥有独立的 stdin/stdout/stderr 文件描述符
- `cp.exec()`: 创建子进程, 并会在进程结束时调用传入的回调函数
- [Exec Library](https://github.com/sindresorhus/execa)
- Each spawned Node.js child process is independent
  and has its own memory, event-loop, and V8 instance.
- Use `process.on` to communicate between parent and child process.

```ts
const cp = require('node:child_process')

cp.exec(
  'ls -l',
  {
    encoding: 'uft-8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: null,
    env: null,
  },
  (err, stdout, stderr) => {
    if (!err) {
      console.log(stdout)
      console.log(stderr)
    }
  }
)
```

## Worker Threads Module

Worker threads use threads to execute the work
within the same process of the main application:

- Worker threads are lightweight compared to child processes.
- Worker threads can share memory (can transfer `ArrayBuffer`).
- Each Node.js worker thread has its own independent Node.js runtime
  (including its own V8 instance, event loop, etc.)
  with its own isolated context,
  therefore **no thread synchronization** is usually needed.

```ts
// fibonacci-worker.js
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('node:worker_threads')

function fibonacci(num) {
  if (num <= 1)
    return num
  return fibonacci(num - 1) + fibonacci(num - 2)
}

if (isMainThread) {
  module.exports = n =>
    new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: n,
      })
      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`))
      })
    })
} else {
  const result = fibonacci(workerData)
  parentPort.postMessage(result)
  process.exit(0)
}
```

```ts
const http = require('node:http')
const fibonacciWorker = require('./fibonacci-worker')

const port = 3000

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log('Incoming request to:', url.pathname)

    if (url.pathname === '/fibonacci') {
      const n = Number(url.searchParams.get('n'))
      console.log('Calculating fibonacci for', n)

      const result = await fibonacciWorker(n)
      res.writeHead(200)
      return res.end(`Result: ${result}\n`)
    } else {
      res.writeHead(200)
      return res.end('Hello World!')
    }
  })
  .listen(port, () => console.log(`Listening on port ${port}...`))
```

Worker pool is needed:

- Creating a new worker/process is expensive.
  For best performance, they should be reused.
- No control over the number of workers/processes created without worker pool.
  This leaves vulnerable to DoS attacks.
- [Worker pool library](https://github.com/josdejong/workerpool)

```ts
// task-worker.js
const { parentPort } = require('node:worker_threads')

parentPort.on('message', (task) => {
  // Simulate CPU work
  const result = task.number * 2
  parentPort.postMessage({ id: task.id, result })
})
```

```ts
const os = require('node:os')
// worker-pool.js
const { Worker } = require('node:worker_threads')

class WorkerPool {
  constructor(workerPath, poolSize = os.cpus().length) {
    this.workerPath = workerPath
    this.poolSize = poolSize
    this.workers = []
    this.taskQueue = []
    this.activeTasks = new Map()

    for (let i = 0; i < this.poolSize; i++) {
      this.addWorker()
    }
  }

  addWorker() {
    const worker = new Worker(this.workerPath)
    worker.on('message', (msg) => {
      const { resolve } = this.activeTasks.get(msg.id)
      this.activeTasks.delete(msg.id)
      resolve(msg.result)
      this.checkQueue(worker)
    })
    worker.on('error', console.error)
    worker.on('exit', () => {
      this.workers = this.workers.filter(w => w !== worker)
      this.addWorker() // Replace worker if it exits unexpectedly
    })
    this.workers.push(worker)
  }

  runTask(data) {
    return new Promise((resolve) => {
      const id = Date.now() + Math.random() // Unique task ID
      const task = { id, number: data }
      this.taskQueue.push({ task, resolve })
      this.checkQueue()
    })
  }

  checkQueue(workerOverride) {
    if (this.taskQueue.length === 0)
      return

    const idleWorker = workerOverride || this.workers.find(
      worker => ![...this.activeTasks.values()].some(w => w.worker === worker)
    )

    if (!idleWorker)
      return

    const { task, resolve } = this.taskQueue.shift()
    this.activeTasks.set(task.id, { worker: idleWorker, resolve })
    idleWorker.postMessage(task)
  }

  destroy() {
    this.workers.forEach(worker => worker.terminate())
  }
}

(async () => {
  const pool = new WorkerPool('./task-worker.js')

  const tasks = [10, 20, 30, 40, 50]
  const results = await Promise.all(tasks.map(num => pool.runTask(num)))

  console.log('Results:', results) // [20, 40, 60, 80, 100]
  pool.destroy()
})()
```

## File Module

### FS API

- fs.createReadStream.
- fs.opendir.
- fs.readdir.
- fs.readFile.
- fs.readFileSync.
- fs.exists.

```ts
const fs = require('node:fs')

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf8' }, (err, contents) => {
      if (err) {
        reject(err)
        return
      }

      resolve(contents)
    })
  })
}

readFile('example.txt')
  .then((contents) => {
    console.log(contents)
  })
  .catch((err) => {
    console.error(err.message)
  })
```

```ts
import { promises as fs } from 'node:fs'
import { basename, dirname, join } from 'node:path'

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = join(dir, d.name)

    if (d.isDirectory())
      yield* walk(entry)
    else if (d.isFile())
      yield entry
  }
}

async function run(arg = '.') {
  if ((await fs.lstat(arg)).isFile())
    return runTestFile(arg)

  for await (const file of walk(arg)) {
    if (
      !dirname(file).includes('node_modules')
      && (basename(file) === 'test.js' || file.endsWith('.test.js'))
    ) {
      console.log(file)
      await runTestFile(file)
    }
  }
}
```

```ts
import fs from 'node:fs/promises'
import path from 'node:path'

async function traverse(directory) {
  const files = await fs.readdir(directory)

  files.forEach(async (file) => {
    const filePath = path.join(directory, file)
    const fileStat = await fs.stat(filePath)

    if (fileStat.isFile()) {
      const content = await fs.readFile(filePath, 'utf-8')
      console.log(content)
    } else if (fileStat.isDirectory()) {
      await traverse(filePath)
    }
  })
}
```

```ts
module.exports = function ls(dirName, fileType, callback) {
  const fs = require('node:fs')
  const path = require('node:path')

  fs.readdir(dirName, (err, list) => {
    if (err)
      return callback(err)

    list = list.filter((file) => {
      return path.extname(file) === `.${fileType}`
    })

    callback(null, list)
  })
}
```

### Buffer Object

```ts
const str = buf.toString()
```

### Path API

- path.resolve: 自动按系统处理路径
- path.extname: 返回文件类型

```ts
const path = require('node:path')

console.log(path.extname('index.html')) // .html

path.normalize(p)
path.join([path1], [path2], [pathN])
path.resolve(from, to)
path.relative(from, to)
path.dirname(p)
path.basename(p, [ext])
path.extname(p)
const separator = path.sep
const delimiter = path.delimiter
```

### File Reference

- Files read and write complete modern [guide](https://nodejsdesignpatterns.com/blog/reading-writing-files-nodejs).

## Stream Module

```ts
import { createReadStream, createWriteStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

// Create transform streams with clean, focused logic
const upperCaseTransform = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

// Process files with robust error handling
async function processFile(inputFile, outputFile) {
  try {
    await pipeline(
      createReadStream(inputFile),
      upperCaseTransform,
      createWriteStream(outputFile)
    )
    console.log('File processed successfully')
  } catch (error) {
    console.error('Pipeline failed:', error)
    throw error
  }
}
```

```ts
// Create a Web Stream (compatible with browsers)
const webReadable = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello ')
    controller.enqueue('World!')
    controller.close()
  }
})

// Convert between Web Streams and Node.js streams
const nodeStream = Readable.fromWeb(webReadable)
const backToWeb = Readable.toWeb(nodeStream)
```

## EventEmitter Module

```ts
import { EventEmitter, once } from 'node:events'

class DataProcessor extends EventEmitter {
  async* processStream() {
    for (let i = 0; i < 10; i++) {
      this.emit('data', `chunk-${i}`)
      yield `processed-${i}`
      // Simulate async processing time
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    this.emit('end')
  }
}

// Consume events as an async iterator
const processor = new DataProcessor()
for await (const result of processor.processStream()) {
  console.log('Processed:', result)
}
```

## Fetch Module

```ts
async function fetchData(url) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000) // Built-in timeout support
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error('Request timed out')
    }
    throw error
  }
}
```

```ts
// Cancel long-running operations cleanly
const controller = new AbortController()

// Set up automatic cancellation
setTimeout(() => controller.abort(), 10000)

try {
  const data = await fetch('https://slow-api.com/data', {
    signal: controller.signal
  })
  console.log('Data received:', data)
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled - this is expected behavior')
  } else {
    console.error('Unexpected error:', error)
  }
}
```

## Http Module

### Request Object

#### 属性

```ts
const request = {
  method: 'POST',
}
```

### Response Object

#### 类型

```cpp
typedef Stream response
```

#### 事件

- 监听事件

```ts
response.on('data', (data) => {
  process(data)
})
response.on('error', (err) => {
  console.error(err)
})
response.on('end', () => {
  stream.end()
})
```

- 发出事件

```ts
response.end() //  传输结束
```

#### 方法

```ts
response.setEncoding('utf8') // 自动将 data 事件中 Buffer 对象转换成 String

//  content-type: text/plain
//                application/json
response.writeHead(200, { 'Content-Type': '' })
```

### Http Get

```ts
http.get(url, (response) => {})
```

```ts
http.get(url, (response) => {
  let pipeData = ''

  response.setEncoding('utf8')
  response.on('data', (data) => {
    pipeData += data
  })
  response.on('end', () => {
    console.log(pipeData.length)
    console.log(pipeData)
  })
})
```

### Http Server

```ts
const server = http.createServer((request, response) => {
  // 处理请求的逻辑...
})
server.listen(8000)
```

### Sample

```ts
const net = require('node:net')

const chatServer = net.createServer()
// 用于检测僵尸客户端,用于及时清楚僵尸客户端
const clientList = []

chatServer.on('connection', (client) => {
  client.name = `${client.remoteAddress}:${client.remotePort}`
  client.write(`Hi ${client.name}!\n`)
  clientList.push(client)

  client.on('data', (data) => {
    broadcast(data, client)
  })
  client.on('end', () => {
    clientList.splice(clientList.indexOf(client), 1)
  })
  client.on('error', (e) => {
    console.log(e)
  })
})

function broadcast(message, client) {
  const cleanup = []

  for (let i = 0; i < clientList.length; i += 1) {
    // 向其他人(排除自身)发送消息
    if (client !== clientList[i]) {
      if (clientList[i].writable) {
        clientList[i].write(`${client.name} says ${message}`)
      } else {
        cleanup.push(clientList[i])
        clientList[i].destroy()
      }
    }
  }

  // 清楚僵尸客户端
  for (let i = 0; i < cleanup.length; i += 1)
    clientList.splice(clientList.indexOf(cleanup[i]), 1)
}

chatServer.listen(9000)
```

## Net Module

### Socket Object

```ts
socket.write(data)
socket.end(data)
socket.end()
```

### Socket IO

```ts
const fs = require('node:fs')
const http = require('node:http')
const io = require('socket.io')

const sockFile = fs.readFileSync('socket.html')

server = http.createServer()
server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(sockFile)
})
server.listen(8080)

const socket = io.listen(server)

// 命名空间
socket.of('/upAndRunning').on('connection', (client) => {
  console.log('Client connected to Up and Running namespace.')
  client.send('Welcome to \'Up and Running\'')
})
socket.of('/weather').on('connection', (client) => {
  console.log('Client connected to Weather namespace.')
  client.send('Welcome to \'Weather Updates\'')
})
```

### Basic Methods

```ts
const serverInstance = net.createServer((socket) => {})

serverInstance.listen(portNumber) // 开始监听特定端口
```

## URL Module

### Basic Method

#### parse

解析处 URL 各个组成部分:

- href
- protocol
- host
- auth
- hostname
- port
- pathname
- search
- query
- hash

```ts
// true 表示调用 queryString 模块查询字符串
url.parse(request.url, true)
```

### dns

- dns.resolve
- dns.reverse
- dns.lookup

```ts
const dns = require('node:dns')

dns.lookup('google.com', 4, (e, a) => {
  console.log(a)
})

dns.resolve('tazimi.tk', 'A', (e, r) => {
  if (e)
    console.log(e)

  console.log(JSON.stringify(r, null, 2))
})
```

```ts
const dns = require('node:dns')

dns.resolve('tazimi.dev', 'A', (err, res) => {
  if (err)
    console.log(err)
  else
    console.log(`A: ${JSON.stringify(res, null, 2)}`)
})

dns.resolve('github.com', 'MX', (err, res) => {
  if (err)
    console.log(err)
  else
    console.log(`MX: ${JSON.stringify(res, null, 2)}`)
})
```

## Security Module

### Crypto

- hash algorithm
- hmac algorithm
- cipher/decipher algorithms
- signature/validate

#### Hash API

```ts
const crypto = require('node:crypto')

const md5 = crypto.createHash('md5')

md5.update('foo')
md5.digest('hex') // 'acbd18db4cc2f85cedef654fccc4a4d8'
```

#### HMAC API

```bash
openssl genrsa -out key.pem 1024
```

```ts
const crypto = require('node:crypto')
const fs = require('node:fs')

const pem = fs.readFileSync('key.pem')
const key = pem.toString('ascii')
const hmac = crypto.createHmac('sha1', key)

hmac.update('bar')
hmac.digest('hex') // '7x123'
```

### UUID Generation

Enhance usability of unique identifiers by
[prefixing and encoding in base58](https://unkey.dev/blog/uuid-ux):

```ts
// src/utils/id.ts
import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

const prefixes = {
  key: 'key',
  api: 'api',
  policy: 'pol',
  request: 'req',
  workspace: 'ws',
  vercelBinding: 'vb',
  keyAuth: 'key_auth', // <-- this is internal and does not need to be short or pretty
  test: 'test', // <-- for tests only
} as const

export function newId(
  prefix: keyof typeof prefixes,
  length: number = 16
): string {
  return [prefixes[prefix], nanoid(length)].join('_')
}
```

```ts
// app.ts
import { newId } from '@utils/id'

const id = newId('workspace')
// ws_dYuyGV3qMKvEbjML

const id = newId('keyY')
// invalid because `keyY` is not a valid prefix name
```

## Async Module

对回调进行计数是处理 Node 中异步的基础 - 自定义 Semaphore 变量: 每完成一个异步处理, Semaphore++

### Cluster Module

```ts
const cluster = require('node:cluster')
const http = require('node:http')
const numCPUs = require('node:os').cpus().length

const rssWarn = 50 * 1024 * 1024
const heapWarn = 50 * 1024 * 1024
const workers = {}

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++)
    createWorker()

  setInterval(() => {
    const time = new Date().getTime()
    for (pid in workers) {
      if (
        Object.prototype.hasOwnProperty.call(workers, pid)
        && workers[pid].lastCb + 5000 < time
      ) {
        console.log(`Long running worker ${pid} killed`)
        workers[pid].worker.kill()
        delete workers[pid]
        createWorker()
      }
    }
  }, 1000)
} else {
  // Server
  http
    .Server((req, res) => {
      // mess up 1 in 200 request
      if (Math.floor(Math.random() * 200) === 4) {
        console.log(`Stopped ${process.pid} from ever finishing`)
        while (true)
          continue
      }
      res.writeHead(200)
      res.end(`hello world from ${process.pid}\n`)
    })
    .listen(8000)
  // Report stats once a second
  setInterval(() => {
    process.send({
      cmd: 'reportMem',
      memory: process.memoryUsage(),
      process: process.pid,
    })
  }, 1000)
}

function createWorker() {
  const worker = cluster.fork()
  console.log(`Created worker: ${worker.pid}`)

  // allow boot time
  workers[worker.pid] = { worker, lastCb: new Date().getTime() - 1000 }
  worker.on('message', (m) => {
    if (m.cmd === 'reportMem') {
      workers[m.process].lastCb = new Date().getTime()
      if (m.memory.rss > rssWarn)
        console.log(`Worker ${m.process} using too much memory.`)
    }
  })
}
```

## Test Module

### Assert Module

- `assert.equal(expect, real, assertPrompt)`.
- `assert.notEqual(expect, real, assertPrompt)`.
- `assert.strictEqual(expect, real, assertPrompt)`.
- `assert.notStrictEqual(expect, real, assertPrompt)`.
- `assert.deepEqual(expect, real, assertPrompt)`.
- `assert.notDeepEqual(expect, real, assertPrompt)`.
- `assert.ok(var, assertPrompt): 测试对象真值(truthy/falsy)`.
- `assert.throws(fn)`: 测试方法是否抛出异常.
- `assert.doesNotThrow(fn)`: 测试方法是否抛出异常.

```ts
const assert = require('node:assert')

assert.equal(1, true, 'Truthy')
assert.notEqual(1, true, 'Truthy')

assert.ok(0, 'Zero is not truthy')
```

## Modern Node.js

Modern [features](https://nodesource.com/blog/nodejs-features-replacing-npm-packages)
replacing npm packages:

- `node-fetch` -> `fetch`.
- `ws` -> `WebSocket`.
- `jest` -> `node:test`.
- `better-sqlite3` -> `node:sqlite`.
- `chalk` -> `util.styleText()`.
- `strip-ansi` -> `util.stripVTControlCharacters()`.
- `glob` -> `fs.glob()`.
- `rimraf` -> `fs.rm({ recursive: true, force: true })`.
- `mkdirp` -> `fs.mkdir({ recursive: true })`.
- `uuid` → `crypto.randomUUID()`.
- `base64-js` -> `Buffer`, `atob`, `btoa`.
- `url-pattern` → `URLPattern`.
- `event-target-shim` → `EventTarget`.

```ts
import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import { open } from 'node:sqlite'
import test from 'node:test'
import { stripVTControlCharacters, styleText } from 'node:util'

const res = await fetch('https://api.github.com/repos/nodejs/node')
const data = await res.json()
console.log(data.full_name) // "nodejs/node"

const ws = new WebSocket('wss://echo.websocket.org')
ws.onopen = () => ws.send('Hello!')
ws.onmessage = event => console.log('Received:', event.data)

test('addition works', () => {
  assert.strictEqual(2 + 2, 4)
})

const db = await open(':memory:')
await db.exec('CREATE TABLE users (id INTEGER, name TEXT)')

console.log(styleText('red', 'Error!'))
console.log(styleText(['bold', 'green'], 'Success!'))

const text = '\u001B[4mUnderlined\u001B[0m'
console.log(stripVTControlCharacters(text))

const files = await fs.glob('**/*.js')
await fs.rm('dist', { recursive: true, force: true })
await fs.mkdir('logs/app', { recursive: true })

console.log(randomUUID())

const encoded = btoa('hello')
console.log(encoded) // "aGVsbG8="
console.log(atob(encoded)) // "hello"

const pattern = new URLPattern({ pathname: '/users/:id' })
const match = pattern.exec('/users/42')
console.log(match.pathname.groups.id) // "42"

const target = new EventTarget()
target.addEventListener('ping', () => console.log('pong'))
target.dispatchEvent(new Event('ping'))
```

## Debugging

### Inspector CLI

[Enable inspector](https://nodejs.org/en/docs/guides/debugging-getting-started);

```bash
node --inspect server.js # Start debugging.
node --inspect-brk server.js # Start debugging and break.
```

[Enable core modules debug information](https://nodejs.dev/en/api/v18/cli/#node_debugmodule):

```bash
NODE_DEBUG=fs,net,stream yarn test
```

## Node Web Crawler

[Simple example](https://www.zenrows.com/blog/web-scraping-with-javascript-and-nodejs):

```ts
const axios = require('axios')
const cheerio = require('cheerio')
const playwright = require('playwright')

const url = 'https://scrapeme.live/shop/page/1/'
const useHeadless = false // "true" to use playwright
const maxVisits = 30 // Arbitrary number for the maximum of links visited
const visited = new Set()
const allProducts = []

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function getHtmlPlaywright(url) {
  const browser = await playwright.firefox.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(url)
  const html = await page.content()
  await browser.close()

  return html
}

async function getHtmlAxios(url) {
  const { data } = await axios.get(url)

  return data
}

async function getHtml(url) {
  return useHeadless ? await getHtmlPlaywright(url) : await getHtmlAxios(url)
}

function extractContent($) {
  return $('.product')
    .map((_, product) => {
      const $product = $(product)

      return {
        id: $product.find('a[data-product_id]').attr('data-product_id'),
        title: $product.find('h2').text(),
        price: $product.find('.price').text(),
      }
    })
    .toArray()
}

function extractLinks($) {
  return [
    ...new Set(
      $('.page-numbers a')
        .map((_, a) => $(a).attr('href'))
        .toArray()
    ),
  ]
}

async function crawl(url) {
  visited.add(url)
  console.log('Crawl: ', url)
  const html = await getHtml(url)
  const $ = cheerio.load(html)
  const content = extractContent($)
  const links = extractLinks($)
  links
    .filter(link => !visited.has(link))
    .forEach((link) => {
      q.enqueue(crawlTask, link)
    })
  allProducts.push(...content)

  // We can see how the list grows. Gotta catch 'em all!
  console.log(allProducts.length)
}

// Change the default concurrency or pass it as param
function queue(concurrency = 4) {
  let running = 0
  const tasks = []

  return {
    enqueue: async (task, ...params) => {
      tasks.push({ task, params })
      if (running >= concurrency)
        return

      ++running
      while (tasks.length) {
        const { task, params } = tasks.shift()
        await task(...params)
      }
      --running
    },
  }
}

async function crawlTask(url) {
  if (visited.size >= maxVisits) {
    console.log('Over Max Visits, exiting')
    return
  }

  if (visited.has(url))
    return

  await crawl(url)
}

const q = queue()
q.enqueue(crawlTask, url)
```

Web scraping with [impersonation](https://lev.engineer/blog/web-scraping-like-a-pro-unlocking-the-power-of-impersonation):

```ts
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://example.com')

  // Now your Puppeteer script is enhanced with advanced evasion techniques
  // Proceed with your web scraping tasks

  await browser.close()
})()

const { chromium, devices } = require('playwright')

const iPhone11 = devices['iPhone 11'];

(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      + '(KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    geolocation: { latitude: 48.8584, longitude: 2.2945 }, // Paris, France
    permissions: ['geolocation'],
    locale: 'fr-FR',
    ...iPhone11,
  })
  const page = await context.newPage()
  await page.goto('https://example.com')

  // Your scraping logic here

  await browser.close()
})()
```

## Deno

- Node.js library to Deno [guide](https://www.edgedb.com/blog/how-we-converted-our-node-js-library-to-deno-using-deno).

## Node Reference

- Node.js [modern patterns](https://kashw1n.com/blog/nodejs-2025).
- Node.js official [tutorial](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs).
- Node.js [tao](https://alexkondov.com/tao-of-node).
- Node.js [best practices](https://github.com/goldbergyoni/nodebestpractices).
- Node.js testing [best practices](https://github.com/goldbergyoni/nodejs-testing-best-practices).
