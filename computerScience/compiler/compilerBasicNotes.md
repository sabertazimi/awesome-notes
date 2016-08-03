
- [Compiler Basic Notes](#compiler-basic-notes)
	- [Basic Concepts](#basic-concepts)
		- [Defination of compilers](#defination-of-compilers)
		- [Structure of compilers](#structure-of-compilers)
	- [Lexical Analysis](#lexical-analysis)
		- [Tokenizer - 词法分析器](#tokenizer-词法分析器)
			- [Finite State Machine - 转移图算法](#finite-state-machine-转移图算法)
			- [关键字(keyword)](#关键字keyword)
- [define KEYWORD_MAXLEN 10](#define-keywordmaxlen-10)
- [define KEYWORD_HASH_SEED 131](#define-keywordhashseed-131)
			- [正则表达式(Regular Expression)](#正则表达式regular-expression)
	- [Projects Exercise](#projects-exercise)
		- [Cool(Classrom Object-Oriented Language)](#coolclassrom-object-oriented-language)

# Compiler Basic Notes

## Basic Concepts

### Defination of compilers

-   `program_code` ---compiler---> executable
-   data ---executable---> output

> e.g Fortran(formula translation) 1 project

### Structure of compilers

front-end to back-end:

-   front-end: src ---lexical analysis---> tokens ---parsing/syntax analysis---> AST(Abstract Syntax Tree)
-   back-end: AST ---...---> ... ---...---> ... ---code generation---> dist

-   lexical analysis(词法分析)
-   parsing/syntax analysis(语法分析)
-   semantic analysis(语义分析): type and scope
-   optimization
-   code generation: translate to other high level language/assembly code/machine code

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

-   根据 完美哈希算法(无冲突哈希函数) , 建立所有关键字对应的关键字完美哈希表
-   读入有效标识符(字符串型)后, 查询关键字哈希表, 检查当前标识符是否为关键字

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

-   空串 "\0" 是正则表达式
-   任意 char <- C 是正则表达式
-   若 M, N 是正则表达式, 则 M|N = {M, N}, MN = {mn|m <- M, n <- N}, M* = {"\0", M, MM, MMM, ...} (选择/连接/闭包)也是正则表达式

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

-   `[a-z]` : a|...|z
-   c?      : 0/1 个c
-   c+      : 1/n 个 c
-   c{i, j} : i-j 个 c
-   "a*"    : a* 自身(非 kleen 闭包)
-   .       : 除 ‘\n’ 外的任意字符

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

M = (AlphaSets, StateSets, currentState, FiniteStateSets, transferFunction)

> A = {a, b}, SS = {0, 1, 2}, cS = 0, FS = {2},
	transferFunction = {
		(cS0, a) -> cS1, (cS0, b) -> cS0,
		(cS1, a) -> cS2, (cS1, b) -> cS1,
		(cS2, a) -> cS2, (cS2, b) -> cS2,
	}

##### 状态转移表实现 DFA

|状态\字符|a|b|
|:----------:|:-----:|:-----:|
|0|1|0|
|1|2|1|
|2|2|2|

#### 非确定有限状态自动机(Nondeterministic Finite Automaton)

transferFunction 中的次态不确定/不唯一(为一个开集合)

> (cS0, a) -> {cS1, cS2}

## Projects Exercise

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
