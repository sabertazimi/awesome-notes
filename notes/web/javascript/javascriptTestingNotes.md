---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, ECMAScript, Testing]
---

# JavaScript Testing Notes

## Unit Testing

### Unit Testing Principles

- 代码覆盖率.
- 非法值测试.
- 边界测试.
- 非边界测试.

### Testing Code Isolation

- 编写代码时, 保持最小复杂度(最小依赖, 最低耦合).
- 利用 mock/stub 模拟外部依赖/测试数据.

### Testing Mocks

- mock: 模拟对象中的方法/接口
- stub: 模拟对象中的返回值
- spy: 在原有对象的基础上, 增加监视用变量/方法 e.g assert/调用次数/参数限制

```ts
const mockery = require('mockery');
mockery.enable();

describe('Sum suite File', function () {
  beforeEach(function () {
    mockery.registerAllowable('./mySumFS', true);
  });

  afterEach(function () {
    mockery.deregisterAllowable('./mySumFS');
  });

  it('Adds Integers!', function () {
    const filename = 'numbers';
    const fsMock = {
      readFileSync(path, encoding) {
        expect(path).toEqual(filename);
        expect(encoding).toEqual('utf8');
        return JSON.stringify({ a: 9, b: 3 });
      },
    };

    mockery.registerMock('fs', fsMock);
    const mySum = require('./mySumFS');
    expect(mySum.sum(filename)).toEqual(12);
    mockery.deregisterMock('fs');
  });
});
```

## Headless Testing

- [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v1.16.0&show=api-class-page)
- [Puppeteer Recipes](https://addyosmani.com/blog/puppeteer-recipes)

```ts
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

### Browser Context

```ts
// Create a new incognito browser context
const context = await browser.createIncognitoBrowserContext();
// Create a new page inside context.
const page = await context.newPage();
// ... do stuff with page ...
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

### DOM Testing

`page.$(selector)` same to `querySelector`

### Event Testing

```ts
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

```ts
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewport({ width: 50, height: 50 });
  await watchDog;
  await browser.close();
});
```

```ts
const [response] = await Promise.all([
  page.waitForNavigation(), // The promise resolves after navigation has finished
  page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

```ts
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(
  request =>
    request.url() === 'http://example.com' && request.method() === 'GET'
);
return firstRequest.url();
```

```ts
const firstResponse = await page.waitForResponse(
  'https://example.com/resource'
);
const finalResponse = await page.waitForResponse(
  response =>
    response.url() === 'https://example.com' && response.status() === 200
);
return finalResponse.ok();
```

```ts
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browserContext.waitForTarget(
  target => target.url() === 'https://www.example.com/'
);
```

### Operation Simulation Testing

```ts
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

```ts
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

```ts
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

### Tracing Testing

```ts
await page.tracing.start({ path: 'trace.json' });
await page.goto('https://www.google.com');
await page.tracing.stop();
```

### Puppeteer Testing API

- `page.setOfflineMode`
- `page.setGeolocation`
- `page.metrics`
- `page.accessibility`
- `page.coverage`

## Testing Frameworks

### Unit Testing Frameworks

- Jest.
- Jasmine.
- Mocha.

### UI Testing Frameworks

- Cypress/PlayWright/Puppeteer.
- 用户行为: Karma/Selenium.
- 功能测试: Phantom.js/Slimer.js/Karma.

## Jest Testing

### Jest Installation

```bash
npm i -D jest ts-jest @types/jest react-test-renderer
```

### Jest Configuration

`jest.config.js`:

```ts
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest.transformer.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/jest.mock.js',
    ...paths,
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/build'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  globals: {
    window: {},
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.env.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setupEnzyme.ts',
};
```

`jest.env.setup.js`:

```ts
import path from 'path';
import dotenv from 'dotenv';

console.log(`============ env-setup Loaded ===========`);
dotenv.config({
  path: path.resolve(process.cwd(), 'tests', 'settings', '.test.env'),
});
```

`jest.setup.js`:

- Mock missing JSDOM functions.
- Inject more expect DOM assertion.
- [Jest DOM Expect API](https://github.com/testing-library/jest-dom)

```ts
import '@testing-library/jest-dom/extend-expect';

// Global/Window object Stubs for Jest
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.requestAnimationFrame = function (callback) {
  setTimeout(callback);
};

window.cancelAnimationFrame = window.clearTimeout;

window.localStorage = {
  getItem() {},
  setItem() {},
};

Object.values = () => [];
```

`setupEnzyme.ts`:

```ts
import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new EnzymeAdapter() });
```

### Jest Basic Testing

- `describe` block.
- `test` statement.
- `it` statement.
- `test.todo`:
  - Skip empty todo tests.
  - Skip temporary broken tests.

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import LandingNav from './LandingNav';

describe('LandingNav', () => {
  test('should expanded when clicked', () => {
    render(<LandingNav />);

    expect(screen.getByRole('navigation')).toHaveStyle(
      'transform: translateX(-100%) translateZ(0);'
    );
    expect(screen.getByRole('banner')).toHaveStyle('opacity: 0');

    fireEvent.click(screen.getByTestId('hamburger-icon'));

    expect(screen.getByRole('navigation')).toHaveStyle(
      'transform: translateX(0%) translateZ(0);'
    );
    expect(screen.getByRole('banner')).toHaveStyle('opacity: 0.8');

    fireEvent.click(screen.getByTestId('hamburger-button'));

    expect(screen.getByRole('navigation')).toHaveStyle(
      'transform: translateX(-100%) translateZ(0);'
    );
    expect(screen.getByRole('banner')).toHaveStyle('opacity: 0');
  });
});
```

