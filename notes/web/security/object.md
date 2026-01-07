---
sidebar_position: 15
tags: [Web, Security, Object, Injection, Vulnerability]
---

# Object Injection

## Object Injection Attack

- `__proto__.XX`.
- `constructor`.
- `hasOwnProperty`.

## Insecure Object Comparison

Injection:

```ts
const token = req.cookie.token

// Vulnerability:
// SESSIONS[constructor] => `true`
if (token && SESSIONS[token])
  next()
```

Solutions:

- `crypto.timingSafeEqual`.
- `object.hasOwnProperty(token)`.
