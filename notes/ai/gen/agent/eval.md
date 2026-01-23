---
sidebar_position: 22
tags: [AI, Generative AI, LLM, Agent, Eval]
---

# Eval

Agents [eval](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents):

1. Start early.
2. Source realistic tasks from failures.
3. Define unambiguous, robust success criteria.
4. Design graders thoughtfully and combine multiple types (code-based, model-based, human).
5. Make sure the problems are hard enough for model.
6. Iterate on evaluations to improve signal-to-noise ratio.
7. Read transcripts (记录).
8. Pick framework: [prompt foo](https://github.com/promptfoo/promptfoo), [harbor](https://github.com/laude-institute/harbor).

| Method            | 👍 Strengths                    | 👎 Weaknesses                                                |
| ----------------- | ------------------------------- | ------------------------------------------------------------ |
| Human Evaluation  | Captures nuanced behavior       | Subjective, time-consuming, expensive, difficult to scale    |
| LLM-as-a-Judge    | Consistent, scalable, efficient | May overlook intermediate steps, limited by LLM capabilities |
| Automated Metrics | Objective, scalable, efficient  | May not capture full capabilities                            |

## Trace

When building agents, [trace](https://x.com/hwchase17/status/2010044779225329688) is the source of truth:

- Debugging becomes trace analysis
- Testing becomes eval-driven
- Can't set breakpoints in reasoning
- Performance optimization changes: task success rate, reasoning quality, tool usage efficiency

## Trajectory

**Trajectory** is equally important as **final response**:

- Exact match: produce trajectory that perfectly mirrors ideal solution.
- In-order match: complete expected trajectory, while accommodating extra, un-penalized actions.
- Any-order match: include all necessary actions.
- Precision: relevant tool calls.
- Recall: essential tool calls.

[![Trajectory](./figures/trajectory.png)](https://www.kaggle.com/whitepaper-agent-companion)

## Benchmarks

[Benchmarks](https://blog.sshh.io/p/understanding-ai-benchmarks):

- Aggregate: Don’t obsess over a 1-2% lead on one benchmark, focus on specific and comprehensive domain.
- Relative: Compare within the same model family or lab, how did the score change from v1 to v2?
- Verify: The only benchmark that matters at the end of the day is your workload.

## References

- Agent evaluation [whitepaper](https://www.kaggle.com/whitepaper-agent-companion).
- Agent quality [whitepaper](https://www.kaggle.com/whitepaper-agent-quality).
- Claude Opus 4.5 [system card](https://assets.anthropic.com/m/64823ba7485345a7/Claude-Opus-4-5-System-Card.pdf).
- Autonomous agents [benchmark](https://github.com/GAIR-NLP/AgencyBench).