### Jest Snapshot Testing

- When you run jest first time,
  it will produce an snapshot file.
- The next time run the tests,
  rendered output will be compared to previously created snapshot.
- If change is expected,
  use `jest -u` to overwrite existing snapshot.

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import ThemeSwitch from './ThemeSwitch';

describe('ThemeSwitch', () => {
  test('should switch dark mode when clicked', () => {
    const { container } = render(<ThemeSwitch />);

    fireEvent.click(screen.getByTestId('toggle-wrapper'));

    expect(container).toMatchSnapshot();
  });
});
```

### Jest Async Testing

Jest async [guide](https://jestjs.io/docs/tutorial-async):

```ts
await expect(asyncCall()).resolves.toEqual('Expected');
await expect(asyncCall()).rejects.toThrowError();
```

### Jest Mocks

![Mocks](./figures/Mocks.png)

#### Jest Mocks Utils

`__mocks__`:

- `jest.createMockFromModule('moduleName')`.
- `jest.requireActual('moduleName')`.

`spyOn`:

- `jest.spyOn().mockImplementation`.
- `jest.spyOn().mockReturnValue`.
- `jest.spyOn().mockReturnValueOnce`.
- `jest.spyOn().mockResolvedValue`.
- `jest.spyOn().mockRejectedValue`.
- `mockModule.mockClear`.
- `mockModule.mockReset`.
- `mockModule.mockRestore`.

#### Jest Module Mocks

```tsx
// react-dom.js
import React from 'react';
const reactDom = jest.requireActual('react-dom');

function mockCreatePortal(element, target) {
  return (
    <div>
      <div id="content">{element}</div>
      <div id="target" data-target-tag-name={target.tagName}></div>
    </div>
  );
}

reactDom.createPortal = mockCreatePortal;

module.exports = reactDom;
```

```ts
// gatsby.js
import React from 'react';
const gatsby = jest.requireActual('gatsby');

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
};
```

#### Jest Date Mocks

```ts
jest
  .spyOn(Date.prototype, 'toISOString')
  .mockReturnValue('2020-06-20T13:37:00.000Z');
