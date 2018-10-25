# Architecture Basic Notes

<!-- TOC -->

- [Architecture Basic Notes](#architecture-basic-notes)
  - [Superpipeline or Superscalar](#superpipeline-or-superscalar)
    - [Instructions Dependencies and Latencies](#instructions-dependencies-and-latencies)
    - [Branch Prediction](#branch-prediction)
  - [VLIW (Very Long Instruction Word)](#vliw-very-long-instruction-word)
  - [Reference](#reference)

<!-- /TOC -->

## Superpipeline or Superscalar

A supuerpipelined processor own a 5-20 stage pipeline,
a superscalar issues 3-8 instructions in parallel (more functional units like integer/float units).

### Instructions Dependencies and Latencies

The number of cycles between when an instruction reaches the execute stage
and when its result is available for use by other instructions is called the instruction's latency.
The deeper the pipeline, the more stages and thus the longer the **latency**.
The processor will need to stall the execution of the instructions until their data is available (**dependencies**),
inserting a bubble into the pipeline where no work gets done, making multiple issue in this case impossible.

### Branch Prediction

Another key problem for pipelining is branches (flush out all instructions of wrong branch).
Unfortunately, even the best branch prediction techniques are sometimes wrong,
and with a deep pipeline many instructions might need to be cancelled.
This is called the mispredict penalty.
The deeper the pipeline, the further into the future you must try to predict, the more likely you'll be wrong, and the greater the mispredict penalty when you are.

Predication can be used to eliminate branches such as `cmovle`
(move data only when testing flag stays less or equal state).
The Alpha architecture had a conditional move instruction from the very beginning.
MIPS, SPARC, x86 added it later and the ARM architecture was the first architecture with a **fully predicated** instruction set
(though the early ARM processors only had short pipelines and small mispredict penalties).

## VLIW (Very Long Instruction Word)

In cases where backward compatibility is not an issue,
it is possible for the instruction set itself to be designed to explicitly group instructions to be executed in parallel.
A VLIW processor's instruction flow is much like a superscalar,
except the decode/dispatch stage is much simpler and only occurs for each group of sub-instructions.
No VLIW designs have yet been commercially successful as mainstream CPUs.

## Reference

- [Modern Microprocessors – A 90-Minute Guide. Jason R. C. Patterson. Technical paper, Lighterra, May 2015](http://www.lighterra.com/papers/modernmicroprocessors)
