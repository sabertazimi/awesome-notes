# Node Basic Notes

[TOC]

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
// in package.json
"scripts": {
    "test": "node test.js"
},
```

```bash
npm test
```

### Publish Steps

`latest` or `alpha`

```bash
npm publish
npm publish --tag [<tag>]
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>]
```

Release script from VitePress:

```js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const semver = require('semver');
const { prompt } = require('enquirer');
const execa = require('execa');
const currentVersion = require('../package.json').version;

const versionIncrements = ['patch', 'minor', 'major'];

const inc = (i) => semver.inc(currentVersion, i);
const bin = (name) => path.resolve(__dirname, `../node_modules/.bin/${name}`);
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });
const step = (msg) => console.log(chalk.cyan(msg));

async function main() {
  let targetVersion;

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements
      .map((i) => `${i} (${inc(i)})`)
      .concat(['custom']),
  });

  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = release.match(/\((.*)\)/)[1];
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`);
  }

  const { yes: tagOk } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!tagOk) {
    return;
  }

  // Update the package version.
  step('\nUpdating the package version...');
  updatePackage(targetVersion);

  // Build the package.
  step('\nBuilding the package...');
  await run('yarn', ['build']);

  // Generate the changelog.
  step('\nGenerating the changelog...');
  await run('yarn', ['changelog']);
  await run('yarn', ['prettier', '--write', 'CHANGELOG.md']);

  const { yes: changelogOk } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Changelog generated. Does it look good?`,
  });

  if (!changelogOk) {
    return;
  }

  // Commit changes to the Git and create a tag.
  step('\nCommitting changes...');
  await run('git', ['add', 'CHANGELOG.md', 'package.json']);
  await run('git', ['commit', '-m', `release: v${targetVersion}`]);
  await run('git', ['tag', `v${targetVersion}`]);

  // Publish the package.
  step('\nPublishing the package...');
  await run('yarn', [
    'publish',
    '--new-version',
    targetVersion,
    '--no-commit-hooks',
    '--no-git-tag-version',
  ]);
  await run('npm', [
    'publish',
    '--registry',
    'https://registry.npmjs.org',
    '--access',
    'public',
  ]);

  // Push to GitHub.
  step('\nPushing to GitHub...');
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await run('git', ['push']);
}

