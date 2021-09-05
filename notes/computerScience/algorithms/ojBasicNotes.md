---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [CS, Algorithm, OJ]
---

# OJ Basic Notes

[TOC]

## String Problem

```cpp
sstream::stringstream

sort()
transform(toUpper/toLower)

string::size_type
string::npos(vector.end())

str.find() == string::npos/string::size_type
str.substr(int pos, int len)

getline(cin/sin, strbuf)
```

- string::size_type pre, post 指针: 进行逐行匹配

### KMP Algorithm

在字符串 s 中寻找模式串 p,
不回溯 s 与 p 的字符指针 (暴力枚举法采取回溯指针法),
而是将 p 向右移动至**正确**的位置:

1. 求 `p[k]` 的前缀后缀最长公共元素长度:
   - `p = abab; maxLen[0] = 0, maxLen[1] = 0, maxLen[2] = 1, maxLen[3] = 2`.
   - `a` 没有公共前后缀, `ab` 没有公共前后缀, `aba` 有公共前后缀 `a`, `abab` 有公共前后缀 `ab`.
2. 根据 `maxLen[k]` 计算 `next[k]` (`next[0] = -1`):
   - `next[k]` 表示字符 `p[k]` 前的子串 `p[0, k-1]` 的前缀后缀最长公共元素长度.
   - `next` 数组相当于 `maxLen` 数组整体向右移动一位, 并且 `next[0] = -1`.
   - `next` 数组本质上记录着有限状态机的状态转移 (编译器的词法分析算法与语法分析算法也用到有限状态机).
3. 最后得到, 字符串 p 向右移动位数为 `k - next[k]`, k 为 `s[k] !== p[k]` 匹配失败时的下标.

```ts
const getNext = (p: string): number[] => {
  // next[0] = -1
  const next: number[] = [-1];

  // maxLen = next[0] = -1
  for (let i = 0, maxLen = -1; i < p.length - 1; ) {
    if (maxLen === -1 || p[i] === p[maxLen]) {
      // p[i] === p[maxLen] => next[i + 1] = next[i] + 1 = maxLen + 1.
      i++;
      maxLen++;
      next[i] = maxLen;
    } else {
      // Back to find shorter common prefix and suffix.
      maxLen = next[maxLen];
    }
  }

  return next;
};

console.log(getNext('abcdabc'));
// [-1, 0, 0, 0, 0, 1, 2]
```

```ts
// 改进版
const getNext = (p: string): number[] => {
  // next[0] = -1
  const next: number[] = [-1];

  // maxLen = next[0] = -1
  for (let i = 0, maxLen = -1; i < p.length - 1; ) {
    if (maxLen === -1 || p[i] === p[maxLen]) {
      i++;
      maxLen++;
      // 改进
      if (p[i] !== p[maxLen]) next[i] = maxLen;
      else next[i] = next[maxLen];
    } else {
      // Back to find shorter common prefix and suffix.
      maxLen = next[maxLen];
    }
  }

  return next;
};
```

```ts
const search = (s: string, p: string): number => {
  let i = 0;
  let j = 0;

  while (i < s.length && j < p.length) {
    if (j === -1 || s[i] === p[j]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }

  if (j === p.length) return i - j;
  else return -1;
};
```

### Rotate String Problem

```cpp
#include <string>
#include <algorithm>

string left_rotate(string str, int offset) {
  int size = str.length();
  int n = offset % size;
  reverse(str.begin(), str.begin() + n);
  reverse(str.begin() + n, str.end());
  reverse(str.begin(), str.end());
  return str;
}
```

### Repeated String Problem

- Combine with `Rotate String` to get solutions.
- Find two same character as boundary.
- `(s + s).slice(1, -1).includes(s)`.

### Palindrome String Problem

- Reverse: `reverse === original`.
- Recursion: `s[0] === s[length - 1] && isPalindrome(s.slice(1, length - 1))`
- Two pointers: `s[i] !== s[j]; i++, j--;`.
- Dynamic programming: `s[i] === s[j] && dp[i+1][j-1]`.

## Search Problem

### Sorted Array Search Problem

- Binary Search
- Divide and Conquer

> LeetCode 74/240

```ts
let lo = 0;
let hi = nums.length - 1;

while (lo <= hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (nums[mid] === target) return nums[mid];
  else if (nums[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
```

### Max Min Search Problem

```ts
Math.min(...nums);
Math.max(...nums);
```

在某些问题中, 要求满足条件的 max/min, 且可以轻易地判定某个值是否满足该条件, 则可利用二分法进行值的枚举

```cpp
// poj 1064
int N, K;
double L[max_n];

// judgement
bool C(double x) {
  int num = 0;

  for (int i = 0; i < N; i++) {
    num += (int)(L[i] / x);
  }

  return num >= K;
}

void solve(void) {
  double lb = 0, ub = numeric_limits<double>::max();

  for (int i = 0; i < 100; i++) {
    double mid = (lb + ub) / 2;
    if (C(mid)) lb = mid;
    else ub = mid;
  }

  printf("%.2f\n", floor(ub * 100) / 100);
}
```

