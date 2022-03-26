---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Language, Java]
---

# Java Basic Notes

## CLI Tools

### 编译

javac name.java

### 运行

java name(无后缀类名)

### 反汇编

javap –c name(无后缀类名)

### 打包

jar {c t x u f} [v m e 0 M i][-c 目录] 文件名

解释：

- c：创建 jar 包
- t：显示 jar 包内容
- x：解压 jar 包
- u：添加文件到 jar 包
- f：命名 jar 包
- v：显示详细执行过程报告
- m：指定 manifest.mf 文件(对 jar 包做相关设置)
- 0：打包 jar 包是不压缩
- M：不产生 manifest.mf 文件，覆盖 m 参数的设置
- i：创建索引文件
- C：进入某目录后再执行 jar 命令
- 生成 API 文档：java doc –d [ ] 类名/包名

可选参数：

- -author/-version：文档中显示作者和版本信息(默认不显示)
- -link superlink 标准类名：为标准类添加超链接
- -linksourse：方法/类名转化为超链接，指向生成的 html 格式的源文件

## Gradle Tool

```bash
sudo apt install gradle

gradle help
gradle tasks

gradle assemble
gradle build
gradle clean
gradle test
gradle jar
gradle javadoc
```

### Build Gradle

```groovy
apply plugin: 'java'

jar {
    manifest {
        attributes 'Main-Class': 'com.sabertazimi.tao.Tao'
    }
}
```

## 基本结构

### 数据类型

#### 整型

##### 类型

- byte 型:1 字节 -128~127
- short 型:2 字节 -2^15~2^15 -1
- int 型:4 字节 -2^31~2^31 -1(20 亿)
- long 型:8 字节 -2^63~2^63 -1

##### 前/后缀

- 二进制前缀 0b/0B
- 八进制前缀 0
- 十六进制前缀 0x/0X
- 长整型后缀 l/L

#### 浮点型

##### float 型

后缀 F:4 字节 -3403E38~3.403E38(有效位数 6~7 位)

```java
float f = 1.2;    //ERROR
float f = 1.2F;   //OK
```

##### double 型

后缀 D(默认型):8 字节 -1798E308~1.798E308(有效位数 15 位)

科学计数法：指数均为十进制，符号为 e(尾数为十进制)/p(尾数为十六进制)

Double.POSITIVE_INFINITY，Double.NEGATIVE_INFINITY，Double.isNaN(检数)

千分位下划线分隔法 e.g 123_456.789_000

#### 字符型

- 1 个 char 型占 2 个字节(Unicode 编码)
- ’ ’(定界符)内可用八/十六进制转义字符表示字符

- 八:\xxx
- 十六:\uxxxx(\u 转义序列可出现在任何地方) e.g ‘\u0061’

改进的 Unicode 字符集:

- 代码点(前缀 U+)分为 17 个代码级别(code plane)
- 第一个级别为经典 Unicode 代码，
- 其余附加级别 U+10000 至 U+10FFFF。

#### 布尔型

只允许赋值为 true、false(不可取 0 或非 0 值)，不可与整型相互转换

#### 引用类型

##### 数组(Array)

字符串 String：不可变性(需要修改变量名所引用值，必须重新创建一个 String 对象例)

旧的对象实例若被判定为垃圾便会被系统自动回收

##### 类(Class)

##### 接口(Interface)

### 常量

定义(随使用随定义)

### 运算符

#### 短路与、短路或

- &&:第一个操作数为假不再向后运算
- ||:第一个操作数为真不再向后运算

#### 移位符

有符号右移>>:最高位补符号位 左操作数 int/long，右操作数 mod32/mod64

> e.g int a >> 33 即 int a >> 1

无符号右移>>>:最高位补 0

#### 字符串连接运算符

`+`: 左右操作数 String 字符串/其他类型(自动被转化为 String)

#### 判断运算符

`==`:

- 基本类型值相等，引用类型引用相等
- 基本类型：转换后比较；boolean 型不与 int 型比较
- 引用类型：指向两个不同对象实例的变量不相等;若判断两个对象实例内容是否相等，必须调用 equals()方法

#### 强制类型转换运算符

`()`

- 只能在继承层次内进行强制类型转换(同一家族)
- 将父类转换为子类前，应使用 instanceof 运算符进行检查

### 字符串

#### 子串

stringTest.substring(a, b)方法返回长度为 b-a 的子串，a(包括)、b(不包括)为起止位置

#### 相等

- 内容相等：stringOne.equals(stringTwo)方法返回值 true/false
- 不区分大小写 equalsIgnoreCase

#### 代码点<代码单元(单字符)

#### 常用方法

#### 构建字符串

StringBuilder 类：单线程，功能同 StringBuffer 类(多线程)

### 输入输出

#### Scanner 类

监视器，功能最强大的输入类，new Scanner(System.in)

#### 格式化输出方法

System.out.printf(): 静态创建格式化字符串

#### 文件的输入与输出

##### 输入(至内存)

用 File 对象构造一个 Scanner 对象：new Scanner(Paths.get(“FileName”))(反斜杠需双写)

##### 输出(至文件)

用文件名构造一个 PrintWriter 对象:
`new PrintWriter(“FileName”)`, 之后调用`System.PrintWriter.print`方法.

### 表达式

- 整数提升:算术运算前 byte,short,char 提升为 int
- 没有”,”运算符和表达式语句

### 控制流程

合法语句：赋值语句和方法调用语句

#### 块作用域

- 不允许内层块与外层块变量同名(无 C 语言中的可见性)
- 块内声明变量不允许在块外使用：if 块、for 块、while 块、普通 block

#### switch 语句

case 标签变量类型：字符型(包装类)、三整型(包装类)、枚举常量、字符串类

#### loop 语句

##### 循环五要素

- 初始化部分(init_statement);
- 循环条件部分(test_explanation);
- 循环体部分(body_statement);
- 迭代部分(alter_statement):自加/自减运算符改变条件变量
- 结束后处理

##### for each 循环

```java
//只读遍历；变量age只作用于for循环体
for (int age : arrayName) {}
```

#### Break and Continue Statement

##### Break Statement

```java
label:
{
break label;
} //可跳出任意语句块：跳至标签块末尾
```

###### Continue Statement

```java
  label:
  {
continue label;
} //跳至循环块首部
```

### 大数值

- java.math.BigInteger
- java.math.BigDecimal

### 数组

#### 定义+引用

- 类型(包括类/对象) + [] + 标识符
- 类型(包括类/对象) + 标识符 + []

- int a[N] 非法 数组是引用类型
- 不可对数组名进行自增操作(尽管[]与\*具有类似作用)

#### 初始化

- 默认初始化数值类型为 0/false，引用类型为 null
- 使用 new 分配内存单元

两种不同初始化方式：

