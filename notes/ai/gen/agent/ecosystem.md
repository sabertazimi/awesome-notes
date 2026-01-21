---
sidebar_position: 50
tags: [AI, Generative AI, LLM, Agent, Library, Toolchain]
---

# Ecosystem

## LangChain

[LangChain](https://upstash.com/blog/langchain-explained)
aims to make programming with LLMs easier.

[![LangChain Modules](./figures/lang-chain.png)](https://github.com/langchain-ai/langchainjs)

Model I/O module
normalize LLM inputs (e.g. prompts), APIs, and outputs (e.g. completions):

![LangChain Model I/O Module](./figures/lang-chain-model-io.png 'LangChain Model I/O Module')

Retrieval module
help to process data alongside the user inputs,
making it easier to retrieve relevant information:

![LangChain Retrieval Module](./figures/lang-chain-retrieval.png 'LangChain Retrieval Module')

Chains module
link tasks together:

![LangChain Chains Module](./figures/lang-chain-chains.png 'LangChain Chains Module')

Agents module
is chains with a list of functions (called tools) it can execute,
while chains are hardcoded,
agents choose their actions with the help of an LLM:

![LangChain Agents Module](./figures/lang-chain-agents.png 'LangChain Agents Module')

See more code [snippets](../recipes/code/langchain.md).

## LangGraph

Building agent with [LangGraph](https://www.kaggle.com/code/markishere/day-3-building-an-agent-with-langgraph).

## Library

### Instruction

- [AGENTS.md](https://github.com/agentsmd/agents.md):
  Open format for guiding coding agents.
- [llms.txt](https://github.com/AnswerDotAI/llms-txt):
  Helping language models use website.
- [System](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools):
  System prompts for AI agents.

### SDK

- [LangGraph](https://github.com/langchain-ai/langgraph):
  Build resilient language agents as graphs.
- [LangChain](https://github.com/langchain-ai/langchain):
  Platform for reliable agents.
- [TypeChat](https://github.com/microsoft/TypeChat):
  Makes it easy to build natural language interfaces.
- [OpenAI](https://platform.openai.com).
- [Google](https://ai.google.dev).

### RAG

- [RAGFlow](https://github.com/infiniflow/ragflow):
  Superior context layer for AI agents.

### Agents

- [n8n](https://github.com/Zie619/n8n-workflows):
  Curated list of n8n workflows.
- [Dify](https://github.com/langgenius/dify):
  LLM app development platform combines AI workflow, RAG pipeline, agent capabilities.
- [MetaGPT](https://github.com/geekan/MetaGPT):
  Multi-agent framework to form collaborative entity for complex tasks.
- [ChatDev](https://github.com/OpenBMB/ChatDev):
  Communicative agents for software development.
- [SWEAgent](https://github.com/princeton-nlp/SWE-agent):
  Princeton GitHub issues auto-fixer.
- [PRAgent](https://github.com/Codium-ai/pr-agent):
  Codium AI-powered agent for automated pull request analysis, feedback and suggestions.

### Project

- [VibeKanban](http://github.com/BloopAI/vibe-kanban):
  Run coding agents in parallel without conflicts, and perform code review.

### Frontend

- [Puck](https://github.com/puckeditor/puck):
  Agentic visual editor for React.
- [Vercel.ai](https://github.com/vercel/ai):
  Build AI-powered web applications.

### Browser

- [BrowserUse](https://github.com/browser-use/browser-use):
  Leading open-source web agent project.
- [Agent](https://github.com/vercel-labs/agent-browser):
  Browser automation CLI for AI agents.
- [Stagehand](https://github.com/browserbase/stagehand):
  AI Browser Automation Framework.
- [LightPanda](https://github.com/lightpanda-io/browser):
  Headless browser designed for AI and automation.
- [FireCrawl](https://github.com/firecrawl/firecrawl):
  Turn entire websites into LLM-ready markdown or structured data.
- [X-Crawl](https://github.com/coder-hxl/x-crawl):
  Flexible Node.js AI-assisted crawler library.

### Client

- [LobeChat](https://github.com/lobehub/lobe-chat):
  Open-source and modern design AI chat framework.
- [ChatBox](https://github.com/chatboxai/chatbox):
  User-friendly desktop client app for AI models.
- [CherryStudio](https://github.com/CherryHQ/cherry-studio):
  All-in-One desktop copilot.
- [ChatHub](https://github.com/chathub-dev/chathub):
  All-in-one chatbot client.

### Copilot

- [Everywhere](https://github.com/DearVa/Everywhere):
  Context-aware AI assistant for desktop.
- [Immersive](https://github.com/immersive-translate/immersive-translate):
  Translate web pages instantly.
- [DeepL](https://github.com/DeepLcom):
  Free translation copilot.
- [GrammarLy](https://github.com/grammarly):
  Free writing and grammar checker copilot.

### Slide

- [Banana](https://github.com/Anionex/banana-slides):
  AI-native PPT generator based on nano banana pro.

### Documentation

- [DeepWiki](https://github.com/AsyncFuncAI/deepwiki-open).
- [ZRead](https://zread.ai):
  AI-powered github repository reader.

## References

- Agents [whitepaper](https://www.kaggle.com/whitepaper-agents).
- Agents companion [whitepaper](https://www.kaggle.com/whitepaper-agent-companion).
- Agent system [prompts](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools).
- Coding agents [list](https://github.com/sourcegraph/awesome-code-ai).
- Vibe coding [guide](https://github.com/tukuaiai/vibe-coding-cn).
- First-principles agentic coding [guide](https://mp.weixin.qq.com/s/a5UDlkD6Db2kKCAj7LN6gQ).
