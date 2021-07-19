# Electron Basic Notes

<!-- TOC -->

- [Electron Basic Notes](#electron-basic-notes)
  - [Getting Started](#getting-started)
  - [Basic Concepts](#basic-concepts)
    - [Process](#process)
    - [Shared Data](#shared-data)
  - [Process Communication](#process-communication)
    - [Main to Render](#main-to-render)
    - [Render to Main](#render-to-main)
    - [Render to Render](#render-to-render)
  - [Native UI](#native-ui)
    - [Menu](#menu)
      - [Application Menu](#application-menu)
      - [Contextual Menu](#contextual-menu)
    - [Dialog](#dialog)
  - [Electron Security](#electron-security)
  - [Electron Builder](#electron-builder)
  - [Electron Cheat Sheet](#electron-cheat-sheet)

<!-- /TOC -->

## Getting Started

- [Electron Forge](https://electronforge.io)
- [Boilerplate](https://github.com/electron-react-boilerplate)

```bash
npm install -g electron-forge
electron-forge init my-new-project --template=react
cd my-new-project
electron-forge start
```

## Basic Concepts

### Process

主进程通过实例化 BrowserWindow，每个 BrowserWindow 实例都在它自己的渲染进程内返回一个 web 页面。
当 BrowserWindow 实例销毁时，相应的渲染进程也会终止。

主进程负责掌管所有的 web 页面和它们相应的渲染进程。
每个渲染进程都是相互独立的，它们只关心自己所运行的 web 页面。

在页面（渲染进程）中不允许调用原生 GUI 相关的 API，那是因为在网页（渲染进程）中中掌管原生 GUI 很危险，易造成内存泄露。
如果想在网页中进行 GUI 的操作，渲染进程必须向主进程传达请求，然后在主进程中完成操作。

在 Electron 中，有几种连接主进程和渲染进程的方法，
例如用于传送消息的 ipcRenderer 和 ipcMain 模块，以及用于 RPC 的 remote 模块.

### Shared Data

- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- Electron IPC

```js
// main process
global.sharedObject = {
  someProperty: 'default value'
};

// render process 1
require('remote').getGlobal('sharedObject').someProperty = 'new value';

// render process 2
console.log(require('remote').getGlobal('sharedObject').someProperty);
```

## Process Communication

### Main to Render

- webContents.executeJavaScript
- ipcRenderer
- ipcMain

### Render to Main

- remote module

```js
const { BrowserWindow } = require('electron').remote;
let win = new BrowserWindow({ width: 800, height: 600 });
win.loadURL('https://github.com');
```

### Render to Render

- Web Storage API
- IndexedDB
- Electron IPC e.g remote.getGlobal

## Native UI

### Menu

#### Application Menu

#### Contextual Menu

### Dialog

```js
openFile
openDirectory
multiSelections
createDirectory
showHiddenFiles
promptToCreate (Windows Only)
```

## Electron Security

- only load secure content (HTTPS/WSS/FTPS)
- verify integrity of scripts via CSP and SRI
- don't trust external resources
- disable nodejs in renderers that display remote content

```js
let win;

const createBrowserWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Electron App',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js');
    }
  });
};
```

```js
// preload.js
const fs = require('fs');

global.desktop = {
  files: () => fs.readdirSync(__dirname);
}
```

## Electron Builder

## Electron Cheat Sheet

- [Awesome Live CheatSheet](https://github.com/ConardLi/electron-react)
- [Electron API Demo App](https://github.com/demopark/electron-api-demos-Zh_CN)