- 声明时：`MyDate[] dates = {new MyDate(),……};`
- 赋值时：`MyDate[] dates = new MyDate[] (匿名数组){new MyDate(),…..};`

#### 方法

- 属性:arrayName.length
- 打印:arrays.toString 方法
- 复制:arrayName.Copy( source, 0, destination, 0, source.length);

```java
Arrays.copyOf(ArrayName, Array.length); //可用来增长数组长度
```

- 比较:Arrays.equals(type[] a,type[] b);

#### 命令行参数

字符串数组 String[] args,
args 数组不包括程序名.

#### 排序

Arrays.sort(ArrayName)快速排序方法

#### 多维数组

- 多维数组的声明和初始化应按从高维到低维的顺序进行
  - 声明&初始化 int[][] t = new int[3][];
  - 子数组交换 `temp = a[i];a[i]=a[i+1];a[i+1]=temp`;
- 子数组长度可不一致：可先构造一维长度，再使用循环构造子数组各自长度

## 对象与类

### 面向对象的三大特征

#### 封装性

- 模块化+信息隐蔽(隐藏细节(private)，只提供受保护的访问接口(public))
- 只可通过方法改变对象实例的状态(State)(Instance Field)

#### 继承性

父类和子类共享数据和方法（提高代码重用率和可维护性）

- 可继承成员：公有域、公有方法
- 不可继承成员：私有域、静态域、实例域初始化块、私有方法、静态方法、构造器方法

#### 多态性

不同的对象收到同一个消息(method 调用)可产生不同效果(由对象内封装的细节决定)

- 编译时多态：重载(Overload)
- 运行时多态：覆盖(Override)
- 根据对象实例的类型进行动态绑定(Dynamic Binding)
- 虚方法调用(Virtual Method Invoking) ：

  - 在调用方法时，程序会正确地调用子类对象的方法
  - 无法进行虚方法调用情况

- static 的方法：以声明类型(标识符前的类型)为准，无关实例类型
- final/private 方法：子类无法覆盖/继承父类同名方法，不存在虚化问题

### 完整的 Java 源文件

```java
package packageName;              //指定文件中的类所在的包，0个或1个
import packageName.[className|*];   //指定引入的类/API，0个或多个
public classDefinition                 //属性为public的类定义，0个或1个
interfaceDefinition and classDefinition  //接口或类定义，0个或多个
```

### Behavior State and Identity

### 预定义类

#### Constructor

#### Georgia Calendar

### 用户自定义类

#### 完整的类定义

```java
[public] [abstract|final] class className[extends superclassName]
[implements interfaceNameList] {

//成员变量声明，可为多个：
//实例域一般添加private修饰符，保持封装性
[public | protected | private] [static] [final] [transient] [volatile]type variableName;

//方法(包括构造方法)定义及实现，可为多个
[public | protected | private] [static] [final | abstract] [native] [synchronized]
returnType methodName( [paramList] ) [throws exceptionList]{
    statements;
  }
}

class Class_Name{
   int/String characteristic;   //状态(State)：变量(实例域 instance field)
   constructor(){};             //标识(Identity)：构造器(constructor)
   void function(){};           //行为(Behavior)：函数(方法method)
}
```

#### 访问器方法(Accessor Method)

只访问实例域不进行修改的方法

```java
returnType get() {
    //保持封装性
    //返回引用类型对象时，必须返回克隆体对象引用而不是实例域对象引用
  return instanceFieldVariable.clone();
}
```

#### 更改器方法(Mutator Method)

修改实例域的方法

e.g add、set

### 方法 Method

#### 方法参数

Java 所有普通方法的参数传递方式:值传递

- 基本类型：传递值的拷贝

方法中无法更改原变量的值

- 引用类型：传递引用的拷贝

方法中无法更改原变量的引用(指针指向),只可更改引用对象的状态(State)

#### 方法标签(Signature)

- 方法名称
- 方法参数

方法返回值类型不是方法标签(不存在同名同参而不同返回值的方法)

### 对象构造

构造器方法完整定义：

```java
ClassName (ClassPropertiesVariableTable) {
    //进行输入参数合法化检查
    Property n = Variable;
    Statement Block;
}
```

#### 构造器方法的定义

- 未定义任何构造器方法
  系统会自动产生一个构造器方法，称为无参空默认构造器方法（default constructor）
  并将所有实例域初始化为默认值
- 注意事项
  - 不应在构造器中定义实例域同名变量
  - 在构造器中尽量只调用 final/private 方法(不会(继承后)被子类方法覆盖)
  - this()可调用此类的其他构造方法，this()必须位于构造器方法首行

#### 构造器方法的执行

- 构造器方法前语句/语句块将先于构造器执行
- 编译器会在编译时在每个构造器方法内首行自动添加 super();(若父类没有无参构造器方法编译出错)/人工显式调用父类构造器方法，直至实现 Object 类(超类)的构造器方法，再执行构造器方法语句

### 包

导入 import

- 包的导入

```java
import java.包路径.*   //导入指定包的所有类
```

- 静态导入

```java
import static java.包路径.类名.*  //导入指令类的所有静态域和静态方法
```

### 类路径

package 语句

### 文档注释

Java 除了可以采用我们常见的注释方式（//、/\* \*/(二型注释不可嵌套)）之外,Java 语言规范还定义了一种特殊的 Javadoc 注释：

```java
/**
*@author    对类的说明              标明开发该类模块的作者
*@version   对类的说明              标明该类模块的版本
*@see      对类、属性、方法的说明  参考转向，也就是相关主题
*@param    对方法的说明            对方法中某参数的说明
*@return    对方法的说明             对方法返回值的说明
*@exception 对方法的说明            对方法可能抛出的异常进行说明
*@Override   对方法覆盖的说明
*@FunctionalInterface 函数式接口：包含不超过一个abstract方法（可以有其他非abstract方法）
*/
```

#### 类注释：位于类定义前

```java
/**
*整体性描述
*
* @author 作者
* @version 1.0, 05/22/07
* @since version1.0
*/
```

#### 方法注释：位于方法定义前

```java
/**
*整体性描述
*
*@param             对方法的说明            对方法中某参数的说明
*@return            对方法的说明             对方法返回值的说明
*@exception/throws 对方法的说明            对方法可能抛出的异常进行说明
*/
```

#### 域注释：位于实例域定义前

```java
/**
 * 备注信息
 */
```

#### 通用注释

##### @see 与@link

可在文档中看到引用(文本、类/方法/变量、超链接)

- @see/@link package.class#feature label
- @see/@link `<a href = “……”>` label `</a>`
- @see/@link “text”

区别: link 注释可在任意位置，see 注释需在类/方法/变量定义前

#### 包注释

新建 package-info.java 源文件:

```java
package 包路径
/**
 * 包注释
 */
```

### 类设计技巧

#### 数据私有化

