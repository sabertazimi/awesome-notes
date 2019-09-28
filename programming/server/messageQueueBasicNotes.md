# Message Queue Basic Notes

## Intro to Message Queue

Pros:

- 解耦: 客户端和服务端解耦, 都只需操作消息队列
- 提速
- 广播
- 削峰: 服务端无需一次性处理大量请求, 可以匀速地从消息队列中取出消息进行处理

Cons:

- 系统复杂度提升
- 造成系统的暂时不一致性
