---
sidebar_position: 7
tags: [Programming, Git, Diff]
---

# Diff

查看未暂存(un-staged)差异

```bash
git diff
```

查看已暂存(staged)差异

```bash
git diff --staged
```

显示空白字符错误(space/tab/return)

```bash
git diff --check
```

```bash
diff -u <src> <dist>
diff -Nur <src_dir> <dist_dir>
```

删除 squash 分支:

```bash
# Output the diff between main and fix/components branches
git diff main..fix/components

# If git diff is empty, delete the branch in force
git branch -D fix/components
```

## Patch

```bash
patch -p[num] < patchFile
patch -dry -run -p[num] < patchFile
```

```bash
diff -Nur program_1.0 program_2.0 > program_2.0.patch
patch -p1 <../program_2.0.patch
```

- `git format-patch`:
  mailbox 的格式来生成一系列的补丁以便你可以发送到一个邮件列表中.
- `git am`:
  应用来自邮箱的补丁.
- `git apply`:
  应用一个通过 git diff 或者甚至使用 GNU diff 命令创建的补丁.