保持封装性

#### 数据初始化

不依赖实例域默认值，且应进行数据合法化检查

#### 实例域封装化

过多相关的基本类型实例域可封装成一个轻型类

#### 构造器多样化

最低标准为显式无参构造器+一个带参数(包括合法化检查)构造器

#### 职责明晰化

一个类的方法应与类本身紧密相关，且不过少也不过多

## 继承

### 父类与子类(superclass and subclass)

#### 属性的继承

- 可继承：公有域
- 不可继承：私有域、静态域、实例域初始化块
- 若要访问(修改)父类私有域，必须使用调用公有的 super.get()方法得到父类私有域
- 初始化父类私有域：super(ParamList); 调用父类构造方法进行初始化

#### 方法的继承

- 可继承：公有方法
- 不可继承：私有方法、静态方法、构造器方法

#### 方法的覆盖

标签相同(不可降低父类方法可见性)

#### 方法的重载

标签不同，属于新加方法

#### super 关键字

不是隐式参数，是提示编译器执行的特殊关键字

#### 父类与子类的转换(Is-A 关系)

Subclass must be superclass,superclass may not be subclass.

- 可将子类引用赋值给父类变量(Upcasting)或替换父类作参数

```java
Person p = new Student();  //p仍是父类变量
```

> 注：若父类变量和子类变量引用同一个子类对象实例时，父类某些操作可能引起内存混乱
> 例如：先调用父类构造器方法构造子类，再调用子类扩展方法访问子类扩展私有域(根本未分配内存空间)

- 不可将父类引用赋值给子类变量

```java
Student s = new Person();  //ERROR:e.g. s.getStuID();
```

### Object 类

#### Equals Method

- 子类中覆盖(@override)父类 equals 方法：super.equals(superClassName other);
- 显式参数名：Object otherObject
- if (this == otherObject) return true;
- if (otherObject == null) return false;
- if (getClass != otherObject.getClass()) return false;
- ClassName other = (ClassName) otherObject;
- return field == other.field

#### Hash Code Method

- String 类 hashCode：ΣStringChar[i]^(n-i-1), (i:0~(n-1))
- Object 对象 hashCode：内部 ID(存储地址)
- 若重写 equals 方法，也应重写 hashCode 方法，使对象实例 hashCode 分布散列化
  - return 各域 hashCode 值加权和:31x+y rule
    - 引用类型、包装类：hashCode()
    - 数组：Arrays.deepHashCode()
  - return Objects.hash(field1,..,fieldN); //自动组合各域 hashCode
  - hash 值：return (key.hashCode() & 0x7fffffff) % M;

#### To String Method

- 设计 return getClass().getName() + ”[“ + field + ”]”;
- Object 类 toString 方法：用于输出 ClassName 和 hashCode
- 数组直接继承 Object 类 toString 方法，输出数组需调用 Arrays.(deep)toString();
- 自动调用：+ 字符串连接符、println(obj)

### 泛型数组列表

`ArrayList<ClassName> VariableName = new ArrayList<>()`;

- toArray(ArrayName)转化为同类型普通数组存至 ArrayName：可以创建一个 ArrayList，再转化为数组，方便使用[]下标操作
- 插入、删除操作时间复杂度高(数据元素左/右移)

### 对象包装器与自动装箱

Void,Boolean,Byte,Character,Short,Integer, Long, Float, Double 类:包装器(Wrapper)类

#### 父类：Number

#### final 类(强不可变类)：无子类，不可改变数

#### 编译器特性

- 自动装箱（auto-boxing）

```java
Integer I = 10;
myArrayList.add(10);
```

- 自动拆箱（auto-unboxing）

```java
int i= I;
```

- 自动装箱+拆箱

```java
Integer I = 0;I++;

// 实际译为:
Integer I = Integer.valueOf(10);
myArrayList.add(Integer.valueOf(10));
Int I =  I.intValue();
```

#### API 说明

### 可变参数方法

### 枚举类

#### 定义

#### 扩展

### 访问控制符

public>protected(包作用域+)>默认(包作用域)>private(类作用域)

最大限度：不同包的非子类(所有类)、同一个包/不同包的子类、同一个包、同一个类

### 非访问控制符

#### abstract

##### abstract 方法

语法形式：abstract + MethodName(ParamList)；

##### abstract 类

- 定义
  - 若一个类包含 abstract 方法，则必须是 abstract 类
  - 一个 abstract 类可以不包含 abstract 方法
  - 一个 abstract 类可以包含具体数据和具体方法
- 构造器方法
  - 需要实现构造器方法
  - 构造器方法可以被非 abstract 子类调用
  - 不能使用 new 构造 abstract 类对象实例

#### final

##### final 局部变量(方法内的变量)

只读常量，必须进行一次初始化

##### final 实例域

- 必须进行一次(类定义/构造器)初始化
- final 引用类型实例域的引用不可更改，但所引用对象的状态(State)可被更改

##### final 方法

可继承，不可重写

##### final 类

- 不可继承
- 实例域可以不是 final 实例域，方法自动成为 final 方法

#### static

##### static 实例域(类域)

- 属于类整体，保存在类的内存区域的公共存储单元(不可继承)
- 可通过类名/对象实例名访问该属性

##### static 方法

- 类方法，属于类整体(不可继承)
- 没有隐式参数(this/super)
- 只能处理该类中的 static 实例域/调用该类中的 static 方法
- 既可通过类名调用该方法(推荐)，又可通过对象实例名调用 static 方法
- Tips:工厂模式：利用 static 方法可模拟构造器方法：可自定义构造器名和返回对象类型

#### static final 实例域

- 默认初始化(数值型为 0，布尔型为 false，引用型为 null)
- 常结合 public 将变量设置为全局静态常量 e.g. e、PI

### 反射(Reflection)

#### 反射机制

- 运行中分析 类的能力
- 运行中查看对象
- 实现通用的数组操作代码
- 利用 Method 对象

#### Class 类

#### 分析类的能力

#### 分析对象

#### 泛型数组实现

#### 调用任意方法(函数指针)

## 接口与内部类

### 接口

#### 基本定义

interface 类型是引用类型

常量 + 方法

```java
 [修饰符(public)]interface 接口名 [extends 父接口名列表(多个接口)] {
//常量声明，可为多个
[public] [static] [final] type constantName= Value;
//方法声明，可为多个
[public] [abstract] returnType methodName( [paramList] );
}
```

#### 接口方法

自动默认：public abstract 方法(声明时无需关键字)

#### 实现接口

在类中必须实现(override)接口中的所有方法

#### 接口作为方法参数

- 设计此类方法时：
  - 可调用接口中公有静态常量/公有方法(interfaceVariableName.invokeMethod)
  - 可将接口参数传递给其他接口作参数的方法，调用其他方法