```

#### Jest API Mocks

```ts
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('https://mysite.com/api/role', async (req, res, ctx) => {
    res(ctx.status(200), ctx.json({ userType: 'user' }));
  }),
];

const server = setupServer(...handlers);

export default server;
```

```ts
import server from './mockServer/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
```

```tsx
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import type { UserRoleType } from './apis/user';
import AuthButton from './components/AuthButton';
import server from './mockServer/server';

const setup = (userType: UserRoleType) => {
  server.use(
    rest.get('https://mysite.com/api/role', async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ userType }));
    })
  );
};

describe('AuthButton', () => {
  it('should render user text', async () => {
    setup('user');

    render(<AuthButton>Hello</AuthButton>);

    expect(await screen.findByText('Hello User')).toBeInTheDocument();
  });

  it('should render admin text', async () => {
    setup('admin');

    render(<AuthButton>Hello</AuthButton>);

    expect(await screen.findByText('Hello Admin')).toBeInTheDocument();
  });
});
```

### Jest Internals

#### Jest Runtime Sandbox

Running tests in
[`ShadowRealms`](https://2ality.com/2022/04/shadow-realms.html#use-cases-for-shadowrealms):

```ts
// demo.test.js
import { test } from './TestLib.js';

test('succeeds', () => {
  assert.equal(3, 3);
});

test('fails', () => {
  assert.equal(1, 3);
});

// This statement can add by `babel`.
// eslint-disable-next-line import/no-anonymous-default-export
export default true;

// TestLib.js
const testSuites = [];

export function test(description, callback) {
  testSuites.push({ description, callback });
}

export function runTests() {
  const testResults = [];

  for (const testSuite of testSuites) {
    try {
      testSuite.callback();
      testResults.push(`${testSuite.description}: OK\n`);
    } catch (err) {
      testResults.push(`${testSuite.description}: ${err}\n`);
    }
  }

  return testResults.join('');
}

// TestRunner.js
async function runTestModule(moduleSpecifier) {
  const sr = new ShadowRealm();
  await sr.importValue(moduleSpecifier, 'default');
  const runTests = await sr.importValue('./TestLib.js', 'runTests');
  const result = runTests();
  console.log(result);
}

await runTestModule('./demo.test.js');
```

#### Jest Test Runner

A simple
[test runner](https://github.com/typicode/xv)
implementation:

```ts
import { promises as fs } from 'fs';
import { basename, dirname, join } from 'path';
import { pathToFileURL } from 'url';

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = join(dir, d.name);

    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

async function runTestFile(file: string): Promise<void> {
  for (const value of Object.values(
    await import(pathToFileURL(file).toString())
  )) {
    if (typeof value === 'function') {
      try {
        await value();
      } catch (e) {
        console.error(e instanceof Error ? e.stack : e);
        process.exit(1);
      }
    }
  }
}

async function run(arg = '.') {
  if ((await fs.lstat(arg)).isFile()) {
    return runTestFile(arg);
  }

  for await (const file of walk(arg)) {
    if (
      !dirname(file).includes('node_modules') &&
      (basename(file) === 'test.js' || file.endsWith('.test.js'))
    ) {
      console.log(file);
      await runTestFile(file);
    }
  }
}

