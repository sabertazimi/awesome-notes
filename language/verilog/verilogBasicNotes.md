# Verilog Basic Notes

<!-- TOC -->

- [Verilog Basic Notes](#verilog-basic-notes)
  - [General Flow](#general-flow)
    - [Create Project](#create-project)
    - [RTL Analysis](#rtl-analysis)
    - [Simulate Design](#simulate-design)
    - [Synthesize Design](#synthesize-design)
    - [Implement Design](#implement-design)
    - [Post-Implementation Timing Simulate Design](#post-implementation-timing-simulate-design)
    - [Generate Bitstream](#generate-bitstream)
    - [Testing and Verification](#testing-and-verification)
  - [Timing in Circuits](#timing-in-circuits)
    - [Combinational Circuit Timing](#combinational-circuit-timing)
    - [Sequential Circuit Timing](#sequential-circuit-timing)
  - [Key Words](#key-words)
  - [Module](#module)
    - [外部端口](#外部端口)
  - [function](#function)
    - [task](#task)
  - [Variable/Data Structure](#variabledata-structure)
    - [常量](#常量)
    - [向量](#向量)
      - [部分位选](#部分位选)
    - [数字](#数字)
      - [有符号数](#有符号数)
      - [无符号数](#无符号数)
    - [Register - reg/integer/time/real/realtime](#register---regintegertimerealrealtime)
      - [integer](#integer)
      - [real](#real)
    - [Net - wire/wand/wor](#net---wirewandwor)
  - [Gate Level](#gate-level)
    - [Basic Gate](#basic-gate)
    - [Use Gate](#use-gate)
    - [Self-Defined Gate(用户自定义原语)](#self-defined-gate用户自定义原语)
  - [Dataflow Level](#dataflow-level)
    - [[Operators](https://hom-wang.gitbooks.io/verilog-hdl/content/Chapter_04.html)](#operatorshttpshom-wanggitbooksioverilog-hdlcontentchapter_04html)
    - [整数提升](#整数提升)
      - [{ }](#-)
  - [Behavior Level](#behavior-level)
    - [时延控制](#时延控制)
    - [事件控制](#事件控制)
    - [语句内/间控制](#语句内间控制)
    - [always](#always)
    - [if-else](#if-else)
    - [case/casex/casez](#casecasexcasez)
    - [for](#for)
    - [repeat loop](#repeat-loop)
    - [forever loop](#forever-loop)
    - [force/release](#forcerelease)
    - [Blocking/Non-Blocking](#blockingnon-blocking)
    - [disable](#disable)
  - [结构建模](#结构建模)
    - [generate 语句](#generate-语句)
  - [Delay(时延)](#delay时延)
  - [预编译指令](#预编译指令)
    - [define 宏](#define-宏)
    - [默认未连接端口](#默认未连接端口)
  - [Data Path](#data-path)
    - [Multiplexer](#multiplexer)
    - [Adder](#adder)
    - [Register](#register)
    - [Memory](#memory)
  - [Demos](#demos)
    - [Binary Multiplier](#binary-multiplier)
    - [Multi-Hz](#multi-hz)
  - [Tips](#tips)
    - [不可综合结构](#不可综合结构)
    - [混合编程](#混合编程)
    - [上升沿/下降沿](#上升沿下降沿)
    - [Parameter](#parameter)
      - [Overload Method](#overload-method)
      - [Constant Variable](#constant-variable)
      - [Test Bench](#test-bench)
  - [有限状态机(FSM)](#有限状态机fsm)
  - [算术状态机(ASM)](#算术状态机asm)
  - [SystemVerilog](#systemverilog)
    - [Enum](#enum)
    - [Struct and Union](#struct-and-union)
    - [Procedural Block](#procedural-block)
    - [Interface](#interface)

<!-- /TOC -->

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

### Generate Bitstream

### Testing and Verification

low-level (circuit) simulation is much slower than high-level (C, HDL) simulation:

- check only functionality at high level (C, HDL)
- check only timing, power at low level (circuit)

```verilog
module testbench();
  reg         clk, reset;           // clock and reset are internal
  reg         a, b, c, yexpected;   // values from testvectors
  wire        y;                    // output of circuit
  reg  [31:0] vectornum, errors;    // bookkeeping variables
  reg  [3:0]  testvectors[10000:0]; // array of testvectors

  // instantiate device under test
  sillyfunction dut(.a(a), .b(b), .c(c), .y(y) );

  // generate clock
  always     // no sensitivity list, so it always executes
    begin
      clk = 1; #5; clk = 0; #5;     // 10ns period
    end

  // at start of test, load vectors and pulse reset
  initial   // Only executes once
  begin
    $readmemb("example.tv", testvectors); // Read vectors: e.g 000_0 001_1 ... xxx_x
    vectornum = 0; errors = 0;            // Initialize
    reset = 1; #27; reset = 0;            // Apply reset wait
  end

  // Note: $readmemh reads testvector files written in
  // hexadecimal
  // apply test vectors on rising edge of clk
  always @(posedge clk)
  begin
    #1; {a, b, c, yexpected} = testvectors[vectornum];
  end

  always @(negedge clk)
  begin
    if (~reset) // don’t test during reset
    begin
      if (y !== yexpected)
      begin
        $display("Error: inputs = %b", {a, b, c});
        $display("  outputs = %b (%b exp)",y,yexpected);
        errors = errors + 1;
      end

      // increment array index and read next testvector
      vectornum = vectornum + 1;

      if (testvectors[vectornum] === 4'bx)
      begin
        $display("%d tests completed with %d errors", vectornum, errors);
        $finish;                 // End simulation
      end
    end
  end
endmodule
```

## Timing in Circuits

### Combinational Circuit Timing

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
    allways @(*)
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

## Variable/Data Structure

### 常量

- 0: 逻辑 0
- 1: 逻辑 1
- x/X: Unknow/Floating
- z/Z: 高阻抗状态(High Impendence)
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

### Register - reg/integer/time/real/realtime

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

### Net - wire/wand/wor

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
- - 表示 值"无变化"

```verilog
primitive XOR2 (DOUT, X1, X2);
    input X1, X2;
    output DOUT;

    table // X1 X2 : DOUT
        0 0 : 0;
        0 1 : 1;
        1 0 : 1;
        1 1 : 0;
    endtable
endprimitive
```

## Dataflow Level

- assign net = net/reg: **左式只能是 net**

### [Operators](https://hom-wang.gitbooks.io/verilog-hdl/content/Chapter_04.html)

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

### case/casex/casez

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
// 先计算好右值, 等待时钟 tclk 上出现2个负跳变沿, 再把右值赋给 hresult
hresult = repeat (2) @(negedge tclk) hw_data + hr_data;

// repeat 循环语句:
repeat (2)
    @(posedge tclk) hresult = hw_data + hr_data;
```

```verilog
initial begin
    inc_DAC = 1’b1;

    repeat(4095) @(posedge clk); // bring DAC right up to point of rollover
    inc_DAC = 1’b0;
    inc_smpl = 1’b1;

    repeat(7)@(posedge clk); // bring sample count up to 7
    inc_smpl = 1’b0;
end

initial begin
    #100 $finish; // run simulation for 100 units
end
```

### forever loop

```verilog
// $stop, $finish 可以终止 forevr loop
forever #10 clk = ~ clk;
```

### force/release

```verilog
initial
    begin
        force test_reset = penable & rtc_intr;
        #5;
        release test_reset;
    end
```

### Blocking/Non-Blocking

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
        begin: sblka
            xor uxor (y[gv_i], a[gv_i], b[gv_i]);
        end
endgenerate
// =>
// module.sblka[0].uxor
// module.sblka[1].uxor
// module.sblka[2].uxor
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

### 默认未连接端口

```verilog
`unconnected_drive pull1

// 此区间未连接输入端口为上拉(1)

`nounconnected_drive

`unconnected_drive pull0

// 此区间未连接输入端口为下拉(0)

`nounconnected_drive
```

## Data Path

### Multiplexer

### Adder

### Register

### Memory

- 其中数据文件中地址必须在系统任务中定义的范围内，系统任务中定义的地址必须在存储器定义的地址范围内
- 优先考虑数据文件中的地址>系统任务中定义的起始地址和结束地址>存储器定义的起始地址和结束地址

## Demos

- [gitbooks.io](https://hom-wang.gitbooks.io/verilog-hdl/content/Chapter_07.html)
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
        Aout <= DT0;
    end
    always @(DT1) begin
        Bout <= DT1;
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

## SystemVerilog

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
  bit [51:0]  mant;
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
interface intf;
  logic a;
  logic b;
  modport in (input a, output b);
  modport out (input b, output a);
endinterface

module top;
  intf i ();
  u_a m1 (.i1(i));
  u_b m2 (.i2(i));
endmodule

module u_a (intf.in i1);
endmodule

module u_b (intf.out i2);
endmodule
```
