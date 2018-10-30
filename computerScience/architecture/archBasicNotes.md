# Architecture Basic Notes

<!-- TOC -->

- [Architecture Basic Notes](#architecture-basic-notes)
  - [Superpipeline or Superscalar](#superpipeline-or-superscalar)
    - [Instructions Dependencies and Latencies](#instructions-dependencies-and-latencies)
    - [Branch Prediction](#branch-prediction)
  - [VLIW (Very Long Instruction Word)](#vliw-very-long-instruction-word)
  - [Out of Order Execution (OoO or OoE)](#out-of-order-execution-ooo-or-ooe)
    - [The Brainiac vs Speed-demon Debate](#the-brainiac-vs-speed-demon-debate)
    - [Power Wall and ILP Wall](#power-wall-and-ilp-wall)
    - [Decoupled x86 microarchitecture](#decoupled-x86-microarchitecture)
  - [SMT (Hardware Threads)](#smt-hardware-threads)
    - [More cores or Wider cores](#more-cores-or-wider-cores)
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

### Power Wall and ILP Wall

Power usage goes up even faster than clock speed does
(increasing clock speed by 20% with 50% more power usage, O(power) = `frequence * Voltage * Voltage`).
Leakage current also goes up as the voltage is increased,
leakage generally goes up as the temperature increases as well.
The power and heat problems become unmanageable,
because it's simply not possible to provide that much power and cooling to a silicon chip.
Thus, going purely for clock speed is not the best strategy.

normal programs just don't have a lot of fine-grained parallelism in them,
due to a combination of load latencies, cache misses, branches and dependencies between instructions.
This limit of available instruction-level parallelism is called the ILP wall.

### Decoupled x86 microarchitecture

Dynamically decode the x86 instructions into simple, RISC-like micro-instructions (μops, pronounced "micro-ops"),
which can then be executed by a fast, RISC-style register-renaming OOO superscalar core.
The pipeline depth of Core i*2/i*3 Sandy/Ivy Bridge was shown as 14/19 stages in the earlier section on superpipelining,
it is 14 stages when the processor is running from its L0 μop cache (which is the common case),
but 19 stages when running from the L1 instruction cache and having to decode x86 instructions and translate them into μops.

## SMT (Hardware Threads)

Even the most aggressively brainiac OOO superscalar processor
will still almost never exceed an average of about 2-3 instructions per cycle
when running most mainstream, real-world software,
due to a combination of load latencies, cache misses, branching and dependencies between instructions.

Simultaneous multi-threading (**SMT**) is a processor design technique which exploits thread-level parallelism
(other running programs, or other threads within the same program).
The instructions come from multiple threads running at the same time, all on the one processor core.
An SMT processor uses just one physical processor core to present two or more logical processors to the system.
Seperate units include the program counter, the architecturally-visible registers, the memory mappings held in the TLB,
shared units include the decoders and dispatch logic, the functional units, and the caches.

However, in practice, at least for desktops, laptops, tablets, phones and small servers,
it is rarely the case that several different programs are actively executing at the same time,
so it usually comes down to just the **one task** the machine is currently being used for.
Some applications, such as database systems, image and video processing, audio processing, 3D graphics rendering and scientific code,
do have obvious high-level (coarse-grained) parallelism available and easy to exploit,
but many of these applications which are easy to parallelize are primarily limited by **memory bandwidth**, not by the processor.

If one thread saturates just one functional unit which the other threads need,
it effectively stalls all of the other threads,
even if they only need relatively little use of that unit.
**Competition** between the threads for cache space may produce worse results
than letting just one thread have all the cache space available,
particularly for software where the critical working set is highly cache-size sensitive,
such as hardware simulators/emulators, virtual machines and high-quality video encoding.

Due to above 3 reasons, SMT performance can actually be worse than single-thread performance
(traditional context switching between threads) sometimes.

### More cores or Wider cores

Very wide superscalar designs scale very badly in terms of both chip area and clock speed:

- the complex multiple-issue dispatch logic scales up as (issue width)^2
- highly multi-ported register files and caches to service all those simultaneous accesses

## Memory

## Reference

- [Modern Microprocessors – A 90-Minute Guide. Jason R. C. Patterson. Technical paper, Lighterra, May 2015](http://www.lighterra.com/papers/modernmicroprocessors)