run(process.argv[2]);
```

### Jest Performance

`Jest` 的整体架构, 其中有 3 个地方比较耗性能:

- 生成虚拟文件系统 (`jest-haste-map`): 在跑第一个测试会很慢.
- 多线程: 生成新线程耗费的资源.
- 文件转译: `Jest` 会在执行到该文件再对它进行转译. 使用 `esbuild-jest`/`@swc/jest` 加速转译.

## Cypress Testing

When it comes to test heavy visual features,
(e.g fixed navigation based on window scroll event),
E2E testing helps a lot.

### Cypress Installation

```bash
yarn add -D cypress typescript
yarn cypress open
```

`cypress open` will initialize the cypress folder structure.

### Cypress Configuration

`cypress/tsconfig.json`:

```json
{
  "extends": "../tsconfig.json",
  "include": ["global.d.ts", "**/*.ts"],
  "exclude": [],
  "compilerOptions": {
    "strict": true,
    "target": "ES6",
    "lib": ["ES6", "DOM"],
    "types": ["cypress"],
    "isolatedModules": false,
    "noEmit": true
  }
}
```

`cypress/global.d.ts`:

```ts
/// <reference types="cypress" />
```

`cypress.config.ts`:

```ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
```

`tsconfig.json`:

```json
{
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "cypress"]
}
```

`package.json`:

```json
{
  "scripts": {
    "e2e:chrome": "start-server-and-test e2e:prepare http://localhost:3000 cypress:chrome",
    "e2e:firefox": "start-server-and-test e2e:prepare http://localhost:3000 cypress:firefox",
    "e2e:ui": "start-server-and-test e2e:prepare http://localhost:3000 cypress:open",
    "e2e:prepare": "yarn build && yarn serve",
    "cypress:chrome": "cypress run --browser chrome",
    "cypress:chromium": "cypress run --browser chromium",
    "cypress:edge": "cypress run --browser edge",
    "cypress:electron": "cypress run",
    "cypress:firefox": "cypress run --browser firefox",
    "cypress:open": "cypress open --browser electron --e2e"
  }
}
```

`.gitignore`:

```bash
# cypress files
cypress/screenshots
cypress/videos
```

`jest.config.js`:

```ts
const config = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/cypress/'],
};
```

### Basic Cypress Testing

`cypress/support/commands.ts`:

```ts
import '@testing-library/cypress/add-commands';
```

`cypress/e2e/component.cy.ts`:

```ts
/// <reference types="cypress"/>

describe('component', () => {
  it('should work', () => {
    cy.visit('/');
    cy.get('#onOff')
      .should('have.text', 'off')
      .click()
      .should('have.text', 'on');
  });
});
```

`cypress/e2e/payment.cy.ts`:

```ts
import { v4 as uuid } from 'uuid';

describe('payment', () => {
  it('user can make payment', () => {
    //  Login.
    cy.visit('/');
    cy.findByRole('textbox', { name: /username/i }).type('sabertaz');
    cy.findByLabelText(/password/i).type('secret');
    cy.findByRole('checkbox', { name: /remember me/i }).check();
    cy.findByRole('button', { name: /sign in/i }).click();

    // Check account balance.
    let oldBalance;
    cy.get('[data-test=nav-user-balance]').then(
      $balance => (oldBalance = $balance.text())
    );

    // Click on new button.
    cy.findByRole('button', { name: /new/i }).click();

    // Search for user.
    cy.findByRole('textbox').type('devon becker');
    cy.findByText(/devon becker/i).click();

    // Add amount and note and click pay.
    const paymentAmount = '5.00';
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuid();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole('button', { name: /pay/i }).click();

    // Return to transactions.
    cy.findByRole('button', { name: /return to transactions/i }).click();

    // Go to personal payments.
    cy.findByRole('tab', { name: /mine/i }).click();

    // Click on payment.
    cy.findByText(note).click({ force: true });

    // Verify if payment was made.
    cy.findByText(`-$${paymentAmount}`).should('be.visible');
    cy.findByText(note).should('be.visible');

    // Verify if payment amount was deducted.
    cy.get('[data-test=nav-user-balance]').then($balance => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ''));
      const convertedNewBalance = parseFloat(
        $balance.text().replace(/\$|,/g, '')
      );
      expect(convertedOldBalance - convertedNewBalance).to.equal(
        parseFloat(paymentAmount)
      );
    });
  });
});
```

### Cypress Principles

- Flake resistance and retry-ability:
  don't wait for fixed time, wait for specific elements (`cy.as`):
  `cy.get`/`cy.find`/`cy.its`/`cy.should` commands will
  give the page an opportunity to fully load,
  and then the tests can proceed (Cypress run in browser directly).
- Asynchronous nature:
  use `cy.then`/`cy.wrap` for
  [async nature of Cypress](https://learn.cypress.io/cypress-fundamentals/understanding-the-asynchronous-nature-of-cypress).

### Cypress Commands

#### Cypress Basic Commands

- `cy.its`: get property value on previously yielded subject.
- `cy.invoke`: invoke function on previously yielded subject.

```ts
cy.wrap(['Wai Yan', 'Yu']).its(1).should('eq', 'Yu');
cy.wrap({ age: 52 }).its('age').should('eq', 52);
cy.wait('@publicTransactions')
  .its('response.body.results')
  .invoke('slice', 0, 5);