- 实际调用方法时：将实现了该接口的类作为参数传递给方法，可提高方法的灵活性

> 例子：Comparable 接口和 sort 静态方法

#### 接口变量

- 不可创建 interface 实例(即不可用 new 关键字)
- 可声明一个 interface 变量，并使其引用实现了该接口的对象实例

```java
//TimePrinter：实现了ActionListener接口的类
ActionListener myListener = new TimePrinter();
```

### 对象克隆

#### Cloneable Interface

标签接口(tagging interface)之一：无方法

#### Object Clone Method

浅拷贝: 无法克隆目标对象实例域中的对象成员

#### Custom Clone Method

鉴于默认 clone 方法的局限性，需自定义用户需要的 clone 方法

- 实现接口：implements Cloneable
- 改变可见性&抛出异常: `public <returnType> clone() throws CloneNotSupportedException {};`
- 自定义克隆体：克隆子对象

### 回调

#### 回调设计模式

某个特定事件发生时采取某个特定动作

#### Action Listener Interface

### 内部类

#### 内部类调用格式

- 声明与构造(实例化)

OuterClass.InnerClass variableName = OuterClass/this.new InnerClass();

- 定义：应使用 private 关键字

- 访问实例域/方法

内部类：this.fieldName/methodName
外部类：OuterClass.this.fieldName/methodName

#### 局部内部类

- 定义在方法中的内部类
- 修饰符：无/abstract/final
- 可访问外围类成员/final 局部变量

#### 匿名内部类

在实际`构造父类/实现接口`时定义在构造器方法中的内部类

- 外围为父类：内部类需要扩展该父类

```java
new SuperType (construction parameters)
{
    inner class methods and data{};  //直接定义实例域和方法，构造器参数传递给父类构造器
}
```

- 外围为接口：内部类需要实现该接口

```java
new InterfaceType () //一对括号
{
    Inner class methods and data{};  //需实现接口中的所有抽象方法
}
```

- 例子：积分、线程、回调函数(HookFunction)、事件处理(ActionListener)

#### 静态内部类

- 只可访问外围类的静态域/静态方法(可视作不可访问外围类)
- 实例化：new OuterClass.InnerClass()

### 代理类

## 图形程序设计

### Swing 组件继承层次

### Swing 组件功能层次

### JFrame

### 框架基础

#### 位置和大小

- 方法概览

```java
//继承于：Component类
//功能：设置JFrame的位置和大小
//坐标：相对于电脑屏幕
setLocation(x, y);
setBounds(x, y, width, height);
setLocationByPlatform(true);
```

- 动态设置

```java
//得到屏幕大小
Dimension screenSize = Toolkit.getDefaultToolKit().getScreenSize();
int screenWidth = screensSize.width;
int screenHeight = screenSize.height;
//根据屏幕大小设置框架大小
setSize(screenWidth / 2, screenHeight / 2);
setLocationByPlatform(true);
```

#### Property Getter and Setter

- 标题

```java
//继承于：Frame类
//功能：标题属性
public String getTitle();
public void setTitle (String title);
```

- 定位

```java
//继承于：Window类
//功能：定位属性
public boolean isLocationByPlatform();
public void setLocationByPlatform (boolean b);
```

- 标题图标

```java
Image img = new ImageIcon(“icon.gif”).getImage();
setIconImage(img);
```

- 其他属性

### 自定义绘制组件

所有绘制都使用 Graphics 类作参数(包含绘制图案、图像、文本等的方法)

#### JComponent Extends

```java
class MyComponent extends JComponent
{   //@override
    public void paintComponent (Graphics g)
    {
        g.drawString(text, x, y);
    }
    //@override
    public Dimension getPreferredSize()
    {
        return new Dimension(DEFAULT_WIDTH, DEFAULT_HEIGHT)
    }
}
```

#### JPanel Extends

```java
class MyJPanel extends JPanel
{
    public void paintComponent(Graphics g)
    {
        super.paintComponent(g);
        code for drawing;
    }
}
```

#### Shape Interface

图形类继承关系图

### 图形颜色

- Color 类预定义颜色(Color.XX)
- SystemColor 类预定义颜色(SystemColor.XX)

## 事件处理

### 定义与基础

#### 事件源与事件监听器

#### 实现 Action Listener 接口的事件监听器

##### 适用情况

- 按钮点击事件(click button)
- 鼠标双击选择列表框某一选项
- 选择某一菜单项
- 文本域键入回车键
- 组件达到指定时间间隔

##### 事件监听器对象执行其他对象事件源产生事件影响

此时，可使用匿名内部类或 Lambda 表达式简化代码

```java
.addActionListener(new ActionListener()
{
public void actionPerformed(ActionEvent event)
{
//code for procedure
}
});
```

或

```java
.addActionListener( (e) -> {
//code for procedure
});
```

#### Event Handler Class

#### Adapter Class

此类实现相应接口所有方法，但每个方法方法体皆空;简化 Listener 实现，只需重写所需方法

```java
.addWindowLister(new WindowAdapter()
{
    //重写所需方法
});
```

### 动作

#### Action and Abstract Action

Action 接口可连接多个事件源，AbstractAction 类是实现该接口的类(可继承此类编写动作)

#### 基本方法

- actionPerformed：继承于 ActionListener 接口
- enabled：启用/禁用动作
- value：动作对象中的任意名/值 e.g.Action.NAME,“按键名称”
- key 为动作属性的名称，value 为对应具体属性(如 String、ImageIcon)
- propertyChangeListener：将动作对象属性变化传给监听器，再传给其他组件对象

#### 动作与点击按钮

- 将自定义动作与按钮关联
- JButton 构造器：JButton(Action act);

#### 动作与按键映射

- 每个组件有三个输入映射和一个动作映射
- 建立输入映射(三种方式得到(次)顶层组件的输入映射)

```java
InputMap imap = panel.getInputMap(JComponent.InputMapFlag);
```

- 关联输入映射和动作映射:put 方法含有两个参数

```java
imap.put(  KeyStroke.getKeyStroke(“ctrl Y”)  ,  Object actionMapKeyName );
```

- 建立动作映射

```java
ActionMap actionMap = panel.getActionMap();
```

- 关联动作映射和动作:put 方法含有两个参数

```java
actionMap.put(Object actionMapKeyName  ,  Action act);
```

> 注：将 Object 设为 String ”none” 时 表示 空动作(按键无效)

### 鼠标事件

### AWT 事件继承层次

#### 事件类

- 语义事件类(semantic)：

ActionEvent、AdjustmentEvent、ItemEvent

- 低级事件类(low-level)

FocusEvent、MouseEvent、MouseWheelEvent、KeyEvent、WindowEvent

#### 事件处理 监听器接口

#### 事件处理 适配器类

- FocusAdapter
- MouseAdapter
- MouseMotionAdapter
- KeyAdapter
- WindowAdapter

