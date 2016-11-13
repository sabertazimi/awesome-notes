#
# Makefile
# sabertazimi, 2016-11-13 17:29
#

PROG=quicksort2_recursion

all:
	g++ -o $(PROG).out -g $(PROG).cc

.PHONY=run clean debug

run:
	./$(PROG).out

clean:
	rm -fr ./*.out
	rm -fr .gdb_history

debug:
	gdb $(PROG).out -q -ex "b $(PROG).cc:1" -ex "r"

# vim:ft=make
#