```

#### Cypress Action Commands

- `cy.click`.
- `cy.dbclick`.
- `cy.type`.
- `cy.clear`.
- `cy.focus`.
- `cy.blur`.
- `cy.check`.
- `cy.uncheck`.
- `cy.select`.
- `cy.selectFile`.
- `cy.submit`.
- `cy.trigger`.
- `cy.scrollTo`.
- `cy.scrollIntoView`.

#### Cypress Network Commands

- `cy.intercept`: mock API response.

```ts
cy.intercept('GET', '/transactions/public*', {
  fixture: 'public-transactions.json',
}).as('mockedPublicTransactions');

cy.wait('@mockedPublicTransactions');

cy.intercept('GET', '/transactions/public*', {
  headers: {
    'X-Powered-By': 'Express',
    Date: new Date().toString(),
  },
});

cy.intercept('POST', '/bankAccounts', req => {
  const { body } = req;
  req.continue(res => {
    res.body.data.listBankAccount = [];
  });
});

cy.intercept('POST', apiGraphQL, req => {
  const { body } = req;

  if (
    Object.hasOwn(body, 'operationName') &&
    body.operationName === 'CreateBankAccount'
  ) {
    req.alias = 'gqlCreateBankAccountMutation';
  }
});
```

- `cy.request`: API integration/E2E tests.

```ts
Cypress.Commands.add('getAllPosts', () => {
  return cy.request('GET', '/api/posts').then(response => {
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('getFirstPost', () => {
  return cy.request('GET', '/api/posts').then(response => {
    return cy.wrap(response.body).its(0);
  });
});

describe('GET', () => {
  it('gets a list of users', () => {
    cy.request('GET', '/users').then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.results).length.to.be.greaterThan(1);
    });
  });

  it('gets a list of comments', () => {
    cy.request('/comments').as('comments');

    cy.get('@comments').should(response => {
      expect(response.body).to.have.length(500);
      expect(response).to.have.property('headers');
      expect(response).to.have.property('duration');
    });
  });
});
```

#### Cypress Custom Command

```ts
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      findByRole(role: string): Chainable<JQuery<HTMLElement>>;
      findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string): Chainable<JQuery<HTMLElement>>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(
  'findByRole',
  { prevSubject: 'element' },
  (subject, role) => {
    return cy.wrap(subject, { log: false }).find(`[role="${role}"]`);
  }
);

Cypress.Commands.add(
  'findByTestId',
  { prevSubject: 'element' },
  (subject, testId) => {
    return cy.wrap(subject, { log: false }).find(`[data-testid="${testId}"]`);
  }
);

Cypress.Commands.add('getByRole', role => {
  return cy.get(`[role="${role}"]`);
});