## Swing 组件

### Awt 和 Swing 设计中的设计模式

#### Composite Pattern

将对象组合成树形结构以表示”部分-整体“的层次结构，使得用户对单个对象和组合对象的使用具有一致性

容器与组件(具有共同接口) - 容器与组件具有层次结构,用户可对容器与组件实施同样的操作(点击、删除、输入等)

#### Decorator Pattern

保持接口，增强性能

以对客户透明的方式动态地给一个对象附加上更多的责任(对象前后本体未变化)

- 抽象组件(Component)角色: 给出一个抽象接口，以规范准备接收附加责任的对象(透明不变性)
- 具体组件(ConcreteComponent)角色: 定义一个将要接收附加责任的类(透明不变性)
- 装饰(Decorator)角色:
  - 持有一个组件对象的实例
  - 定义一个与抽象构件组件接口一致的接口
  - 添加额外功能

具体装饰(ConcreteDecorator)角色: 负责给组件对象“贴上”附加的责任

带滚动条的面板 Component：面板,Decorator：滚动条

#### Strategy Pattern

动态改变行为

定义了不同的算法族，并且之间可以互相替换

- 环境对象：实现了抽象策略接口或者引用了具体策略类
- 抽象策略接口/类：接口/抽象类，环境对象中变化部分
- 具体策略类：实现了抽象策略接口，可有多个不同的具体策略类(动态变化)

设计原则: 把一个类中经常改变或者将来可能改变的部分提取出来，作为一个接口

布局管理器 环境对象：面板，抽象策略：抽象布局管理接口，具体策略：具体布局管理类

#### Model View Controller Pattern

- 组件三要素：外观、内容(状态)、行为
- 模型类：存储内容(状态) state getter/setter
- 视图类：显示内容(状态)对应外观 一个模型可以有多个视图(模型的不同部分/形式)
- 控制器类：处理用户输入事件(点击鼠标、敲击键盘)，改变模型类/视图类状态，调用模型类/视图类中方法

一个模型类可以适用多个组件(如 DefaultButtonModel 是多种 Button 包装器类的模型对象):

几乎所有组件都有一个带后缀 UI 的视图对象;不是所有组件都有一个专门的控制器对象

### 简单布局管理器

#### Flow Layout Class

逐行填充组件，可设置对齐方式和组件间距

#### Border Layout Class

改变面板大小时，只有中央组件大小变化

技巧：可在五个区块内添加子面板

```java
frame.add(panel, BorderLayout.CENTER/NORTH/SOUTH/WEST/EAST)
```

#### Grid Layout Class

组件按行列排列，且大小一致(只能逐行逐列添加组件)

### 复杂布局管理器

#### Grid Bag Layout Class

没有行列大小和个数限制的网格布局：行列大小可不一致，可合并相邻行/列(合并单元格)

gridBagPanel.add(component, GridBagConstraints);给每一个组件都构造一个 GridBagConstraints 类

##### 基本步骤

- 画框图
- 设置 gridXX 四值
- 设置 fill/anchor 值、
- 设置增量 weightx/weight
  - 全部 100：行列可随容器大小变化
  - 设置某一行/列所有 weightx/weighty 为 0：此行/列保持默认大小

e. gridBagPanel.add(component, GridBagConstraints);

#### Group Layout Class

通过(嵌套)组的水平与垂直计算(间距与组件)，实现灵活的布局:

- GroupLayout 类
- Group 类
- ParallelGroup 类
- SequentialGroup 类

#### Null Layout

#### Custom Layout

实现 LayoutManager 接口，自定义 setSizes(Container parent)

在 layoutContainer 方法中调用每个组件的 setBounds 方法，摆放组件

### 文本组件

JTextComponent 抽象类

#### 文本域

- JTextField 组件

#### 标签

- JLabel 组件: 标签无法响应用户输入事件，只提供标识功能

#### 密码域

- JPassWordField 组件

#### 文本区

- JTextArea 组件

#### 滚动窗格

- JScrollPane:
  将文本区组件/其他组件插入到滚动窗格中,
  可实现文本区/其他组件的滚动.

### 选择组件

#### 复选框

- JCheckBox 组件, 勾取选项(可自定义选项标签)：勾选/不勾选状态

```java
.addActionListener( if ( .isSelected() ) {……});
```

多个复选框可共用一个监听器，通过 isSelected 方法检测不同复选框的状态

#### 单选按钮

- ButtonGroup 对象负责调度任务：保证只有一个 JRadioButton 对象被按下
- JRadioButton 对象:add 至 JPanel 对象,add 至 ButtonGroup 对象,addActionListener 注册监听器

#### 边框

在面板/子面板(TextPanel、ButtonPanel 功能区等) 调用 setBorder 方法填充边框

#### 组合框

JComboBox 组件，泛型类,
下拉选框(N 个选项 Item)，.addActionListener(getItemAt(getSelectedIndex()))

#### 滑动条

JSlider 组件, 可连续选择数值:

```java
.addChangeListener(new ChangeListener()
{
    public void stateChanged(ChangeEvent event)
    {
        JSlider source = (JSlider) event.getSource();
        int Value = source.getValue();
        code for operating;   //with Value
    }
});
```

### 菜单组件

#### 创建菜单

JMenuBar –> JMenu -> JMenuItem

利用 Action 创建 MenuItem：(调用 insert 方法)

```java
Action exitAction = new AbstractAction (“ Exit ”) //MenuItems text goes here
{
    public void actionPerformed (ActionEvent event)
    {
        code for action;
    }
};
```

#### 图标菜单项

- JMenuItem 类扩展 AbstractButton 类
- 同样地，JMenuItem 类构造器/Action.putValue(Action.SMALL_ICON,……)；

#### 单选按钮/复选框菜单项

将 MenuBar 视作 JPanel 即可

#### 弹出菜单

JPopupMenu 组件,
不依附于 MenuBar 的浮动菜单(Window 系统下右键弹出菜单)

#### 快捷键

- 同样地，两个方式：MenuItem 类构造器/Action.putValue(Action.MNEMONIC_KEY,……)；
- 加速器：不打开菜单项即可起作用的快捷键(如 Ctrl+……)，关联 JMenuItem

#### 启用/禁用菜单项

#### 工具栏

- 同样地，JToolBar 构造器/Action.putValue(Action.SHORT_DESCRIPTION)；

### 对话框(顶级框架)

- 模式对话框：弹出时不允许用户作其他交互
- 无模式对话框：弹出时允许用户作其他交互(如工具栏)

#### 选项对话框

- JOptionPane 组件

#### 自定义对话框

- 在构造器中调用超类 JDialog 构造器方法
- 添加对话框的用户界面组件
- 添加事件处理器
- 设置对话框大小

#### 文件对话框

