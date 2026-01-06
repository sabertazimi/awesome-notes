---
sidebar_position: 3
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Node.js, Yarn]
---

# Yarn

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

## Yarn Configuration

```bash
yarn config set nodeLinker node-modules --home
yarn config set npmPublishAccess public --home
yarn config set npmRegistryServer "https://registry.npmjs.org" --home
yarn config set yarnPath .yarn/releases/yarn-berry.cjs --home
yarn config set unsafeHttpWhitelist --json '["localhost", "*.example.com", "example.com"]'
```

## Yarn Updates

One line to update all deps in monorepo:

```bash
yarn up @types/node
yarn up @types/react
yarn dedupe --strategy highest
```

## Yarn Workspace

```bash
yarn workspace packageName build
```

## Yarn Plugin

```bash
yarn plugin list
```

## Yarn Patch

Modify package in `node_modules` conveniently:

- Run `yarn patch <package>` will create copy of `package` to `tmp/xfs-xxxxxxxx/user/`.
- After modify source code of `package`,
  run `yarn patch-commit /tmp/xfs-xxxxxxxx/user --save`.

## Yarn Berry Read World Case

- [Gatsby](https://github.com/gatsbyjs/gatsby):
  yarn 1 with `.yarn/` directory.
- [Redux ToolKit](https://github.com/reduxjs/redux-toolkit):
  yarn 2.
- [Babel](https://github.com/babel/babel):
  yarn 3.
- [StoryBook](https://github.com/storybookjs/storybook):
  yarn 3.
