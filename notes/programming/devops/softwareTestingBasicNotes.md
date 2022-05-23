---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Programming, DevOps, Testing]
---

# Software Testing Basic Notes

## Testing Pyramid

- Unit testing.
- Module testing.
- Integration testing.
- System testing.
- E2E testing.

## Testing Model

### PIE Model

- (Execution) Fault.
- (Infection) Error.
- (Propagation) Failure.

### Heuristic Test Strategy Model

软件功能测试 (难以实现完全自动化):

- 关注价值(Value)：用户得到价值
- 风险驱动(Risk)：降低价值/用户体验的风险项
- 产品元素(Product Elements)
- 结构(Structure):产品物理元素(如代码、硬件、配置文件)
- 功能(Function):产品功能
- 数据(Data):产品所操作的数据(如输入、输出)
- 接口(Interface):产品所使用/暴露出的接口
- 平台(Platform):产品所依赖的外部元素(如操作系统、输入/输出设备)
- 操作(Operation):产品被使用的方式(如键盘、鼠标、触摸等命令操作)
- 时间(Time):影响产品的时间因素
- 组合元素:测试产品功能间协作

### User Experience Testing

对软件功能测试的有益补充:

- 功能性体验
- 易用性体验
- 性能体验
- 可靠性体验(如软件兼容性)

### Mobile Testing

- 机型碎片化.
- 屏幕碎片化.
- 环境碎片化.
- 耗电量.

## Testing Design

### FAIR Principle

- Fast tests:
  break down into small separate and well structured tests.
- Automated tests.
- Isolated tests:
  any particular test should not depend on any others.
- Repeatable tests:
  mock everything you can't control:
  - 3rd-party libraries.
  - 3rd-party APIs.
  - Timer API: `jest.useFakerTimers()`/`jest.advanceTimersByTime()`/`cy.clock()`.
  - `Date` API: `jest.spyOn(Date.prototype)`/`cy.tick()`.
  - `Math.random()` API: `jest.spyOn()`/`jest.mock()`/`cy.stub()`.

### AAA Pattern

Structure every test to 3 part code:

- Arrange.
- Act.
- Assert.

### Test-Driven Development

- Reduce costs: find bugs early.
- Reduce fear and anxiety.
- Lead to better-designed and more testable code.
- Make tests more thorough (彻底的).
  Easy to refactor legacy code.

### 测试路径

起始顶点至终止顶点.

## Testing Methods

### Basic Testing Types

- Positive tests:
  valid inputs,
  verify functions.
- Negative tests:
  invalid inputs (e.g `null`/`undefined`/`''`/mismatch type/mismatch structure)
  verify robustness.
- Exception tests:
  `expect(api()).toThrow(error)`.
- Bottom-up testing:
  gives more granular feedback but slows down iteration speed.
- Top-down testing:
  allows to iterate more quickly but will generate more coarse feedback.

### 图结构覆盖方法

- 顶点覆盖,边覆盖,边对覆盖(三顶点,两邻边)
- VC/EC/EPC 法

### 数据流覆盖方法

- 数据流覆盖:定义处覆盖,使用处覆盖
- DU 法(Data&Use)

### 逻辑覆盖方法

- 逻辑覆盖:条件处覆盖,判定处覆盖
- DC(Decision),CC(Condition)法
- MC/DC 法
- MCC 法(完全覆盖)

### 随机测试方法

- ART(随机测试):每个用例间"距离"尽可能远

### 黑盒测试方法

- 等价类划分:合法输入(软件功能),非法输入(异常处理)
- 等价类的边界值分析:合法 MIN,MIN+,MAX-,MAX 非法:MIN-,MAX+
- 决策表+组合测试:简化决策表(考虑输入相关性)
  - 组合用例:维度与测试准度成正比
  - 约束用例:需避开约束输入(输入相关性,同时输入会成为无效输入)
  - 测试用例约简+测试用例优先级:额外贪心算法进行化简+排序测试用例求得近似解

### Fault Location

- 代码可疑度=
  (失败测试用例经过数/失败测试用例总数)/
  (成功测试用例经过数/成功测试用例总数+失败测试用例经过数/失败测试用例总数)

即在执行过目标代码的测试用例中失败测试用例占比

### Fuzzing Testing

Fuzzing 是一种通过向目标系统提供非预期的输入并监视异常结果来发现软件漏洞的方法.

## Testable Code

- 完整注释.
- 最小复杂度 = (扇入 `*` 扇出) ^ 2.
- 可隔离性: 最小依赖性 + 松耦合性.
- 使用依赖注入, 将外部对象移至函数参数处(不在函数内部调用构造器): 易于构造 mock/stub, 降低扇出(函数复杂度).

### 圈复杂度

`V(G) = e - n + 2`: `**<10**`.

### 函数复杂度

函数复杂度 = (扇入 `*` 扇出) ^ 2.

### 扇出

引用:

- 所引用外部对象/方法之和.
- 扇出: `**<7**`.
- 高扇出: 高复杂度/高依赖性/高耦合度.

### 扇入

被引用:

- 其他对象/方法引用此函数的次数之和.
- 顶层抽象代码 与 不常用功能 应保持低扇入.

### 耦合度

#### 内容耦合

5 级耦合度:

```ts
O.property = 'tazimi';
O.method = function () {};
O.prototype.method = function () {};
```

#### 公共耦合

4 级耦合度, 共享全局变量:

```ts
let Global = 'global';

function A() {
  Global = 'A';
}
function B() {
  Global = 'B';
}
```

#### 控制耦合

3 级耦合度:

```ts
const absFactory = new AbstractFactory({ env: 'TEST' });
```

#### 印记耦合

2 级耦合度:

```ts
O.prototype.makeBread = function (args) {
  return new Bread(args.type, args.size);
};

O.makeBread({ type: wheat, size: 99, name: 'foo' });
```

#### 数据耦合

1 级耦合度.

#### 无耦合

0 级耦合度.

## Bug List

### Basic Bug

- 必须进行输入验证 - 永远不要相信用户输入.
- 永不使用未经验证的数值的长度或大小.
- 必须返回正确的错误状态.
- 注意(隐式)类型转换.

### C Bug

- 栈缓冲区溢出.
- 空指针解引用.
- (隐式)类型转换.
- GOT 覆写 (Global Offset Table).

### Occasional Bug

- 多进程完全异步编程的复杂性.
- 逐渐地内存泄漏.

## Testing Tools

- JUnit
- SeleniumIDE
- PICT
- GuiTar
- Randoop
- Apache Jmeter: 压力测试.
- Monkey: Random testing.

## Testing Reference

- [JavaScript Testing Best Practice](https://github.com/goldbergyoni/javascript-testing-best-practices)