- JFileChooser 组件插入对话框
- 文件选择器
- 文件过滤器：可添加文件视图类

#### 颜色对话框

- JColorChooser 组件插入对话框

## 异常、断言、日志、调试

### 处理错误

#### 异常分类

- 已检查异常：需要抛出声明(非 RuntimeException)
- 未检查异常：不可控(Error)/可避免(RuntimeException：下标越界等)
- 子类覆盖父类方法(该方法)抛出必检异常数必须少于父类方法

### 捕获异常

原则：捕获知道如何处理的异常，传递不知如何处理的异常

#### 捕获多个异常

- 普通形式

```java
try
{
    语句组(可能抛出异常的语句：抛出异常后，try语句块直接终止)
}
catch (匹配Exception ex)
{
    子子异常类名 异常处理语句组；
}
catch (匹配Exception ex)
{
    子异常类名 异常处理语句组；
}
catch (匹配Exception ex)
{
    父异常类名 异常处理语句组；
}
[ finally
{
    必定(即使try return)会被执行异常处理语句组：用于释放资源，不能捕获异常
}]
```

catch:0~n, finally:可选项（无论是否有 break/return，都会被执行多遍）

- 更好的形式

```java
try
{
    try
    {
        code that might throw exceptions{};
    }
    finally
    {
        in.close();
    }
}
catch (IOException e)
{
    show error message{};
    throw exception{};
    throw new exception{};
}
```

- 常用 catch 处理语句

```java
System.out.println(“Error” + e);
System.out,println(“Cause” + e.getCause());
throw e;
throw new Exception(String)/(String, e);
```

#### 重抛异常

- 将当前捕获的异常再次抛出：throw e;
- 重新生成并抛出一个新异常(沿调用堆栈传递)
  - throw new Exception("some message");
  - throw new Exception("some message"，e);
  - 将原始异常作为新异常的 initCause

```java
catch (SQLException e)
{
    Throwable se = new ServletException(“database error”);
    se.initCause(e);
    throw se;
}
```

上级便可通过 se.getCause()方法得到原始异常

#### 关闭异常：关闭频率低/不可能发生的异常

catch 语句体为空，便可关闭捕获的异常

### 记录日志

### 调试技巧

#### 使用断言

assert 表达式:字符串信息

#### JUnit 框架单元测试

```java
import static org.JUnit.Assert.\*
```

为每个类构置一个 main 方法进行单元测试

#### 日志代理

Logger.getGlobal().info(" ……" + targetVariableName);

#### Stack Trace

- `Throwable.PintStackTrace`

#### GUI 调试

## 泛型

### 泛型类

自定义类型 `Class Person<T> {}`

### 泛型方法

自定义方法 `[修饰符] <T> T PeronMethod(Param) {}`

### 泛型变量 T

```java
<T extends SuperClass & Interface>
```

类型变量用“，”分隔，限定类型用“&”分隔(一个父类+多个接口)

```java
<T extends Comparable & Serializable>
```

### 泛型代码

翻译关键：擦除类型参数，用 Object/限定类型代换

- 虚拟机中没有泛型
- 多态性：合成桥方法
- 类型安全性：必要时插入强制类型转换

### 使用限制

- T 类型变量：不可为基本类型，必须为引用类型
- 类型查询(getClass()/instanceof)：返回原始类型(如 Person)，不返回 T 类型
- 不可创建参数化类型的数组(如 `Person<T>[]`)
- 不可实例化类型变量(如 new T()、new T[])
- 不可在静态域/方法中引用类型变量(如 private static T variableName)
- 泛型类不可扩展 Throwable 及其子类(因此泛型类不可被抛出/捕获)

### 通配符类型

```java
<? extends SuperClass>
<? super SubClass>
```

### 反射与泛型

## 集合

### 集合接口

#### Collection Interface

##### Abstract Collection

将 size 和 iterator 抽象化，将 contains、toString 具体化

##### 迭代器

- 工作位置: 迭代器位于两元素间
- 工作机制
  - previous 方法：迭代器越过前一元素，并将该元素的引用作为返回值
  - next 方法：迭代器越过下一元素，并将该元素的引用作为返回值
- 工作方法
  - add 方法：将新元素的引用插入至迭代器当前位置
  - remove 方法：与 previous/next 相互依赖，删除前一次越过元素(不可连续调用 remove 方法)
  - next->( remove )->next->remove
- 使用原则
  - 给容器附加多个只读迭代器，单独附加唯一一个读写迭代器
  - 并发修改检测: 只检测结构性改变(改变长度),不检测数值性改变(如 set 方法)

##### Iterable Interface

任何实现了 Iterable 接口及其子接口(如 Collection 接口)的对象都可使用 for each 循环

```java
public interface Iterable<E>
{
    Iterator<E> iterator();
}
```

#### Queue Interface and Deque Interface

Deque extends Queue extends Collection)

### 具体集合

#### 数组列表

ArrayList implements List:

- 随机访问：利用索引值访问元素
- get/set(int Index)方法：效率高

#### 链表

LinkedList implements List，Deque:

- 非随机存取：必须从头/尾开始遍历链表访问元素
- E get(int Index)方法：效率极低

ListIterator:

- add 方法：依赖于迭代器位置
- remove 方法：依赖于迭代器状态
- previousIndex 方法：返回迭代器前一元素的整数索引
- nextIndex 方法：返回迭代器后一元素的整数索引

#### 散列集

HashSet implements Set：无序无重复元素集，基于 HashTable

- 散列表：列表/链表数组(多个列表/链表)，每个列表/链表成为桶(bucket)
  - 元素的桶的整数索引：元素散列码 mod 桶的总数(余数)
  - 桶数：预计元素个数的 75%~150% e.g 标准类库桶数为 2 的 n 次方，默认值 16
  - 散列冲突(hash collision)：目标桶已满
  - 再散列(rehashed)：创建大通数(如双倍桶数)的新散列表，丢弃原散列表
  - 装填因子(load factor)：再散列时机决定因素，一般为 0.75(75%桶中含有至少一个元素)
  - hash 值：return (key.hashCode() & 0x7fffffff) % M;
- 方法
  - add：先查找对象存在性，不存在则添加元素
  - contains：重写方法
- 散列集迭代器：依次访问所有桶

#### 树集

TreeSet implements SortedSet，NavigableSet：有序集

#### 比较接口

##### Comparable Interface

```java
// A<B负值，A==B零，A>B正值(B代表other)
public interface Comparable<T>
{
    int compareTo(T other);
}
```

##### Comparator Interface

```java
// A<B负值，A==B零，A>B正值
public interface Comparator<T>
{
    int compare(T a, T b);
}

SortedSet<Item> setSortedByName = new TreeSet<>(Comparator comp)；//实现比较器的类
```

#### 队列