### Range Max Min Query and Search Problem

- Segment Tree (线段树)
- Binary Indexed Tree (树状数组)
- Bucket Method (Divide and Conquer)

```cpp
const int maxN = 1 << 17;

int n;
int dat[2 * maxN - 1];

void init(int n_) {
  n = 1;

  // padding to 2^n
  while (n < n_) n *= 2;

  for (int i = 0; i < 2 * n - 1; i++) {
    dat[i] = (numeric_limits<int>::max)();
  }
}

void update(int k, int a) {
  k += n - 1;
  dat[k] = a;

  while (k > 0) {
    k = (k - 1) / 2;
    dat[k] = min(dat[k * 2 + 1], dat[k * 2 + 2]);
  }
}

int query(int a, int b, int k, int l, int r) {
  // failed
  if (r <= a || b <= l) {
    return (numeric_limits<int>::max)();
  }

  // [l, r) <= [a, b)
  if (a <= l && r <= b) {
    return dat[k];
  } else {
    int vl = query(a, b, k * 2 + 1, l, (l + r) / 2);
    int vr = query(a, b, k * 2 + 2, (l + r) / 2, r);
    return min(vl, vr);
  }
}
```

## Math Problem

### Radix Problem

```ts
while (n) {
  const bit = n % radix;
  n = Math.floor(n / radix);
}
```

### Matrix Fast Power Algorithm

```cpp
typedef vector<vector> mat;

mat mul(mat& A, mat& B) {
    mat C(A.size(), vec(B[0].size()));
    for(int i = 0; i < (int)A.size(); ++i)
        for(int j = 0; j < (int)B[0].size(); ++j)
                for(int k = 0; k < (int)B.size(); ++k)
                        C[i][j] ^= A[i][k] & B[k][j];
    return C;
}

mat pow(mat A, int p) {
    mat E(A.size(), vec(A.size()));
    for(int i = 0; i < (int)A.size(); ++i) E[i][i] = 1;
    while(p){
        if(p & 1) E = mul(E, A);
        A = mul(A, A);
        p >>= 1;
    }
    return E;
}
```

### Mod Power Algorithm

```cpp
typedef long long ll;

ll mod_pow(ll x, ll n, ll mod) {
    ll res = 1;

    while (n > 0) {
        if (n & 1) res = res * x % mod;

        x = x * x % mod;
        n >>= 1;
    }

    return res;
}
```

### XOR Operator Usage

- Binary add via `^`.
- Remove duplicates via `^`.
- Find difference via `^`.

## Simulation

### Zig Zag Simulation

### Matrix Traversal Simulation

### Painting Simulation

- 对于实际操作, 直接覆写至状态数组即可, 无需关心边界条件(效果会立即生效)

> e.g 交接处方块 , 2 次写 1, maps[i][j] = 1, 不用担心重复计数

### Reverting Simulation

- Using 1 bit to simulate operation.
- When need to output, calculate bits up.
- Combined with dynamic programming problem.

### Meet and Collision Problem

追及碰撞问题: 将相遇/碰撞的两物体视作插肩而过即可.

## Graph and Map Problem

### Shortest Paths Algorithm

- Dijkstra (BFS)
- Floyd (Greedy)

### Minimal Spanning Tree Algorithm

- Kruskal (tFind/tUnion)

### BFS Algorithm

Mark array/queue:

- Shortest Paths
- Diameter(直径) of Tree(Two pass for BFS)

### DFS Algorithm

Mark array/ Mark stack/Recursion:

- Longest Paths

### Connected Component Problem

#### Strongly Connected Component Problem

- Tarjan Algorithm(v.index(DFS 时此点被访问的顺序) == v.lowLink(从 v 出发经有向边可达到的所有结点中最小的 index))

#### Union Find Algorithm

Quickly figure out connection of map.

## Greedy Algorithm

- 字典排序比较问题
- Huffman Tree

## Dynamic Programming

- dp 数组可以滚动使用, 从而节省空间

> dp[m][n] => dp[2][n] (dp[i & 1][j])

### Basic Dynamic Programming Problem

关键: 最优子结构 + 状态无后效性

- 所有背包问题
- 二分问题:最优二分搜索树/文件合并
- 非连续特征序列: 最长子序列/最长上升序列
- 多重部分和问题 e.g 数组中是否存在一对数的和为 xx
- 计数问题/分组问题/分划问题

### Digital Bits Dynamic Programming Problem

数位 DP:

- 给定区间 [a, b], 求满足特定要求的数, 要求一般与大小无关, 与数位的组成相关
- 规模巨大, 无法枚举

> 递增数: 1234, 2579; 双峰数: 19280, 26193; 含 49: 49, 149, 1492; 整除 13: 26, 39 ...

`f(a, b) = f(b, 0) - f(a - 1, 0)`.

