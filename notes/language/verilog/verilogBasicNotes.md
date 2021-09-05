---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Language, Verilog]
---

# Verilog Basic Notes

[TOC]

## General Flow

### Create Project

- `.v` (sources)
- `.xdc` (constraints)

### RTL Analysis

Schematic

### Simulate Design

- `_tb.v`: test bench
- simulation options: 500ns
- Scopes -> dut -> swt/led
- Schematic

### Synthesize Design

Schematic

### Implement Design

Schematic

### Post-Implementation Timing Simulate Design

### Generate Bit Stream

### Testing and Verification

low-level (circuit) simulation is much slower than high-level (C, HDL) simulation:

- check only functionality at high level (C, HDL)
- check only timing, power at low level (circuit)

```verilog
module testBench();
  reg         clk, reset;           // clock and reset are internal
  reg         a, b, c, yExpected;   // values from testVectors
  wire        y;                    // output of circuit
  reg  [31:0] vectorNum, errors;    // bookkeeping variables
  reg  [3:0]  testVectors[10000:0]; // array of testVectors

  // instantiate device under test
  sillyFunction dut(.a(a), .b(b), .c(c), .y(y) );

  // generate clock
  always     // no sensitivity list, so it always executes
    begin
      clk = 1; #5; clk = 0; #5;     // 10ns period
    end

  // at start of test, load vectors and pulse reset
  initial   // Only executes once
  begin
    $readmemb("example.tv", testVectors); // Read vectors: e.g 000_0 001_1 ... xxx_x
    vectorNum = 0; errors = 0;            // Initialize
    reset = 1; #27; reset = 0;            // Apply reset wait
  end

  // Note: $readmemh reads testVector files written in
  // hexadecimal
  // apply test vectors on rising edge of clk
  always @(posedge clk)
  begin
    #1; {a, b, c, yExpected} = testVectors[vectorNum];
  end

  always @(negedge clk)
  begin
    if (~reset) // don’t test during reset
    begin
      if (y !== yExpected)
      begin
        $display("Error: inputs = %b", {a, b, c});
        $display("  outputs = %b (%b exp)",y,yExpected);
        errors = errors + 1;
      end

      // increment array index and read next testVector
      vectorNum = vectorNum + 1;

      if (testVectors[vectorNum] === 4'bx)
      begin
        $display("%d tests completed with %d errors", vectorNum, errors);
        $finish;                 // End simulation
      end
    end
  end
endmodule
```

## Timing in Circuits

### Combination Circuit Timing

- contamination delay (`t_cd`): minimum path in circuits, outputs start to change
- propagation delay (`t_pd`): maximum path in circuits, outputs complete change
- (delay) heavy dependence on **voltage** and **temperature**

### Sequential Circuit Timing

minimize clock skew time:
requires intelligent **clock network** across a chip,
making clock arrives at all locations at roughly the same time.

```verilog
T_clock >= T_pcq + T_pd + (T_setup + T_skew)
T_ccq + T_cd > (T_hold + T_skew)
```

## Key Words

```verilog
module
input, output, inout
wire, reg, parameter
always@(), assign
posedge, negedge
if-else, case, begin ... end
```

```verilog
port, signal
```

## Module

- Inout(Net) -> (Net)Module(Net) -> Inout(Net)
- Input(Net/Register) -> (Net)Module(Net/Register) -> Output(Net)

```verilog
module moduleName( In1, In2, Out1, Out2, InOut1);
    // 输入输出定义: 说明端口是输入还是输出
    input In1, In2;
    output Out1, Out2;
    inout InOut1;

    // 数据类型定义: 说明端口数据类型 - Net/Register
    wire In1, In2, Out1;
    wire InOut1;
    reg Out2;
    // Instantiation of lower level modules
    Design u_2(.(端口(信号1), .(端口2(信号2), .(端口3(信号3));

    // Functionality

    // 三种层次的描述: 逻辑层次(Gate Level), 数据流层次(Dataflow Level), 行为层次(Behavior Level)
    // and/or - gate level
    and and1( Out1, In1, In2);
    // assign - dataflow level
    assign #2 Out1 = In1 & In2;
    // always/initial - behavior level
    always @(*)
        begin
            Out2 = In1 & In2
        end

    // Timing specification

endmodule
```

### 外部端口

- 封装内部端口,装饰者模式
- 一个内部端口可与多个外部端口相连

```verilog
module scram_b (
    .data(arb),
    .control(ctrl),
    .mem_word(mem_blk),
    .addr(byte)
);

    input [0:3] arb;
    input ctrl;
    input [8:0] mem_blk;
    output [0:3] byte;

endmodule
```

## function

- 不含时间/事件控制
- 至少 1 个输入
- 至多 1 个输出
- 只含行为模块
- 只含阻塞赋值语句

```verilog
function  [7: 0]  aligned_word;    // function declaration
    input  [7: 0]  word;
    begin
      aligned_word = word;
      if (aligned_word != 0)
        while (aligned_word[7] == 0) aligned_word = aligned_word << 1;
    end
  endfunction
```

```verilog
module arithmetic_unit (result_1, result_2, operand_1, operand_2,);
  output   [4: 0] result_1;
  output  [3: 0] result_2;
  input   [3: 0] operand_1, operand_2;
  assign result_1 = sum_of_operands (operand_1, operand_2);
  assign result_2 = larger_operand (operand_1, operand_2);

  function [4: 0] sum_of_operands(input [3:0] operand_1, operand_2);
    sum_of_operands = operand_1 + operand_2;
  endfunction

  function [3: 0] larger_operand(input [3:0] operand_1, operand_2);
    larger_operand = (operand_1 >= operand_2) ? operand_1 : operand_2;
  endfunction
endmodule
```

