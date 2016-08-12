%{
    #include <stdio.h>
    #include <stdlib.h>

    int yylex(void);
    void yyerror(char *s);
%}

%left '+' '-'
%left '*' '/'

%%

lines: line
     | line lines
     ;

line: exp '\n' {
        printf("value=%d\n",$1);
    }
    | exit '\n'
    ;


exp: n              { $$ = $1; }
   | exp '+' exp    { $$ = $1 + $3;}
   | exp '-' exp    { $$ = $1 - $3;}
   | exp '/' exp    { $$ = $1 / $3;}
   | exp '*' exp    { $$ = $1 * $3;}
   | '(' exp ')'    { $$ = $2;}
   ;

n: '1'  { $$ = 1; }
 | '2'  { $$ = 2; }
 | '3'  { $$ = 3; }
 | '4'  { $$ = 4; }
 | '5'  { $$ = 5; }
 | '6'  { $$ = 6; }
 | '7'  { $$ = 7; }
 | '8'  { $$ = 8; }
 | '9'  { $$ = 9; }
 | '0'  { $$ = 0; }
 ;

exit: 'e'     { exit(0); }
    | 'q'     { exit(0); }
    | 'e' xit { exit(0); }
    | 'q' uit { exit(0); }
    ;

xit: 'x' it;
uit: 'u' it;
it: 'i' t;
t: 't';

%%

int yylex(void) {
    return getchar();
}

void yyerror(char *s) {
    fprintf(stderr, "%s\n", s);
    yyparse();
    return;
}

int main(int argc, char **argv) {
    return yyparse();
}
