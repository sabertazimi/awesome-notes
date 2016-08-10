
* [Compiler Basic Notes](#compiler-basic-notes)
	* [Basic Concepts](#basic-concepts)
		* [Defination of compilers](#defination-of-compilers)
		* [Structure of compilers](#structure-of-compilers)
	* [Lexical Analysis](#lexical-analysis)
		* [Tokenizer - 词法分析器](#tokenizer---词法分析器)
			* [转移图算法](#转移图算法)
			* [关键字(keyword)处理](#关键字keyword处理)
		* [正则语言(Regular Expressions)](#正则语言regular-expressions)
			* [基本定义](#基本定义)
			* [形式表示](#形式表示)
			* [正则语法糖(Syntax Sugar)](#正则语法糖syntax-sugar)
		* [有限状态自动机(Finite Automaton)](#有限状态自动机finite-automaton)
			* [确定有限状态自动机(Deterministic Finite Automaton)](#确定有限状态自动机deterministic-finite-automaton)
				* [状态转移表实现 DFA](#状态转移表实现-dfa)
			* [非确定有限状态自动机(Nondeterministic Finite Automaton)](#非确定有限状态自动机nondeterministic-finite-automaton)
		* [自动词法分析器](#自动词法分析器)
			* [Thompson 算法: RegExp --> NFA](#thompson-算法-regexp----nfa)
			* [子集构造算法: NFA --> DFA](#子集构造算法-nfa----dfa)
			* [Hopcroft 算法](#hopcroft-算法)
			* [实现](#实现)
				* [DFA](#dfa)
					* [有向图](#有向图)
					* [转移表](#转移表)
	* [Syntax Analysis(语法分析)](#syntax-analysis语法分析)
		* [乔姆斯基文法体系](#乔姆斯基文法体系)
		* [上下文无关文法](#上下文无关文法)
			* [文法表示](#文法表示)
			* [形式化表示](#形式化表示)
				* [简易表示](#简易表示)
				* [巴科斯范式(Backus-Naur Form)](#巴科斯范式backus-naur-form)
			* [分析树](#分析树)
				* [二义性文法](#二义性文法)
				* [文法重写(消除二义性)](#文法重写消除二义性)
		* [自顶向下分析](#自顶向下分析)
			* [避免回溯](#避免回溯)
			* [递归下降分析算法(预测分析算法)](#递归下降分析算法预测分析算法)
				* [算法实现](#算法实现)
			* [LL(1)分析算法](#ll1分析算法)
				* [nullable sets](#nullable-sets)
				* [first sets](#first-sets)
				* [follow sets](#follow-sets)
				* [final sets](#final-sets)
				* [分析表](#分析表)
				* [解决冲突(分析表某项有多个编号)](#解决冲突分析表某项有多个编号)
		* [自底向上分析](#自底向上分析)
			* [LR(0) 分析算法(移进-归约(reduce)算法)](#lr0-分析算法移进-归约reduce算法)
				* [分析表构造](#分析表构造)
				* [驱动代码](#驱动代码)
				* [解决冲突](#解决冲突)
	* [Compilers Exercise](#compilers-exercise)
		* [C Declaration Interpreter](#c-declaration-interpreter)
		* [Cool(Classrom Object-Oriented Language)](#coolclassrom-object-oriented-language)

# Compiler Basic Notes

## Basic Concepts

### Defination of compilers

*   `program_code` ---compiler---> executable
*   data ---executable---> output

> e.g Fortran(formula translation) 1 project

### Structure of compilers

front-end to back-end:

*   front-end: src ---lexical analysis---> tokens ---parsing/syntax analysis---> AST(Abstract Syntax Tree)
*   back-end: AST ---...---> ... ---...---> ... ---code generation---> dist

details:

*   lexical analysis(词法分析)
*   parsing/syntax analysis(语法分析)
*   semantic analysis(语义分析): type and scope
*   optimization
*   code generation: translate to other high level language/assembly code/machine code

## Lexical Analysis

### Tokenizer - 词法分析器

#### 转移图算法

```c
token nextToken(void) {
	char c = getChar();
	switch(c) {
		case '<':
			c = getChar();
			switch (c) {
				case '=':
					return LE;
				case '>':
					return NE;
				default:
					rollback();
					return LT;
			}

		case '=':
			return EQ;
		case '>':
			c = getChar();
			switch (c) {
				case '=':
					return GE;
				case '<':
					return NE;
				default:
					rollback();
					return GT;
			}
	}
}
```

#### 关键字(keyword)处理

*   根据 完美哈希算法(无冲突哈希函数) , 建立所有关键字对应的关键字完美哈希表
*   读入有效标识符(字符串型)后, 查询关键字哈希表, 检查当前标识符是否为关键字

```c
#define KEYWORD_MAXLEN 10

hash_one(char *str, int len) {
    unsigned int keyValue = 0;

    for (int i = 0; i < len; i++) {
        keyValue += str[i] * ((int)pow(33, len - i));
    }

    keyValue = (keyValue * 3 + 7) % KEYWORD_MAXLEN;
	return keyValue;
}
```

```c
#define KEYWORD_HASH_SEED 131

hash_two(char *str, int len) {
	unsigned int keyValue = 0,
    			 hash = 0;

    for (int i = 0; i < len; i++) {
        hash = hash * KEYWORD_HASH_SEED + str[i];
    }

    keyValue = hash & 0x7fffffff;
    return keyValue;
}
```

### 正则语言(Regular Expressions)

#### 基本定义

对于给定的字符集 C:

*   空串 "\0" 是正则表达式
*   任意 char <- C 是正则表达式
*   若 M, N 是正则表达式, 则 M|N = {M, N}, MN = {mn|m <- M, n <- N}, M* = {"\0", M, MM, MMM, ...} (选择/连接/闭包)也是正则表达式

#### 形式表示

```regexp
// 具有顺序性
e -> "\0"		// basic defination
	| c			// basic defination
	| e | e		// recursive defination
	| ee		// recursive defination
	| e*		// recursive defination
```

#### 正则语法糖(Syntax Sugar)

*   `[a-z]` : a|...|z
*   c?      : 0/1 个c
*   c+      : 1/n 个 c
*   c{i, j} : i-j 个 c
*   "a*"    : a* 自身(非 kleen 闭包)
*   .       : 除 ‘\n’ 外的任意字符

```regexp
// 标识符
[a-zA-Z\_][a-zA-Z\_0-9]*

// decimal integer
(+|-)?(0|[1-9][0-9]*)

// decimal float
(+|-)?(0|[1-9][0-9]*|)?\.[0-9]+
```

### 有限状态自动机(Finite Automaton)

#### 确定有限状态自动机(Deterministic Finite Automaton)

M = (AlphaSet/InputSet, StateSet, currentState, FiniteStateSet, transferFunction)

```c
A = {a, b}, SS = {0, 1, 2}, cS = 0, FS = {2},
transferFunction = {
	(cS0, a) -> cS1, (cS0, b) -> cS0,
	(cS1, a) -> cS2, (cS1, b) -> cS1,
	(cS2, a) -> cS2, (cS2, b) -> cS2,
}
```

##### 状态转移表实现 DFA

|状态\字符|a|b|
|:----------:|:-----:|:-----:|
|0|1|0|
|1|2|1|
|2|2|2|

#### 非确定有限状态自动机(Nondeterministic Finite Automaton)

transferFunction 中的次态不确定/不唯一(为一个开集合)

> (cS0, a) -> {cS1, cS2}

### 自动词法分析器

RegExp --Thompson 算法--> NFA --子集构造算法--> DFA --Hopcroft 最小化算法--> 词法分析器代码

#### Thompson 算法: RegExp --> NFA

*   直接构造基本 RegExp
*   递归构造复合 RegExp
*   epsilon : i --epsilon--> f
*   RegExp  : i --NFA(RegExp)--> f
*   选择    : i --NFA(RegExp1)--> f, i --NFA(RegExp2)--> f
*   连接    : i --NFA(RegExp1)--> m --NFA(RegExp2)--> f
*   闭包    : i --epsilon--> m --epsilon--> f, m --RegExp--> m

#### 子集构造算法: NFA --> DFA

由 Thompson 算法生成的 NFA, 当且仅当输入为 epsilon 时, 次态不唯一

*   将所有可达到次态作为一个集合 s, 视为单一次态 s
*   delta(Sigma) + epsilon-closure(深度/广度优先遍历找寻可达到次态边界)

```cpp
DFA subset_construction(NFA nfa) {
	s0 = eps_closure(n0);

	StateSet += s0;
	enqueue(s0);

	while (workqueue != []) {
		dequeue(s);

		foreach (ch in InputSet) {
			next_state = eps_closure(delta(s, ch));
			Fn[s, ch] = next_state;		// DFA 中的转移函数

			if (next_state not in StateSet) {
				StateSet += next_state;
				enqueue(next_state);
			}
		}
	}

	return DFA(StateSet, Fn);
}
```

#### Hopcroft 算法

最小化 DFA(数字逻辑中的最简状态表), 合并等价状态(等价类)

```cpp
split(StateSet S) {
	foreach (char ch) {
		if (ch can split S) {
			split S into S1, ..., Sk;
		}
	}
}

hopcroft(DFA) {
	split all nodes into InitStateSet and FiniteStateSet (Two State Sets);

	while (set is still changes) {
		split(S);
	}
}
```

#### 实现

##### DFA

###### 有向图

###### 转移表

*   行: 现态
*   列: 输入
*   值: 次态/ERROR/-1

驱动代码: table 用于实现 switch/case, stack 用于实现最长匹配

```cpp
next_token() {
	state = 0;
	stack = [];

	while (state != ERROR) {
		c = getChar();

		if (state is ACCEPT/FINITE) {
			clear(stack);
		}

		push(state);
		state = table[state][c];
	}

	while (state is not ACCEPT/FINITE) {
		state = pop();
		rollback();
	}
}
```

## Syntax Analysis(语法分析)

Tokens + Grammar --Syntax Analysis--> AST(Abstract Syntax Tree)

### 乔姆斯基文法体系

*   3 型文法(词法工具): 正则文法
*   2 型文法(语法工具): 上下文无关文法
*   1 型文法: 上下文有关文法
*   0 型文法: 任意文法
*   ((((3)2)1)0)

### 上下文无关文法

#### 文法表示

G = (S, N, T, P):

*   S: 开始符
*   N: 非终结符集合
*   T: 终结符集合
*   P: 产生式规则集合 X -> beta1, beta2, ..., betan, X <- N, beta <- N+T

#### 形式化表示

##### 简易表示

```grammar
Sentence -> Noun Verb Noun
Noun -> sheep
	|	tiger
	|	grass
	|	water
Verb -> eat
	|	drink
```

> S: Sentence, N: Sentence/Verb/Noun, T: sheep/tiger/grass/water/eat/drink

```grammar
E -> num
	|id
	|E + E
	|E `*` E
```

> S: E, N: E, T: num/id/+/*

##### 巴科斯范式(Backus-Naur Form)

*   ::=             : "被定义为"
*   "word"          : 字符本身
*   双引号外的字     : 语法部分
*   尖括号( < > )   : 必选项(非终结符)
*   方括号( `[ ]` ) : 可选项
*   大括号( { } )   : 可重复0至无数次的项
*   竖线( | )       : "OR"

#### 分析树

进行文法推导时生成的树:

*   根        : 开始符
*   内部结点  : 非终结符
*   叶子结点  : 终结符
*   层        : 一步推导(优先级影响推导顺序)
*   叶子结点串: 最终表达式
*   后序遍历  : 最终结果

##### 二义性文法

若给定文法 G, 对于句子 s, 其有 2 可不同的分析树, 择称 G 是二义性文法

##### 文法重写(消除二义性)

```grammar
E -> E + T
	|T
T -> T * F
	|F
F -> num
	|id
```

> 消除 + 与 `*` 的二义性, 如 3+4`*`5

### 自顶向下分析

*   从开始符号出发推导任意句子 t, 与给定句子 s 进行比较分析
*   利用分析树进行逐叶子匹配, 若匹配失败则进行回溯

```cpp
bool top_down_parsing(tokens[]) {
	i = 0;
	stack = [S];

	while (stack != []) {
		if (stack[top] is a terminal t) {
			t == tokens[i] ? pop(i++) : backtrack();
		} else if (stack[top] is a nonterminal T) {
			pop();
			push(T next expansion);	// 自右向左压栈, e.g pop(S), push(N_right), push(V), push(N_left)
		} else {
			throw new SyntaxError();
		}
	}

	return i >= tokens.length && is_empty(stack) ? true : false;
}
```

#### 避免回溯

利用前看符号避免回溯

```grammar
Sentence -> Noun Verb Noun
Noun -> sheep
	|	tiger
	|	grass
	|	water
Verb -> eat
	|	drink
```

> tiger eat water: 向前看非终结符推导出的所有终结符中匹配tiger的终结符; 不向前看,则先推导 N, 再推导 n, 但 n 不一定匹配 tiger, 则需进行回溯; 向前看一个字符, 直接推导 N --> n, 同时直接找寻匹配 tiger 的终结符

```grammar
S -> N V N
N -> (sheep)tiger
V -> eat
N -> (sheep-tiger-grass)water
```

#### 递归下降分析算法(预测分析算法)

*   分治算法: 每个非终结符构造一个**分析函数**
*   前看符号: 用**前看符号**指导产生式规则的选择(expansion)

```cpp
parse_S(tokens[]) {
	parse_N(tokens[0]);
	parse_V(tokens[1]);
	parse_N(tokens[2]);
}

parse_N(token) {
	if (token == s|t|g|w) {
		return true;
	} else {
		throw new SyntaxError();
	}
}

parse_V(token) {
	if (token == e|d) {
		return true;
	} else {
		throw new SyntaxError();
	}
}
```

##### 算法实现

```cpp
// X -> a
// 	|	XX
// 	|	aXXX
// 	|	aXXXXb
parse_X() {
	token = nextToken();

	switch (token) {
		case ...: // i: token == atom_char or parse_XX();
		case ...: // j: token == atom_char, token = nextToken(), parse_XXX();
		case ...: // k: token == atom_char, token = nextToken(), parse_XXXX(), token=nextToken(), token == b
		default: throw new SyntaxError();
	}
}
```

#### LL(1)分析算法

*   从左(L)向右读入程序
*   最左(L)推导: 优先推导最左侧非终结符
*   一个(1)前看符号
*   分治算法: 每个非终结符构造一个**first set** 和一个 **follow set**, 最后为每个规则构造一个 **final set**
*   分析表驱动(由 first sets/follow sets/final sets 推导分析表)

```cpp
bool ll1_parsing(tokens[]) {
	i = 0;
	stack = [S];

	while (stack != []) {
		if (stack[top] is a terminal t) {
			t == tokens[i] ? pop(i++) : throw new SyntaxError();
		} else if (stack[top] is a nonterminal T) {
			pop();
			// push(T correct expansion);
			// 自右向左压栈, e.g pop(S), push(N_right), push(V), push(N_left)
			push(final_table[T][tokens[i]] 对应项(规则编号)所对应规则的右边式子);
		} else {
			throw new SyntaxError();
		}
	}

	return i >= tokens.length && is_empty(stack) ? true : false;
}
```

##### nullable sets

*   存在规则: X -> epsilon
*   或者    : X -> Y1Y2...Yn, 且存在规则 Y1->epsilon, ..., Yn->epsilon

```cpp
nullable = {};

while (nullable is still changing) {
	foreach (production p: X -> beta) {
		if ((beta == epsilon) || (beta == Y1...Yn && Y1 <- nullable && ... && Yn <- nullable)) {
			nullable += X;
		}
	}
}
```

##### first sets

first sets 不动点算法:

```cpp
foreach (nonterminal N) {
	first(N) = {};
}

while (some sets is changing) {
	foreach (production p: N->beta1...betan) {
		foreach (betai from beta1 upto betan) {
			if (betai == a) {
			// e.g N->abX: first(N) += {a}
				first(N) += {a};
				break;
			} else if (betai == M) {
				first(N) += first(M);
				if (M is not in nullable) {
					break;
				} // else continue this loop to add first(beta_next) into first(N)
			}
		}
	}
}
```

|Nonterminal|First Set|
|:-----:|:----------:|
|S|{s, t, g, w}|
|N|{s, t, g, w}|
|V|{e, d}|

##### follow sets

follow sets 不动点算法:

```cpp
foreach (nonterminal N) {
	follow(N) = {};
}

while (some sets is changing) {
	foreach (production p: N->beta1...betan) {
		temp = follow(N);
		foreach (betai from betan downto beta1) {
			if (betai == a) {
				temp = {a};
			} else if (betai == M) {
				follow(M) += temp
				temp = (M is not nullable) ? (first(M)) : (temp + first(M))
			}
		}
	}
}
```

##### final sets

*   当 N -> Y1...Yn 右边 Y 全为 nullable 时, final(p) += follow(N)

final sets 不动点算法:

```cpp
foreach (production p) {
	final(p) = {}
}

calculate_final_set(production p: N->beta1...betan) {
	foreach (betai from beta1 upto betan) {
		if (betai == a) {
			final(p) += {a};
			break;
		} else if (betai == M) {
			final(p) += first(M);
			if (M is not in nullable) {
				break;
			}
		}
	}

	// all betas are in nullable (当前规则的所有右边符号都是可空集)
	//　故, final(p) 必须包括 follow(M) (当推导出右边符号都为空时, first(p) 即为 follow(M))
	if (i > n) {
		first(N) += follow(N);
	}
}
```

##### 分析表

*   结合 nullable sets 准确求出 first sets
*   再利用 first sets 准确求出 follow sets
*   再利用 first sets, 并结合 follow sets(全空集修正) 准确求出 分析表:

```grammar
0: z -> d
1:	|	X Y Z
2: Y -> c
3:	|
4: X -> Y
5:	|	a
```
nullable = {X, Y}

||X|Y|Z|
|:-----:|:-----:|:-----:|:-----:|
|first|{a, c}|{c}|{a, c, d}|
|follow|{a, c, d}|{a, c, d}|{}|

|production|0|1|2|3|4|5|
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|final|{d}|{a, c, d}|{c}|{a, c, d}|{a, c, d}|{a}|

|Non\Terminal|a|c|d|
|Z|1|1|0, 1|
|Y|3|2, 3|3|
|X|4, 5|4|4|

> 数字为规则编号

##### 解决冲突(分析表某项有多个编号)

通过文法重写消除左递归, 使文法适应 L(最左推导):

*   改写成右递归文法
*   提取左公因式

### 自底向上分析

```grammar
0: S -> E
1: E -> E + T
2:	|	T
3: T -> T * F
4:	|	F
5: F -> n
```

```instance
2 + 3 * 4
=> F + 3 * 4
=> T + 3 * 4
=> E + 3 * 4
=> E + T * 4
=> E + T * F
=> E + T
=> E
=> S
```

>   最右推导(优先推导最右侧非终结符)逆过程

#### LR(0) 分析算法(移进-归约(reduce)算法)

*   从左向右读入程序, 逆向最右推导, 不用前看符号
*   添加伪开始符号: S' -> S$ `$表示 tokens/file 结束符`
*   移进        : 读入记号 `push(token[i])`
*   归约(reduce):         `pop(right expansion)` `push(left expansion)`

##### 分析表构造

LR(0) 分析表构造算法: (原理同于 Hopcroft 算法)

```cpp
closure(production_set p) {
	while (p is still changing) {
		foreach (p's item i: A -> b . B ...) {
			p += {B -> . y...}
		}
	}
}

goto(production_set p, token x) {
	temp = {}

	foreach (p's item i: A -> b . x...) {
		temp += {A -> bx . ...}
	}

	return closure(temp)
}
```

```cpp
p0 = closure(S'' -> . S $)
(production_with_dot_)set = {p0}
Q = enqueue(p0)

while (Q is not empty) {
	p = dequeue(Q)

	foreach (x <- Nonterminal||Terminal) {
		q = goto(p, x)

		if (x <- Terminal) {
			ACTION[p, x] = q
		} else {
			GOTO[p, x] = q
		}

		if (q not <- set) {
			set += {q}
			enqueue(q)
		}
	}
}
```

##### 驱动代码

LR(0) 驱动算法:

```cpp
stack[];
push($)
push(state1)

while (true) {
	token t = nextToken()
	state s = stack[top]

	if (ACTION[s, t] == statei) {
		push(t)
		push(statei)
	} else if (ACTION[s, t] == reducej) {
		// X is the left side of production j: X->beta
		// beta is the right side of production j: X->beta

		// pop up right side
		pop(beta && bundle state variables)

		// current state after pop up all bundle state(of beta)
		state s = stack[top]

		// push left side
		push(X)

		// transfer state after reduce
		push(GOTO[s, X])
	} else {
		throw new SyntaxError();
	}
}
```

##### 解决冲突

采取与 first/follow/final sets 以及 前看符号 类似策略:

*   `production_with_dot_set` 中的 item 修改为 `X -> [beta1 . betan..., a]` 二元组
*   closure(production_set p) 中闭包规则从 `X -> [a . Y beta,a]` 修改为 `Y -> [.y, b]` b <- final(beta a)

## Compilers Exercise

### C Declaration Interpreter

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

#define MAXTOKENS 100
#define MAXTOKENLEN 64

enum type_tag {
    IDENTIFIER,
    QUALIFIER,
    TYPE,
};

struct token {
    char type;
    char string[MAXTOKENLEN];
};

int top = -1;
struct token stack[MAXTOKENS];
struct token ts;

#define pop stack[top--]
#define push(s) stack[++top] = s

enum type_tag classify_string(void) {
    char *s = ts.string;

    if (!strcmp(s, "const")) {
        strcpy(s, "read-only ");
        return QUALIFIER;
    }

    if (!strcmp(s, "volatile")) return QUALIFIER;
    if (!strcmp(s, "void")) return TYPE;
    if (!strcmp(s, "char")) return TYPE;
    if (!strcmp(s, "signed")) return TYPE;
    if (!strcmp(s, "unsigned")) return TYPE;
    if (!strcmp(s, "short")) return TYPE;
    if (!strcmp(s, "int")) return TYPE;
    if (!strcmp(s, "long")) return TYPE;
    if (!strcmp(s, "float")) return TYPE;
    if (!strcmp(s, "double")) return TYPE;
    if (!strcmp(s, "struct")) return TYPE;
    if (!strcmp(s, "union")) return TYPE;
    if (!strcmp(s, "enum")) return TYPE;

    return IDENTIFIER;
}

void gettoken(void) {
    char *p = ts.string;

    /* 略过空白字符 */
    while ((*p = getchar()) == ' ');

    if (isalnum(*p)) {
        /* 读入得标识符以ａ－Ｚ，０－９开头 */
        while (isalnum(*++p = getchar()));
        ungetc(*p, stdin);
        *p = '\0';
        ts.type = classify_string();
        return;
    }

    if (*p == '*') {
        strcpy(ts.string, "pointer to");
        ts.type = '*';
        return;
    }

    ts.string[1] = '\0';
    ts.type = *p;
    return;
}

void read_to_first_identifer(void) {
    gettoken();

	// read til identifier
    while (ts.type != IDENTIFIER) {
        push(ts);
        gettoken();
    }

    printf("%s is ", ts.string);
    gettoken();
}

void deal_with_arrays(void) {
    while (ts.type == '[') {
        printf("array ");
        gettoken();

		/* 数字或']' */
        if (isdigit(ts.string[0])) {
            printf("0..%d ", atoi(ts.string) - 1);
            gettoken();
        }

        gettoken();
        printf("of ");
    }
}

void deal_with_pointers(void) {
    while (stack[top].type == '*')
    {
        printf("%s ", pop.string);
    }
}

void deal_with_function_args(void) {
    while (ts.type != ')') {
        gettoken();
    }

    gettoken();
    printf("function returning ");
}

void deal_with_declarator(void) {
    /* 处理标识符之后可能存在的数组/函数 */

    switch (ts.type) {
    	case '[':
        	deal_with_arrays();
        	break;
    	case '(':
        	deal_with_function_args();
        	break;
    }

    deal_with_pointers();

    /* 处理在读入到标识符之前压入到堆栈中的符号 */
    while (top >= 0) {
        if (stack[top].type == '(') {
            pop;
            gettoken();  //读取')'之后的符号
            deal_with_declarator();
        } else {
            printf("%s", pop.string);
        }
    }
}

int main(void) {
    /* 将标记压入堆栈中, 直到遇见标识符 */
    read_to_first_identifer();
    deal_with_declarator();
    printf("\n");

    system("pause");
    return 0;
}
```

### Cool(Classrom Object-Oriented Language)
