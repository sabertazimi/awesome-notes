# Design Patterns Notes

<!-- TOC -->

- [Design Patterns Notes](#design-patterns-notes)
  - [Prototype](#prototype)
  - [Bridge](#bridge)
  - [Composite](#composite)
  - [Adapter](#adapter)
  - [Decorator](#decorator)
  - [Strategy](#strategy)
  - [Facade](#facade)
  - [Flyweight](#flyweight)
  - [State](#state)
  - [Mediator](#mediator)
  - [Iterator](#iterator)
  - [IOC and DI](#ioc-and-di)

<!-- /TOC -->

## Prototype

关键方法clone()

## Bridge

分离抽象和实现/分离对象的两种不同属性

e.g 从2个不同维度上扩展对象

## Composite

树形结构:

- 根结点
  - Component抽象对象/接口 采用最大宽接口,定义内点和叶点的操作
  - 将内点特有的操作集设为缺省操作集(空实现)
- 内点
  - 持有父结点和子节点的引用(可使用Flyweight模式实现共享)
  - 操作集:内点操作集(可添加/删除组件)
- 叶点
  - 持有父结点引用
  - 操作集：叶点操作集(不可添加/删除组件)

## Adapter

改变接口

## Decorator

保持接口的一致性，动态改变对象的外观/职责

- ConcreteDecorator类

private ClassName component;(拥有一个对象引用)

## Strategy

改变对象的内核/算法, 一个Strategy对象封装一个算法

## Facade

封装复杂的子系统

## Flyweight

减小内存开销:

- 共享大量对象的内部状态——对象实例相似处
- 外部状态作为方法参数:使之适应不同的外部状态(context)——对象实例差异处

## State

一个State对象封装一个与状态相关的行为

## Mediator

一个Mediator对象封装对象间的协议

## Iterator

一个Iterator对象封装访问和遍历一个聚集对象中的各个构件的方法

## IOC and DI

- IOC（inversion of control）控制反转模式；控制反转是将组件间的依赖关系从程序内部提到外部来管理
- DI（dependency injection）依赖注入模式；依赖注入是指将组件的依赖通过外部以参数或其他形式注入

```java
class DbMysql {
  public function query(){}
}

class Controller {
  public $db;
  public function __construct($dbMysql) {
    $this->db = $dbMysql;
  }
  public function action(){
    $this->db->query();
  }
}

$db = new DbMysql();
$c = new Controller($db);
$c->action();
```

with IOC container

```java
class DbMysql {
  public function __construct($host, $name, $pwd) {
    // do something
  }
  public function query() {
    echo __METHOD__ . PHP_EOL;
  }
}

class DbRedis {
  public function __construct($host, $name, $pwd) {
    // do something
  }
  public function set() {
    echo __METHOD__ . PHP_EOL;
  }
}

class controller {p
  public $mysql;
  public $redis;
  public function __construct($mysql, $redis) {
    $this->mysql = $mysql;
    $this->redis = $redis;
  }
  public function action() {
    $this->mysql->query();
    $this->redis->set();}
  }
}


class Container {
  public $bindings = [];
  public function bind($key, Closure $value) {
    $this->bindings[$key] = $value;
  }
  public function make($key) {
    $new = $this->bindings[$key];
    return $new();
  }
}

$app = new Container();
$app->bind('mysql', function () {return new DbMysql('host', 'name', 'pwd'); });
$app->bind('redis', function () { return new DbRedis('host', 'name', 'pwd'); });
$app->bind('controller', function () use ($app) {
  return new Controller($app->make('mysql'), $app->make('redis'));
});
$controller = $app->make('controller');
$controller->action();
/** * 输出： * DbMysql::query * DbRedis::set */
```
