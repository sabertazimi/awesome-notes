---
sidebar_position: 19
tags: [Web, TypeScript, Performance]
---

# Performance

## Diagnosing Performance Issues

- Latest version for TypeScript, dependencies, editor, plugins and extensions.
- Disable all editor extensions.
- No other hogging resources.
- Use strict compilation.

Fixing TypeScript [performance problems](http://viget.com/articles/fixing-typescript-performance-problems):

```bash
tsc --listFilesOnly
tsc --explainFiles > explanations.md
tsc --extendedDiagnostics
tsc --generateTrace <output_dir>
```

```bash
node --max-old-space-size=8192 ./node_modules/.bin/tsc -b --extendedDiagnostics --generateTrace ./ts-trace
pnpm dlx analyze-trace ./ts-trace
```