- 双端队列: ArrayDeque 类与 LinkedList 类
- 优先级队列: PriorityQueue 类, 未对所有元素进行排序
  - add 和 remove 方法: 引用最小元素

#### 映射表

实现 Map 接口，未实现 Collection 接口

- 散列/比较函数只作用于键 key
- 添加/删除/检索对象时，必须提供键 key
- 键 key 具有唯一性

### 集合框架

RandomAccess 接口：标记接口，无任何方法，标记一个集合是否支持高效的随机访问

### 集合算法

### 早期集合

## 线程

### 线程基础

线程：分享 CPU、共享内存(多个线程访问同一数据/对象)

线程一般用于需长时间执行的任务：循环、下载、浏览图片

### 线程状态

#### Create Thread

创建线程的方法：

- 父类:继承 Thread 类，重写 run 方法
- 接口:new Thread(Runnable Task)实现 Runnable 接口的类：实名类/匿名类/Lambda 表达式

#### Runnable Thread

thread.start() 线程处于可运行状态：可能在运行，可能不在运行，不必始终保持运行

#### Block Thread

- blocked
- waiting
- timed waiting

##### blocked

获取锁不得时，进入阻塞状态

##### waiting

等待调度器时，进入等待状态

##### timed waiting

调用含超时参数的方法时，进入计时等待状态保持到超时或通知

Object.wait、Thread.sleep、Thread.join、Lock.tryLock、Condition.await

#### terminated

run 方法正常退出或抛出未捕获异常时，进入(自然/意外)死亡状态

### 线程属性

#### 优先级

- 默认情况下继承父线程的优先级
- 需防止低优先级线程被饿死(因此不要依赖优先级进行编程)
- MIN_PRIORITY(1)~NORM_PRIORITY(5)~MAX_PRIORITY(10)
- 每当线程调度器选择新线程时,首选具有较高优先级的线程

#### Daemon Thread

- Thread.setDaemon(true)
- 设置为后台线程：随时可能中断
- 虚拟机会在只有后台线程时退出,后台线程不可访问固有资源(文件、数据库等)

#### 未捕获异常的处理器

实现 Thread.UncaughtExceptionHandler 接口

不安装默认处理器时,默认处理器为空

### 中断线程

#### Interrupt Method

对一个线程调用此方法时,线程将进入中断状态

#### Interrupted Exception

对一个阻塞线程(调用 sleep/wait 方法等)调用 interrupt 方法时，抛出此异常

### 线程同步

两个线程都有多个语句，无法保证一个线程所有语句全部执行完再调用另一个线程,必然会出现交错调用不同线程中的语句现象，导致调用混乱现象

#### 锁对象 (实例域)

可重复(持有计数)，可共用(共用锁对象的方法可互相调用)

#### 条件对象 (实例域)

管理有锁却不能正常工作的线程

一个锁对象可以有多个相关的条件对象

#### 内部锁

- synchronized 关键字
- 每个对象都有一个内部锁，可将静态方法声明为 synchronized
- 等价于 wait/notifyAll
- 等价于 await/signalAll

#### 截获内部锁

#### 读写锁

#### 监视器

#### volatile 关键字:修饰实例域

声明一个域可并发更新,通知编译器和虚拟器注意此特性

#### 死锁

所有线程处于等待或阻塞状态

e.g. 两个线程互相等待状态

#### Thread Local Helper

### 线程安全

java.util.concurrent 并发 API：线程安全(同时只有一个线程调用某对象)

#### 原子整数

```java
AtomicInteger.getAndIncrement();     //cnt++;
AtomicInteger.getAndDecrement();    //cnt—
AtomicBoolean、AtomicLong、AtomicReference类
```

#### 线程安全集合

- 阻塞队列
- 高效映射表、队列
- 写数组列表和写数组集的拷贝 - CopyOnWriteArrayList 类、CopyOnWriteArraySet 类
- 同步包装器(synchronization wrapper) - 任何集合类通过同步包装器变成线程安全集合类

### 异步计算

### 执行器

线程池：创建大量生命周期短的线程

- CachedThreadPool：提交任务多，创建新线程
- FixedThreadPool：提交任务多，等待当前任务完成再运行其他任务
- SingleThreadExecutor：逐一执行提交任务
- ScheduledExecutorService 接口：预定执行/重复执行任务

以上工厂方法返回：实现 ExecutorService 接口的 ThreadPoolExecutor 对象

- 创建

```java
ExecutorService pool = Executors.newCachedThreadPool();
```

- 方法

```java
pool.execute(myTask);
pool.shutdown();
```

- Future 对象用于查询任务完成情况

### 同步器

### 线程与 Swing:事件分配线程

事件分配线程不应进行 input/output/sleep 调用(可能使线程阻塞)

- Timer 类(亦是线程)：每隔一段时间重复执行 MyTask
- 更新图形化界面：SwingUtilities.invokeLater(Runnable MyTask);

```java
EventQueue.invokeLater(new Runnable()
{
public void run()
{
    Statements;
}
});
```

- 指定布局(Layout)

以下可合成一个方法:

