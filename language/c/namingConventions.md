# Naming Conventions

<!-- TOC -->

- [Naming Conventions](#naming-conventions)
  - [常用缩写词](#常用缩写词)
  - [Header File](#header-file)

<!-- /TOC -->

## 常用缩写词

| 原词           | 缩写        |
| :------------- | :---------- |
| addition       | add         |
| answer         | ans         |
| array          | arr         |
| average        | avg         |
| buffer         | buf 或 buff |
| capture        | cap 或 capt |
| check          | chk         |
| count          | cnt         |
| column         | col         |
| control        | ctrl        |
| decode         | dec         |
| define         | def         |
| delete         | del         |
| destination    | dst 或 dest |
| display        | disp        |
| division       | div         |
| encode         | enc         |
| environment    | env         |
| error          | err         |
| float          | flt         |
| frequency      | freq        |
| header         | hdr         |
| index          | idx         |
| image          | img         |
| increment      | inc         |
| initalize      | init        |
| iteration      | itr         |
| length         | len         |
| memory         | mem         |
| middle         | mid         |
| make           | mk          |
| message        | msg         |
| multiplication | mul         |
| number         | num         |
| operand        | opnd        |
| optimization   | opt         |
| operator       | optr        |
| packet         | pkt         |
| positon        | pos         |
| previous       | pre 或 prev |
| payload        | type        |
| pointer        | ptr/pt      |
| return         | code        |
| record         | rcd/rc      |
| receive        | recv        |
| result         | res         |
| return         | ret         |
| source         | src         |
| stack          | stk         |
| string         | str         |
| subtraction    | sub         |
| table          | tab         |
| temporary      | tmp 或 temp |
| total          | tot         |
| time           | stamp       |
| value          | val         |

## Header File

防止其他文件重复#include 本文件

```c
#ifndef MONGOOSE_HEADER_INCLUDED
#define    MONGOOSE_HEADER_INCLUDED

/*.................................
 * do something here
 *.................................
 */

#endif /* MONGOOSE_HEADER_INCLUDED */
```