Cypress.Commands.add('getByTestId', testId => {
  return cy.get(`[data-testid="${testId}"]`);
});
```

[Custom command log](https://filiphric.com/improve-your-custom-command-logs-in-cypress):

```ts
Cypress.Commands.add('take', (input: string) => {
  let element: JQuery<HTMLElement> | HTMLElement[];
  let count: number;

  const log = Cypress.log({
    autoEnd: false,
    consoleProps() {
      return {
        selector: input,
        Yielded: element,
        Elements: count,
      };
    },
    displayName: 'take',
    name: 'Get by [data-cy] attribute',
  });

  cy.get(`[data-cy=${input}]`, { log: false }).then($el => {
    element = Cypress.dom.getElements($el);
    count = $el.length;
    log.set({ $el });
    log.snapshot().end();
  });

  cy.on('fail', err => {
    log.error(err);
    log.end();
    throw err;
  });
});
```

### Cypress Plugin

Setup `TypeScript` to transpile tests:

```ts
// cypress.config.ts
import { defineConfig } from 'cypress';
import wp from '@cypress/webpack-preprocessor';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        wp({
          webpackOptions: {
            resolve: {
              extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
            module: {
              rules: [
                {
                  test: /\.tsx?$/,
                  loader: 'ts-loader',
                  options: { transpileOnly: true },
                },
              ],
            },
          },
        })
      );
    },
  },
});
```

`AXE` a11y testing:

```ts
// cypress.config.ts
import { defineConfig } from 'cypress';
import fetch from 'undici';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        sitemapLocations() {
          return fetch(`${config.baseUrl}/sitemap.xml`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/xml',
            },
          })
            .then(res => res.text())
            .then(xml => {
              const locs = [...xml.matchAll(`<loc>(.|\n)*?</loc>`)].map(
                ([loc]) => loc.replace('<loc>', '').replace('</loc>', '')
              );
              return locs;
            });
        },
      });

      return config;
    },
  },
});

// cypress/e2e/smoke.cy.ts
it('should be accessible', () => {
  cy.task('sitemapLocations').then(pages => {
    pages.forEach(page => {
      cy.visit(page);
      cy.injectAxe();
      cy.checkA11y(
        {
          exclude: ['.article-action'],
        },
        {
          rules: {
            'empty-heading': { enabled: false },
            'scrollable-region-focusable': { enabled: false },
          },
        }
      );
    });
  });
});
```

- Cypress code coverage [plugin](https://github.com/bahmutov/cypress-and-jest).
- Cypress commands [plugin](https://github.com/testing-library/cypress-testing-library).
- Cypress events [plugin](https://github.com/dmtrKovalenko/cypress-real-events).
- Cypress accessibility testing [plugin](https://github.com/component-driven/cypress-axe).
- Cypress visual regression testing [plugin](https://github.com/percy/percy-cypress).

### Cypress Reference

- Cypress official [guide](https://learn.cypress.io).
- Cypress CI [action](https://github.com/cypress-io/github-action).
- Cypress real world [example](https://github.com/cypress-io/cypress-realworld-app).
- Cypress [cookbook](https://github.com/cypress-io/cypress-example-recipes).

## Debugging

### Monkey Patch

#### Window State Injection

Inject trace function (log, monitor, report service)
to window `pushState` and `replaceState`.

```ts
const _wr = function (type) {
  const orig = window.history[type];

  return function (...args) {
    const rv = orig.apply(this, args);
    const e = new Event(type.toLowerCase());
    e.arguments = args;
    window.dispatchEvent(e);
    return rv;
  };
};

window.history.pushState = _wr('pushState');
window.history.replaceState = _wr('replaceState');

window.addEventListener('pushstate', function (event) {
  console.trace('pushState');
});

window.addEventListener('replacestate', function (event) {
  console.trace('replaceState');
});
```

#### Event Propagation Injection

```ts
const originalStopPropagation = MouseEvent.prototype.stopPropagation;

MouseEvent.prototype.stopPropagation = function (...args) {
  console.trace('stopPropagation');
  originalStopPropagation.call(this, ...args);
};
```

#### Window Scroll Injection

```ts
let originalScrollTop = element.scrollTop;

