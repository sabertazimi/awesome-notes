#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <ctype.h>

#define TOKEN_ARRLEN 100

using namespace std;

enum {
    IDENTIFIER,
    IF
};

typedef struct token {
    int type;
    char *string;
    int column;
    int line;
} Token;

static Token tokens[TOKEN_ARRLEN];
static uint32_t tokens_index = 0;

static int rollback(int pos);
static struct token get_token(char *buf);
static uint32_t parse_file(FILE *fp);

int main(int argc, char **argv) {
    if (argc < 2) {
        printf("<Usage> ./exec <file name>\n");
    }

    FILE *fp = fopen(argv[1], "r");

    if (!fp) {
        printf("Read error.\n");
        exit(0);
    }


    return 0;
}

static int rollback(int pos) {
    if (pos) {
        pos--;
    }

    return pos;
}

static struct token get_token(char *buf, int line) {
    int column = 0;
    int pos = 0;

    while (*buf != '\0') {

        // remove space
        while (isspace(*buf)) {
            buf++;
            column++;
        }


        switch (*buf) {
            case 'i':
                pos++;
                switch (*(buf+pos)) {
                    case 'f':
                        pos++;
                        if (!isdigit())
                }

            default:
                if (isalpha(*buf)) {

                }
        }
    }
}