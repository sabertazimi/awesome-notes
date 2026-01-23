---
sidebar_position: 11
tags: [AI, Generative AI, LLM, Agent, Workflow, Vibe Coding, Agentic Coding]
---

# Workflow

## AGENTS.md

项目配置文件应回答[三个问题](https://mp.weixin.qq.com/s/a5UDlkD6Db2kKCAj7LN6gQ):

- WHAT: 技术栈、项目结构、各模块的职责.
- WHY: 项目的目的、设计决策的背景, 特别是反模式代码 (历史债务).
- HOW: 运行、测试、验证的基本命令与流程.
- 渐进式披露: 文件本身 300 行以内，越短越好, 剩余内容列出文档与简要描述.

## Plan

Claude code `EnterPlanMode` system prompt:

```md
Entered plan mode. You should now focus on exploring the codebase and designing an implementation approach.

In plan mode, you should:
1. Thoroughly explore the codebase to understand existing patterns
2. Identify similar features and architectural approaches
3. Consider multiple approaches and their trade-offs
4. Use AskUserQuestion if you need to clarify the approach
5. Design a concrete implementation strategy
6. When ready, use ExitPlanMode to present your plan for approval

Remember: DO NOT write or edit any files yet. This is a read-only exploration and planning phase.
```

## Debug

Cursor [debug mode](https://cursor.com/blog/agent-best-practices#bug-debug-mode):

1. Assume: 生成多个假设
2. Log: 进行日志埋点
3. Collect: 收集运行时数据 (log, trace, profile)
4. Locate: 复现 bug, 分析实际行为, 精准定位根本原因
5. Fix: 基于证据, 进行有针对性的修复

## TDD

模型通过强化学习, 利用 `尝试 -> 反馈 -> 调整` 循环, 实现 agentic 能力.
提供清晰的成功标准, 允许试错的使用方式, 与智能体训练过程相契合.

[Test-driven development](https://cursor.com/cn/blog/agent-best-practices):

1. Write tests:
   让智能体根据预期的输入/输出对编写测试.
   明确说明在做 TDD, 避免 agent 为尚不存在的功能编写模拟实现.
2. Run tests:
   让智能体运行测试并确认测试确实失败.
   明确说明在这个阶段不要编写实现代码.
3. Commit tests.
4. Write code:
   让智能体编写能通过测试的代码，并指示它不要修改测试.
   告诉它持续迭代, 直到所有测试通过.
5. Submit code.

## Compound

[Compound engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)
(复利工程), 每个 PR 都在教育系统, 每个 bug 都成为永久的教训, 每次代码审查都在更新 agent 的默认行为:

- 将经验沉淀到项目文档.
- 让 bug 修复产生长期价值.
- 从代码审查中提取模式.
- 建立可复用的工作流程: slash commands, hooks, guardrails, and skills.
- Linter rules, regression tests, `AGENTS.md` improvements, checklist updates.

## Actions

- Claude Code action [solutions](https://github.com/anthropics/claude-code-action/blob/main/docs/solutions.md).
- Cursor agent [cookbook](https://cursor.com/docs/cli/cookbook/code-review).

## References

- OpenAI agents [cookbook](https://cookbook.openai.com/topic/agents).
- Vibe coding [guide](https://github.com/tukuaiai/vibe-coding-cn).
- First-principles agentic coding [guide](https://mp.weixin.qq.com/s/a5UDlkD6Db2kKCAj7LN6gQ).