- 创建组件(Component)
- 添加组件(getContentPane.add(Component) //得到 Container 类)
- 响应事件(Event)
- 设置属性(size、location、bounds、locationByPlatform、title、iconImage、visible、resizable、undecorated、extendedState)

```java
// 取得点击按钮的名字
String itemName = ((JRadioButton) e.getSource()).getText();
//Source：事件源(点击按钮事件)
```

## Self-Defined Class

@override:

- equals
- hashCode
- toString
- Comparable(compareTo)
- Cloneable(clone)

## 常用工具类

- java.lang Java 语言的核心类库
- java.util 实用工具
- java.io 标准输入/输出类库
- java.awt/javax.swing 图形用户界面(GUI)的类库
- java.net 网络功能的类库
- java.sql 数据库访问的类库
- java.io 输入输出流

## 输入与输出

### 输入

- InputStream 类：read(字节)
- Reader 类：read(char)

### 输出

- OutputStream 类：write、flush、close
- Writer 类：write(char,String)、flush、close

## 正则表达式

### 基本写法

([字符]){数量}\位置

### Group RegExp

- matcher.group(int)
- 0 表示整个正则表达式，i 表示第 i 个圆括号

## Garbage Collection

### Garbage Collection Optimization

GC 优化的核心思路:
尽可能让对象在新生代中分配和回收,
尽量避免过多对象进入老年代,
导致对老年代频繁进行垃圾回收,
同时给系统足够的内存减少新生代垃圾回收次数.

分析系统的运行状况:

- 系统每秒请求数, 每个请求创建多少对象, 占用多少内存
- Young GC 触发频率, 对象进入老年代的速率
- 老年代占用内存, Full GC 触发频率, Full GC 触发的原因, 长时间 Full GC 的原因

### GC Tools

- 监控告警系统：Zabbix、Prometheus、Open-Falcon
- jdk 自动实时内存监控工具：VisualVM
- 堆外内存监控：
  Java VisualVM 安装 Buffer Pools 插件,
  google perf 工具,
  Java NMT (Native Memory Tracking) 工具
- GC 日志分析：GCViewer、gceasy

```bash
# jstat：JVM 自带命令行工具, 可用于统计内存分配速率、GC 次数，GC 耗时
jstat -gc <pid> <统计间隔时间>  <统计次数>

# jmap：JVM 自带命令行工具, 可用于了解系统运行时的对象分布
jmap -histo <pid>
jmap -dump:live,format=b,file=dump.prof <pid>

# 用来查看正在运行的 Java 应用程序的扩展参数
# 包括 Java System 属性和 JVM 命令行参数
jinfo <pid>
```

## Java Naming Conventions

### 使用前注意事项

- 由于 Java 面向对象编程的特性, 在命名时应尽量选择名词
- 驼峰命名法（Camel-Case）
  - 当变量名或函式名是由一个或多个单字连结在一起，而构成的唯一识别字时，首字母以小写开头，每个单词首字母大写（第一个单词除外）。

### 包名的书写规范 （Package）

推荐使用公司或机构的顶级域名为包名的前缀，目的是保证各公司/机构内所使用的包名的唯一性。包名全部为小写字母，且具有实际的区分意义。

#### Package 一般要求

- 选择有意义的名字，能快速地传达该类的用途。
- 所有包的命名必须采用小写英文字母。

#### Package 实际应用

应用系统中经常应用分层，Dao 层（数据库访问）、Service 层（业务处理）、Web 层（页面控制 action 类）

- 包名的前几个为固定名称, 如果是网站的话，采用网站的域名的反写，如果域名还没有确定的话，采用公司固定的几个名称。如：net.vschool
- 在包名的接下来一个单词为模块的名称。如：用户模块，包名为 net.vschool.user
- 关于模块的访问操作，采用分层形式,一般分为：

Dao 层操作：一般定义在 net.vschool.xxx.dao 中，其中 xxx 为模块名称。  
Service 层操作：一般定义在 net.vschool.xxx.service 中。  
web 层操作：一般定义在 net.vschool.xxx.action 中。

> net.vschool.user  
> net.vschool.user.dao  
> net.vschool.user.action  
> net.vschool.user.service

### 类名的书写规范 (Class)

类名必须使用名词，如果一个类名内含多个单词，那么各个单词第一个字母大写，后续字母小写，起伏呈驼峰状，人称驼峰式命名。给类名命名时，必须保证准确、简洁且容易理解。尽量使用完整单词，避免使用缩写词（除了大家公认的）
类

#### Class 一般要求

- 选择有意义的名字，能快速地传达该类的用途。
- 参照 java 驼峰命名法，类名的首字母必须采用大写的形式，如果类名为多词组合而成的话，那么每个词的首字母必须采用大写。如：StudentAnswer.java
- 当要区别接口类和实现类的时候，可以在类的后面加上“Impl”。
- 推荐实体类没有后缀名。
- public class 应与.java 文件同名

#### Class 实际应用

应用系统中经常应用分层，Dao 层（数据库访问）、Service 层（业务处理）、Web 层（页面控制 action 类），每一层的类的名称尽量带上该层后缀。

- Dao 层
  - 接口类：采用 JavaBean+Interface+Dao 的形式来定义,即，实体对象+Interface+Dao
  - 实现类：采用 JavaBean+Interface+Impl+Dao 的形式来定义,即，实体对象+Interface+Impl+Dao
- Service 层
  - 接口类：采用 Xxx+Interface+Service 的形式来定义,即，模块+Interface+Service
  - 实现类：采用 Xxx+Interface+Impl+Service 的形式来定义,即，模块+Interface+Impl+Service
- Web 层（action 类）

  - 实现类：采用县 Xxx+Operator+Action 的形式来定义,即，模块+操作+Action

### 变量的命名

#### 普通变量

##### Var 一般要求

- 选择有意义的名字，能快速地传达该变量的用途。
- 参照 java 驼峰命名法，首字母以小写开头，每个单词首字母大写（第一个单词除外）。

##### Var 实际应用

- 变量命名采用基本结构为 typeVariableName，使用 3 字符前缀来表示数据类型。
  - 做数组用时，再加前缀-a,如字符串数组：astr，
  - 自定义类型的变量可以采用本身的名称，把首字母改为小写。
  - 采用名称要能代表在方法中的意义。如果员工列表：employeeList

| 原词          | 缩写 |
| :------------ | :--- |
| byte          | byt  |
| char          | chr  |
| float         | flt  |
| boolean       | bln  |
| Integer/int   | int  |
| short         | sht  |
| Long/long     | lng  |
| Double/double | dbl  |
| string        | str  |

##### 变量使用技巧

- 在一段函数中不使用同一个变量表示前后意义不同的两个数值。
- 除非是在循环中，否则一般不推荐使用单个字母作为变量名，i、j、k 等只作为小型循环的循环索引变量。
- 避免用 Flag 来命名状态变量。
- 用 Is 来命名逻辑变量，如：blnFileIsFound。通过这种给布尔变量肯定形式的命名方式，使得其它开发人员能够更为清楚的理解布尔变量所代表的意义。
- 如果需要对变量名进行缩写时，一定要注意整个代码中缩写规则的一致性。
  例如，如果在代码的某些区域中使用 intCnt，而在另一些区域中又使用 intCount，就会给代码增加不必要的复杂性.
  建议变量名中尽量不要出现缩写.

#### 静态变量

- 选择有意义的名字，能快速地传达该变量的用途。
- 参照 java 驼峰命名法，采用全部大写的形式来书写，对于采用多词合成的变量采用`-`来连接各单词。如：`USER_LIST`

### 方法的命名

#### Method 一般要求

- 选择有意义的名字，能快速地传达该方法的用途。
- 参照 java 驼峰命名法，首字母以小写开头，每个单词首字母大写（第一个单词除外）。

#### Method 实际应用

- 方法表示一种行为，它代表一种动作，最好是一个动词或者动词词组或者第一个单词为一个动词。
- 属性方法：以 get/set 开头，其后跟字段名称，字段名称首字母大写。如：getUserName()
- 数据层方法：只能以 insert（插入）,delete（删除）,update（更新）,select（查找）,count（统计）开头
  他层方法避免以这个 5 个单词开头，以免造成误解。
- 服务层方法，根据方法的行为命名，只描述方法的意义，而不采用方法的目的命名.
  比如系统的添加新用户，用户可以前台注册，也可以管理员后台添加，方法会被重用，所以最好不要用使用 register，采用 add 会更好写.
  避免使用与 web 层相关的方法.
- Web 层方法最好是贴近 web 的语言，如 register，login，logout 等方法。