### task

将测试流程分为多个任务:

- 初始化任务
- 模拟生成任务
- 自我检查任务

```verilog
module adder_task (c_out, sum, clk, reset, c_in, data_a, data_b);
  output reg [3: 0]  sum;
  output reg  c_out;
  input  [3: 0]  data_a, data_b;
  input   clk, reset, c_in;

  always @(posedge clk or posedge reset) begin
    if (reset) {c_out, sum} <= 0;
    else add_values (sum, c_out, data_a, data_b, c_in); // invoke task
  end
  task add_values; // task declaration
    output reg [3: 0]  SUM;
    output reg  C_OUT;
    input  [3: 0]  DATA_A, DATA_B;
    input   C_IN;
            {C_OUT, SUM} = DATA_A + (DATA_B + C_IN);
   endtask
endmodule
```

常用的 task 有: $display("fmt", ...), $monitor("fmt", ...), $time, $finish

## Data Structure

### 常量

- 0: 逻辑 0
- 1: 逻辑 1
- x/X: Unknown/Floating
- z/Z: 高阻抗状态(High Impedance)
- parameter: #define

```verilog
localparam idle = 2'b00;
parameter Bit = 8, cnt_up = 1'b1;

output [Bit - 1:0] A;
reg [Bit - 1:0] A;

A = A + cnt_up;
```

### 向量

```verilog
[MSB: LSB] 或 [LSB: MSB]
```

```verilog
output [3:0] A;    // 4 bit
reg [0:3] B, C;    // 4 bit
wire [63:0] D;    // 64 bit
wire E;               // 1 bit

A[2:1] = B[0] & C[1:2];    // A[2] = 0 & C[1], A[1] = B[0] & C[2]
B[0:1] = 0;
C = 4'b1011;                   // C[0] = 1, C[1] = 0, C[2] = 1, C[3] = 1
```

```verilog
integer [7:0] A [3:0];        // 4元素数组. 每个元素为16bit元
reg B [3:0] [15:0];            // arr[4][16]数组, 每个元素为1bit元
reg [7:0] C [3:0] [15:0];    // arr[4][16]数组, 每个元素为8bit元

A[3] = 0;                     // 置零A中第三个元素(8 bit)
A = 0;                        // 置零A
B[1][0] = 1;                  // B[1][0](1 bit)置1
C[0][0][3:0] = 4'b0010;      // C[0][0] 低4bit为0010
C[2][8][5] = 1;               // C[2][8] 第5bit为1
```

#### 部分位选

```verilog
vector[base_expr+: const_width];
vector[base_expr-: const_width];

inst_mode[mark+:2]; // => mark,mark+1
gpio_mode[mark-:4]; // => mark,mark-1,mark-2,mark-3
```

### 数字

```verilog
// size ' signed base value
<Bits长度>'[signed]<进制><数值>
```

- 位长不能用表达式表示,只可用固定的 parameter

```verilog
Num = 5'b01101;               // 二进制
Num = 22;                     // 十进制
Num = 12'b0000_1111_0000;    // 可读性
Num = 4'hf;                  // 十六进制(1111)
Num = 4'bxxx1;              // 前三位未知
Num = 4'bz01;               // 前两位为z, 后两位为01
```

#### 有符号数

- signed reg
- signed wire
- integer
- 'sxx

#### 无符号数

- reg
- wire
- 'xx

### Register

- reg/integer/time/real/realtime
- 有记忆性
- 默认值: x

#### integer

长度为 32 Bit, 补码表示, 常用于计数器

```verilog
always @(posedge CLK)
    begin
        integer i;
        for (i = 0;i <= 7; i = i + 1) tmp[i] = In;
    end
```

#### real

- real 默认值为 0,不可为 x/z
- 不可声明位宽

### Net

- wire/wand/wor
- 局部变量, 没有记忆性
- 默认值: z
- wire 间不可直接相连, wand/wor 间课直接相连
- 可用 wire 定义局部变量

## Gate Level

### Basic Gate

- and
- nand(与非)
- or
- nor(或非)
- xor(异或)
- xnor(同或)

### Use Gate

- 同一模块中, 实例名不能与线网名相同

```verilog
and (w1, In1, In2);        // w1 = Int and In2
or or1(w2, w1, In2);      // w2 = w1 or In2
xor xor(Out, w1, w2);    // Out = w1 xor w2
```

- 实例数组

```verilog
wire [3:0] irq, ctrl, sense;

/*
 * =>
 * nand
 *      u8nand3 (irq[3], ctrl[3], sense[3]);
 *      u8nand2 (irq[2], ctrl[2], sense[2]);
 *      u8nand1 (irq[1], ctrl[1], sense[1]);
 *      u8nand0 (irq[0], ctrl[0], sense[0]);
 */
nand u8nand [3:0] (irq, ctrl, sense);
```

```verilog
parameter NUM_BITS = 4;
wire [NUM_BITS - 1 : 0] gated_d, din;
wire bypass;

and #(1, 2) u0and [NUM_BITS - 1: 0] (gated_d, din, bypass);
```

### Self-Defined Gate(用户自定义原语)

- 可以有一个/多个输入
- 只能有一个输出
- 第一个端口必须是输出端口
- `-` 表示 值"无变化"

