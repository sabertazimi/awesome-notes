---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, DevOps, Security]
---

# Security Basic Notes

## Security Programming

### Security Principles

安全三要素:

- 机密性 (Confidentiality).
- 完整性 (Integrity).
- 可用性 (Availability).

安全原则:

- 白名单原则:
  - 防火墙白名单: 默认只开放 `80` 与 `443` 端口.
  - XSS 防御白名单: 富文本编辑器只允许 `<a>` 与 `<img>` 标签.
- 最小权限原则.
- 纵深防御原则:
  - Web 应用安全.
  - 网络环境安全.
  - 数据库安全.
  - OS 系统安全.
- 数据与代码分离原则:
  - 缓冲区溢出漏洞: 混淆代码与数据边界, 导致安全问题发生.
  - 注入漏洞: 混合应用代码与用户数据, 导致 SQL/XSS/CSRF/XML 漏洞发生.
- 不可预测性原则:
  - 有效地对抗基于篡改与伪造的攻击.
  - 随机栈基址防御缓冲区溢出攻击.
  - 加密哈希 Token 防御 CSRF 攻击.

STRIDE 威胁分析模型:

| Threat                 | Definition                  | Security   |
| ---------------------- | --------------------------- | ---------- |
| Spoofing               | 伪装 (他人身份)             | 认证       |
| Tampering              | 篡改 (数据或代码)           | 完整性     |
| Repudiation            | 抵赖 (做过的事情)           | 不可抵赖性 |
| Information Disclosure | 信息泄露 (机密数据)         | 机密性     |
| Denial of Service      | 拒绝服务                    | 可用性     |
| Elevation of Privilege | 提升权限 (未经授权获得许可) | 授权       |

DREAD 风险分析模型:

- $\text{Risk} = \text{Probability} * \text{Damage Potential}$:
  - 高危: 12 ~ 15 分.
  - 中危: 8 ~ 11 分.
  - 低危: 0 ~ 7 分.
- Damage Potential:
  - High: 完全验证权限, 执行管理员操作, 非法上传文件.
  - Medium: 泄露敏感信息.
  - Low: 泄露其他信息.
- Reproducibility:
  - High: 攻击者可以随意重复攻击.
  - Medium: 攻击者可以重复攻击, 有时间限制.
  - Low: 攻击者难以重复攻击.
- Exploitability:
  - High: 初学者短期能掌握攻击方法.
  - Medium: 熟练者才能掌握攻击方法.
  - Low: 漏洞利用条件非常苛刻.
- Affected users:
  - High: All user, key user, default configuration.
  - Medium: Some user, non-default configuration.
  - Low: Rare user, anonymous user.
- Discoverability:
  - High: 漏洞显眼, 攻击条件容易获得.
  - Medium: 私有区域才可发现漏洞, 需要深入挖掘.
  - Low: 发现漏洞极其困难.

### Software Security Assurance

- 逻辑安全.
- 数据安全:
  - 数据访问权限.
  - 数据访问时间.
  - 数据存储格式.
  - 数据存储位置.
  - 数据分解与组合.
- UI 安全.
- 约束安全:
  - 数据正确类型.
  - 数据正确范围.
  - 数据长度的最大值和最小值.
  - 数据非法值.

### Defensive Programming

