<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Operating System Basic Notes](#operating-system-basic-notes)
	- [基本概念](#基本概念)
		- [操作系统内核特征](#操作系统内核特征)
		- [操作系统的演变](#操作系统的演变)
	- [启动](#启动)
		- [BIOS](#bios)
		- [启动顺序](#启动顺序)
			- [寄存器](#寄存器)
			- [BIOS](#bios)
			- [Bootloader](#bootloader)
				- [保护模式与段机制](#保护模式与段机制)
				- [GCC 内联汇编](#gcc-内联汇编)

<!-- /TOC -->

# Operating System Basic Notes

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

##### GCC 内联汇编

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