```verilog
primitive XOR2 (D_OUT, X1, X2);
    input X1, X2;
    output D_OUT;

    table // X1 X2 : D_OUT
        0 0 : 0;
        0 1 : 1;
        1 0 : 1;
        1 1 : 0;
    endtable
endprimitive
```

## Dataflow Level

- assign net = net/reg: **左式只能是 net**

### Operators

- [Operators List](https://hom-wang.gitbooks.io/verilog-hdl/content/Chapter_04.html)

```verilog
赋值: <=, =
>, <, <=, >=
!=. ==
[ ]. { }
<<, >>
+, -, *, /, %
```

### 整数提升

- 表达式所有中间取 最大位宽(最长(左/右)操作数)

#### { }

可实现 haskell 中的**模式匹配**

```verilog
// 连接运算符
A = { 1'b0, 1'b1};                // A = 2'b01
A = { B[1:0], C[0], D[2] };    // A = B[1], B[2], C[0], D[2]
A = { 2{2'b01} };                  // A = 4'b0101
A = { 3'b101, 2{1'b0} };        // A = 5'b101_00
```

## Behavior Level

- reg = net/reg: \*_左式只能是 reg_

### 时延控制

```verilog
#num

parameter cycle = 30;

# 2
# cycle/2
```

### 事件控制

```verilog
@(*);
@( sel, a, b);
@(sel or a or b);
@(posedge CLK);
@(negedge CLK);
```

### 语句内/间控制

```verilog
q = @(posedge clk_iol) d; // 语句内事件控制

@(posedge clk_iol)        // 语句间事件控制
    q = temp;
```

### always

```verilog
always @(事件1, 事件2, ...)
    begin
        ...;
    end
```

### if-else

- 必须添加 else

```verilog
if (condition1)
    begin
        ...;
    end
else if (condition2)
    begin
        ...;
    end
else
    begin
        ...;
    end
```

### Case Statement

- expr: 常量/变量/连接运算符{ }/x/z
- casex: 当输入某一位为 x/z 时，忽略此位匹配(恒将此位匹配为真)
- casez: 当输入某一位为 z 时，忽略此位匹配(恒将此位匹配为真)

```verilog
case (expr)
    item 1:
        begin
            ...;
        end
    item 2:
        begin
            ...;
        end
    item 3:
        begin
            ...;
        end
    default:
        ...;
endcase
```

### for

```verilog
for (循环初值; 循环条件; 控制部分)
    begin
        ...;
    end
```

### repeat loop

- initial for **test bench**
- 当需 if/else 进行断言时,注意 **延时** 造成的错误逻辑

```verilog
// 重复事件控制:
// 先计算好右值, 等待时钟 clk 上出现2个负跳变沿, 再把右值赋给 result
result = repeat (2) @(negedge clk) hw_data + hr_data;

// repeat 循环语句:
repeat (2)
    @(posedge clk) result = hw_data + hr_data;
```

```verilog
initial begin
    inc_DAC = 1’b1;

    repeat(4095) @(posedge clk); // bring DAC right up to point of rollover
    inc_DAC = 1’b0;
    inc_sym = 1’b1;

    repeat(7)@(posedge clk); // bring sample count up to 7
    inc_sym = 1’b0;
end

initial begin
    #100 $finish; // run simulation for 100 units
end
```

### forever loop

```verilog
// $stop, $finish 可以终止 forever loop
forever #10 clk = ~ clk;
```

### Force and Release

```verilog
initial
    begin
        force test_reset = penalty & rtc_intr;
        #5;
        release test_reset;
    end
```

### Blocking and Non-Blocking

- Blocking(=): 顺序执行
- Non-Blocking(<=): 并行执行

```verilog
output = input_logic;

output <= input_logic;
```

### disable

```verilog
begin : break
    for (i = 0; i < n; i = i+1) begin : continue
        @(posedge clk)
        if (a == 0) // "continue" loop
            disable continue;
        if (a == b) // "break" from loop
            disable break;
        statement1
        statement2
    end
end
```

## 结构建模

### generate 语句

```verilog
generate
    for (gv_i = 0; gv_i < SIZE; gv_i = gv_i + 1)
        begin: blk
            xor uxor (y[gv_i], a[gv_i], b[gv_i]);
        end
endgenerate
// =>
// module.blk[0].uxor
// module.blk[1].uxor
// module.blk[2].uxor
// ...
```

## Delay(时延)

- 语句内时延
- 语句间时延
- 语句内时延期间：右值保持稳定不变，才可成功赋给左值

```verilog
sum = (a ^ b) ^ cin;
#4 t1 = a & cin;
```

## 预编译指令

### define 宏

将多个 define 宏,放至 \_defines.v, 作为全局宏

## Data Path

### Multiplexer

### Adder

### Register Data Path

### Memory

- 其中数据文件中地址必须在系统任务中定义的范围内，系统任务中定义的地址必须在存储器定义的地址范围内
- 优先考虑数据文件中的地址>系统任务中定义的起始地址和结束地址>存储器定义的起始地址和结束地址

## Demos

- [GitBook](https://hom-wang.gitbooks.io/verilog-hdl/content/Chapter_07.html)
- [Xilinx Lab](http://www.xilinx.com/support/university/ise/ise-teaching-material/hdl-design.html)

### Binary Multiplier

```verilog
   1100 (the multiplicand)
x  1011 (the multiplier)
   ----
   0000 (initial partial product, start with 0000)
   1100 (1st multiplier bit is 1, so add the multiplicand)
   ----
   1100 (sum)
   ----
   01100 (shift sum one position to the right)
   1100 (2nd multiplier bit is 1, so add multiplicand again)
   ----
  100100 (sum, with a carry generated on the left)
   ----
   100100 (shift sum once to the right, including carry)
   0100100 (3rd multiplier bit is 0, so skip add, shift once)
   ----
   1100 (4th multiplier bit is 1, so add multiplicand again)
   ----
  10000100 (sum, with a carry generated on the left)
   10000100 (shift sum once to the right, including carry)
```

### Multi-Hz

```verilog
/*
 * 利用计数器实现任意分频
 */
always @(posedge f_clk) begin

    //设定频率控制字p  
    if (i == p) begin
        i=0;
        f_out=~f_out;
    end
    else begin
        i=i+1;
    end
end
```

## Tips

### 不可综合结构

- initial: 只用于 test bench
- events: Events 同步测试各个组件
- real: Real 数据类型不可综合
- time: Time 数据类型不可综合
- force/release
- assign(reg)/deassign(reg)
- fork join
- primitive: 只有门级的原语（primitives）可综合
- table: 用户自定义原语（UDP）及 table 不可综合
- `#1` 延迟只用于仿真，综合器直接忽略延迟

### 混合编程

- 内部变量用 assign 赋值
- 输出变量通过监听 内部变量 改变输出值

```verilog
    assign DT0 = ...;
    assign DT1 = ...;

    always @(DT0) begin
        AOut <= DT0;
    end
    always @(DT1) begin
        BOut <= DT1;
    end
```

### 上升沿/下降沿

```verilog
    always @(posedge A or negedge B) begin
        if (A) ...
        else if (!B) ...
        else ...
    end
```

### Parameter

- 只在定义的模块内部起作用

#### Overload Method

```verilog
module data_path
#(parameter DATA_WIDTH = 8)
(
    input A,
    input [(DATA_WIDTH - 1): 0] B,
    output [(DATA_WIDTH - 1): 0] C
);

    ......

endmodule
```

```verilog
module data_path_tb
(
);
    data_path #(.DATA_WIDTH(16)) DUT (.A(A), .B(B), .C(C));

    ......

endmodule
```

#### Constant Variable

```verilog
reset_value = {{(DATA_WIDTH/2){1'b0}}, {(DATA_WIDTH/2){1'b1}}};
```

#### Test Bench

```verilog
always begin
    clk = 0;
    forever #DELAY clk = ~clk;
end
```

```verilog
reg clock;
integer no_of_clocks;

parameter CLOCK_PERIOD = 5;
parameter TIME = 50000;

initial no_of_clocks = 0;
initial clock = 1'b0;

always #(CLOCK_PERIOD/2.0) clock = ~clock;

always @(posedge clock)
    no_of_clocks = no_of_clocks +1 ;

initial begin
    #TIME;
    $display("End of simulation time is %d ,
      total number of clocks seen is %d expected is %d",$time,no_of_clocks,($time/5));
    $finish;
end
```

## 有限状态机(FSM)

- reset: initial state
- default: illegal/unreachable state

## 算术状态机(ASM)

- state box: moore fsm
- conditional box: mealy fsm
- decision box: `x_input` = 0/1

## System Verilog

### Enum

```verilog
typedef enum logic [2:0] {
  RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW
} color_t;

color_t my_color = GREEN;
initial $display("The color is %s", my_color.name());
```

### Struct and Union

```verilog
typedef struct packed {
  bit [10:0]  expo;
  bit         sign;
  bit [51:0]  man;
} FP;

FP zero = 64'b0;
```

### Procedural Block

- always_comb: 用于组合逻辑电路（相当于 Verilog 中对所有输入变量电平敏感的 always，但 always_comb 无需手动列出所有输入变量，系统会自动识别）
- always_ff: 用于触发器及相关的时序逻辑电路（相当于 Verilog 中对某个或某几个信号有效跳变沿敏感、并带有信号储存特性的 always）
- always_latch: 用于锁存器级相关的时序逻辑电路（相当于 Verilog 中对某个或某几个信号电平敏感、并带有信号储存特性的的 always）

```verilog
always_comb begin
  tmp = b * b - 4 * a * c;
  no_root = (tmp < 0);
end

always_ff @(posedge clk)
  count <= count + 1;


always_latch
  if (en) q <= d;
```

### Interface

```verilog
interface interfaceName;
  logic a;
  logic b;
  modport in (input a, output b);
  modport out (input b, output a);
endinterface

module top;
  interfaceName i ();
  u_a m1 (.i1(i));
  u_b m2 (.i2(i));
endmodule

module u_a (interfaceName.in i1);
endmodule

module u_b (interfaceName.out i2);
endmodule
```

### Testing

```verilog
module top;
  integer num_packets = $random;
  reg A, B, C, clk, reset_n;
  wire D;
  register_logic dut(A, B, C, clk, reset_n, D);

  // generate clock
  // ...

  initial begin
    run();
  end

  task run();
    reset_n  = 1;
    #20 reset_n = 0;
    @(posedge clk) reset_n <= #1 1;
    repeat (num_packets) begin
      A = $random; B = $random; C = $random;
      @(posedge clk);
      $display(A, B, C, D);
    end
    $finish;
  endtask
endmodule
```

```verilog
class Packet;
  string name;
  rand bit[3:0] sa, da;
  rand reg A, B, C;

  function void display(result);
    $display(A, B, C, result);
  endfunction
endclass: Packet

// inheritance
class Packet_da_3 extends Packet;
  constraint da_3 {
    da == 3;
  }

  function void display(result);
    super.display(result);
    $display(sa, da);
  endfunction
endclass: Packet_da_3

class Generator;
  Packet pkt;
  Channel out_chan;
  int num_packets;

  function void gen();
    pkt = new():
    pkt.randomize();
    out_chan.put(pkt);
  endfunction

  task run();
    while (num_packets-- != 0)
      gen();
  endtask
endclass

class Driver;
  Channel in_chan;

  task send();
    in_chan.get(pkt);
    top.A = pkt.A;
    top.B = pkt.B;
    top.C = pkt.C;
    @(posedge top.clk);
  endtask

  task run();
    forever send();
  endtask
endclass

module top;
  initial begin
    build();
    run();
  end

  task build();
    Config cfg = new();
    Channel chan = new();
    Generator gen = new();
    Driver drv = new();
    gen.out_chan = chan;
    drv.in_chan = chan;

    cfg.randomize() with { num_packets > 1500; }
    gen.num_packets = cfg.num_packets;
  endtask

  task run();
    fork
      gen.run();
      drv.run();
    join
    $finish;
  endtask
endmodule
```

## U280 Platform

```bash
-xp param (clock frequency etc.)
-R report level
-slr SLR region setting
-sp memory resources mapping
```

tools:

- xbutil query
- platforminfo
- kernelinfo
- **xclbinutil**
- dmesg

### Host Application

#### Basic Flow

- set the kernel arguments before performing any enqueue operation
- keeping the buffer size **2 MB ~ 4 GB**
- `posix_memalign` is used instead of malloc for the host memory space pointer

```cpp
uint32_t *a, *b, *c, *d = NULL;
posix_memalign((void **)&a, 4096, BUF_SIZE * sizeof(uint32_t));
posix_memalign((void **)&b, 4096, BUF_SIZE * sizeof(uint32_t));
posix_memalign((void **)&c, 4096, BUF_SIZE * sizeof(uint32_t));
posix_memalign((void **)&d, 4096, BUF_SIZE * sizeof(uint32_t));
```

- release resources for proper performance profile report

```cpp
clReleaseCommandQueue(Command_Queue);
clReleaseContext(Context);
clReleaseDevice(Target_Device_ID);
clReleaseKernel(Kernel);
clReleaseProgram(Program);
free(Platform_IDs);
free(Device_IDs);
```

#### TLP

It is advisable to use the `posix_spawn()` system call
to launch another process from the SDAccel environment application.

### U280 Tools

#### GDB Based Debugging

```bash
xprint queue [<cl_command_queue>]
xprint event <cl_event>
xprint mem [<cl_mem>]
xprint kernel
xprint all
xstatus all
xstatus --<ipName>
```

#### XCL Binary Util

```bash
xclbinutil -i binary_container_1.xclbin --info
```

#### XOCC

Checking out-of-bound access made by kernel interface buffers (option: address)
and uninitialized memory access initiated by kernel local to kernel (option: memory).

```bash
xocc -l –t sw_emu --xp param:compiler.fsanitize=address -o bin_kernel.xclbin
xocc -l –t sw_emu --xp param:compiler.fsanitize=memory -o bin_kernel.xclbin
xocc -l –t sw_emu --xp param:compiler.fsanitize=address,memory -o bin_kernel.xclbin
```

#### XBUtil

```bash
sudo /opt/xilinx/xrt/bin/xbutil flash -a <shell_name> # flash the firmware
```

```bash
sudo lspci -vd 10ee:
sudo /opt/xilinx/xrt/bin/xbutil flash scan
sudo /opt/xilinx/xrt/bin/xbutil validate -d <card_id>
```

```bash
xbutil program -p <xclbin>
xbutil query         # check memory banks usage
xbutil status --lapc # check AXI violations
```

#### dmesg

#### ILA Trigger

- debug protocol hangs
- examine the burst size, pipelining and data width to locate the bottleneck

```cpp
....
std::string binaryFile = xcl::find_binary_file(device_name,"vAdd");
cl::Program::Binaries bins = xcl::import_binary_file(binaryFile);
devices.resize(1);
cl::Program program(context, devices, bins);
cl::Kernel kernel_vAdd(program,"kernel_vAdd_rtl");

// wait_for_enter("\nPress ENTER to continue after setting up ILA trigger...");
std::cout << "Pausing to arm ILA trigger. Hit enter here to resume host program..."
          << std::endl;
std::cin::get();

//Allocate Buffer in Global Memory
std::vector<cl::Memory> inBufVec, outBufVec;
cl::Buffer buffer_r1(context,CL_MEM_USE_HOST_PTR | CL_MEM_READ_ONLY,
vector_size_bytes, source_input1.data());
// ...
// ...
// ...

//Copy input data to device global memory
q.enqueueMigrateMemObjects(inBufVec,0/* 0 means from host*/);

//Set the Kernel Arguments
// ...
// ...
// ...

//Launch the Kernel
q.enqueueTask(kernel_vAdd);
```

## AXI Protocol

Advanced eXtensible Interface Protocol:

- handshake protocol: ready-valid protocol

### AXI Channels

#### Read Address Channel

- arburst: burst type
- araddr: start address
- arlen: (# of transfers) - 1
- arsize: bytes/transfer
- arready (memory to host)
- arvalid

#### Read Data Channel

- rdata: data
- rresp: response (failure check)
- rlast: flag for last piece of data
- rready (host to memory)
- rvalid

#### Write Address Channel

- awburst: burst type
- awaddr: start address
- awlen: (# of transfers) - 1
- awsize: bytes/transfer
- awready (memory to host)
- awvalid

#### Write Data Channel

- wdata: data
- wstrb: write strobe -> write mask (1 bit mask for 1 byte data)
- wlast: flag for last piece of data
- wready (memory to host)
- wvalid

#### Write Response Channel

- bresp: response (failure check)
- bready (host to memory)
- bvalid

### AXI Burst

| AxBURST[1:0] | Burst Type |
| -----------: | :--------- |
|         0b00 | FIXED      |
|         0b01 | INCR       |
|         0b10 | WRAP       |
|         0b11 | Reserved   |

burst length = AxLEN[7:0] + 1 (up to 256 transfers in each burst)

| AxSIZE[2:0] | Bytes in Transfer |
| ----------: | ----------------: |
|       0b000 |                 1 |
|       0b001 |                 2 |
|       0b010 |                 4 |
|       0b011 |                 8 |
|       0b100 |                16 |
|       0b101 |                32 |
|       0b110 |                64 |
|       0b111 |               128 |

#### Read Burst

![Read Burst Example](./figures/AXI_Read_Burst.png)

#### Write Burst

![Write Burst Example](./figures/AXI_Write_Burst.png)

## Verilog Components

### Clock Unit

```verilog
/**
 * @module tick_divider
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief simple clock divider
 * @param DATA_WIDTH data width
 * @input clk_src clock signal
 * @output clk_group divided clock signals
 */
module tick_divider
#(parameter DATA_WIDTH = 32)
(
    input clk_src,
    output reg [(DATA_WIDTH-1): 0] clk_group
);

    initial begin
        clk_group <= {(DATA_WIDTH){1'b0}};
    end

    always @(posedge clk_src) begin
        clk_group <= clk_group + 1;
    end
endmodule
```

### Signal Unit

```verilog
/**
 * @module integer_to_segment
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief raw data to segment encoder
 * @param DATA_WIDTH data width
 * @input data raw decimal data (4 bit)
 * @output seg_data bit data for cNodes
 */
module integer_to_segment
(
    input [3:0] int_data,
    output reg [7:0] seg_data
);

    always @(int_data) begin
        case (int_data)
            4'b0000:    seg_data <= 8'b11000000;    // 0
            4'b0001:    seg_data <= 8'b11111001;    // 1
            4'b0010:    seg_data <= 8'b10100100;    // 2
            4'b0011:    seg_data <= 8'b10110000;    // 3
            4'b0100:    seg_data <= 8'b10011001;    // 4
            4'b0101:    seg_data <= 8'b10010010;    // 5
            4'b0110:    seg_data <= 8'b10000010;    // 6
            4'b0111:    seg_data <= 8'b11111000;    // 7
            4'b1000:    seg_data <= 8'b10000000;    // 8
            4'b1001:    seg_data <= 8'b10010000;    // 9
            4'b1010:    seg_data <= 8'b10001000;    // a
            4'b1011:    seg_data <= 8'b10000011;    // b
            4'b1100:    seg_data <= 8'b11000110;    // c
            4'b1101:    seg_data <= 8'b10100001;    // d
            4'b1110:    seg_data <= 8'b10000110;    // e
            4'b1111:    seg_data <= 8'b10001110;    // f
            default:    seg_data <= 8'b11111111;    // off
        endcase
    end
endmodule
```

```verilog
/**
 * @module data_to_segment
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief raw data to segment encoder
 * @param DATA_WIDTH data width
 * @input data raw decimal data
 * @output seg_data bit data for cNodes
 */
module data_to_segment
#(parameter DATA_WIDTH = 32)
(
    input [(DATA_WIDTH-1):0] data,
    output [(DATA_WIDTH*2)-1:0] seg_data
);

    integer_to_segment trans1 (
        .int_data(data[3:0]),
        .seg_data(seg_data[7:0])
    );

    integer_to_segment trans2 (
        .int_data(data[7:4]),
        .seg_data(seg_data[15:8])
    );

    integer_to_segment trans3 (
        .int_data(data[11:8]),
        .seg_data(seg_data[23:16])
    );

    integer_to_segment trans4 (
        .int_data(data[15:12]),
        .seg_data(seg_data[31:24])
    );

    integer_to_segment trans5 (
        .int_data(data[19:16]),
        .seg_data(seg_data[39:32])
    );

    integer_to_segment trans6 (
        .int_data(data[23:20]),
        .seg_data(seg_data[47:40])
    );

    integer_to_segment trans7 (
        .int_data(data[27:24]),
        .seg_data(seg_data[55:48])
    );

    integer_to_segment trans8 (
        .int_data(data[31:28]),
        .seg_data(seg_data[63:56])
    );

endmodule
```

```verilog
/**
 * @module led_unit
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief led display module (bind to aNodes and cNodes in FPGA)
 * @param DATA_WIDTH data width
 * @input clk_src clock signal (light different led on in round turn)
 * @input led_data raw decimal data
 * @output aNodes determine which led light on at now
 * @output cNodes determine how led light on (number)
 */
module led_unit
#(parameter DATA_WIDTH = 32)
(
    input clk_src,
    input [(DATA_WIDTH-1):0] led_data,
    output reg [7:0] aNodes,
    output reg [7:0] cNodes
);

    reg [2:0] count; // 2^3 = 8
    wire [(DATA_WIDTH*2)-1:0] seg_data;

    initial begin
        count <= 0;
        aNodes <= 0;
        cNodes <= 0;
    end

    data_to_segment #(
        .DATA_WIDTH(DATA_WIDTH)
    ) data_to_segment (
        .data(led_data),
        .seg_data(seg_data)
    );

    always @(posedge clk_src) begin
        count = count + 1;
    end

    always @(count) begin
        case (count)
            3'b000: begin
            aNodes = 8'b11111110;
            cNodes = seg_data[7:0];
        end
        3'b001: begin
            aNodes = 8'b11111101;
            cNodes = seg_data[15:8];
        end
        3'b010:  begin
            aNodes = 8'b11111011;
            cNodes = seg_data[23:16];
        end
        3'b011: begin
            aNodes = 8'b11110111;
            cNodes = seg_data[31:24];
        end
        3'b100: begin
            aNodes = 8'b11101111;
            cNodes = seg_data[39:32];
        end
        3'b101: begin
            aNodes = 8'b11011111;
            cNodes = seg_data[47:40];
        end
        3'b110: begin
            aNodes = 8'b10111111;
            cNodes = seg_data[55:48];
        end
        3'b111: begin
            aNodes = 8'b01111111;
            cNodes = seg_data[63:56];
        end
        default: begin
            aNodes = 8'b11111110;
            cNodes = 8'b11111111;
        end
        endcase
    end

endmodule
```

### ALU Unit

```verilog
/**
 * @module counter
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief up counter
 * @param DATA_WIDTH data width
 * @param STEP counting step
 * @input clk clock signal
 * @input rst reset signal
 * @output en enable signal
 * @output count counting value
 */
module counter
#(parameter DATA_WIDTH = 1, STEP = 1)
(
    input clk,
    input rst,
    input en,
    output reg [(DATA_WIDTH-1):0] count
);

    always @(posedge clk) begin
        if (rst) begin
            count <= 0 ;
        end else if (en) begin
            count <= count + 1;
        end else begin
            count <= count;
        end
    end

endmodule // counter
```

```verilog
/**
 * @module latch_counter
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief latch counter (latching when reaching max value)
 * @input clk clock signal
 * @input rst reset signal
 * @output en enable signal
 * @output count counting value
 */
module latch_counter
(
    input clk,
    input rst,
    input en,
    output reg count
);

    initial begin
        count <= 0;
    end

    always @(posedge clk) begin
        if (rst) begin
            count <= 0 ;
        end else if (en) begin
            if (count != 1) begin
                count <= count + 1;
            end else begin
                count <= count;
            end
        end else begin
            count <= count;
        end
    end

endmodule // latch_counter
```

```verilog
/**
 * @module alu_flags
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief get flags after alu calculation
 * @param DATA_WIDTH data width
 * @input srcA A port data
 * @input srcB B port data
 * @input aluOP operation code
 * @output zero equal flag
 * @output of signed overflow flag
 * @output uof unsigned overflow flag
 */
module alu_flags
#(parameter DATA_WIDTH = 32)
(
    input [DATA_WIDTH-1:0] srcA,
    input [DATA_WIDTH-1:0] srcB,
    input [3:0] aluOP,
    output zero,
    output of,
    output uof
);

    wire [DATA_WIDTH-1:0] sum, diff;
    wire carry1, carry2;

    assign {carry1, sum} = srcA + srcB;    // awesome tip
    assign {carry2, diff} = srcA - srcB;    // awesome tip

    assign zero = (srcA == srcB);
    assign of = (aluOP == 4'd5) ? (
      (srcA[DATA_WIDTH-1] & srcB[DATA_WIDTH-1] & ~sum[DATA_WIDTH-1])
      | (~srcA[DATA_WIDTH-1] & ~srcB[DATA_WIDTH-1] & sum[DATA_WIDTH-1]))
                : (aluOP == 4'd6) ? (
      (srcA[DATA_WIDTH-1] & ~srcB[DATA_WIDTH-1] & ~diff[DATA_WIDTH-1])
      | (~srcA[DATA_WIDTH-1] & srcB[DATA_WIDTH-1] & diff[DATA_WIDTH-1]))
                : 0;
    assign uof = (aluOP == 4'd5) ? (carry1)
                : (aluOP == 4'd6) ? (carry2)
                : 0;

endmodule // alu_flags
```

```verilog
/**
 * @module alu
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @param DATA_WIDTH data width
 * @input srcA A port data
 * @input srcB B port data
 * @input aluOP operation code
 * @output aluOut calculation result
 * @output zero equal flag
 * @output of signed overflow flag
 * @output uof unsigned overflow flag
 */
module alu
#(parameter DATA_WIDTH = 32)
(
    input [DATA_WIDTH-1:0] srcA,
    input [DATA_WIDTH-1:0] srcB,
    input [3:0] aluOP,
    output reg [DATA_WIDTH-1:0] aluOut,
    output zero,
    output of,
    output uof
);

    wire signed [DATA_WIDTH-1:0] signed_srcA;
    wire signed [DATA_WIDTH-1:0] signed_srcB;

    assign signed_srcA = $signed(srcA);
    assign signed_srcB = $signed(srcB);

    always @ ( * ) begin
        case (aluOP)
            4'd0: aluOut <= srcA << srcB;
            4'd1: aluOut <= signed_srcA >>> srcB;
            4'd2: aluOut <= srcA >> srcB;
            4'd3: aluOut <= srcA * srcB;
            4'd4: aluOut <= srcA / srcB;
            4'd5: aluOut <= srcA + srcB;  // awesome tip
            4'd6: aluOut <= srcA - srcB;
            4'd7: aluOut <= srcA & srcB;
            4'd8: aluOut <= srcA | srcB;
            4'd9: aluOut <= srcA ^ srcB;
            4'd10: aluOut <= ~(srcA | srcB);
            4'd11: aluOut <= (signed_srcA < signed_srcB) ? 1 : 0;
            4'd12: aluOut <= (srcA < srcB) ? 1 : 0;
            default: aluOut <= 0;
        endcase
    end

    alu_flags #(
        .DATA_WIDTH(DATA_WIDTH)
    ) FLAGS  (
        .srcA(srcA),
        .srcB(srcB),
        .aluOP(aluOP),
        .zero(zero),
        .of(of),
        .uof(uof)
    );

endmodule // alu
```

### Memory Unit

```verilog
/**
 * @module register
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief D flip flop
 * @param DATA_WIDTH data width
 * @input clk clock signal
 * @input rst reset signal
 * @input en enable signal
 * @input din data in
 * @output dout data out
 */
module register
#(parameter DATA_WIDTH = 32)
(
    input clk,
    input rst,
    input en,
    input [DATA_WIDTH-1:0] din,
    output reg [DATA_WIDTH-1:0] dout
);

    always @ (posedge clk) begin
        if (rst) begin
            dout <= 0;      // reset
        end else if (en) begin
            dout <= din;    // update
        end else begin
            dout <= dout;   // hold
        end
    end

endmodule // register
```

```verilog
/**
 * @module regFile
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief register files for MIPS CPU, contains 32 D flip-flop registers
 * @param DATA_WIDTH data width
 * @input clk clock signal
 * @input we write enable signal
 * @input raddrA read address (No.register) for A out port
 * @input raddrB read address (No.register) for B out port
 * @input waddr write address (No.register) for wdata (in port)
 * @input wdata data to write into regFile
 * @output regA A port output
 * @output regB B port output
 */
module regFile
#(parameter DATA_WIDTH = 32)
(
    input clk,
    input rst,
    input we,
    input [4:0] raddrA,
    input [4:0] raddrB,
    input [4:0] waddr,
    input [DATA_WIDTH-1:0] wdata,
    output [DATA_WIDTH-1:0] regA,
    output [DATA_WIDTH-1:0] regB,
    output [DATA_WIDTH-1:0] v0_data,
    output [DATA_WIDTH-1:0] a0_data
);

`include "defines.vh"

    reg [4:0] i;

    ///< three ported regFile contains 32 registers
    reg [DATA_WIDTH-1:0] regFile [0:31];

    always @ (posedge clk) begin
        if (rst) begin
            for (i = 0; i < 31; i = i + 1)
                begin
                    regFile[i] <= 0;
                end
        end else if (we && waddr != 0) begin
            regFile[waddr] <= wdata;
        end
    end

    assign regA = (we && waddr == raddrA) ? wdata
                : (raddrA != 0) ? regFile[raddrA]
                : 0;
    assign regB = (we && waddr == raddrB) ? wdata
                : (raddrB != 0) ? regFile[raddrB]
                : 0;
    assign v0_data = regFile[`V0];
    assign a0_data = regFile[`A0];

endmodule // regFile
```

```verilog
/**
 * @module imem
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief instruction cache memory (ROM)
 * @param DATA_WIDTH data width
 * @param BUS_WIDTH bus width
 * @param CODE_FILE MIPS assembly hexadecimal code file
 * @input addr memory address
 * @output rdata instruction read out from memory
 */
module imem
#(parameter DATA_WIDTH = 32, BUS_WIDTH = 10, CODE_FILE= "mips/benchmark.hex")
(
    input [BUS_WIDTH-1:0] addr,
    output [DATA_WIDTH-1:0] rdata
);

    reg [DATA_WIDTH-1:0] ROM [0:(2**BUS_WIDTH)-1];

    initial begin
        $readmemh(CODE_FILE, ROM, 0, (2**BUS_WIDTH)-1);
    end

    assign rdata = ROM[addr];

endmodule // imem
```

```verilog
/**
 * @module dmem
 * @author sabertazimi
 * @email sabertazimi@gmail.com
 * @brief data cache memory (RAM)
 * @param DATA_WIDTH data width
 * @param BUS_WIDTH bus width
 * @input clk clock signal
 * @input re read enable signal
 * @input we write enable signal
 * @input addr memory address
 * @input wdata data write into memory
 * @output rdata data read out from memory
 */
module dmem
#(parameter DATA_WIDTH = 32, BUS_WIDTH = 10)
(
    input clk,
    input re,
    input we,
    input [BUS_WIDTH-1:0] addr,
    input [DATA_WIDTH-1:0] wdata,
    input [4:0] switch_addr,
    output [DATA_WIDTH-1:0] rdata,
    output [DATA_WIDTH-1:0] led_data
);

    reg [DATA_WIDTH-1:0] RAM [0:(2**BUS_WIDTH)-1];

    always @ (posedge clk) begin
        if (we) begin
            RAM[addr] <= wdata;
        end
    end

    assign rdata = re ? RAM[addr] : {(DATA_WIDTH-1){1'bx}};
    assign led_data = RAM[switch_addr];

endmodule // dmem
```