Object.defineProperty(element, 'scrollTop', {
  get() {
    return originalScrollTop;
  },
  set(newVal) {
    console.trace('scrollTop');
    originalScrollTop = newVal;
  },
});
```

### Logging

- 时间, 包含时区信息和毫秒.
- 日志级别.
- 会话标识.
- 功能标识.
- 精炼的内容: 场景信息, 状态信息 (开始/中断/结束), 重要参数.
- 其他信息: 版本号, 线程号.

#### Logging Setup

```ts
const { createLogger, format, transports } = require('winston');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

logger.info('System Started');
logger.fatal('Fatal error occurred');
```

#### Logging Clock

- `performance.now()` is more precise (100 us)
- `performance.now()` is strictly monotonic (unaffected by changes of machine time)

```ts
let lastVisibilityChange = 0;

window.addEventListener('visibilitychange', () => {
  lastVisibilityChange = performance.now();
});

// don’t log any metrics started before the last visibility change
// don't log any metrics if the page is hidden
// discard perf data from when the machine was not running app at full speed
function metrics() {
  if (metric.start < lastVisibilityChange || document.hidden) {
    return;
  }

  process();
}
```

```ts
requestAnimationFrame(() => {
  requestAnimationFrame(timestamp => {
    metric.finish(timestamp);
  });
});
```

### Console API

- `console.XXX`.
- `copy`: copy complex object to clipboard.
- `monitor`: monitor object.

```ts
const devtools = /./;
devtools.toString = function () {
  this.opened = true;
};

console.log('%c', devtools);
// devtools.opened will become true if/when the console is opened
```

```ts
// Basic console functions
console.assert();
console.clear();
console.log();
console.debug();
console.info();
console.warn();
console.error();

// Different output styles
console.dir();
console.dirxml();
console.table();
console.group();
console.groupCollapsed();
console.groupEnd();

// Trace console functions
console.trace();
console.count();
console.countReset();
console.time();
console.timeEnd();
console.timeLog();

// Non-standard console functions
console.profile();
console.profileEnd();
console.timeStamp();
```

`console.log`

```ts
// `sprinf` style log
console.log('%d %o %s', integer, object, string);
console.log('%c ...', 'css style');
```

`console.table`

```ts
// display array of object (tabular data)
const transactions = [
  {
    id: '7cb1-e041b126-f3b8',
    seller: 'WAL0412',
    buyer: 'WAL3023',
    price: 203450,
    time: 1539688433,
  },
  {
    id: '1d4c-31f8f14b-1571',
    seller: 'WAL0452',
    buyer: 'WAL3023',
    price: 348299,
    time: 1539688433,
  },
  {
    id: 'b12c-b3adf58f-809f',
    seller: 'WAL0012',
    buyer: 'WAL2025',
    price: 59240,
    time: 1539688433,
  },
];

console.table(data, ['id', 'price']);
```

### JavaScript Tracing API

`debugger`:

```ts
// debugger;
```

```ts
copy(obj); // to clipboard
```

```ts
window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log(`errorMessage: ${errorMessage}`); // 异常信息
  console.log(`scriptURI: ${scriptURI}`); // 异常文件路径
  console.log(`lineNo: ${lineNo}`); // 异常行号
  console.log(`columnNo: ${columnNo}`); // 异常列号
  console.log(`error: ${error}`); // 异常堆栈信息
  // ...
  // 异常上报
};

window.addEventListener('error', function () {
  console.log(error);
  // ...
  // 异常上报
});
```

#### Trace Property

```ts
const traceProperty = (object, property) => {
  let value = object[property];
  Object.defineProperty(object, property, {
    get() {
      console.trace(`${property} requested`);
      return value;
    },
    set(newValue) {
      console.trace(`setting ${property} to `, newValue);
      value = newValue;
    },
  });
};
```

### Node Debugging API

- node --inspect
- [ndb](https://github.com/GoogleChromeLabs/ndb)

```bash
node --inspect
ndb index.js
```

## Chrome DevTools

### DevTools Detection

- [DevTools detection guide](https://github.com/546669204/fuck-debugger-extensions)

#### Console DevTools Detection

```ts
const x = document.createElement('div');

