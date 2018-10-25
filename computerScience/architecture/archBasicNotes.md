# Architecture Basic Notes

## Superpipeline or Superscalar

A supuerpipelined processor own a 5-20 stage pipeline,
a superscalar issues 3-8 instructions in parallel (more functional units like integer/float units).

## VLIW (Very Long Instruction Word)

In cases where backward compatibility is not an issue,
it is possible for the instruction set itself to be designed to explicitly group instructions to be executed in parallel.
A VLIW processor's instruction flow is much like a superscalar,
except the decode/dispatch stage is much simpler and only occurs for each group of sub-instructions.
No VLIW designs have yet been commercially successful as mainstream CPUs.

## Reference

- [Modern Microprocessors – A 90-Minute Guide. Jason R. C. Patterson. Technical paper, Lighterra, May 2015](http://www.lighterra.com/papers/modernmicroprocessors)

