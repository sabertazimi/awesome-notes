# OJ Basic Notes

<!-- TOC -->

- [OJ Basic Notes](#oj-basic-notes)
  - [C++ Notes for OJ](#c-notes-for-oj)
    - [Format](#format)
      - [string and integer](#string-and-integer)
    - [Iterator](#iterator)
      - [slice](#slice)
    - [limits](#limits)
    - [Implementation Pattern(OOP Pattern)](#implementation-patternoop-pattern)
    - [algorithm](#algorithm)
      - [sort](#sort)
    - [map](#map)
    - [Algorithm](#algorithm)
  - [Search Problem](#search-problem)
    - [Search in Sorted Array](#search-in-sorted-array)
    - [Max/Min Problem](#maxmin-problem)
    - [Range Max/Min Query](#range-maxmin-query)
  - [Greedy Algorithm](#greedy-algorithm)
  - [Simulation](#simulation)
    - [Painting](#painting)
    - [Reverting](#reverting)
    - [Meet/Collision Problem](#meetcollision-problem)
  - [String](#string)
  - [Map Theory](#map-theory)
    - [Shortest Paths](#shortest-paths)
    - [Minial Spanning Tree](#minial-spanning-tree)
    - [BFS(mark array/queue)](#bfsmark-arrayqueue)
    - [DFS(mark array/stack/recursion)](#dfsmark-arraystackrecursion)
    - [Connected Component](#connected-component)
      - [Strongly Connected Component](#strongly-connected-component)
      - [tUnion + tFind](#tunion--tfind)
  - [Dynamic Programming](#dynamic-programming)
    - [典型题目](#典型题目)
    - [Digital Bits Dynamic Programming(数位 DP)](#digital-bits-dynamic-programming数位-dp)
      - [题目模式](#题目模式)
      - [解题模式](#解题模式)
  - [Math](#math)
    - [Matrix Fast Power](#matrix-fast-power)
    - [Mod Power](#mod-power)
  - [Tips](#tips)
    - [Array](#array)
    - [Map](#map)
    - [Set](#set)
    - [Two Pointer](#two-pointer)
    - [Float Pointer](#float-pointer)
    - [bit 表示法](#bit-表示法)

<!-- /TOC -->

## C++ Notes for OJ

### Format

#### string and integer

- stringstream
- to_string
- stoll
- atoi/atol/atof

### Iterator

#### slice

```cpp
vector<int> b(a.begin() + 1, a.end());
vector<int> c(a.rbegin(), a.rend());
```

### limits

```cpp
 #include<iostream>
 #include<string>
 #include <limits>

using namespace std;

int main(void) {
    cout << "type: \t\t" << "************size**************"<< endl;
    cout << "bool: \t\t" << "所占字节数：" << sizeof(bool);
    cout << "\t最大值：" << (numeric_limits<bool>::max)();
    cout << "\t\t最小值：" << (numeric_limits<bool>::min)() << endl;
    cout << "char: \t\t" << "所占字节数：" << sizeof(char);
    cout << "\t最大值：" << (numeric_limits<char>::max)();
    cout << "\t\t最小值：" << (numeric_limits<char>::min)() << endl;
    cout << "signed char: \t" << "所占字节数：" << sizeof(signed char);
    cout << "\t最大值：" << (numeric_limits<signed char>::max)();
    cout << "\t\t最小值：" << (numeric_limits<signed char>::min)() << endl;
    cout << "unsigned char: \t" << "所占字节数：" << sizeof(unsigned char);
    cout << "\t最大值：" << (numeric_limits<unsigned char>::max)();
    cout << "\t\t最小值：" << (numeric_limits<unsigned char>::min)() << endl;
    cout << "wchar_t: \t" << "所占字节数：" << sizeof(wchar_t);
    cout << "\t最大值：" << (numeric_limits<wchar_t>::max)();
    cout << "\t\t最小值：" << (numeric_limits<wchar_t>::min)() << endl;
    cout << "short: \t\t" << "所占字节数：" << sizeof(short);
    cout << "\t最大值：" << (numeric_limits<short>::max)();
    cout << "\t\t最小值：" << (numeric_limits<short>::min)() << endl;
    cout << "int: \t\t" << "所占字节数：" << sizeof(int);
    cout << "\t最大值：" << (numeric_limits<int>::max)();
    cout << "\t最小值：" << (numeric_limits<int>::min)() << endl;
    cout << "unsigned: \t" << "所占字节数：" << sizeof(unsigned);
    cout << "\t最大值：" << (numeric_limits<unsigned>::max)();
    cout << "\t最小值：" << (numeric_limits<unsigned>::min)() << endl;
    cout << "long: \t\t" << "所占字节数：" << sizeof(long);
    cout << "\t最大值：" << (numeric_limits<long>::max)();
    cout << "\t最小值：" << (numeric_limits<long>::min)() << endl;
    cout << "unsigned long: \t" << "所占字节数：" << sizeof(unsigned long);
    cout << "\t最大值：" << (numeric_limits<unsigned long>::max)();
    cout << "\t最小值：" << (numeric_limits<unsigned long>::min)() << endl;
    cout << "double: \t" << "所占字节数：" << sizeof(double);
    cout << "\t最大值：" << (numeric_limits<double>::max)();
    cout << "\t最小值：" << (numeric_limits<double>::min)() << endl;
    cout << "long double: \t" << "所占字节数：" << sizeof(long double);
    cout << "\t最大值：" << (numeric_limits<long double>::max)();
    cout << "\t最小值：" << (numeric_limits<long double>::min)() << endl;
    cout << "float: \t\t" << "所占字节数：" << sizeof(float);
    cout << "\t最大值：" << (numeric_limits<float>::max)();
    cout << "\t最小值：" << (numeric_limits<float>::min)() << endl;
    cout << "size_t: \t" << "所占字节数：" << sizeof(size_t);
    cout << "\t最大值：" << (numeric_limits<size_t>::max)();
    cout << "\t最小值：" << (numeric_limits<size_t>::min)() << endl;
    cout << "string: \t" << "所占字节数：" << sizeof(string) << endl;
    // << "\t最大值：" << (numeric_limits<string>::max)() << "\t最小值：" << (numeric_limits<string>::min)() << endl;
    cout << "type: \t\t" << "************size**************"<< endl;
    return 0;
}
```

### Implementation Pattern(OOP Pattern)

```cpp
#define FIN             freopen("input.txt","r",stdin)
#define FOUT            freopen("output.txt","w",stdout)
#define fst             first
#define snd             second

typedef long long LL;
typedef pair < int, int >PII;

const int INF = 0x3f3f3f3f;
const int MAXN = 500 + 5;
const int MAXP = 6 + 5;

int T, N, M, P, res;
char buf[MAXN];
int usr[MAXN], usr_cnt;

struct MST {
    struct Edge {
        int u, v, w;
        Edge() {}
        Edge(int u, int v, int w):u(u), v(v), w(w) {}
        bool operator <(const Edge & e) const {
            return w < e.w;
        }
    } edges[MAXN * MAXP];

    int par[MAXN], tot;

    void init() {
        memset(par, -1, sizeof(par));
        tot = 0;
    }

    int Find(int x) {
        return -1 == par[x] ? x : (par[x] = Find(par[x]));
    }

    void add_edge(int u, int v, int w) {
        edges[tot++] = Edge(u, v, w);
    }

    int Kruskal() {
        memset(par, -1, sizeof(par));
        int u, v, w, pu, pv, cnt = 0, ret = 0;
        sort(edges, edges + tot);
        for (int i = 0; i < tot; i++) {
            if (cnt == usr_cnt - 1)
                break;
            u = edges[i].u, v = edges[i].v, w = edges[i].w;
            pu = Find(u), pv = Find(v);
            if (pu == pv)
                continue;
            par[pv] = pu;
            ret += w;
            cnt++;
        }
        return ret;
    }
} mst;

struct Dijkstra {
    struct Edge {
        int v, w, next;
        Edge() {}
        Edge(int v, int w, int next):v(v), w(w), next(next) {}
    } edges[MAXN * MAXP * 2];

    struct QNode {
        int u, w;
        QNode() {}
        QNode(int u, int w):u(u), w(w) {}
        bool operator >(const QNode & e) const {
            return w > e.w;
        }
    } cur;

    int head[MAXN], tot;
    int dist[MAXN];
    bool vis[MAXN];
    priority_queue < QNode, vector < QNode >, greater < QNode > >Q;

    void init() {
        tot = 0;
        memset(head, -1, sizeof(head));
        memset(dist, 0x3f, sizeof(dist));
        memset(vis, false, sizeof(vis));
    }

    void add_edge(int u, int v, int w) {
        edges[tot] = Edge(v, w, head[u]);
        head[u] = tot++;
    }

    int dijkstra(int src, int dst) {
        int u, v, w;
        Q.push(QNode(src, dist[src] = 0));
        while (!Q.empty()) {
            cur = Q.top();
            Q.pop();
            u = cur.u;
            if (vis[u])
                continue;
            vis[u] = true;
            for (int i = head[u]; ~i; i = edges[i].next) {
                v = edges[i].v, w = edges[i].w;
                if (!vis[v] && dist[v] > dist[u] + w) {
                    dist[v] = dist[u] + w;
                    Q.push(QNode(v, dist[v]));
                }
            }
        }
        return dist[dst];
    }
} dij;

int solve() {
    int u, v, w;

    if (usr_cnt == N) {
        mst.init();

        for (int i = 1; i <= M; i++) {
            scanf("%d %d %d", &u, &v, &w);
            mst.add_edge(u, v, w);
        }

        return mst.Kruskal();
    } else if (usr_cnt == 2) {
        dij.init();

        for (int i = 1; i <= M; i++) {
            scanf("%d %d %d", &u, &v, &w);
            dij.add_edge(u, v, w);
            dij.add_edge(v, u, w);
        }

        return dij.dijkstra(usr[0], usr[1]);
    }
}

int main()
{

 #ifndef ONLINE_JUDGE
    FIN;
 #endif // ONLINE_JUDGE

    scanf("%d", &T);

    while (T--) {
        usr_cnt = 0;
        scanf("%d %d %d", &N, &M, &P);
        scanf("%s", buf + 1);

        for (int i = 1; i <= N; i++) {
            if (buf[i] == '1')
                usr[usr_cnt++] = i;
        }

        res = solve();
        printf("%d\n", res);
    }

    return 0;
}
```

### algorithm

#### sort

- in map: auto sort

```cpp
struct Node {
    bool operator<(const Node &o) {
        return *this < o;
    }
};

map<Node> mps;
```

- sort vector

```cpp
bool cmp(const elem &i, const elem &j) {
    return i < j;
}

sort(vec.start(), vec.end(), cmp);
```

### map

- insert/update: mp[key] = value;
- search: mp.count(key)/mp.find(key), 不会插入空元素
- unordered_map: hash map

### Algorithm

- sort
- reverse
- accumulate
- `prev_permutation`/`next_permutation`

## Search Problem

### Search in Sorted Array

- Binary Search
- Divide and Conquer

> leetcode 74/240

### Max/Min Problem

在某些问题中, 要求满足条件的 max/min, 且可以轻易地判定某个值是否满足该条件, 则可利用二分法进行值的枚举

```cpp
// poj 1064
int N, K;
double L[maxn];

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

### Range Max/Min Query

- Segment Tree (线段树)
- Binary Indexed Tree (树状数组)
- Bucket Method (Divide and Conquer)

```cpp
const int maxn = 1 << 17;

int n;
int dat[2 * maxn - 1];

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
  if (r <= a || b <= 1) {
    return (numeric_limits<int>::max)();
  }

  // [l, r) <= [a, b)
  if (a <= 1 && r <= b) {
    return dat[k];
  } else {
    int vl = query(a, b, k * 2 + 1, l, (l + r) / 2);
    int vr = query(a, b, k * 2 + 2, (l + r) / 2, r);
    return min(vl, vr);
  }
}
```

## Greedy Algorithm

- 字典排序比较问题
- Huffman Tree

## Simulation

### Painting

- 对于实际操作, 直接覆写至状态数组即可, 无需关心边界条件(效果会立即生效)

> e.g 交接处方块 , 2 次写 1, maps[i][j] = 1, 不用担心重复计数

### Reverting

- using 1 bit to simulate operation
- when need to output, calculate bits up
- combined with dp problem

### Meet/Collision Problem

将相遇/碰撞的两物体视作插肩而过即可

## String

```cpp
sstream::stringstream

sort()
transform(toupper/tolower)

string::size_type
string::npos(vector.end())

str.find() == string::npos/string::size_type
str.substr(int pos, int len)

getline(cin/sin, strbuf)
```

- string::size_type pre, post 指针: 进行逐行匹配

## Map Theory

### Shortest Paths

- Dijkstra
- Floyd

### Minial Spanning Tree

- Kruskal(tFind/tUnion)

### BFS(mark array/queue)

- Shortest Paths
- Diameter(直径) of Tree(Two pass for BFS)

### DFS(mark array/stack/recursion)

- Longest Paths

### Connected Component

#### Strongly Connected Component

- Tarjan Alogirthm(v.index(DFS 时此点被访问的顺序) == v.lowlink(从 v 出发经有向边可达到的所有结点中最小的 index))

#### tUnion + tFind

quickly figure out connection of map

## Dynamic Programming

- dp 数组可以滚动使用, 从而节省空间

> dp[m][n] => dp[2][n] (dp[i & 1][j])

### 典型题目

关键: 最优子结构 + 状态无后效性

- 所有背包问题
- 二分问题:最优二分搜索树/文件合并
- 非连续特征序列: 最长子序列/最长上升序列
- 多重部分和问题  e.g 数组中是否存在一对数的和为xx
- 计数问题/分组问题/分划问题

### Digital Bits Dynamic Programming(数位 DP)

#### 题目模式

- 给定区间 [a, b], 求满足特定要求的数, 要求一般与大小无关, 与数位的组成相关
- 规模巨大, 无法枚举

> 递增数: 1234, 2579; 双峰数: 19280, 26193; 含49: 49, 149, 1492; 整除13: 26, 39 ...

#### 解题模式

f(a, b) = f(b, 0) - f(a - 1, 0)

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

        ans += dfs(pos-1, new_state(pos, state) /*状态转移*/, lead && i==0, limit && i == a[pos])
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

## Math

### Matrix Fast Power

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

### Mod Power

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

## Tips

### Array

- 可以利用数组元素的正负性表示存在性（或其他特殊意义）

### Map

- 用于 Hash 化
- 用于将字符串转为数字
- 用于计数

### Set

- 用于去重与查重(duplicate)
- 用于集合运算题（交、并、差等）

### Two Pointer

可以在**有穷时间内**判断是否存在**循环**：一个快指针，一个慢指针，当两者相遇时，表示存在循环。

### Float Pointer

利用浮动指针解决相关问题:

- 字符串比较
- 连续区间问题(尺取法)

### bit 表示法

多用于状态枚举(1 bit 表示 1 个状态/开关), 表示状态集合

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
