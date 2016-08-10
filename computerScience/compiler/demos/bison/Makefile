#
# Makefile
# sabertazimi, 2016-08-10 23:12
#

PROG=calculate
RM=rm -fr

.PHONY = bison clean purge rebuild run

$(PROG) : $(PROG).tab.c
	gcc -Wall -std=c99 $(PROG).tab.c -o $(PROG)

bison:
	bison $(PROG).y

clean:
	$(RM) $(PROG).tab.c

purge:
	$(RM) $(PROG).tab.c $(PROG)

rebuild:
	make purge && make bison && make

run:
	./$(PROG)


# vim:ft=make
#