[Defensive programming](https://mp.weixin.qq.com/s/G4pME9xFHdWnFckgytnofQ):

保护程序免遭非法数据的破坏:

- 检查所有来源于外部的数据:
  当从外部接口中获取数据时, 应检查所获得的数据值, 以确保它在允许的范围内.
  - 检查接囗数据字段: **是否存在/数据类型/取值范围/缺省值/正则表达式/特殊字符**.
  - 检查方法的属性参数做必要的转换: **是否存在/数据类型/取值范围/缺省值/正则表达式/特殊字符**.
- 检查子程序所有输入参数的值.
- 决定如何处理错误的输入数据:
  一旦检测到非法参数, 选择适合的错误处理方处理.

断言:

- 用错误处理代码处理预期发生的状况, 用断言去处理那些不该发生的错误！
- 利用断言来注解前条件和后条件: 对于`入参`/ `外部数据`/`返回结果`进行检查, 是否符合业务逻辑.
- 避免将需要执行的子程序放到断言中.
- 通过写断言, 不仅可以提高防御性, 还能提高可读性.

程序的健壮性:

- 健壮性具体指的是应用在不正常的输入或不正常的外部环境下仍能表现出正常的程度.
- 不断尝试采取措施来包容错误的输入以此让程序正常运转 (对自己的代码要保守, 对用户的行为要开放:
  主动防御处理是有降级/容错处理, 尽量不要走到 `Error Boundary`.
- 考虑各种各样的极端情况:
  - 考虑到各种可能的输入修士, 兼容全面.
  - Mock 各种极端数据进行测试.
- 即使终止执行, 也要准确/无歧义的向用户展示全面的错误信息.
- 抛出有助于 Debug 的错误信息: 丰富捕获到的错误信息, 包含更多上下文信息.

程序的正确性:

- 返回`中立值`/`默认值`: 处理错误的最佳做法就是继续执行操作并简单的返回一个没有危害的值.
  - 换用下一个正确的数据: 在轮询中, 如返回数据有误就丢掉, 进行下一轮查询.
  - 返回上一次正确的数据: 同上, 不跳过的也可以返回上一次正确的数据.
  - 选择最接近的合法值.
- 上报错误日志: 上报的错误日志对还原问题和调试友好.
- 返回一个错误状态码.
- 启动错误处理子程序或对象.
- 显示对用户友好的出错消息: 展示给用户的错误信息需要加工, 用户能看明白, 有建设性.
- 正确性要求高的话, 就直接退出程序.

异常处理:

- 用异常通知程序的其他部分, 发生了不可忽略的错误.
- 只在真正例外的情况下才抛出异常:
  当前有错误就直接抛出去, 会导致线上监控的错误信息质量不高.
- 不能用异常来推卸责任: 能在局部处理掉就在局部解决掉, 不要简单抛出去.
- 避免在构造函数和析构函数中抛出异常, 除非你在同一个地方把它们捕获.
- 在恰当的抽象层次抛出异常: 不要把底层的异常抛给高层的调用方, 暴露具体实现的细节.
- 异常消息中加入关于导致异常发生的全部信息.
- 避免使用空 `catch` 语句.
- 考虑创建一个集中的异常上报机制.
- 考虑异常的替换机制.

代码隔栏:

- 左侧外部接口数据假定是脏数据 (不可信), 通过中间这些类 (子程序) 构成隔栏, 负责清理与验证数据, 并返回可信的数据.
- 最右侧的类 (子程序) 全部在假定数据干净 (安全) 的基础上工作, 这样可以让大部分的代码无须再担负检查错误数据的职责.
- 适配器模式和门面模式用来隔离或适配变化, 是对不可控变化的防御.

辅助调试代码 (`Debugging Aids`):

- 在早期的引入辅助调试代码, 发布时移除调试辅助的代码:
  - `console.log` 算是一种辅助调试代码, 发布时清除.
  - 在复杂的调试场景下, 有必要专门写一些辅助调试代码.
  - 利用 Chrome 插件追踪变量和状态变化辅助调试.
- 采用进攻式编程:
  - 尽量让异常的情况在开发期间暴露出来, 而在产品上线时自我恢复.
  - 在开发阶段考虑到最坏的情况.
  - 写单测是一进攻式编程.

UI 的防御性:

- 防白屏:
  - 白屏监控.
  - 资源加载失败重试.
  - `Service Worker`: 资源 fallback 机制.
  - 模块都包装了 `Error Boundary`.
  - 兼容性探测和提示.
  - 白屏提示信息.
- 防慢 (网络慢/响应慢/渲染慢/执行慢): 前端性能优化.
- 防卡 (卡顿/假死): 前端性能优化.
- 防布局错乱: 前端响应式开发.
- 防极端内容 (缺失/超长/连续字符/未转义): 前端响应式开发.
- UI 一致性问题:
  - 发布设计规范 (`Design System`).
  - UI 走查工具.
  - 视觉回归测试.
- 防样式污染:
  - 代码审核.
  - 样式隔离.

### Security Headers

Security headers [list](https://web.dev/security-headers):

- [X-Content-Type-Options](https://developer.mozilla.org/docs/Web/HTTP/Headers/X-Content-Type-Options).
- [X-Frame-Options](https://developer.mozilla.org/docs/Web/HTTP/Headers/X-Frame-Options):
  - `DENY`: 禁止被加载进任何 frame.
  - `SAMEORIGIN`: 仅允许被加载进同域内的 frame.
- [X-XSS-Protection](https://developer.mozilla.org/docs/Web/HTTP/Headers/X-XSS-Protection):
  - `0` :表示禁用这个策略.
  - `1`: 默认, 对危险脚本做一些标志或修改, 以阻止在浏览器上渲染执行.
  - `1; mode=block`:, 强制不渲染.
- Setting `Context-Security-Policy` header.
- Ensure all connections to be HTTPS.
- Avoid Clicking-jacking using `X-Frame-Options`.
- Disable `X-Powered-By` header.
- Not put sensitive data in URL query and `Referer` header.

### Same Origin Policy

`origin` = `protocol` + `domain` + `port`:

| `http://www.foo.com`      | Same Origin |            |
| ------------------------- | ----------- | ---------- |
| `https://www.foo.com`     | No          | `protocol` |
| `http://app.foo.com`      | No          | `domain`   |
| `http://foo.com`          | No          | `domain`   |
| `http://www.foo.com:8080` | No          | `port`     |
| `http://www.foo.com/a/`   | Yes         |            |

```json
{
  "Access-Control-Allow-Origin": "https://api.foo.com"
}
```

- 由客户端 HTML 标签等发出的跨域 `GET` 请求默认合法, 构成开放的 Web 世界:
  通过 `src` 属性加载的资源, 浏览器限制了 JavaScript 的权限, 使其不能读写返回的内容.
- `XMLHttpRequest` 受同源策略限制: 默认只能访问同源对象的内容.
- Cookie 受同源策略限制.
- Web storage 受同源策略限制:
  - Local storage.
  - Session storage.

### Content Security Policy

[`CSP`](https://github.com/foundeo/content-security-policy.com)
help prevent from `XSS`:

```bash
{
  "header": {
    "Content-Security-Policy":
      allow 'self';
      script-src 'nonce-random123' 'strict-dynamic' 'unsafe-eval' script.example.com;
      media-src media.example.com;
      img-src img.example.com;
      object-src 'none';
      base-uri 'none'
  }
}
```

`upgrade-insecure-requests`
指示浏览器在发出网络请求之前升级不安全的 `URL`:

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

`block-all-mixed-content`
指示浏览器永不加载混合内容,
所有混合内容资源请求都会被阻止,
包括主动和被动混合内容:

```html
<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">
```

`nonce`-only `CSP` block 3rd scripts and dynamic scripts generate by trusted users:

```html
<script nonce="random123">
  alert('this is fine!');
</script>
<script nonce="random123" src="https://cdnjs.com/lib.js"></script>
<!-- XSS injected by attacker - blocked by CSP -->
<script>
  alert('xss');
</script>
```

`strict-dynamic` `CSP` allow dynamic scripts generate by trusted users:

```html
<!-- Content-Security-Policy: script-src 'nonce-random123' 'strict-dynamic' -->
<script nonce="random123">
  const s = document.createElement('script');
  s.src = '/path/to/script.js';
  s.async = true;
  document.head.appendChild(s); // can execute correctly
</script>
```

`domain`-specific `CSP` block untrusted domain scripts:

```html
<!-- Given this CSP header -->
<!-- Content-Security-Policy: script-src https://example.com/ -->
<!-- The following third-party script will not be loaded or executed -->
<script src="https://not-example.com/js/library.js"></script>
```

### Trusted Types

- TrustedURL.
- TrustedHTML.
- TrustedScript.
- TrustedScriptURL.

```ts
// fallback policy
TrustedTypes.createPolicy(
  'default',
  {
    createHTML(s) {
      console.error('Please fix! Insecure string assignment detected:', s);
      return s;
    },
  },
  true
);
```

```ts
// Content-Security-Policy-Report-Only: trusted-types myPolicy; report-uri /cspReport
const SanitizingPolicy = TrustedTypes.createPolicy(
  'myPolicy',
  {
    createHTML: (s: string) => myCustomSanitizer(s),
  },
  false
);

const trustedHTML = SanitizingPolicy.createHTML(foo);
element.innerHTML = trustedHTML;
```

### Sandbox

[`Sandbox`](https://developer.51cto.com/article/710911.html):

- `eval()`:
  它能访问执行上下文中的局部变量, 也能访问所有全局变量, 是一个非常危险的函数.
- `new Function()`:
  在全局作用域中被创建, 不会创建闭包.
  当运行函数时, 只能访问本地变量和全局变量,
  不能访问 Function 构造器被调用生成的上下文的作用域.
- `with () {}`:
  它首先会在传入的对象中查找对应的变量,
  如果找不到就会往更上层的全局作用域去查找,
  导致全局环境污染.
- 快照沙盒: ES5 沙盒, 备份恢复全局上下文.
- 代理沙盒: ES6 沙盒, 使用 Proxy 代理全局上下文.
- `<iframe>` 沙盒: 使用 `<iframe>` 隔离全局上下文.
- [`ShadowRealm`](https://2ality.com/2022/04/shadow-realms.html) 沙盒.

#### Snapshot Sandbox

`SnapshotSandbox`:

```ts
class SnapshotSandbox {
  constructor() {
    this.proxy = window; // window 属性.
    this.windowSnapshot = {}; // 快照.
    this.modifyPropsMap = {}; // 记录在 window 上的修改.
    this.sandboxRunning = false;
  }

  active() {
    this.windowSnapshot = {}; // 快照.

    for (const prop in window) {
      if (window.hasOwn(prop)) {
        this.windowSnapshot[prop] = window[prop];
      }

      Object.keys(this.modifyPropsMap).forEach(p => {
        window[p] = this.modifyPropsMap[p];
      });
    }

    this.sandboxRunning = true;
  }

  inactive() {
    this.modifyPropsMap = {}; // 记录在 window 上的修改.

    for (const prop in window) {
      if (window.hasOwn(prop)) {
        if (window[prop] !== this.windowSnapshot[prop]) {
          this.modifyPropsMap[prop] = window[prop];
          window[prop] = this.windowSnapshot[prop];
        }
      }
    }

    this.sandboxRunning = false;
  }
}
```

#### Proxy Sandbox

`ProxySandbox`:

```ts
function ProxySandbox(code) {
  code = `with (sandbox) {${code}}`;
  // eslint-disable-next-line no-new-func
  const fn = new Function('sandbox', code);

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has(target, key) {
        return true;
      },
      get(target, key) {
        if (key === Symbol.unscopables) return undefined;
        return target[key];
      },
    });
    return fn(sandboxProxy);
  };
}
```

#### Iframe Sandbox

```ts
class SandboxWindow {
  constructor(context, frameWindow) {
    return new Proxy(frameWindow, {
      get(target, name) {
        if (name in context) {
          return context[name];
        } else if (typeof target[name] === 'function' && /^[a-z]/.test(name)) {
          return target[name].bind && target[name].bind(target);
        } else {
          return target[name];
        }
      },
      set(target, name, value) {
        if (name in context) {
          return (context[name] = value);
        }
        target[name] = value;
      },
    });
  }
}

// 需要全局共享的变量
const context = {
  document: new Proxy(window.document, {}),
  location: new Proxy(window.location),
  history: new Proxy(window.history),
};

// 创建 iframe
const userInputUrl = '';
const iframe = document.createElement('iframe', {
  url: userInputUrl,
  src: 'about:blank',
  sandbox:
    'allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation',
  style: 'display: none;',
});
document.body.appendChild(iframe);
const sandboxGlobal = new Proxy(iframe.contentWindow, {});

// 创建沙箱
const newSandboxWindow = new SandboxWindow(context, sandboxGlobal);
```

### Crypto

Web crypto [API](https://developer.mozilla.org/docs/Web/API/SubtleCrypto):

- 公钥加密私钥解密: 只有私钥拥有者可以获取信息, e.g HTTPS 会话密钥传输.
- 公钥解密私钥加密: 只有私钥拥有者可以发布签名, e.g 数字签名.

### User Privacy

#### Browser Privacy Detection

- Browser [leaks](https://browserleaks.com).

#### User Fingerprint

- Use Canvas or WebGL to generate user
  [fingerprint](https://yinzhicao.org/TrackingFree/crossbrowsertracking_NDSS17.pdf).
- Location information:
  - Country.
  - Region.
  - City.
  - Zip code.
  - Latitude.
  - Longitude.
  - Timezone.
- Connection information:
  - IP address.
  - Internet service provider.
  - Organization.
  - ASN.
  - Tor browser detection.
- Software information:
  - Browser.
  - Browser plugins detection.
  - Operation system.
  - User agent.
  - Preferred language.
  - Cookie enabled detection.
  - Java enabled detection.
  - DNT header enabled detection.
  - Automated browser detection.
  - Content filters detection: Adblock detection.
- Hardware information:
  - Screen resolution.
  - Color resolution.
  - Device type.
  - Device memory.
  - CPU cores.
  - Max touch points.
  - WebGL vendor.
  - WebGL renderer.
  - Battery level.
  - Batter status.

```ts
function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '18pt Arial';
  context.textBaseline = 'top';
  context.fillText('Hello, user.', 2, 2);
  return canvas.toDataURL('image/jpeg');
}

getCanvasFingerprint();
```

## Security Vulnerability

### XSS

#### XSS Attack

Cross-site scripting (跨站脚本):

- Reflected XSS:
  url input (search pages)
  `http://localhost:8080/test?name=<script>alert('attack')</script>`.
- Stored XSS:
  store script into database.
- Inject script in HTML/CSS/JavaScript/JSON/HTTP:
  - `<a href=javascript:...>`.
  - `<base href=javascript:...>`.
  - `<bgsound src=javascript:...>`.
  - `<body background=javascript:...>`.
  - `<frameset><frame src="javascript:..."></frameset>`.
  - `<iframe src=javascript:...>`.
  - `<img src=x onerror=...>`.
  - `<input type=image src=javascript:...>`.
  - `<layer src=...>`.
  - `<link href="javascript:..." rel="stylesheet" type="text/css">`.
  - `<meta http-equiv="refresh" content="0;url=javascript:...">`.
  - `<object type=text/x-scriptlet data=...>`.
  - `<script>...</script>`.
  - `<style type=text/javascript>alert('xss')</style>`.
  - `<table background=javascript:...>`.
  - `<td background=javascript:...>`.
  - `<button onmouseover="alert(/1/)" onclick="alert(/2/)"></button>`.
  - `<button form="test" formaction="javascript:alert(1)">`.
  - `<button form=test onformchange=alert(2)>`.
  - `<input onfocus=write(1) autofocus>`.
  - `<form id=test onforminput=alert(1)><input></form>`.
  - `<audio onerror=javascript:alert(1)>`.
  - `<audio><source onerror="javascript:alert(1)"></audio>`.
  - `<video onerror=javascript:alert(1)>`.
  - `<video><source onerror="javascript:alert(1)"></video>`.
  - `@import ""`.
  - `background: url("")`.
  - `window.name`.
  - `window.location`.
  - `document.domain`.
  - `document.referrer`.
  - `document.location.assign()`.
  - `document.location.replace()`.
  - `document.write()`.
  - `element.innerHTML`.
  - `element.outerHTML`.
  - `cookie`.
  - `localStorage`.

#### XSS Protection

Don't trust user:

- Escape control characters (输入校验):
  - `"` -> `&quot;`, `&` -> `&amp;`, `'` -> `&apos;`, `<` -> `&lt;`, `>` -> `&gt;`.
  - `input.replace(/<script>|<script/>/g, '')`.
  - `input.trim()`.
  - React DOM escapes any values embedded in JSX before rendering them.
- Secure encode output result (输出编码):
  保证**编码方式一致**, e.g 混用单字节编码与多字节编码, 导致攻击者绕过 `\` 系统转义符.
- Check HTTP `Content-Type` header.
- Content security policy: `script-src 'self' https://apis.google.com`.
- Use mature template engine: built-in XSS protection feature.

### CSRF

#### CSRF Attack

Cross-site request forgery (跨站请求伪造)
挟制用户在当前已登录的 Web 应用程序上执行**非本意**的操作,
利用已认证用户 (长期本地 `Cookie`), 访问攻击者网站, 并被强制执行脚本,
在用户不知情的情况下提交 `GET`/`POST` request (长期本地 `Cookie`):

- `<link href="">`.
- `<a href="">`.
- `<img src="">`.
- `<img lowsrc="">`.
- `<img dynsrc="">`.
- `<iframe src="">`.
- `<frame src="">`.
- `<meta http-equiv="refresh" content="0; url=">`.
- `<script src="">`.
- `<bgsound src="">`.
- `<embed src="">`.
- `<video src="">`.
- `<audio src="">`.
- `<table background="">`.
- `@import ""`.
- `background: url("")`.

:::tip XSS vs CSRF

- XSS 利用的是网站对用户 (输入) 的信任.
- CSRF 利用的是网站对用户网页浏览器的信任.

:::

#### CSRF Protection

- `REST` (representational state transfer) 原则:
  - `GET` request: only read objects, 确保无副作用.
  - `PUT` request: only create new objects.
  - `POST` request: only modify objects.
  - `DELETE` request: only delete objects.
- 确保 `request` 正常发起渠道:
  - Anti-CSRF cookie:
    - 不可预测 salt token: `Set-Cookie: _xsrf=5978e29d4ef434a1`.
    - Hidden token check in `<form>`.
  - 开启同源策略: `Set-Cookie: _xsrf=5978e29d4ef434a1; SameSite=Strict;`.
  - 检查 HTTP `Referer` 请求头.
  - 检查第三方网站 `URL`, 显示第三方地址跳转警告页面:
    - Remove sensitive data in URL query and `Referer` header.
    - `<a href="https://3rd.com" target="_blank" rel="noopener noreferrer nofollow">`.
- Require re-authentication for sensitive action:
  支付账单, 修改邮箱, 删除账号.
- Use mature `CSRF` protection library:
  express.js `csurf` library.

```python
# Reject cross-origin requests to protect from
# CSRF, XSSI & other bugs
def allow_request(req):
  # Allow requests from browsers which don't send Fetch Metadata
  if not req['sec-fetch-site']:
    return True

  # Allow same-site and browser-initiated requests
  if req['sec-fetch-site'] in ('same-origin', 'same-site', 'none'):
    return True

  # Allow simple top-level navigation from anywhere
  if req['sec-fetch-mode'] === 'navigate' and req.method === 'GET':
    return True

  return False
```

### Click Jacking

#### Click Jacking Attack

Hover transparent malicious link upon trusted true button:

- `click`.
- `drag` and `drop`.
- `touch`.

#### Click Jacking Protection

`X-Frame-Options`:

- `DENY`.
- `SAMEORIGIN`.
- `ALLOW-FROM origin`.

```ts
// nodejs
response.setHeader('X-Frame-Options', 'DENY');
```

Content security policy:

```bash
Content-Security-Policy: frame-ancestors 'none'
Content-Security-Policy: frame-ancestors 'self'
Content-Security-Policy: frame-ancestors example.com google.com
```

Prevent load self in frame (`Frame Busting`):

```html
<style>
  /* Hide page by default */
  html {
    display: none;
  }
</style>

<script>
  if (
    top != self ||
    top.location != location ||
    top.location != self.location ||
    parent.frames.length > 0 ||
    window != top ||
    window.self != window.top ||
    window.top !== window.self ||
    (parent && parent != window) ||
    (parent && parent.frames && parent.frames.length > 0) ||
    (self.parent && !(self.parent === self) && self.parent.frames.length != 0)
  ) {
    // Break out of the frame.
    top.location = self.location;
    top.location.href = document.location.href;
    top.location.href = self.location.href;
    top.location.replace(self.location);
    top.location.href = window.location.href;
    top.location.replace(document.location);
    top.location.href = window.location.href;
    top.location.href = 'URL';
    document.write('');
    top.location = location;
    top.location.replace(document.location);
    top.location.replace('URL');
    top.location.href = document.location;
    top.location.replace(window.location.href);
    top.location.href = location.href;
    self.parent.location = document.location;
    parent.location.href = self.document.location;
    parent.location = self.location;
  } else {
    // Everything checks out, show the page.
    document.documentElement.style.display = 'block';
  }
</script>
```

:::caution Frame Busting Attack

`<iframe>` `sandbox` 属性与 `security`,
可以限制 `<iframe>` 页面中的 JavaScript 脚本执行,
从而使得 [`Frame Busting` 失效](https://seclab.stanford.edu/websec/framebusting/framebust.pdf).

:::

### SQL Injection

#### SQL Injection Attack

User input `' OR 1=1--`:

```sql
SELECT *
  FROM users
 WHERE email = 'user@email.com'
   AND pass  = '' OR 1=1--' LIMIT 1
```

#### SQL Injection Protection

- Don't allow multiple statements.
- Validate user input: **是否存在/数据类型/取值范围/缺省值/正则表达式/特殊字符**.
- Allowlist user input.
- Least privilege principle:
  allow `SELECT`/`INSERT`/`UPDATE`/`DELETE` on certain data,
  forbidden `CREATE`/`DROP`/`MODIFY`.
- Use mature object-relational mapping (ORM) library:
  built-in SQL injection protection feature,
  `users.findBy({ email: "billy@gmail.com" })`.
- Parameterized statements: use placeholders instead of variable interpolation.

```sql
-- Construct the SQL statement we want to run, specifying the parameter.
Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
Statement statement = connection.createStatement();
String sql = "SELECT * FROM users WHERE email = ? and encrypted_password = ?";
statement.executeQuery(sql, email, password);
```

### Command Injection

#### Command Injection Attack

```json
{
  "query": "?domain=google.com%3BEcho%20%22Hacked%22"
}
```

#### Command Injection Protection

- Escape control characters: `<`/`>`/`?`/`=`/`&&`.
- Disable code execution during deserialization.
- 尽量不使用系统执行命令.
- 保证动态函数为受信任函数, 防止被攻击者替换.

### HTTP Injection

#### Malicious Redirect Attack

```json
{
  "query": "?redirect=google.com%3BEcho%20%22Hacked%22"
}
```

#### Malicious Redirect Protection

- 检查第三方网站 `URL`, 显示第三方地址跳转警告页面:
  - Remove sensitive data in URL query and `Referer` header.
  - `<a href="https://3rd.com" target="_blank" rel="noopener noreferrer nofollow">`.
- Check `?url=`/`?redirect` data:
  - Escape control character.
  - Limit redirect range.
- Check `Referrer` header when doing redirect.

```ts
function isRelative(url) {
  return url && url.match(/^\/[^\/\\]/);
}
```

#### HTTP Header Injection Attack

通过截断 HTTP 响应头 (换行符/空字符),
覆盖 `Location`/`Referer` 响应头,
注入攻击者设置的 HTTP 响应头.

#### HTTP Header Injection Protection

- 不将外部输入作为 HTTP 响应头.
- 检验 HTTP 响应头特殊字符: e.g 换行符.
- 使用成熟的库生成 HTTP 响应头, 禁止简单字符拼接.

### Object Injection

#### Object Injection Attack

- `__proto__.XX`.
- `constructor`.
- `hasOwnProperty`.

#### Insecure Object Comparison

Injection:

```ts
const token = req.cookie.token;

// Vulnerability:
// SESSIONS[constructor] => `true`
if (token && SESSIONS[token]) {
  next();
}
```

Solutions:

- `crypto.timingSafeEqual`.
- `object.hasOwnProperty(token)`.

### File Upload Injection

#### File Upload Attack

当使用 JS 代码限制上传文件类型时,
攻击者 disable JS in browser,
并上传 malicious code file:

```php
// Malicious `web shell` code file
<?php
  if (isset($_REQUEST['cmd'])) {
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
  } else {
    echo 'What is your bidding?';
  }
?>
```

一旦攻击者成功将 `webShell.php` 当成头像上传成功,
便可以在头像处执行 `web shell` 远程攻击.

#### File Upload Protection

对于用户上传文件:

- 隔离文件: host files on secure system.
- 禁止文件执行: `-x`.
- 重命名/哈希化文件: 防止攻击者找到此文件.
- 检查文件格式 (extension/`MIME` type/`Content-Type`).
- 检查文件内容.
- 检查 `Content-Type` header.
- 扫描文件: virus scanner.

### Authentication Vulnerability

#### Password Attack

Password [mis-management](https://www.hacksplaining.com/prevention/password-mismanagement):

- Reused key attack: 使用同一个密钥进行多次加/解密, 将使得破解流密码变得非常简单.

#### Password Protection

- Require complex password.
- Require multi-factor authentication.
- Secure and robust password hashing: `bcrypt`.
- Secure and robust password salting.
- Secure password resets.
- Validate email address.
- Ban disposable email account.
- 密钥管理:
  - 防止密钥从非正常的渠道泄露.
  - 定期更换密钥.
  - 采用安全的密钥管理系统: Web 应用通过 service API 动态获取密钥, 只加载到内存中, 不写入本地文件.

#### User Enumeration Attack

通过暴力工具得到被攻击网站的用户名单, 并利用社工得到密码:

REST API 无法抵抗此种攻击,
e.g GitHub [user profile](https://github.com).

#### User Enumeration Protection

##### User API Protection

- 限制 API 访问频率与次数.
- 设置 IP 黑名单.
- 记录登陆日志.
- [CAPTCHA](https://www.google.com/recaptcha/about):
  completely automated public turing test to tell computers and humans apart.
- 隐藏用户 ID, 只显示昵称.

##### Login Protection

使攻击者无法枚举用户名, 他无法确定是用户不存在还是密码错误:

- Login error message: Unknown User **or** Password.
- All login code-paths take **same time** on average: time consuming operations.
- All login code-paths take **same context**: session ID, cookie.

##### Sign Up and Reset Protection

Not with name, should with email:

- 使攻击者无法枚举用户名, 他无法确定是用户不存在还是用户已存在.
- Not Exist: Sending sign-up email.
- Exist: Sending pwd-reset email.

### Session Vulnerability

#### Session Hijacking Protection

`Set-Cookie: session_id=278283910977381992837; HttpOnly; Secure; SameSite=Lax`:

- Prevent XSS cookie theft,
  disable JavaScript access to cookie:
  `Set-Cookie: session_id=278283910977381992837; HttpOnly`.
- Prevent CSRF cookie theft,
  enable same-origin policy, only allow cookie on `GET` request (social media sharing):
  `Set-Cookie: session_id=278283910977381992837; SameSite=Lax`.
- Prevent man-in-the-middle attack,
  use HTTPS connection:
  `Set-Cookie: session_id=278283910977381992837; Secure`.

#### Session Fixation Protection

在 **HTTP Cookie** 中传输**复杂**的 session ID, 并在**成功连接**/**恶意篡改**后重置 session ID:

- Not passing session ID in `queryString`/`requestBody`:
  跳转至第三方链接时, 会在 `Referer` header 处泄露 session ID,
  passing them in **HTTP Cookie**.
  同样地, 不允许在 URL query 处放置任何其他敏感数据 (如 token).
- Generate complex session ID.
- 认证成功前不在会话变量中存储敏感信息.
- Reset session ID after set up session successfully.
- Reset session ID after it's been changed manually on client (`Set-Cookie`):
  - IP.
  - Device.
  - User agent.

```ts
req.session.regenerate(function (err) {
  process(err);
});

const generateSessionId = session => uid(24);
```

### Directory Traversal

#### Directory Traversal Attack

```bash
GET /../../../passwd.key HTTP/1.1
```

#### Directory Traversal Protection

- 检查请求路径是否安全, 否则不返回响应.
- Use mature hosting service.
- Use indirect file reference.
- Sanitize file reference.

### Information Leakage

#### Information Leakage Attack

- Server in response headers.
- Cookie: J_SESSION_ID -> Java.
- URL: `.jsp`, `.php`, `.asp`.
- Error message.
- AJAX responses.
- JSON/XML responses.
- Code information.

```json
[
  {
    "Server": "Apache/1.3.23",
    "Accept-Ranges": "bytes",
    "Content-length": 196,
    "Connection": "close",
    "Content-Type": "text/html",
    "Cookie": "SESSION_ID=XXXXX"
  },
  {
    "Server": "Microsoft-IIS/5.0",
    "Content-Type": "text/html",
    "Accept-Ranges": "bytes",
    "ETag": "b0aac0542e25c31",
    "Content-Length": 7369
  }
]
```

#### Information Leakage Protection

- `NODE_ENV=production`.
- 处理/混淆/加密原始数据 (raw data).
- 处理/混淆客户端代码.
- 去除工具库的版本信息.
- Disable `Server` HTTP header and similar headers.
- Use clean URLs without extensions.
- Use generic cookie parameters.
- Disable client-side error reporting.
- Sanitize data passed to client.
- Obfuscate JavaScript.
- Sanitize template files.
- Ensure correct configuration of Web root directory.
- 配置边界路由器和防火墙: 阻止从敏感来源发起的信息请求.
- 限制对所有敏感信息源的访问.
- 永远不要硬编码密码, 且不放在易暴露位置.
- 对任何敏感信息源使用双因素认证.
- 执行审核来查找潜在的漏洞.
- 使用评估工具来确定是否存在从指定位置外的任何位置访问敏感信息源的可能.

### Supply Chain Vulnerability

#### Supply Chain Attack

- [Running file encryption attack in Node.js module](https://dev.to/devdevcharlie/running-a-ransomware-attack-in-a-nodejs-module-4hgb).
- [left-pad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm).
- [eslint](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes).
- [antd](https://github.com/ant-design/ant-design/issues/13098).
- [faker.js](https://github.com/marak/Faker.js).
- [colors.js](https://github.com/Marak/colors.js/issues/285).
- [node-ipc](https://github.com/RIAEvangelist/node-ipc).
- [es5-ext](https://github.com/medikoo/es5-ext/commit/28de285ed433b45113f01e4ce7c74e9a356b2af2).
- [event-source-polyfill](https://github.com/Yaffle/EventSource/commit/de137927e13d8afac153d2485152ccec48948a7a).
- [styled-components](https://github.com/styled-components/styled-components/commit/ba9d732ca7da53f2a095e35450ecffd592c6f5ba).

#### Supply Chain Protection

评估 NPM package 质量:

- 代码质量.
- 测试完备性.
- 文档完备性.
- 工程完备性 (DevOps).
- 开发人员构成.
- 兼容性:
- 流行度.
- 历史遗留 Bug.
- 重复实现复杂度.
- 使用时长.
- 后续依赖版本更新策略.

#### Malicious Package Attack

名字与流行包相近, 通过 `postinstall` 脚本执行病毒脚本, 获取系统环境变量信息 e.g `crossenv`.

#### Malicious Package Protection

- No typo in `package.json`:
  - NPM package [database](https://openbase.com).
  - NPM package [advisor](https://snyk.io/advisor).
- 禁止执行 `postinstall` 脚本.
- Use mature dependency management tools: `renovate`.
- Stay alert to security issues:
  - Apply operating system patches.
  - Security tools: `npm audit`, `socket.security`.
  - Official advisories.
  - Mailing lists and blogs.
  - Social media.
- Package integrity check.

```bash
cat FILENAME.js | openssl dgst -sha384 -binary | openssl base64 -A
```

### XML Vulnerability

#### XML Attack

Inline document type definition in XML
led to dangerous macros:

- XML bombs.
- XML external entities.

#### XML Protection

- Disable DTD (Document Type Definitions) parse in XML parser:
  `xml2js`, `parse-xml`, `node-xml`.
- Least privilege principle.

### Denial of Service

#### DoS Attack

DoS 攻击, 攻击者不断地提出服务请求, 让合法用户的请求无法及时处理:

- DNS 服务.
- Email 服务.
- FTP 服务.
- ICMP 服务.
- TCP 服务.
- Telnet 服务.
- Web 服务.
- 即时通讯服务.

#### DoS Protection

- Application firewall.
- Intrusion prevention system.
- 购买专门设计用来对抗 DoS 攻击的设备.
- 依靠网络服务提供商 (ISP) 来检测并消除 DoS 攻击.
- 获取云缓存提供商的服务: mature CDN service support DDoS protection.
- Scalable job queue.

#### DDoS Attack

Distributed denial of service attack:

- SYN flood:
  伪造 IP 不应答服务器 `SYN/ACK` 报文, 导致服务器消耗资源 (retry time) 处理这种半连接.
- UDP flood.
- ICMP flood.
- Slow connection attack: 构造 `Content-Length` 大值, 低速度发包 (10s ~ 100s 发送一个字节), 占用服务器资源.
- Redirect attack: 入侵了一个大网站后, 通过篡改页面, 将巨大的用户流量分流到目标网站.

#### DDoS Protection

- SYN cookie: 每个 IP 地址分配一个 cookie, 限制访问频率, 超过一定频率后不响应 IP.
- 限制请求频率与请求力度:
  - 客户端:
    CAPTCHA (Completely Automated Pub-lic Turing Test to Tell Computers and HumansApart).
  - 服务端:
    建立应用防火墙与服务器安全模块, e.g 过滤网关防护.
- 提升带宽最大负荷.
  - 缩短超时 (SYN Timeout) 时间.
  - 增加最大半连接数.
- 提升服务器性能:
  - Use mature memory cache library, e.g `Redis`.
  - 负载均衡.
  - CDN.

#### ReDoS Attack

正则表达式 DoS 攻击:

正则表达式引擎采用回溯的方式匹配所有可能性, 导致性能问题.

#### ReDoS Protection

- 不使用 NFA 实现的正则表达式引擎, 使用 DFA 实现的正则表达式引擎.
- 不定义性能消耗过大的正则表达式.
- 不动态构造正则表达式 `new RegExp()`.
- 禁止用户输入影响正则表达式构建/匹配.

## Zero Trust Access Control

从防御的角度来讲, 内部风险是外部风险的超集:
当攻击者攻陷任何一个内部人员 (合法用户或员工) 的设备后,
攻击者便成了内部人员.
[零信任](https://zchn.github.io/j/ztcn)
从这个角度看就是假设任何一台主机都有可能被攻陷.

### Chain of Trust

零信任并不是完全没有信任,
而是几个基本的最小化的信任根 (Root of Trust),
重构信任链 (Chain of Trust).
通过一系列的标准化流程 (Standard Process) 建立的一个完整的信任链
(信任树 Tree of Trust 或者信任网 Web of Trust).

几个典型的例子包括:

- 多因子认证 (MFA, Multi-Factor Authentication):
  人的身份的信任根.
- 可信平台模块 (TPM, Trusted Platform Module)和可信启动 (Trusted Boot):
  机器的身份的信任根.
- 源代码和可信编译 (Trusted Build):
  软件的信任根.

### Identity 2.0

身份 2.0 是对于以上的信任链的标准化,
以便于在安全访问策略中使用这些在建立信任过程中收集到的信息.

在身份 2.0 中, 一切本体 (Entity) 都有身份.
用户有用户身份, 员工有员工身份, 机器有机器身份, 软件有软件身份.

在身份 2.0 中, 一切访问 (Access) 都带有访问背景 (Access Context):

- 目的: 为了帮助用户解决一个技术问题
- 访问者: 员工 A
- 授权者: 用户 B
- 访问方式: 软件 C
- 访问地点: 机器 D

### Continuous Access Control

持续访问控制会在软件开发和运行的各个环节持续地进行访问控制:

- 在员工登录时要求提供多因子认证.
- 在部署软件时要求软件是从信任的源码库在安全的环境中编译而来,
  并经过代码评估 (Code Review).
- 在主机之间建立连接时要求双方提供主机完整性证明.
- 在微服务获取特定用户数据时要求提供该用户的授权令牌 (Authorization Token).

### Zero Trust Basement

零信任的实施依赖于扎实的基础安全架构, 没有基础就没有上层建筑.
谷歌零信任依赖于以下基础设施提供的基本安全保障:

- 数据加密和密钥管理 (Encryption and Key Management)
- 身份和访问管理 (Identity and Access Management)
- 数字化人力资源管理 (Digital Human Resource)
- 数字化设备管理 (Digital Device Management)
- 数据中心安全 (Data Center Security)
- 网络安全 (Network Security)
- 主机安全 (Host Security)
- 容器隔离 (Container Isolation, gVisor)
- 可信启动 (Trusted Boot)
- 可验证编译 (Verifiable Build)
- 软件完整性验证 (Software Integrity Verification)
- 双向 TLS (mTLS)
- 基于服务的访问策略 (Service Access Policy)
- 终端用户令牌 (End User Context Tokens)
- 配置即代码 (Configuration as Code)
- 标准化开发和部署 (Standard Development and Deployment)

## Security Checklist

### Access Control System Checklist

注册/二次验证/密码重置:

- [ ] 任何地方都使用 HTTPS.
- [ ] 使用 `bcrypt` 存储密码哈希.
- [ ] `登出`之后销毁会话 ID .
- [ ] 密码重置后销毁所有活跃的会话.
- [ ] OAuth2 验证必须包含 `state` 参数.
- [ ] 登陆成功之后不能直接重定向到开放的路径 (需要校验, 否则容易存在钓鱼攻击).
- [ ] 当解析用户注册/登陆的输入时, 过滤 `javascript://`, `data://` 以及其他 CRLF 字符.
- [ ] 使用 `secure`/`httpOnly` `Cookie`.
- [ ] 移动端使用 `OTP` 验证时, 当调用 `generate OTP` 或者 `Resend OTP` API 时不能把 OTP
      (One Time Password) 直接返回
      (一般是通过发送手机验证短信, 邮箱随机 code 等方式, 而不是直接 response).
- [ ] 限制单个用户 `Login`/`Verify OTP`/ `Resend OTP`/`generate OTP` 等 API 的调用次数,
      使用 Captcha 等手段防止暴力破解.
- [ ] 检查邮件或短信里的重置密码的 token, 确保随机性 (无法猜测).
- [ ] 给重置密码的 token 设置过期时间.
- [ ] 重置密码成功后, 将重置使用的 token 失效.
- [ ] Nodejs 等不使用 sudo 运行.

### Authentication Checklist

- [ ] 诸如`我的购物车`/`我的浏览历史`之类的资源访问, 必须检查当前登录的用户是否有这些资源的访问权限.
- [ ] 避免资源 ID 被连续遍历访问, 使用 `/me/orders` 代替 `/user/37153/orders` 以防忘记检查权限, 导致数据泄露.
- [ ] `修改邮箱/手机号码`功能必须首先确认用户已经验证过邮箱/手机 (本人).
- [ ] 任何上传功能应过滤用户上传的文件名, 并存储在云存储上防止代码执行.
- [ ] `个人头像上传` 功能应过滤所有的 `EXIF` 标签.
- [ ] 用户 ID 或者其他的 ID,
      应使用 [RFC compliant](http://www.ietf.org/rfc/rfc4122.txt) 的 `UUID` 而不是整数.
- [ ] [`JWT`](https://jwt.io) (JSON Web Token): 当构建一个 `SPA`/`API` 时使用 `JWT`.

### Mobile Application Checklist

- [ ] 支付网关的 `salt` (盐) 不应被硬编码.
- [ ] 来自第三方的 `secret` 和 `auth token` 不应被硬编码.
- [ ] 在服务器之间调用的 API 不应在 app 里面调用.
- [ ] 在安卓系统下, 要小心评估所有申请的 [权限](https://developer.android.com/guide/topics/security/permissions.html).
- [ ] 在 iOS 系统下, 使用系统的钥匙串来存储敏感信息 (auth token/API key) **不要** 把这类信息存储在用户配置里面.
- [ ] 强烈推荐证书绑定 ([certificate pinning](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning)).

### Server Configuration Checklist

- [ ] `添加` [CSP](https://en.wikipedia.org/wiki/Content_Security_Policy) 头信息,
      减缓 XSS 和数据注入攻击. 这很重要.
- [ ] `添加` [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) 头信息
      防止跨站请求伪造 (CSRF) 攻击.
      同时`添加` [SameSite](https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00)
      属性到 cookie 里面.
- [ ] `添加` [HSTS](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
      头信息防止 SSL stripping 攻击.
- [ ] `添加` 你的域名到 [HSTS 预加载列表](https://hstspreload.appspot.com).
- [ ] `添加` [X-Frame-Options](https://en.wikipedia.org/wiki/Clickjacking#X-Frame-Options)
      防止点击劫持.
- [ ] `添加` [X-XSS-Protection](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#X-XSS-Protection)
      缓解 XSS 攻击.
- [ ] `更新` DNS 记录, 增加 [SPF](https://en.wikipedia.org/wiki/Sender_Policy_Framework)
      记录防止垃圾邮件和钓鱼攻击.
- [ ] 如果你的 Javascript 托管在第三方的 CDN 上面,
      需要`添加` [内部资源集成检查](https://en.wikipedia.org/wiki/Subresource_Integrity).
      为了更加安全, 添加 [require-sri-for](https://w3c.github.io/webappsec-subresource-integrity/#parse-require-sri-for)
      CSP-directive 就不会加载到没有 SRI 的资源.
- [ ] 使用随机的 CSRF token, 业务逻辑 API 可以暴露为 POST 请求.
      不要把 CSRF token 通过 HTTP 接口暴露出来, 比如第一次请求更新的时候.
- [ ] 在 `GET` 请求参数里面, 不要使用临界数据和 token: 暴露服务器日志的同时也会暴露用户数据.

### Client Input Checklist

- [ ] `过滤`所有暴露给用户的参数输入,
      防止 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击.
- [ ] 使用参数化的查询防止 [SQL 注入](https://en.wikipedia.org/wiki/SQL_injection).
- [ ] `过滤`所有具有功能性的用户输入, 比如 `CSV` 导入.
- [ ] `过滤`一些特殊的用户输入,
      例如将 `robots.txt` 作为用户名,
      提供 `coolCorp.io/username` 之类的 `URL` 来提供用户信息访问页面:
      此时变成 `coolCorp.io/robots.txt`, 造成安全漏洞.
- [ ] 禁止手动拼装 JSON 字符串, 不管这个对象有多么小: 使用所用的语言相应的库或者框架来编写.
- [ ] `过滤` 类似 `URL` 的输入,
      防止 [SSRF](https://docs.google.com/document/d/1v1TkWZtrhzRLy0bYXBcdLUedXGb9njTNIJXa3u9akHM/edit#heading=h.t4tsk5ixehdd)
      攻击.
- [ ] 在输出显示给用户之前, `过滤`输出信息.

### Operation Checklist

- [ ] 如果你的业务很小或者你缺乏经验, 可以评估一下使用 AWS 或者一个 PaaS 平台来运行代码.
- [ ] 在云上使用正规的脚本创建虚拟机.
- [ ] 检查所有机器没有必要开放的 `端口`.
- [ ] 检查数据库是否没有设置密码或者使用默认密码, 特别是 MongoDB 和 Redis.
- [ ] 使用 SSH 登录你的机器, 不要使用密码, 而是通过 SSH key 验证来登录.
- [ ] 及时更新系统, 防止出现 0day 漏洞, 比如 HeartBleed, ShellShock 等.
- [ ] 修改服务器配置, HTTPS 使用 TLS1.2, 禁用其他的模式.
- [ ] 不要在线上开启 DEBUG 模式, 有些框架, DEBUG 模式会开启很多权限以及后门, 或者是暴露一些敏感数据到错误栈信息里面.
- [ ] 对坏人和 DDOS 攻击要有所准备, 使用那些提供 DDOS 清洗的主机服务.
- [ ] 监控你的系统, 同时记录到日志里面 (例如使用 [New Relic](https://newrelic.com) 或者其他).
- [ ] 如果是 2B 的业务, 坚持顺从需求.
      如果使用 AWS S3, 可以考虑使用
      [数据加密](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html)
      功能.
      如果使用 AWS EC2, 考虑使用磁盘加密功能 (系统启动盘也可加密).

### Teamwork Checklist

- [ ] 开一个邮件组 (例如: `security@coolcorp.io`) 和搜集页面, 方便安全研究人员提交漏洞.
- [ ] 取决于你的业务, 限制用户数据库的访问.
- [ ] 对报告 BUG 与 漏洞的人有礼貌.
- [ ] 把你的代码给那些有安全编码观念的同伴进行 review (More eyes).
- [ ] 被黑或者数据泄露时, 检查数据访问前的日志, 通知用户更改密码, 可能需要外部的机构来帮助审计.
- [ ] 使用 [Netflix Scumblr](https://github.com/Netflix/Scumblr) 及时了解
      你的组织 (公司) 在社交网络或者搜索引擎上的一些讨论信息, 比如黑客攻击/漏洞等等.

## Security Reference

- Open web application security project [cheat sheet](https://github.com/OWASP/CheatSheetSeries).
- Open source security state of [2022](https://snyk.io/reports/open-source-security).
- Web security [checklist](https://eggjs.org/zh-cn/core/security.html).
- Security search [engines](https://github.com/edoardottt/awesome-hacker-search-engines).
- ESLint node security [plugin](https://github.com/nodesecurity/eslint-plugin-security).
- MetaSploit: penetration testing [framework](https://github.com/rapid7/metasploit-framework).
