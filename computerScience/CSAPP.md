# Computer Systems: A Programmer's Perspective - System Basic Notes

## 机器码与进制转换

### 浮点数

规格化浮点数: 1.xxx * 2^(exp - 127) - e.g `5 = 5.0 = 1.25 * 2^(129 - 127)`

-   xxx: 尾数
-   exp: 阶码

### Stack Frame

![stack frame](img/stack_frame.png)

```ass
# 准备阶段
# Caller-Save: %eax %ecx %edx
# Callee-Save: %ebx %esi %edi
# 传参顺序: rdi, dsi, rdx, rcx, r8, r9, stack

pushl %ebp
movl %esp, %ebp
pushl %ebx

# 结束阶段

movl -4(%ebp), %ebx
movl %ebp, %esp
popl %ebp
ret
```

`x86_64`: 可使用超出 Stack Pointer 128 bytes 的内存区域, 称为 Red Zone.

## Architecture

## Optimization

### Replacement

-   用多条 Shift/Add/Sub 指令, 代替 Mul/Div

### Unrolling(Duff's Device)

增大循环的步长 - Duff's Device 以 7 为步长:

-   提升循环的运行效率
-   一次循环内: 可先将所有数据先读出来(Memory State),将进行计算(Excute State), 从而消除 Load/Use 冒险而产生的 Bubble
