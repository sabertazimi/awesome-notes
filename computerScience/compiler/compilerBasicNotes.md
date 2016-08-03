
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

#### Finite State Machine - 转移图算法

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
#### 关键字(keyword)

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

#### 正则表达式(Regular Expression)

对于给定的字符集 C:

-   空串 "\0" 是正则表达式
-   任意 char <- C 是正则表达式
-   若 M, N 是正则表达式, 则 M|N = {M, N}, MN = {mn|m <- M, n <- N}, M* = {"\0", M, MM, MMM, ...} (选择/连接/闭包)也是正则表达式

## Projects Exercise

### Cool(Classrom Object-Oriented Language)
