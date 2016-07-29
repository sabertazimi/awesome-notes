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

````js
// nodejs
response.setHeader("X-Frame-Options", "DENY");
response.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
```