function updatePackage(version) {
  const pkgPath = path.resolve(path.resolve(__dirname, '..'), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.version = version;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

main().catch((err) => console.error(err));
```

### Semantic Version

Semver:

- patch release: bugfix and other minor changes
- minor release: new features not breaking API(backward compatible)
- major release: new features breaking API(not backward compatible)

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
// with package-lock.json exists
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

run local node_modules

```bash
npm install eslint -D
npx eslint .
```

run global package (not installed)

```bash
npx create-react-app react-app
```

run specific version

```bash
npx -p package1@next -p package2@next -c "command"
```

run scripts with different node version

```bash
npx -p node@version -- node index.js
```

run remote repo/gist code

```bash
npx user/repo#branch
npx gistUrl
```

### NPM Dependencies

- peerDependencies:
  提示宿主环境去安装满足插件 peerDependencies 所指定依赖的包,
  然后在插件 import 或者 require 所依赖的包的时候,
  永远都是引用宿主环境统一安装的 npm 包,
  最终解决插件与所依赖包不一致的问题.

### Package JSON

#### bin

当设置了 bin 字段后, 在 package.json script 字段中，可以使用简写编写命令(但是局部安装无法使得 shell 下可使用简写)

#### version

```bash
npm version major
npm version minor
npm version patch
```

## Process Module

### Process Properties

```js
process.pid：当前进程的进程号。
process.version：Node的版本，比如v0.10.18。
process.platform：当前系统平台，比如Linux。
process.title：默认值为“node”，可以自定义该值。
process.argv：当前进程的命令行参数数组。
process.env：指向当前shell的环境变量，比如process.env.HOME。
process.execPath：运行当前进程的可执行文件的绝对路径。
process.stdout：指向标准输出。
process.stdin：指向标准输入。
process.stderr：指向标准错误。
```

```js
process.stdin.resume();
process.stdin.pipe(process.stdout);
```

### Process Events

- uncaughtException
- SIGINT
- exit

### Process Information

- process.on()
- process.uptime(): 进程运行时长
- process.getgid/setgid/getuid/setuid();
- process.cwd()
- process.memoryUsage()

### Process Event Loop and Counter

- process.nextTick()

### Child Process

- cp.spawn(): 创建子进程, 拥有独立的 stdin/stdout/stderr 文件描述符
- cp.exec(): 创建子进程, 并会在进程结束时调用传入的回调函数
- [Exec Library](https://github.com/sindresorhus/execa)

```js
const cp = require('child_process');

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
  function (err, stdout, stderr) {
    if (!err) {
      console.log(stdout);
      console.log(stderr);
    }
  }
);
```

## File Module

### FS API

- fs.createReadStream
- fs.readdir
- fs.readFile
- fs.readFileSync
- fs.exists

```js
var fs = require('fs');
var buf = fs.readFileSync('/path/to/file', [charSet]);
fs.readFile('/path/to/file', [charSet], function callback(err, dataBuf) {});
fs.readdir('/path/to/file', function callback(err, fileNameArr) {});

fs.createReadStream();

src.pipe(dst1).pipe(dst2).pipe(dst3); //  连接多个 stream
```

```js
module.exports = function ls(dirName, fileType, callback) {
  var fs = require('fs'),
    path = require('path');

  fs.readdir(dirName, function (err, list) {
    if (err) {
      return callback(err);
    }

    list = list.filter(function (file) {
      return path.extname(file) === '.' + fileType;
    });

    callback(null, list);
  });
};
```

### Buffer Object

```js
var str = buf.toString();
```

### Path API

- path.resolve: 自动按系统处理路径
- path.extname: 返回文件类型

```js
var path = require('path');

console.log(path.extname("index.html"));   // .html

path.normalize(p)
path.join([path1], [path2], [...])
path.resolve([from ...], to)
path.relative(from, to)
path.dirname(p)
path.basename(p, [ext])
path.extname(p)
path.sep
path.delimiter
```

## Self-Defined Modules

### Basic Modular Pattern

编写具有回调函数参数的模块

- 定义模块

```js
function foo(x, y, callback) {
    try {
        if (param not valid ) {
            throw new Error（）;
        } else {
            callback(null, param);
        }
    } catch (error) {
        callback(error, param);
    }
}
```

- 使用模块

```js
foo(a, b, function (err, param) {
    if(err) {

    } else {

    }
})；
```

### Export Modules

```js
module.exports = function (args) {
  /* ... */
};
```

### CallBack Function

- 向定义最内层回调,可避免回套嵌套

```js
server.on('request', function(req, res) {
    var render = function(wsData) {
        page = pageRender(req, session, userData, wsData);
    };
    var getWsInfo = function(userData) {
        ws.get(req, render);
    };
    var getDbInfo = function(session) {
        db.get(session.user, getWsInfo);
    };
    var getMemCached = function(req, res) {
        memcached.getSession(req, getDbInfo);
    };
}
```

## Http Module

### Request Object

#### 属性

```js
request.method; // POST GET
```

### Response Object

#### 类型

```c
typedef Stream response
```

#### 事件

- 监听事件

```js
response.on('data', function (data) {});
response.on('error', function (error) {});
response.on('end', function () {
  // 结束阶段
  stream.end();
});
```

- 发出事件

```js
response.end(); //  传输结束
```

#### 方法

```js
response.setEncoding('utf8'); // 自动将 data 事件中 Buffer 对象转换成 String

//  content-type: text/plain
//                application/json
response.writeHead(200, { 'Content-Type': '' });
```

### Http Get

```js
http.get(url, function callback(response) {});
```

```js
http.get(url, function (response) {
  var pipeData = '';

  response.setEncoding('utf8');
  response.on('data', function (data) {
    pipeData += data;
  });
  response.on('end', function () {
    console.log(pipeData.length);
    console.log(pipeData);
  });
});
```

### Http Server

```js
var server = http.createServer(function (request, response) {
  // 处理请求的逻辑...
});
server.listen(8000);
```

### Sample

```js
var net = require('net');
var chatServer = net.createServer(),
  // 用于检测僵尸客户端,用于及时清楚僵尸客户端
  clientList = [];

chatServer.on('connection', function (client) {
  client.name = client.remoteAddress + ':' + client.remotePort;
  client.write('Hi ' + client.name + '!\n');
  clientList.push(client);

  client.on('data', function (data) {
    broadcast(data, client);
  });
  client.on('end', function () {
    clientList.splice(clientList.indexOf(client), 1);
  });
  client.on('error', function (e) {
    console.log(e);
  });
});

function broadcast(message, client) {
  var cleanup = [];
  for (var i = 0; i < clientList.length; i += 1) {
    // 向其他人(排除自身)发送消息
    if (client !== clientList[i]) {
      if (clientList[i].writable) {
        clientList[i].write(client.name + ' says ' + message);
      } else {
        cleanup.push(clientList[i]);
        clientList[i].destroy();
      }
    }
  }

  // 清楚僵尸客户端
  for (i = 0; i < cleanup.length; i += 1) {
    clientList.splice(clientList.indexOf(cleanup[i]), 1);
  }
}

chatServer.listen(9000);
```

## Net Module

### Socket Object

```js
socket.write(data);
socket.end(data);
socket.end();
```

### Socket IO

```js
var http = require('http'),
  io = require('socket.io'),
  fs = require('fs'),
  sockFile = fs.readFileSync('socket.html');

server = http.createServer();
server.on('request', function (req, res) {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(sockFile);
});
server.listen(8080);

var socket = io.listen(server);

// 命名空间
socket.of('/upAndRunning').on('connection', function (client) {
  console.log('Client connected to Up and Running namespace.');
  client.send("Welcome to 'Up and Running'");
});
socket.of('/weather').on('connection', function (client) {
  console.log('Client connected to Weather namespace.');
  client.send("Welcome to 'Weather Updates'");
});
```

### Basic Methods

```js
var serverInstance = net.createServer(function callback(socket) {});

serverInstance.listen(portNumber); // 开始监听特定端口
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

```js
// true 表示调用 queryString 模块查询字符串
url.parse(request.url, true);
```

### dns

- dns.resolve
- dns.reverse
- dns.lookup

```js
var dns = require('dns');

dns.lookup('google.com', 4, function (e, a) {
  console.log(a);
});

dns.resolve('tazimi.tk', 'A', function (e, r) {
  if (e) {
    console.log(e);
  }
  console.log(JSON.stringify(r, null, 2));
});
```

```js
const dns = require('dns');

dns.resolve('tazimi.dev', 'A', function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log('A: ' + JSON.stringify(res, null, 2));
  }
});

dns.resolve('github.com', 'MX', function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log('MX: ' + JSON.stringify(res, null, 2));
  }
});
```

## Security Module

### Crypto

- hash algorithm
- hmac algorithm
- cipher/decipher algorithms
- signature/validate

#### Hash API

```js
var crypto = require('crypto'),
  md5 = crypto.createHash('md5');

md5.update('foo');
md5.digest('hex'); // 'acbd18db4cc2f85cedef654fccc4a4d8'
```

#### HMAC API

```bash
openssl genrsa -out key.pem 1024
```

```js
var crypto = require('crypto'),
  fs = require('fs'),
  pem = fs.readFileSync('key.pem'),
  key = pem.toString('ascii'),
  hmac = crypto.createHmac('sha1', key);

hmac.update('bar');
hmac.digest('hex'); // '7x123'
```

#### 公钥加密

## Async Modules

对回调进行计数是处理 Node 中异步的基础 - 自定义 Semaphore 变量: 每完成一个异步处理, Semaphore++

### Cluster Module

```js
var cluster = require('cluster'),
  http = require('http'),
  numCPUs = require('os').cpus().length;
var rssWarn = 50 * 1024 * 1024,
  heapWarn = 50 * 1024 * 1024;
var workers = {};

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    createWorker();
  }
  setInterval(function () {
    var time = new Date().getTime();
    for (pid in workers) {
      if (workers.hasOwnProperty(pid) && workers[pid].lastCb + 5000 < time) {
        console.log('Long running worker ' + pid + ' killed');
        workers[pid].worker.kill();
        delete workers[pid];
        createWorker();
      }
    }
  }, 1000);
} else {
  //Server
  http
    .Server(function (req, res) {
      //mess up 1 in 200 request
      if (Math.floor(Math.random() * 200) === 4) {
        console.log('Stopped ' + process.pid + ' from ever finishing');
        while (true) {
          continue;
        }
      }
      res.writeHead(200);
      res.end('hello world from ' + process.pid + '\n');
    })
    .listen(8000);
  //Report stats once a second
  setInterval(function report() {
    process.send({
      cmd: 'reportMem',
      memory: process.memoryUsage(),
      process: process.pid,
    });
  }, 1000);
}

function createWorker() {
  var worker = cluster.fork();
  console.log('Created worker: ' + worker.pid);

  //allow boot time
  workers[worker.pid] = { worker: worker, lastCb: new Date().getTime() - 1000 };
  worker.on('message', function (m) {
    if (m.cmd === 'reportMem') {
      workers[m.process].lastCb = new Date().getTime();
      if (m.memory.rss > rssWarn) {
        console.log('Worker ' + m.process + ' using too much memory.');
      }
    }
  });
}
```

## Test Modules

### assert

- assert.equal(expect, real, assertPrompt);
- assert.notEqual(expect, real, assertPrompt);
- assert.strictEqual(expect, real, assertPrompt);
- assert.notStrictEqual(expect, real, assertPrompt);
- assert.deepEqual(expect, real, assertPrompt);
- assert.notDeepEqual(expect, real, assertPrompt);
- assert.ok(var, assertPrompt): 测试对象真值(truthy/falsy)
- assert.throws(fn): 测试方法是否抛出异常
- assert.doesNotThrow(fn): 测试方法是否抛出异常

```js
var assert = require('assert');

assert.equal(1, true, 'Truthy');
assert.notEqual(1, true, 'Truthy');

assert.ok(0, 'Zero is not truthy');
```

## Environment

```js
// .env file (added to .gitignore)
NODE_ENV=development
PORT=8626
# Set your database/API connection information here
API_KEY=**************************
API_URL=**************************
```

```js
// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
};
```

```js
// server.js
const { port } = require('./config');
console.log(`Your port is ${port}`); // 8626
```
