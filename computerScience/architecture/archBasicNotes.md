# Architecture Basic Notes

<!-- TOC -->

- [Architecture Basic Notes](#architecture-basic-notes)
  - [Superpipeline or Superscalar](#superpipeline-or-superscalar)
    - [Instructions Dependencies and Latencies](#instructions-dependencies-and-latencies)
    - [Branch Prediction](#branch-prediction)
  - [VLIW (Very Long Instruction Word)](#vliw-very-long-instruction-word)
  - [Out of Order Execution (OoO or OoE)](#out-of-order-execution-ooo-or-ooe)
    - [The Brainiac vs Speed-demon Debate](#the-brainiac-vs-speed-demon-debate)
  - [Memory](#memory)
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

## Out of Order Execution (OoO or OoE)

If branches and long-latency instructions are going to cause bubbles in the pipeline(s),
then perhaps those empty cycles can be used to do other work.
To achieve this, the instructions in the program must be reordered (**instruction scheduling** and **register renaming**).
Compiler completes static instruction scheduling (rearranged instruction stream at compile time),
processor completes dynamic instruction scheduling (renaming registers and reorder instruction stream at runtime).
The processor must keep a mapping of the instructions in flight at any moment and the physical registers they use.
The extra logic of scheduler is particularly **power-hungry** because those transistors are **always** working.

### The Brainiac vs Speed-demon Debate

Brainiac designs are at the smart-machine end of the spectrum,
with lots of OOO hardware trying to squeeze every last drop of instruction-level parallelism out of the code,
even if it costs millions of logic transistors and years of design effort to do it.
In contrast, speed-demon designs are simpler and smaller,
relying on a smart compiler and willing to sacrifice a little bit of instruction-level parallelism
for the other benefits that simplicity brings.
Which would you rather have: 4 powerful brainiac cores, or 8 simpler in-order cores?
When it comes to the brainiac debate,
many vendors have gone down one path then changed their mind and switched to the other side.

## Memory

## Reference

- [Modern Microprocessors – A 90-Minute Guide. Jason R. C. Patterson. Technical paper, Lighterra, May 2015](http://www.lighterra.com/papers/modernmicroprocessors)
