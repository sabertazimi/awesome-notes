/*
 * dole_queue.cc
 * Copyright (C) 2016 sabertazimi <sabertazimi@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

#include <cstdio>

#define maxn 25

using namespace std;

int n,          ///< number of person
    k,          ///< counting step of official A
    m,          ///< counting step of official B
    a[maxn];    ///< person array: 0 represents going off

/*
 * 逆时针从 p 开始走 t 步, 步长为 d(-1 表示顺时针走)
 */
int go(int p, int d, int t) {
    while (t--) {
        do {
            p  = (p+d+n-1) % n + 1;
        } while (a[p] == 0);
    }

    return p;
}

int main(void) {
    while (scanf("%d%d%d", &n, &k, &m) == 3 && n) {
        int left = n;

        // p1: official A, p2: official B
        int p1 = n, p2 = 1;

        for (int i = 0; i <= n; i++) {
            a[i] = i;
        }

        while (left) {
            p1 = go(p1, 1, k);
            p2 = go(p2, -1, m);

            printf("%3d", p1);
            left--;
            if (p2 != p1) {
                printf("%3d", p2);
                left--;
            }

            a[p1] = a[p2] = 0;

            if(left) {
                printf(",");
            }
        }
        printf("\n");
    }

    return 0;
}


