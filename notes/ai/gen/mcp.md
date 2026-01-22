---
sidebar_position: 2
tags: [AI, Generative AI, LLM, Agent, MCP, Best Practice]
---

# Model Context Protocol

## Best Practices

Build [good](https://www.philschmid.de/mcp-best-practices) MCP servers:

- Outcomes over operations: don't convert REST APIs 1:1 into MCP tools.
- Flatten arguments.
- Fewer tools and tighter responses:
  - 5–15 tools per server.
  - One server, one job.
  - Delete unused tools.
  - Split by persona (Admin/user).
- Name for discovery `{service}_{action}_{resource}`: e.g. `slack_send_message`, `linear_list_issues`.
- Paginate large results.

## Library

### SDK

- [FastMCP](https://github.com/jlowin/fastmcp):
  Build MCP servers and clients.

### API

- [Context7](https://github.com/upstash/context7).
- [APIFox](https://github.com/apifox/apifox-mcp-server).

### Browser

- [Playwright](https://github.com/microsoft/playwright-mcp).
- [StageWise](https://github.com/stagewise-io/stagewise).

### Integration

- [Figma](https://github.com/figma/mcp-server-guide).
- [Notion](https://github.com/makenotion/claude-code-notion-plugin).
- [Blender](https://github.com/ahujasid/blender-mcp).
- [n8n](https://github.com/czlonkowski/n8n-mcp).

### Memory

- [Memory](http://github.com/doobidoo/mcp-memory-service):
  Automatically captures project context, architecture decisions, and code patterns.

### Collections

- [MCP](https://mcpservers.org):
  Collection of MCP servers and Claude Code skills.
- [Awesome](https://github.com/punkpeye/awesome-mcp-servers):
  Collection of MCP (Model Context Protocol) servers.
