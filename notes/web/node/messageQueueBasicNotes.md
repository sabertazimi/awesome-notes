---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Node, Message Queue]
---

# Message Queue Basic Notes

[TOC]

## Message Queue Basis

Pros:

- 解耦: 客户端和服务端解耦, 都只需操作消息队列
- 广播: 发布-订阅模式, 生产者-消费者模式
- 提速: 跨系统异步通信, 系统内同步变异步
- 削峰: 服务端无需一次性处理大量请求, 可以匀速地从消息队列中取出消息进行处理

Cons:

- 系统复杂度提升
- 造成系统的暂时不一致性
