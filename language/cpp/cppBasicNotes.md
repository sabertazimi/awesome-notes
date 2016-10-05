
* [C++ Basic Notes](#c-basic-notes)
	* [Basic Workflow](#basic-workflow)
		* [初始化与回收](#初始化与回收)
	* [变量、类型与函数](#变量类型与函数)
		* [变量](#变量)
		* [指针](#指针)
		* [reference (引用类型)](#reference-引用类型)
			* [性质](#性质)
			* [作为函数参数](#作为函数参数)
			* [特性](#特性)
		* [类型](#类型)
			* [volatile](#volatile)
		* [运算符](#运算符)
			* [sizeof](#sizeof)
		* [Expression (表达式)](#expression-表达式)
			* [左/右值表达式](#左右值表达式)
		* [联合(union)](#联合union)
		* [位段](#位段)
		* [函数](#函数)
			* [参数的默认值(defalut)](#参数的默认值defalut)
			* [内联函数(inline)](#内联函数inline)
	* [类](#类)
		* [访问控制权限](#访问控制权限)
		* [派生控制权限](#派生控制权限)
		* [构造函数](#构造函数)
			* [调用形式](#调用形式)
			* [特殊成员的初始化](#特殊成员的初始化)
			* [构造函数体](#构造函数体)
			* [默认无参构造函数](#默认无参构造函数)
		* [析构函数](#析构函数)
		* [`new` 与 `delete`/`delete []`](#new-与-deletedelete-)
			* [stack 与 heap](#stack-与-heap)
			* [普通指针与成员指针](#普通指针与成员指针)
		* [this 指针](#this-指针)
		* [成员指针 与 指针成员](#成员指针-与-指针成员)
			* [成员指针 - 指向成员的指针](#成员指针---指向成员的指针)
			* [定义含指针成员(成员是个指针)的类](#定义含指针成员成员是个指针的类)
		* [函数成员](#函数成员)
			* [const/volatile 关键字修饰](#constvolatile-关键字修饰)
		* [静态成员](#静态成员)
			* [静态数据成员](#静态数据成员)
			* [特性](#特性-1)
			* [定义](#定义)
			* [静态函数成员](#静态函数成员)
			* [引用形式](#引用形式)
			* [特性](#特性-2)
		* [友元](#友元)
			* [成员友元函数](#成员友元函数)
		* [虚函数](#虚函数)
			* [特性](#特性-3)
			* [功能](#功能)
			* [纯虚函数 与 抽象类](#纯虚函数-与-抽象类)
			* [使用](#使用)
	* [作用域(Scope)](#作用域scope)
		* [面向过程的作用域](#面向过程的作用域)
		* [面向对象的作用域](#面向对象的作用域)
			* [命名空间(namespace)](#命名空间namespace)
	* [运算符重载](#运算符重载)
	* [模板](#模板)
		* [调用形式](#调用形式-1)
	* [异常](#异常)
		* [异常对象的析构](#异常对象的析构)
	* [多态](#多态)
	* [STL](#stl)
		* [Container](#container)
		* [Methods](#methods)
			* [empty/size](#emptysize)
			* [assign/insert/erase](#assigninserterase)
			* [erase/remove](#eraseremove)
			* [reserve/swap](#reserveswap)
	* [Awesome Tips / Best Practice](#awesome-tips--best-practice)

# C++ Basic Notes

## Basic Workflow

### 初始化与回收
-   Treat global program as a object: 开工函数与收工函数
-   Normal Object: 构造函数与析构函数

## 变量、类型与函数

### 变量

const 变量 代替 #define 宏定义

### 指针 

*   只读指针可赋值为 普通对象地址
*   普通指针不可赋值为 只读对象地址

```cpp
int *p = const int;         // x
int *p = int;               // o
const int *p = const int;   // o
const int *p = int;         // o
```

### reference (引用类型)

#### 性质

引用类型(&)实质上是一种语法糖,编译器将引用变量最终全部编译为指针变量

#### 作为函数参数

向函数传递引用类型实参时,若:

*   实参与形参类型不一致(**必须完全一致**)
*   实参为(右)值表达式

则会生成一个内部匿名变量,用于函数调用. 此时,对参数进行的操作将**无法改变实参原有值**,使得 call by reference 失效.

#### 特性

*   普通全局引用变量必须在定义时初始化初始化(左值表达式)

```cpp
int &x = 1;   // warning: 引用匿名变量
int &k = j++; // warning: 引用匿名变量
```

*   引用变量不分配存储单元: 不能引用 引用变量, 不能作为指针所指对象, 不能作为数组元素

```cpp
int & &x;       // error
int & *p;       // error
int & s[4];     // error
```

*   引用变量的值按字节(指针/地址)编码: 不能引用位段(无法按字节编码)

```cpp
int &w = a.j; // error
```

*   引用变量不能引用引用变量, 只能引用另一个引用变量所引用的变量/地址

```cpp
int x = 10;
int &j = x;
int &&m = j;  // error
int &m = j;   // pass: m = j => x
```

*   引用变量可以引用 register 变量, 编译器会将其自动转为 auto 变量(为其分配地址)

```cpp
register int i = 0,
register int &j = i;
```

*   引用变量在一定程度上具有指针性质

```cpp
int x = 1;
const int &p = x;   // pass

x = 7;  // pass
p = 7;  // error
```

### 类型

#### volatile

*   volatile 表示可被其他线程/进程改变的变量
*   volatile 变量常作为全局变量, 用于同步各进程
*   const 表示不可被本线程/进程修改的变量

```cpp
volatile int x;

x = 3;

if (4 == x) {
    cout << "X changed by other routines.";
}
```

### 运算符

#### sizeof

```cpp
sizeof 数值
sizeof(数值)
sizeof(类型)

sizeof(printf("abcd")); // 无输出
```

### Expression (表达式)

#### 左/右值表达式

左值表达式一定可作(右)值表达式, (右)值表达式不可作左值表达式:

*   左值表达式  : 变量, 赋值表达式, 前缀自操作表达式, 返回值为引用类型的函数调用

```cpp
bar;
y = 6;
i -= 10;
++i;

int &f(void);
f() = j;
```

*   (右)值表达式: 常量, 强制类型转换表达式, 后缀自操作表达式, 算数表达式

```cpp
20;
(type)x;
i++;
y + 2;
```

### 联合(union)

匿名联合具有以下性质:

*   没有对象的全局匿名联合必须 static
*   只可定义 public 成员
*   数据成员与联合本身作用域相同
*   数据成员共享存储空间

### 位段

class/struct/union 都可定义位段成员, 但类型必须为 char/short/int/enum, 不可为 long/float/array/class

### 函数

#### 参数的默认值(defalut)

-   不能在 **函数原型声明** 与 **函数定义** 中 **同时** 定义参数的默认值,会产生默认值冲突
-   所有缺省参数必须位于参数列表右边
-   不能用前一个参数初始化后一个参数
-   当同时有 `int g(void)` `int g(int x = 1)` 时, 不能调用 g() (具有二义性)

```cpp
int bar(int x , int y = 5, int z = m(u,v));
int foo(int x, int y = x++);    // error
```

#### 内联函数(inline)

以下情况会造成内联失败:

*   内联函数中使用 分支/循环/开关/函数调用
*   内联函数定义出现在调用后面(先调用后定义)
*   其他函数访问了内联函数入口地址
*   内联函数定义为(纯)虚函数

内联最终结果:

*   内联成功后, 原函数会被编译器清除
*   不管内联是否成功, 内联函数作用域局限于当前源文件
*   全局 extern main 函数不能定义为内联函数(否则会使得主函数作用域变小, 操作系统无法访问主函数)
*   在类体内实现的任何函数自动变为内联函数

## 类

### 访问控制权限

public > protected > private + friend > private

### 派生控制权限

public 控制权限可产生 父类与子类. 父类指针可以直接指向子类对象,普通基类指针必须通过强制类型转换才能指向派生类对象.

### 构造函数

#### 调用形式

构造函数不可被显式调用(类前缀),必须隐式调用(省略类前缀)

#### 特殊成员的初始化

*   **只读**成员、**引用**成员、**对象**成员只可在构造函数体前**初始化**
*   普通数据成员可在定义时初始化,也可在构造函数体内**初始化**

#### 构造函数体

*   构造函数体前: 初始化只读成员、引用成员、对象成员、其他数据成员, 初始化顺序以**定义顺序**为准, **无关构造函数体前出现顺序**
*   构造函数体内: 初始化其他数据成员(不可初始化只读成员、引用成员、对象成员)

#### 默认无参构造函数

*   当定义了含参构造函数后, 编译器将不会再为对象自动添加无参构造函数
*   默认无参构造函数不会初始化只读/引用成员, 且只会调用对象成员的无参构造函数(若对象成员没有无参构造函数,则编译器报错)
*   对于局部对象, 将随机初始化普通数据成员; 对于全局对象, 将普通数据成员初始化为0. 由于默认无参构造函数的存在, 当对象只含有普通数据成员(无只读/引用/指针成员, 且对象成员有无参构造函数), 可以不显式定义构造函数

```cpp
class Foo {
    const int b;
    int c, &d, e, f;
    String g, h;

public:
    // 初始化顺序: b, c, d, e, f, g, h
    Foo(int bar): d(c), c(bar), g(bar), b(bar), e(bar) {
        c += bar;
        f = bar;
    }
};
```

```cpp
B z(7, 8); => B z(7, 8);    ///< 2 参
B z = (7, 8); => B z(8);    ///< 1 参
```

*   形式为 Foo:Foo(Foo &obj) 的构造函数,可使得对象作为实参传递时自动进行深拷贝复制

### 析构函数

-   析构函数即可显式调用,又可隐式调用
-   析构函数与全局 main 函数 没有重载函数

-   作用域结束时会自动调用析构函数
-   调用 exit/abort 时, 需手动调用析构函数释放资源

```cpp
String x("global");

int main(void) {
    short error = 0;
    String y("local");

    // set error flag
    switch (error) {
        case 0:
            return;
        case 1:
            y.~String();
            exit(1);
        default:
            x.~String();
            y.~String();
            abort();
    }

    return 0;
}
```

-   设置 **析构标志** 防止重复析构同一对象

```cpp
String::~String() {
    // check flag
    if (s == NULL) {
        return;
    }

    cout<<"Deconstruct:"<<s;

    free(s);

    // set flag
    s = NULL;
}
```

### `new` 与 `delete`/`delete []`

#### stack 与 heap

*   string str("sabertazimi") 创建在栈上, 自动析构
*   new/malloc 返回堆指针, delete/free 的对象都是堆指针, 完全由程序员管理创建与回收

#### 普通指针与成员指针

*   普通指针/不含指针成员的对象变量分配/回收内存可**混用** malloc/new/free/delete/delete []
*   创建/回收含有**指针成员**的类时,只能用 new/delete/delete [](分配对象内存+调用构造/析构函数), 不能用 malloc/free(只作用于对象本身,不调用构造/析构函数,即不为指针成员分配/回收内存), 否则会造成**指针成员**未分配内存/内存泄露
*   new 对象数组实质: malloc 对象 + 调用对象无参构造函数

### this 指针

普通函数成员比**静态函数**成员多一个隐含参数 this 指针, 其会随着函数类型的不同而改变类型

*   this 指针指向对象起始地址处(对象首成员地址)
*   一般函数: `class_type *const this;`
*   const 函数: `const class_type *const this`

### 成员指针 与 指针成员

#### 成员指针 - 指向成员的指针

考虑到越界问题,成员指针不可移动

```cc
int A::*pi = &A::i;
```

#### 定义含指针成员(成员是个指针)的类

-   深拷贝构造函数: T(const T &)
-   深拷贝赋值运算函数: virtual T& operator=(const T &)
-   虚析构函数: virtual ~T()   
-   定义`T &p = *new T()`后, 使用`delete &p`释放内存
-   定义`T *p = new T()`后, 使用`delete p`释放内存

### 函数成员

#### const/volatile 关键字修饰

-   修饰函数成员隐含参数 - this 对象指针,表示不可修改/挥发对象
-   被修饰函数成员不能修改对象自身(即对象的**普通数据成员**), 可以修改对象的**静态**数据成员
-   构造函数/析构函数不可被 const/volatile 修饰

### 静态成员

#### 静态数据成员

#### 特性

-   静态数据成员脱离对象实例存在 `Person::totalNum`
-   静态数据成员存储单元不属于任何对象实例

#### 定义

-   不能在**构造函数/析构函数**中 创建/释放 静态数据成员的存储单元
-   在类体内声明静态数据成员, 在类体外定义并初始化静态数据成员  `List * List::head = NULL;`
-   局部类/union类不可定义静态数据成员

#### 静态函数成员

-   静态函数成员不含隐含参数 - this 对象指针
-   构造/析构/const/volatile函数(均有 this 对象指针)不能定义为静态函数成员

#### 引用形式

-   抽象类型 `List::sort()`
-   对象实例 `list.sort()`

#### 特性

-   只能直接修改静态数据成员
-   可以通过静态函数成员的函数参数,传入对象实例指针,从而间接修改非静态数据成员

### 友元

-   在重载函数中, (函数签名不一致的)未声明的函数只能访问类的共有成员
-   static/virtual 与 friend 不能共用

#### 成员友元函数

可在3处定义函数体:

-   函数定义处(本类)
-   定义友元处(它类)
-   类体外

### 虚函数

#### 特性

-   无限传递性: 派生类中原型相同的函数自动成为虚函数
-   具有隐式参数 - this 对象指针: 不能为静态函数成员(静态函数无 this 参数)
-   构造函数不能为虚函数,析构函数可以为虚函数

#### 功能

实现运行时多态. 最好将普通函数成员**全部**定义为 虚函数.

#### 纯虚函数 与 抽象类

-   纯虚函数具有虚函数的所有特性
-   具有纯虚函数的类自动成为抽象类

```cc
struct A {
    virtual void f1() = 0;
    virtual void f2() = 0;
};
```

#### 使用

*   virtual 关键字只能在 struct/class 体内使用, 在体外实现相应函数成员时, 应去掉 virtual 关键字

## 作用域(Scope)

-   标识符的作用域越小,访问的优先级别越高
-   单目运算符 `::` 可访问全局符号  e.g `::process++ // 自加全局变量 process`

### 面向过程的作用域

-   作用于表达式内
-   作用于函数内
-   作用于程序文件内
-   作用于整个程序

### 面向对象的作用域

-   作用于**函数成员**内
-   作用于**类/派生类**内
-   作用于**基类**内
-   作用域**虚基类**内

#### 命名空间(namespace)

-   指定一个完全的命名空间时, 不会将任何标识符加入当前作用域. 可重新定义同名局部符号
-   指定一个命名空间的具体成员时, 会将成员符号加入当前作用域
-   可以为嵌套命名空间定义别名

```cpp
namespace ABCD = A::B::C;
```

## 运算符重载

|运算符|重载方式|
|:---------------:|:--------------------:|
|sizeof  .  .*  ::  ?:|不可重载|
|=  ->  ()  []|普通函数成员|
|new delete|静态函数成员 普通函数|
|其他运算符|普通函数成员 普通函数|

## 模板

### 调用形式

-   函数标签相同的覆盖函数
-   通过函数模板自动生成可匹配参数的实例函数
-   通过强制类型转换,调用已经手动生成的可匹配参数的实例函数
-   调用失败

## 异常

### 异常对象的析构

catch (const A *a) 形式

## 多态

*   编译时多态(重载): 静态绑定(同名不同参的)重载函数 - 一个方法, 多种参数(f(void) => f@, f(int) => f@i, f(int, int) => f@ii)
*   运行时多态(多态): 动态绑定(upcasting)虚函数 - 一个接口, 多个方法(父子表现不同, 兄弟表现不同)

```cpp
Parent c = new Child();
c.speak("Hello World!") // => "Child: Hello World!"
```

## STL

*   工作方式: copy in, copy out

### Container

*   序列容器: vector string deque list
*   关联容器: set multiset map multimap
*   连续内存容器: vector string deque
*   链表容器: list slit hash

### Methods

#### empty/size

list.empty() 优于 list.size() == 0

#### assign/insert/erase

```cpp
void container::insert(InputIterator begin, InputIterator end);
void container::insert(iterator position, InputIterator begin, InputIterator end);

iterator container::erase(iterator begin, iterator end);    // 序列容器
void container::erase(iterator begin, iterator end);        // 关联容器

void container::assign(InputIterator begin, InputIterator end);
```

```cpp
v1.assign(v2.begin() + v2.size() / 2, v2.end());
v1.insert(v1.end(), v2.begin() + v2.size() / 2, v2.end())   // 将 v2 一半元素插入 v1 尾部
```

#### erase/remove

*   对于连续内存容器 vector/string/deque:

```cpp
c.erase(remove(c.begin(), c.end(), 1963), c.end())

bool badValue(int);
c.erase(remove_if(c.begin(), c.end(), badValue), c.end());
```

*   对于 list:

```cpp
c.remove(1963)

bool badValue(int);
c.remove_if(badValue);  // higher order function
```

*   对于关联容器:

```cpp
c.erase(1963);
```

#### reserve/swap

```cpp
v.reserve(1000);    // 强制分配 1000 个元素内存单元, 防止反复回收/释放, 提高执行效率

string(s).swap(s);  // 回收多余内存单元(shrink to fit), 提高内存利用率
```

## Awesome Tips / Best Practice

*   普通函数成员 与 析构函数 全部定义为虚函数
*   不改变对象实例的函数 全部定义为 const 函数
*   被改变参数/返回值 全部定义为 引用类型
*   深拷贝(赋值)函数参数/返回值 全部定义为 引用类型
