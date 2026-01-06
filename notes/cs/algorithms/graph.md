---
sidebar_position: 6
tags: [CS, Algorithm, Graph]
---

# Graph

## Graph Representation

- 邻接链表法
- 邻接矩阵法

### Sparse Matrix

```cpp
unordered_map< int, unordered_map<int, int> > // => (row, (col, val))
```

## Breadth-First Search

### BFS Node Color

- white: 未被发现/访问
- gray: 已被发现(进入队列), 邻接结点未全部发现
- black: 已被发现, 邻接结点全部发现

### BFS Node Parent

广度优先树父结点

### BFS Node Distance

距离 = v.pi.d + 1

### Using Queue

Mark array/queue:

- Shortest Paths
- Diameter(直径) of Tree(Two pass for BFS)

## Depth-First Search

Using recursion/stack.

### DFS Node Color

- white: 未被发现/访问
- gray: 已被发现, 未二次访问
- black: 已被发现, 二次访问(比其深的所有结点皆被发现)

当第一个访问 edge(u,v) 时:

- v.color == white: 树边
- v.color == gray : 后向边(v 为 深度优先*森林*的祖父结点)
- v.color == black: 前向边/横向边(v 为较深的结点/子结点)
- 无向图深度优先遍历不会出现 前向边/横向边

### DFS Node Parent

比 v 浅的结点(比 v 更早被发现的结点)

### DFS Node Distance

- v.d = ++time: 被发现的时间戳(入栈)
- v.f = ++time: 被二次访问的时间戳(出栈)
- time`<`v.d, white; v.d`<`time`<`v.f, gray: time`>`v.f, black

### Using Mark Array / Mark Stack / Recursion

Mark array/ Mark stack/Recursion:

- Longest Paths

## Topological Sort

目标集合: 拓扑排序后集合, 先入顶点高序, 后入顶点低序

### Kahn Algorithm

不断将图中入度为 0 的点移入目标集合

### DFS (Depth-First)

当深度遍历至较深处, 并开始回溯时, 将此时访问的顶点加入目标集合(v.f 降序)

## Single-Source Shortest Paths

```cpp
void Relax(int u, int v, int w) {
    if v.d > u.d + w[u][v] {
        v.pi = u;
        v.d = v.pi.d + w[v.pi][v];
    }
}
```

### DAG Shortest Paths

先将图进行拓扑排序(深度优先遍历), 再按照拓扑排序顺序, 依次对每个结点(拓扑排序)的邻接边进行 relax

> a -> b -> c --> d, 且 a--b, a--c, b--d, c--d:
> relax(a, b), relax(a, c), relax(b, d), relax(c, d)

### Bellman-Ford Algorithm

对每条边进行 n 次(结点总数) relax

### Dijkstra Algorithm

贪心算法: 每次选取不属于 S 集合(white) 且 v.d 最小(gray)的结点, 对其所有邻接边进行 relax, 并将其加入 S 集合(black)

- white: 不属于 S 集合
- gray: 不属于 S 集合 且 v.d 最小
- black: 属于 S 集合

## All-Pairs Shortest Paths

动态规划: l^m(i, j) = min(l^m-1(i, j), min(1 `<=` k `<=` n)`{l^m-1(i, k)+w(k, j)}`)

> m: 中间结点个数

### Floyd-Warshall Algorithm

d^k(i, j) = w(i, j), k = 0
| min(d^k-1(i, j), d^k-1(i, k) + d^k-1(k, j)), k >= 1

pi^(i, j) = pi^k-1(i, j) or pi^k-1(k, j)

> k: 中间结点个数

```cpp
Matrix floyd_warshall(Matrix W) {
    int n = W.rows;
    Matrix D^0 = W;

    for (int k = 1;k < n+1; k++) {
        D^k = new Matrix(n);

        for (int i = 1; i < n+1; i++) {
            for (int j = 1; j < n+1; J++) {
                d^k[i][j] = min(d^k-1[i][j], d^k-1[i][k]+d^k-1[k][j]);
            }
        }
    }

    return D^n;
}
```

## Maximum Flow Problem

MaxFlow Problem:

![Ford Fulkerson Algorithm](./figures/graph/ford-fulkerson-algorithm.png 'Ford Fulkerson Algorithm')

### Max Flow Model

最大流模型必须满足以下条件:

- 无双向边
- 唯一的源点 s 和 唯一的汇点 t

对于不符合该模型的问题可进行简单转化:

- 双向边: 添加额外结点, 切割双向边的其中一条, 使得双向边变成 3 条单向边

> a --> b, b --> a: a --> c, c --> b, b --> a

- 多源点/汇点: 添加一个总源点/汇点

### Residual Network

- 若原图 u --> v 总容量 > 0, 则残存网络中 边 u --> v:剩余容量, 边 v --> u: 已用容量
- 增广路径: 残存网络中一条可行通路

### Max Flow Min Cut Theorem

MaxFlow-MinCut Theorem:

- 切割的净流量: 流出-流入
- 切割的容量: 流出总容量(无需减流入总容量)
- 最小切割: 容量最小的切割

最大流最小割定理: 以下三个命题等价

- f 是 G 的一个最大流
- 残存网络 Gf 不含增广路径
- |f| = c(S, T)(切割的容量): |f| `<=` c(S, T)(流网络中任意流 f `<=` 任意切割容量 c(S, T))

### Ford-Fulkerson Algorithm

不断寻找增广路径

## Minimal Spanning Tree

### Kruskal Algorithm

- Kruskal (tFind/tUnion)

## Connected Component

### Strongly Connected Component

- Tarjan Algorithm(v.index(DFS 时此点被访问的顺序) == v.lowLink(从 v 出发经有向边可达到的所有结点中最小的 index))

### Union Find Algorithm

Quickly figure out connection of map.