暴力 + 存储 = 记忆化搜索:

- 暴力枚举每一位的 (0, ...,9)
- 利用 dp[pos][state] 与 dfs(pos, state, k, flag) 进行存储

```cpp
/// \brief 数字处理函数
/// \param num 原始数据
/// \param digit 保存每个数位的值
/// \param state 初始状态
int f(int num){
    int ans;
    int pos = 0;

    while(num){
        digit[++pos]=num%10;
        num=num/10;
    }

    return dfs( pos, state , true);
}

/// \brief dfs 函数, 从高位开始遍历
/// \param f     记忆化数组
/// \param pos   当前数位下标
/// \param state 之前数字的状态
/// \param flag  上限标志
int dfs(int pos, int state, bool flag) {
    if (pos == -1) {
        return state == target_state;
    }
    if (!exception && ~f[pos][state]) {
        return f[pos][state]
    }

    int ans = 0;

    // 对于每一个数位, 求出枚举界限
    // 一般从 0 枚举至 9, 当到达特殊位置时, 枚举上限可能改变
    int next = exception ? digit[i] : 9;

    for (int digit = 0; digit <= next; digit++) {
        ans += dfs(pos - 1, new_state(state, digit), exception && digit == next);
    }

    return flag ? ans : f[pos][state] = ans;
}
```

```cpp
typedef long long ll;

int a[20];

ll dp[20][state];   //不同题目状态不同

ll dfs(int pos, int state, bool lead, bool limit) {
    // 递归边界, 按位枚举最低位是0, pos == -1 表示枚举结束
    if (pos == -1) {
        // 若可以保证每一位都合法, 则 return 1; 否则 return 0
        return 1;
    }

    // 记忆化
    if (!limit && !lead && dp[pos][state] != -1) {
        return dp[pos][state];
    }

    // 根据 limit 判断枚举的上界 up
    int up = limit ? a[pos] : 9;

    // 开始计数
    ll ans=0;

    // 枚举: 把不同情况的个数加到ans
    for(int i = 0;i <= up; i++)
    {
        // 当前数位枚举的数是i，根据题目的约束条件分类讨论
        // 计算不同情况下的个数, 根据 state 变量来保证 i 的合法性
        // 一定要保证枚举数的合法性

        // 比如要求数位上不能有 62 连续出现, 那么state 就要保存前一位 pre
        // 前一位如果是 6 那么位不能是 2

        // 当不合法时, 直接 continue
        if() ...
        else if()...

        ans += dfs(pos-1, new_state(pos, state) /*状态转移*/,
          lead && i==0, limit && i == a[pos])
    }

    // 计算结束, 记录状态
    if (!limit && !lead) {
        dp[pos][state] = ans;
    }

    return ans;
}

ll solve(ll x) {
    int pos=0;

    // 数位分解
    while(x) {
        a[pos++] = x % 10;
        x /= 10;
    }

    // 从最高位开始枚举
    // 最高位前导为 0, 且受上限限制(无法枚举至 9)
    return dfs(pos-1, state /*一系列状态 */, true, true);
}

int main(void) {
    ll le,ri;

    while (~scanf("%lld %lld", &le, &ri)) {
        // 初始化dp数组为-1
        printf("%lld\n", solve(ri)-solve(le-1));
    }

    return 0;
}
```

## Data Structure

### Array

- 可以利用数组元素的正负性表示存在性（或其他特殊意义）

#### Array Two Pointers

- 可以在**有穷时间内**判断是否存在**循环**: 一个快指针, 一个慢指针, 当两者相遇时, 表示存在循环.
- Slide Window: `window = [lo, hi]`.

#### Array Float Pointer

利用浮动指针解决相关问题:

- 字符串比较
- 连续区间问题(尺取法)

### List

#### List Two Pointers

Slow and fast pointer:

- Judge cycle.
- Find middle node.

### Stack

#### Monotonic Stack

单调栈: 寻找下一个更小/更大 (Smaller/Greater) 元素.

```ts
const stack: number[] = [];
const greaterMap = new Map<number, number>();

for (const num of nums) {
  while (stack.length && stack[stack.length - 1] < num) {
    greaterMap.set(stack.pop() as number, num);
  }
  stack.push(num);
}
```

### Map

- 用于 Hash 化
- 用于将字符串转为数字
- 用于计数

### Set

- 用于去重与查重 (`Duplicate Problem`, e.g LeetCode 217/219/220).
- 用于集合运算题（交、并、差等）

### BitMap

Bit presentation: 多用于状态枚举(1 bit 表示 1 个状态/开关), 表示状态集合.

> 可用于动态规划中压缩状态

```c
0 // empty set
1 << i // just 1 bit on
(1 << n) - 1 // n bit on
if (S >> i & 1) // include nth(i) bit
S | 1 << i // insert nth(i) bit
S & ~(1 << i) // remove nth(1) bit
S | T // union
S & T // intersection

i & -i // last 1 bit
```
