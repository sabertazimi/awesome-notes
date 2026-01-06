---
sidebar_position: 2
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [CS, Algorithm, Math]
---

# Math

## Radix Problem

```ts
while (n) {
  const bit = n % radix
  n = Math.floor(n / radix)
}
```

## Matrix Fast Power Algorithm

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

## Mod Power Algorithm

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

## XOR Operator Usage

- Binary add via `^`.
- Remove duplicates via `^`.
- Find difference via `^`.
