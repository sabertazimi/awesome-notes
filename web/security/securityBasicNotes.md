# Security Basic Notes

## Curated List of Vulnerability(漏洞)

### SQL Injection

user input: ' or 1=1--

```sql
SELECT *
  FROM users
 WHERE email = 'user@email.com'
   AND pass  = '' or 1=1--' LIMIT 1
```

#### Protection

parameterized statements

```js
// Construct the SQL statement we want to run, specifying the parameter.
String sql = "SELECT * FROM users WHERE email = ?";
```

### Click Jacking

Hover a transparent malicious link upon the true button

#### Protection

-   frame killing snippet

```html
<style>
    /* Hide page by default */
    html {
        display : none;
    }
</style>

<script>
    if (self == top) {
        // Everything checks out, show the page.
        document.documentElement.style.display = 'block';
    } else {
        // Break out of the frame.
        top.location = self.location;
    }
</script>
```

-    X-Frame-Options

```js
// nodejs
response.setHeader("X-Frame-Options", "DENY");
response.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
```

### Session Fixation

#### Protection

在 **HTTP Cookies** 中传输**复杂**的 Session IDs, 并在**成功连接**/**恶意篡改**后重置 Session IDs.

-   where: not passing session IDs in queryStrings/requestBody, instead of passing them in **HTTP cookies**

```js
req.session.regenerate(function(err) {
    // New session here
})
```
-   what: generate complex session IDs

```js
const generateSessionId = sess => uid(24);
```

-   how: reset session IDs after set up session successfully
-   how: reset session IDs after it's been changed manually on client(Set-Cookies)

### XSS(Cross-Site-Scripting) Attack

-   Reflected XSS: url input(search pages)

user input: <script> malicious code </script>

#### Protection

don't trust user:

-   `replace(/<script>|<script/>/g, '')`
-   `trim()`
-   using template engine(handlebars, jade, etc...)

### CSRF(Cross-Site Request Forgery) - 跨站请求伪造

挟制用户在当前已登录的Web应用程序上执行非本意的操作 - 利用已认证用户(长期 Cookies), 访问攻击者网站, 并被强制执行脚本, 在用户不知情的情况下提交 Get/Post Request with Cookies 给被攻击网站.

#### Protection

-   GET request 没有副作用
-   确保 request 正常渠道发起(hidden token check in form)
-   addition authentication: input password again

```js
express/csurf library
```

### File Upload Vulnerabilities

当使用 JS 代码限制上传文件类型时, 攻击者 Disable JS in Browser, 并上传 malicious code file.

```php
<?php
    if (isset($_REQUEST['cmd'])) {
        $cmd = ($_REQUEST['cmd']);
        system($cmd);
    } else {
        echo 'What is your bidding?';
    }
?>
```

#### Protection

对于上传文件:

-   隔离 + 禁止执行
-   重命名/Hash 化: 以防攻击者找到此文件
-   检查文件格式
-   检查 Content-Type Header
-   使用 Virus Scanner

### Malicious Redirects

#### Protection

```js
function isRelative(url) {
    return url && url.match(/^\/[^\/\\]/);
}
```
