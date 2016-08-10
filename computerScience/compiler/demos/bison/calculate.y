%{
    #include <stdio.h>
    #include <stdlib.h>

    int yylex(void);
    void yyerror(char *s);
%}

%left '+'

%%

lines: line
     | line lines
     ;

line: exp '\n';


exp: n
   | exp '+' exp
   ;

n: '1'
 | '2'
 | '3'
 | '4'
 | '5'
 | '6'
 | '7'
 | '8'
 | '9'
 | '0'
 ;

%%

int yylex(void) {
    return getchar();
}

void yyerror(char *s) {
    fprintf(stderr, "%s\n", s);
    return;
}


int main(int argc, char **argv) {
    yyparse();
    return 0;
}
