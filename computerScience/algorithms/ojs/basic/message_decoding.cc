/*
 * message_decoding.cc
 * Copyright (C) 2016 sabertazimi <sabertazimi@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

#include <cstdio>
#include <cstring>

#define DEBUG
#undef DEBUG

using namespace std;

int code[8][1<<8];  ///< code[len][value] e.g len = 0, value = 0 => 0, len = 3, value = 0 => 000

int readchar(void) {
    while (1) {
        int ch = getchar();
        if (ch != '\n' && ch != '\r') return ch;
    }
}

int readint(int len) {
    int v = 0;

    while (len--) {
        v = v * 2 + readchar() - '0';
    }

    return v;
}

int readcodes(void) {
    memset(code, 0, sizeof(code));

    // first alpha word of code
    code[1][0] = readchar();

    for (int len = 2; len <= 7; len++) {
        for (int i = 0; i < (1 << len) - 1; i++) {
            int ch = getchar();
            if (ch == EOF) return 0;
            if (ch == '\n' || ch == '\r') return 1;
            code[len][i] = ch;
        }
    }

    return 1;
}

void printcodes(void) {
    for (int len = 1; len <= 7; len++) {
        for (int i = 0; i < (1<<len)-1; i++) {
            if (code[len][i] == 0) return;
            printf("code[%d][%d]=%c\n", len, i, code[len][i]);
        }
    }
}

int main(void) {
    while (readcodes()) {
#ifdef DEBUG
            printcodes();
#endif
        while (1) {
            int len = readint(3);
            if (len == 0) break;
#ifdef DEBUG
            printf("len=%d\n", len);
#endif

            // decode
            while (1) {
                int v = readint(len);
#ifdef DEBUG
                printf("v=%d\n", v);
#endif
                if (v == (1 << len) - 1) break;     // all 1
                putchar(code[len][v]);
            }
        }
        putchar('\n');
    }

    return 0;
}



