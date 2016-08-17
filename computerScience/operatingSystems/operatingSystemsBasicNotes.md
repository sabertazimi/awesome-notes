
* [Operating System Basic Notes](#operating-system-basic-notes)
	* [GCC 内联汇编](#gcc-内联汇编)
	* [基本概念](#基本概念)
		* [操作系统内核特征](#操作系统内核特征)
		* [操作系统的演变](#操作系统的演变)
	* [启动](#启动)
		* [BIOS](#bios)
		* [启动顺序](#启动顺序)
			* [寄存器](#寄存器)
			* [BIOS](#bios-1)
			* [Bootloader](#bootloader)
				* [标志(lab1/tools/sign.c)](#标志lab1toolssignc)
				* [基本功能](#基本功能)
					* [切换到保护模式, 启动段机制](#切换到保护模式-启动段机制)
					* [从硬盘上加载 某种(kernel in ELF) 格式的 os kernel(在硬盘中紧邻 MBR) 至内存的固定区域](#从硬盘上加载-某种kernel-in-elf-格式的-os-kernel在硬盘中紧邻-mbr-至内存的固定区域)
					* [跳转到 os kernel 的入口点(entry point), 转移控制权至 os](#跳转到-os-kernel-的入口点entry-point-转移控制权至-os)
				* [保护模式与段机制](#保护模式与段机制)
	* [物理内存管理](#物理内存管理)
		* [基本概念](#基本概念-1)
			* [基本目标](#基本目标)
			* [基本管理方式](#基本管理方式)
			* [地址生成](#地址生成)
				* [地址生成时机](#地址生成时机)
			* [地址映射(软硬件结合)](#地址映射软硬件结合)
			* [地址检查(软硬件结合)](#地址检查软硬件结合)
		* [连续内存分配(malloc/free)](#连续内存分配mallocfree)
			* [内存碎片](#内存碎片)
			* [动态分配策略](#动态分配策略)
			* [碎片整理策略](#碎片整理策略)
				* [紧凑(compaction)](#紧凑compaction)
				* [分区对换(swapping in/out)](#分区对换swapping-inout)
			* [malloc 实现策略](#malloc-实现策略)
				* [启发式(Heuristic)编程](#启发式heuristic编程)
				* [伙伴系统(Buddy System)](#伙伴系统buddy-system)
					* [合并空闲块](#合并空闲块)
		* [非连续内存分配](#非连续内存分配)
			* [段式存储管理](#段式存储管理)
			* [页式存储管理](#页式存储管理)
				* [虚拟地址](#虚拟地址)
				* [物理地址](#物理地址)
				* [页表](#页表)
					* [页表结构](#页表结构)
				* [性能问题](#性能问题)
					* [TLB(translation lookaside buffer)](#tlbtranslation-lookaside-buffer)
					* [多级页表](#多级页表)
					* [反置页表](#反置页表)
			* [段页式存储管理](#段页式存储管理)
		* [特权级](#特权级)
			* [特权级检查](#特权级检查)
			* [特权级切换](#特权级切换)
				* [ring 0 to ring 3](#ring-0-to-ring-3)
				* [ring 3 to ring 0 (特权级提升)](#ring-3-to-ring-0-特权级提升)
			* [TSS(Task State Segment)](#tsstask-state-segment)

# Operating System Basic Notes

## GCC 内联汇编

```c
asm ( assembler template	// assembly language
	:=output operands		// 约定输出
	:input operands			// 约定输入
	:clobbers				// 约定插入
);
```

constraints:

-   m/v/o = memory
-   r = register
-   Q = ea/b/c/dx
-   a = eax
-   b = ebx
-   c = ecx
-   d = edx
-   D = edi
-   S = esi
-   0/n = fisrt/nth constraints

## 基本概念

### 操作系统内核特征

-   并发
-   共享: 共享内存, 互斥共享
-   虚拟
-   异步

### 操作系统的演变

单用户系统(45-55) -> 批处理系统(55-65) -> 多道系统(65-80) -> 分时系统(70-) -> 分布式系统

## 启动

### BIOS

-   基本输入输出程序
-   系统设置信息
-   开机后自检程序
-   系统自启动程序

### 启动顺序

#### 寄存器

-   CF: 初值 F000H
-   EIP: 初值 FFF0H

(FFF)F0000H+FFF0H = FFFFFFF0H, BIOS 的 EPROM(Erasable Programmable Read Only Memory) 处
加电后第一条指令一般是 ljmp(实模式下, 内存 !MB), 跳转地址为 CF<<4+EIP, 跳转至 BIOS 例行程序起始点.

#### BIOS

BIOS 根据设置(硬盘/U盘/网络启动), 加载存储设备的主引导扇区(Master Boot Record)(第一个扇区)的 512 字节至内存 0x7c00 处, 开始执行第一条指令(bootloader)

#### Bootloader

##### 标志(lab1/tools/sign.c)

-    有效字节小于 510 bytes
-    结尾为 0x55aa
-    总计字节小于 512 bytes

##### 基本功能

###### 切换到保护模式, 启动段机制

-   开启 A20, 获取足够内存空间
-   置 cr0 保护模式标志位(bit0) 为1
-   加载全局描述符表
-   设置各个通用寄存器与段寄存器

###### 从硬盘上加载 某种(kernel in ELF) 格式的 os kernel(在硬盘中紧邻 MBR) 至内存的固定区域

###### 跳转到 os kernel 的入口点(entry point), 转移控制权至 os

##### 保护模式与段机制

-   CS -> 全局描述符表(其起始地址与表大小位于 gdt 寄存器中)某项(每项存有 base/limit 等信息) -> 局部描述符表 -> 段选择子(段的基本信息) -> 基址+EIP -> 线性地址 ---页机制---> 物理地址
-   将 cr0 寄存器 bit0 置为1, 表示进入了保护模式, 段机制开始起作用

## 物理内存管理

### 基本概念

#### 基本目标

-   抽象: 逻辑地址空间(线性物理地址映射)
-   保护: 独立地址空间(进程间互不影响)
-   共享: 访问相同内存(内核空间与共享库)
-   虚拟化: 独占内存空间假象

#### 基本管理方式

-   重定位(relocation)
-   分段(segmentation): 代码段/数据段
-   分页(paging)
-   虚拟存储(virtual memory): 内存视作硬盘的缓存, 硬盘视作虚拟内存

#### 地址生成

##### 地址生成时机

-    编译时
-    链接时
-    加载时
-    执行时(相对寻址)

#### 地址映射(软硬件结合)

逻辑地址 ---> 物理地址

-   硬件(CPU/MMU)完成映射地址
-   操作系统建立映射规则(页表)

#### 地址检查(软硬件结合)

-   操作系统设置的段机制和段长度
-   硬件(CPU/MMU)根据段信息进行地址检查(内存访问是否异常)

### 连续内存分配(malloc/free)

#### 内存碎片

-   外部碎片: 已分配单元间无法利用空闲单元(请求内存单元过大)
-   内部碎片: 已分配单元内空闲单元

#### 动态分配策略

-   Fist-fit(最先匹配): 使用第一个可利用空闲块 - 容易产生外部碎片, 分配大块效率低
-   Best-fit(最佳匹配): 使用利用度最高的空闲块 - 外部碎片过小, 释放时需重新排列空闲块链表(升序)
-   Worst-fit(最差匹配): 使用利用度最差的空闲块 - 分配中块效率高, 释放时需重新排列空闲块链表(降序)

#### 碎片整理策略

##### 紧凑(compaction)

将不同进程占用内存单元移至较为集中的地方:

-   只可移动 可动态重定位程序
-   只可移动 等待状态进程

##### 分区对换(swapping in/out)

将等待状态进程的分区对换至外存,以增大可用内存单元

> e.g Linux Swap 分区: 安装系统时一般切割大小为内存大小的50%~100% 的外存作为 Swao 分区

#### malloc 实现策略

##### 启发式(Heuristic)编程

-   建立已分配void指针表,free函数执行时,只回收表中存在的指针;不存在则报错
-   对heap进行分区 - 小/中/大块内存请求,分别从不同区域(8/16/32最小单位区)分配
-   记录当前堆块的信息，如长度，空闲状态
-   记录周围环境信息，如保留上/下一堆块的指针或记录上/下堆块空闲状态

##### 伙伴系统(Buddy System)

-   可分配内存单元总大小为 2^n
-   总是将大小 **小于**请求大小的**2倍**且为**2的幂次方** 的某块内存单元分配出去(大小为 2^(i-1))

###### 合并空闲块

-   空闲块相邻
-   空闲块等大
-   低地址空闲块的 起始地址 必须为 空闲块大小 的 2的幂次方倍(2倍以上)


### 非连续内存分配

-   支持一个程序使用非连续的物理地址空间
-   支持共享代码与数据
-   支持动态加载与动态链接

#### 段式存储管理

将逻辑地址划分, 低位表示段内偏移, 高位(取摸)表示段号(类比缓存中的内存地址)

#### 页式存储管理

开启页机制:

*   init page directory(首址位于 cr3 寄存器), page table
*   update GDT
*   update ds,es,ss
*   update cs with jmp instruction
*	cr0 寄存器 bit31(most bit) 置1

##### 虚拟地址

> TLB(translation lookaside buffer in cpu/pm)

-   Virtual Address = 2^(bits of virtual page offset) * virtual page number + virtual page offset
-   VPN(virtual page number point to PPN) - VPO(virtual page offset = PPO)
-   根据 VPN 在页表中找到对应表项(VPN 表示项号), 每项保存着 PPN
-   TLBT(tag) - TLBI(index) - VPO

##### 物理地址

> C(cache) PPO = VPO

-   Page Frame(帧): 高位为帧号, 低位为偏移
-   Physical Address = 2^(bits of physical page offset) * physical page number/page frame number + physical page offset
-   PPN(physical page number) - PPO(physical page offset = VPO)
-   CT(tag) - CI(index) - CO(offset)

##### 页表

-   页表由操作系统建立, 硬件(CPU/MMU)根据页表信息将虚拟地址映射为物理地址

###### 页表结构

-   FN/PPN
-   标志位: resident bit(存在位)/dirty bit(修改位)/reference(clock) bit(引用位)

##### 性能问题

-   两次访存: 第一次获取页表项, 第二次访问实际数据
-   页表占据大量内存单元

###### TLB(translation lookaside buffer)

缓存页表项 - key: VPN, value: PPN　不用访问页表

###### 多级页表

切割页表: 建立子页表

> CR3 寄存器: 保存一级页表的基址

-   父页表表项保存子页表起始地址, 逻辑地址某部分保存偏移地址(子表项号)
-   存在位为 0 时, 不用保存子表, 节省内存单元

###### 反置页表

-   PPN 作为页表索引, 页表项保存 VPN(或者 Hash(VPN|PID))
-   将 VPN 映射为 PPN 时, 需遍历整个页表(但此页表只占用少量内存单元)

#### 段页式存储管理

在页式存储管理基础上, 引入段式存储管理

<--- vsn --- vpn --- vpo ---> 映射为 <--- ppn --- ppo --->

> sn: segment number, pn:page number, po: page offset

若以 4K(limit) 为 1 个页表大小, 则下级页表首址为 `段/页表中某项的值 << 12`(2^12 = 4K)

-   以 vsn 为索引在进程段表中找到段表项, 获取段(页表)基址与段大小信息(item_value/limit): base = item_value << log2(limit)
-   以 vpn 为索引在进程页表(页表基址 = base中找到页表项, 获取 ppn
-   ppn << log2(limit) + vpo(ppo) 为实际物理地址

### 特权级

0: 最高特权级, 3: 最低特权级

#### 特权级检查

-   CPL/RPL: 访问者特权级
-   DRL: 段描述符/门描述符(中断/陷阱门)中保存的特权级, 表示被访问段/中断服务/陷阱的特权级
-   CPL/RPL <= DRL e.g 0 < 3

#### 特权级切换

##### ring 0 to ring 3

-   interrupt/trap: push SS(**RPL=3**) -> ESP -> EFLAGS -> CS(**RPL=3**) -> EIP -> Error Code
_   iret: pop above variables, move to ring 3

##### ring 3 to ring 0 (特权级提升)

-   interrupt/trap: stack switch
-   push EFLAGS -> CS(**RPL=0**) -> EIP -> Error Code
-   iret: pop above variables, move to ring 0

#### TSS(Task State Segment)

保存不同特权级的堆栈信息(SS/ESP)

全局描述符表中保存一个 TSS Descriptor(TSS base + TSS limit): allocate TSS memory -> init TSS -> fill TSS descriptor in GDT -> set TSS selector(task register)

## 虚拟内存管理

虚拟内存 = 物理内存 + 外存

### 覆盖与交换

#### 覆盖技术(overlay)

将程序中相互独立的模块分成一组, 为每组按最大模块分配内存单元

#### 交换技术(swap)

将挂起进程的整个地址空间换出至外存(swap out), 将需用进程的整个地址空间换入至内存(swap in), 进程交替运行

### 虚拟页式存储管理

*   只将运行进程所必需页面装入内存, 其余页面至于外存
*   进程发生缺页异常时, 将所要求缺页装入内存: 选择目标物理页面 -> 无未占用物理页面, 则换出闲置物理页面(访问位) -> 装入物理内存,更新页表项(换入逻辑地址与换出逻辑地址对应的页表项的驻留位/修改位/访问位/锁定位以及物理页号 ppn)
*   监控已经装入内存的页面, 及时将不需要页面换出至外存

#### 标志位

*   驻留位: 此逻辑地址对应的页面在内存中
*   修改位: 此页面是否被修改过, 判定此页面换出时策略(写回外存/直接丢弃)
*   访问位: 此页面是否被读/写过, 判定此页面是否需要换出至外存
*   锁定位: 此页面不会被换出

#### 页面置换算法

当出现缺页异常且物理内存已满时, 需要以页面置换算法为指导, 换出闲置物理页面, 换入所要求缺页, 并更新页表项:

*   尽可能减少物理页面的换入换出次数

##### 局部置换算法

换入进程 A 的某个页面时, 只可换出进程 A 的某个页面: 为进程分配固定数目的页面

###### 最远未用算法(Least Recently Used/LRU Algorithm)

*   利用**链表等线性结构**维护页面访问时间, 队首为最近一次访问页面(每次访问一个页面后, 把它从线性结构中间抽出至队首), 队尾为最远一次访问页面

###### 时钟算法(Clock Algorithm)

*   利用**循环链表**维护页面(指针指向最先换入内存的页面), 页表项访问位维护访问记录(访问后将访问位置 1)
*   缺页时, 从指针处开始查找页面进行置换: 若访问位为 0, 则进行置换; 若访问位为 1, 则将此页面访问位置 0, 继续查找未访问页面
*   改进: 增加修改位

|指针扫描前|指针扫描后|
|:----------:|:----------:|
|访问位 修改位|访问位 修改位|
|0 0|置换|
|0 1|0 0|
|1 0|0 0|
|1 1|0 1|

###### 	最不常用算法(Least Frequently Used/LFU Algorithm)

*   利用**链表等线性结构**维护页面访问时间, 队首为最多访问次数页面(每次访问一个页面后, 访问次数+1, 并排序), 队尾为最少访问次数页面

##### 全局置换算法

*   换入进程 A 的某个页面时, 可换出其他进程的某个页面: 为进程分配可变数目的页面
*   关键: 确定为不同进程分配的页面数目
*   抖动(thrashing): 进程过多, 导致大部分进程的常驻集<工作集, 缺页率较高

###### 工作集算法

*   工作集(随时间动态变化集): 一个进程当前正在使用的逻辑页面集合, WorkingSet(currentTime, workingSetWindow(访问时间窗口)) `(cT - wSW, cT + wSW)`
*   根据工作集大小(逻辑页面集合), 为该进程分配常驻集(合适数目的物理页面集合): 若常驻集 > 工作集, 则缺页率较低
*   再额外维护一个类希 LRU 算法中的访存链表, 记录近期访问过的物理页面, 将其也加入常驻集

###### 缺页率算法

当缺页频繁时, 缺页时将缺页的页面加入常驻集; 当缺页不频繁时, 缺页时将不属于工作集的页面移出常驻集

## 进程(资源分配单位)

*   独立性: 无副作用(确定性), 可重现
*   并发性: 提升效率, 共享资源, 高度模块化

### 进程状态/生命周期

创建, 就绪(ready), 运行(running), 等待(wait/sleeping), 挂起(suspend: 进程由内存换出至外存), 结束(抢占, 唤醒): 进程优先级与剩余内存单元在一定程度上会影响进程状态

#### 进程控制块(Process Control Block)

通过组织管理 PCB(链表/索引表) 来组织管理进程; 在进程创建/终止的同时, 生成/回收改进程的 PCB:

*   进程信息: 名字/pid/uid
*   链表信息: 父进程指针/所属队列指针(就绪队列/IO等待队列/挂起队列)
*   CPU调度/运行时信息: eflags/cr3/状态
*   内存资源信息: 堆指针/栈指针/虚拟内存页面指针
*   上下文信息(用于进程/上下文切换时保存/恢复上下文): trap frame/context(register files)

### 线程(CPU 调度单位)

*   进程缺陷: 共享数据不便, 系统开销大
*   线程共享段表/共享库/数据/代码/环境变量/文件描述符集合/地址空间, 但拥有独立的堆/栈/通用寄存器
*   线程控制块(Thread Control Block)
*   用户线程与内核线程: 多为 1 对 1

## 处理机调度

*   从就绪队列中挑选下一个占用 CPU 的进程(挑选进程的内核函数)
*   从多个可用 CPU 中挑选使用 CPU 资源

### 调度时机

*   进程停止运行, 进入等待/挂起/终止状态
*   进程的中断请求完成时, 由等待状态进入就绪状态, 准备抢占 CPU 资源(准备从内核态返回用户态)

### 调度策略/算法

#### 算法目标

*   CPU 有效使用率
*   吞吐量(高带宽): 单位时间内完成进程数量
*   等待时间(低延迟): 进程在就绪队列等待总时间
*   周转时间(低延迟): 进程从初始化到结束总时间
*   响应时间(低延迟): 从提交请求到产生响应总时间

#### 先来先服务算法(First Come First Served/FCFS)

*   依次执行就绪队列中的各进程(先进入就绪队列先执行)
*   CPU 利用率较低

#### 短进程优先算法(Shortest Process Next/Shortest Remaining Time)

*   优先执行周转耗时/剩余耗时最短的进程
*   若短进程过多, 则导致长进程一直无法执行

#### 最高响应比优先算法(Highest Response Ratio Next)

*   R = (waitTime + serviceTime) / serviceTime: 已等待时间越长, 优先级上升
*   修正短进程优先算法的缺点

#### 时间片轮转算法(Round Robin)

*   在 FCFS 基础上, 设定一个基本时间单元, 每经过一个时间单元, 轮转至下一个先到进程(并进行循环轮转)
*   额外的上下文切换
*   时间片合适大小: 10 ms

#### 多级队列调度算法(MQ)

*   将就绪队列分成多个独立子队列, 每个队列可采取不同调度算法
*   前台交互队列使用时间片轮转算法, 后台 IO 队列使用先来先服务算法
*   队列间使用时间片轮转算法

#### 多级反馈队列算法(MLFQ)

*   优先级高的子队列时间片小, 优先级低的子队列时间片大
*   CPU 密集型进程(耗时高)优先级下降很快
*   IO 密集型进程(耗时低)停留在高优先级

## 同步互斥

*   互斥(mutual exclusion)
*   死锁(deadlock)
*   饥饿(starvation)

### 临界区的访问原则

*   空闲则入
*   忙则等待
*   有限等待

### 基于软件方法的同步互斥

```cpp
int turn;		// 表示谁该进入临界区
bool flag[];	// 表示进程是否准备好进入临界区
```

```cpp
// 对于 2 个线程的情况
// Peterson Algorithm
// 线程 i
flag[i] = true;
turn = j;		// 后设置 turn 标志的进程不可进入临界区, 会在 while 循环进行等待
while (flag[j] && turn == j) ;

...		// critical section

flag[i] = false;
```

```cpp
// Dekkers Algorithm
// 线程 i
turn = 0;
flag[] = {false};

do {
	flag[i] = true;
	while (flag[j] == true) {
		if (turn != i) {
			flag[i] = false;
			while (turn != i) ;
			flag[i] = true;
		}
	}

	// critical section

	turn = j;
	flag[i] = false;
} while (true);
```

### 高级抽象的同步互斥

利用原子操作实现锁数据结构(lock)

```cpp
struct lock/semaphore {
	bool locked/sem = n;	// n: 并发数/可用资源数
	wait_queue q;

	void acquire/prolaag() {
		locked/sem--;
		if (locked/sem < 0) sleep_and_enqueue(this_thread);
	};

	void release/verhoog() {
		locked/sem++;
		if (locked/sem <= 0) wakeup_and_dequeue(other_thread);
	};
};
```
