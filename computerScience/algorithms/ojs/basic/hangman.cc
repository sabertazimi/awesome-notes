/*
 * hangman.cc
 * Copyright (C) 2016 sabertazimi <sabertazimi@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

#include <cstdio>
#include <cstring>

#define maxn 100

using namespace std;

int left,       ///< number of left words
    chance;     ///< number of left changes
char s[maxn],   ///< answer string
     s2[maxn];  ///< string provided by player
int win, lose;  ///< flags

void guess(char ch) {
    int bad = 1;

    for (int i = 0; i < strlen(s); i++) {
        if (s[i] == ch) {
            left--;
            s[i] = ' ';
            bad = 0;
        }
    }

    if (bad) --chance;
    if (!chance) lose = 1;
    if (!left) win = 1;
}

int main(void) {
    int rnd;    ///< round

    while (scanf("%d%s%s", &rnd, s, s2) == 3 && rnd != -1) {
        printf("Round %d\n", rnd);
        win = lose = 0;
        left = strlen(s);
        chance = 7;

        for (int i = 0; i < strlen(s2); i++) {
            guess(s2[i]);
            if (win || lose) break;
        }

        if (win) {
            printf("You win.\n");
        } else if (lose) {
            printf("You lose.\n");
        } else {
            printf("You chickened out.\n");
        }
    }

    return 0;
}