Object.defineProperty(x, 'id', {
  get() {
    // devtool opened.
    return 'id';
  },
});

console.log(x);
```

```ts
// eslint-disable-next-line prefer-regex-literals
const c = new RegExp('1');

c.toString = function () {
  // devtool opened
};

console.log(c);
```

> Anti Method: hook `console` object, disable all outputs.

#### Debugger Detection

```ts
(function () {}.constructor('debugger')());
```

```ts
(() => {
  function block() {
    if (
      window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200
    ) {
      document.body.innerHTML = 'Debug detected, please reload page!';
    }

    setInterval(() => {
      (function () {
        return false;
      }
        .constructor('debugger')
        .call());
    }, 50);
  }

  try {
    block();
  } catch (err) {}
})();
```

```ts
const startTime = new Date();
// debugger;
const endTime = new Date();
const isDev = endTime - startTime > 100;

while (true) {
  // debugger;
}
```

> Anti Method: use chrome protocol to block all `debugger` request.
> Anti Method: hook `Function.prototype.constructor` and replace `debugger` string.

### Chrome DevTools Shortcuts

- c-d: go to next word
- c-f in `Elements` panel: search DOM node
- c-m: go to next bracket
- c-p: go to files
- cs-p: go to anywhere
- cs-o: go to functions

long click reload: multiple reload options e.g clean cache

### Elements Panel

- Break on elements.
- Inspect elements a11y.

#### Style Tab

- color picker
- filter: class filter, pseudo filter, css style filter

### Console Panel

- getEventListeners(dom)
- monitorEvents(dom, events)
- unmonitorEvents(dom)
- debug(fn)
- undebug(fn)
- monitor(fn)
- unmonitor(fn)

#### Console Settings

- preserve log
- show timestamps
- Verbose: additional performance log
- click filename, filter error messages
- add folder to workspace

#### Capture Default Event Listener

`$0`: the reference to the currently selected element in the Elements panel.

```ts
const listener = getEventListeners($0).click[0].listener;
$0.removeEventListener('click', listener);
$0.addEventListener('click', e => {
  // do something
  // ...

  // then
  listener(e);
});
```

### Source Panel

- Add log points.
- Multiple breakpoints: source, XHR/fetch, DOM, global/event listeners.
- Open a source file, right click code, `Blackbox script` item.
- [Local Overrides](https://developers.google.com/web/updates/2018/01/devtools#overrides)
  for persistent changes to css styles.

Same thing in `VSCode` debug panel (log points, break points etc).

### Network Panel

- throttling: simulate different network environment.
- initiator: go to files.

### Performance Panel

- `C+S+P`: performance monitor.
- `C+S+P`: FPS.
- Performance tips.
- Memory panel.
- Timeline events: `script -> style -> layout -> paint -> composite`.
- Timeline events [reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference).
- Performance analysis [reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference).
- Performance tools [guide](https://zhuanlan.zhihu.com/p/41017888).

### Simulation DevTools

- cs-p: type `3G` (slow network)
- cs-p: type `sensor` (geolocation)

### Audit DevTool

- cs-p: type `audit`

### Coverage Tool

- cs-p: type `coverage`
- Use to eliminate **unused** CSS/JS code.

### Memory Panel

- Heap snapshot

### JS Profiler Panel

### Layer Panel

Tool for composite stage analysis:

- Compositor layers.

### Rendering Panel

- FPS monitor.
- Scroll event.
- Paint flashing area: re-paint area.
- Compositor layers border.
- Layout shift region.
- CSS media query emulation:
  - `prefers-color-scheme`.
  - `prefers-reduced-motion`.
  - `prefers-contrast`.
  - A11y emulation.

### Animation Panel

- animations
