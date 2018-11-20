# Linux Basic Notes

<!-- TOC -->

- [Linux Basic Notes](#linux-basic-notes)
  - [重装Linux](#重装linux)
  - [ssh命令](#ssh命令)
    - [编辑~/.ssh/config文件](#编辑sshconfig文件)
    - [`ssh -D`](#ssh--d)
    - [密钥文件](#密钥文件)
    - [远程传输文件](#远程传输文件)
  - [命令优先级:(用于区别同名命令)](#命令优先级用于区别同名命令)
  - [Linux文件架构](#linux文件架构)
  - [命令操作](#命令操作)
    - [基本处理命令](#基本处理命令)
      - [ls](#ls)
      - [cd](#cd)
      - [pwd](#pwd)
      - [rm](#rm)
      - [cp](#cp)
      - [mv](#mv)
      - [ln](#ln)
    - [基本搜索命令](#基本搜索命令)
      - [locate 文件名](#locate-文件名)
      - [type](#type)
      - [apropos](#apropos)
      - [whereis/whatis 系统命令名](#whereiswhatis-系统命令名)
      - [which 系统命令名(同时查询别名及结果颜色)](#which-系统命令名同时查询别名及结果颜色)
      - [`find [搜索路径] [可选参数] [文件名](可加"")`](#find-搜索路径-可选参数-文件名可加)
      - [`grep` `[可选参数] “字符串” 文件名`](#grep-可选参数-字符串-文件名)
    - [Process Command](#process-command)
      - [ps](#ps)
      - [top](#top)
      - [jobs](#jobs)
      - [bg](#bg)
        - [fg](#fg)
      - [kill](#kill)
      - [killall](#killall)
      - [shutdown](#shutdown)
      - [pstree](#pstree)
      - [vmstat](#vmstat)
      - [xload/tload](#xloadtload)
      - [screen](#screen)
    - [I/O Command](#io-command)
      - [cat](#cat)
      - [sort](#sort)
      - [uniq](#uniq)
      - [grep](#grep)
      - [wc](#wc)
      - [head/tail](#headtail)
      - [tee](#tee)
      - [nl](#nl)
      - [fold](#fold)
      - [fmt](#fmt)
      - [pr](#pr)
      - [printf](#printf)
    - [帮助命令](#帮助命令)
      - [`man` `[可选参数] 命令名称`](#man-可选参数-命令名称)
      - [系统命令 --help](#系统命令---help)
      - [help shell内部命令](#help-shell内部命令)
      - [info](#info)
    - [压缩命令](#压缩命令)
      - [.zip](#zip)
      - [.gz](#gz)
      - [.bz2](#bz2)
      - [.tar.gz/.tar.bz2](#targztarbz2)
      - [.7z](#7z)
    - [挂载命令](#挂载命令)
    - [用户命令](#用户命令)
    - [用户管理命令](#用户管理命令)
      - [组操作](#组操作)
        - [创建组](#创建组)
        - [修改组](#修改组)
        - [删除组](#删除组)
        - [查看组](#查看组)
      - [用户操作](#用户操作)
        - [增加用户](#增加用户)
        - [修改用户](#修改用户)
        - [删除用户](#删除用户)
        - [查看用户](#查看用户)
        - [限制用户](#限制用户)
    - [权限管理命令](#权限管理命令)
      - [普通权限](#普通权限)
      - [ACL权限](#acl权限)
      - [sudo权限](#sudo权限)
      - [SetUID/SetGID权限——可执行程序/目录+普通用户临时获得root权限 （rws）](#setuidsetgid权限可执行程序目录普通用户临时获得root权限-rws)
    - [磁盘管理命令](#磁盘管理命令)
      - [修复命令](#修复命令)
      - [分区命令](#分区命令)
        - [fdisk](#fdisk)
        - [parted](#parted)
    - [包管理命令](#包管理命令)
      - [rpm命令](#rpm命令)
      - [yum](#yum)
      - [源码包安装](#源码包安装)
    - [网络连接命令](#网络连接命令)
      - [wget](#wget)
    - [网络管理命令](#网络管理命令)
      - [arp -a ——显示地址解析协议(IP地址—网卡地址)](#arp--a-显示地址解析协议ip地址网卡地址)
      - [netstat -an——查看本机启用的端口](#netstat--an查看本机启用的端口)
      - [nslookup domain_name——查看DNS解析器](#nslookup-domain_name查看dns解析器)
      - [ping -c ip/domain——探测网络状况](#ping--c-ipdomain探测网络状况)
      - [`telnet [ip/domain] [端口]——远程管理与端口探测命令`](#telnet-ipdomain-端口远程管理与端口探测命令)
      - [`traceroute [-n IP] domain —— 路由跟踪命令`](#traceroute--n-ip-domain--路由跟踪命令)
      - [NetFilter框架](#netfilter框架)
    - [网络扫描命令](#网络扫描命令)
      - [`fping -a -u -g -f [target] —— 批量扫描主机地址`](#fping--a--u--g--f-target--批量扫描主机地址)
      - [`hping -p -S -a —— 可伪造IP地址`](#hping--p--s--a--可伪造ip地址)
      - [`traceroute  -n -I -T -p —— 路由扫描`](#traceroute---n--i--t--p--路由扫描)
      - [`mtr  —— 路由扫描`](#mtr---路由扫描)
      - [`nmap —— 批量主机服务扫描`](#nmap--批量主机服务扫描)
      - [ncat —— 批量主机服务扫描](#ncat--批量主机服务扫描)
    - [脚本运行命令](#脚本运行命令)
      - [定时任务](#定时任务)
        - [crontab](#crontab)
      - [后台任务](#后台任务)
      - [开机任务](#开机任务)
    - [历史记录命令](#历史记录命令)
      - [history](#history)
      - [ctrl-r](#ctrl-r)
      - [History Shortcuts](#history-shortcuts)
    - [Driver Command](#driver-command)
      - [Touchpad Synaptics](#touchpad-synaptics)
    - [并行命令](#并行命令)
  - [Shell编程](#shell编程)
    - [Warings](#warings)
    - [文件重定向](#文件重定向)
    - [变量](#变量)
      - [基本变量](#基本变量)
      - [built-in 变量](#built-in-变量)
      - [环境变量](#环境变量)
        - [Env Commnad](#env-commnad)
    - [数值运算](#数值运算)
      - [declare命令](#declare命令)
    - [Bash Expansions](#bash-expansions)
    - [流程控制语句](#流程控制语句)
      - [if语句](#if语句)
      - [case语句](#case语句)
      - [for语句](#for语句)
      - [while语句与until语句](#while语句与until语句)
    - [Bash Array](#bash-array)
    - [Bash Function](#bash-function)
    - [Bash IO](#bash-io)
    - [信号](#信号)
    - [Bash Debugging](#bash-debugging)
    - [Interactive Shell Script Tips](#interactive-shell-script-tips)
  - [Terminal](#terminal)
  - [Perf Tools](#perf-tools)
    - [`uptime`](#uptime)
    - [`dmesg | tail`](#dmesg--tail)
    - [`vmstat 1`](#vmstat-1)
    - [`mpstat -P ALL 1`](#mpstat--p-all-1)
    - [`pidstat 1`](#pidstat-1)
    - [`iostat -xz 1`](#iostat--xz-1)
    - [`free -m`](#free--m)
    - [`sar -n DEV 1`](#sar--n-dev-1)
    - [`sar -n TCP,ETCP 1`](#sar--n-tcpetcp-1)
    - [`top`](#top)

<!-- /TOC -->

## 重装Linux

- 自动挂载项 /etc/fstab  etc/rc.local
- 自定义脚本-新建目录(加入环境变量)
- 自定义别名 ~/.bashrc

## ssh命令

### 编辑~/.ssh/config文件

- Host 别名
  - HostName 主机名(ip)           `ssh user@ip`
  - Port 可忽略
  - User 登录用户名               `ssh user@ip`
  - PreferredAuthentications publickey
  - IdentityFile 密钥文件完整路径 `ssh -i file`

```bash
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa
Host cs.github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/cs
Host cloud
    HostName xx.org
    User  root
    IdentityFile ~/.ssh/dsl_private_key
Host bwg
    HostName 23.106.150.152
    User root
    Port 29692
```

```bash
git clone git@github.com:user/repo
git clone git@cs.github.com:user/repo
```

### `ssh -D`

```bash
ssh -qTfnN -D 7070 bwg
google-chrome socks5 127.0.0.1 7070
```

### 密钥文件

- 登录远程主机：ssh -i hustlyl root@119.29.140.60
- 文件传输：sftp -i hustlyl root@119.29.140.60
- 登录数据库：mysql -h 10.66.135.125 -P 3306 -uroot -p

### 远程传输文件

```bash
rsync -ax -e 'ssh -c blowfish' /root/start_dir root@x.x.x.x:/root/dest_dir
```

## 命令优先级:(用于区别同名命令)

包含路径命令  ./vmtools.pl
\>别名命令
\>bash内部命令
\>$PATH包含目录内的命令  /bin /sbin

## Linux文件架构

```bash
man hier
```

通过源码包安装的软件，可以通过 ./configure --prefix=/opt/

/usr/src是内核源码存放的目录

## 命令操作

### 基本处理命令

#### ls

- -lh(long human)
- -ld(long directory)
- -i inode(ID号) --color==auto

权限(user/group/other) 引用计数 user group 文件大小 文件修改时间 文件名

#### cd

- -上次目录
- ..上级目录

#### pwd

print working directory

#### rm

- –r delete directory
- –f delete forcely
- -i 显示确认信息

#### cp

- -r copy directory
- -p copy property
- -d copy link
- -a --all(-pdr)
- -i 显示确认信息

#### mv

无需参数(改名+移动)

- -i显示确认信息

#### ln

link命令  .bak/.hard(硬链接) .soft(软链接：创建链接时填写绝对路径)

ln -s(创建软链接) [原文件]  [目标文件]

### 基本搜索命令

#### locate 文件名

结合updatedb命令(该命令一般自动1天/次)

#### type

indicate how a command name is interpreted

#### apropos

display a list of appropriate commands

#### whereis/whatis 系统命令名

#### which 系统命令名(同时查询别名及结果颜色)

#### `find [搜索路径] [可选参数] [文件名](可加"")`

- -name
- -iname 不区分大小写
- -user `user_name` 按照所有者搜索
- -nouser 搜索没有所有者的文件
- -atime(文件访问时间)/-ctime(改变文件属性)/-mtime(改变文件内容)  -10(十天内)/10(十天当天)/+10(十天前)
- -size(文件大小) -25k(小于25k)/25M(25M)/+25G(大于25G)
- -inum `inode_number`
- -a / -o 逻辑与/逻辑或(左右两端搜索条件)
- -exec/-ok `system_command_list {} \;对搜索结果执行操作

#### `grep` `[可选参数] “字符串” 文件名`

- -I 不区分大小写
- -v 排除指定字符串

### Process Command

#### ps

report a snapshot of current processes

#### top

display tasks

#### jobs

list active jobs

#### bg

place a job in the background

##### fg

place a job in the foreground

#### kill

send a signal to a process

#### killall

kill processes by name

#### shutdown

shutdown or reboot the system

#### pstree

outputs a process list arranged in a tree-like pattern

#### vmstat

outputs a snapshot of system resource usage:
including memory, swap and disk I/O

#### xload/tload

draws a graph showing system load over time

#### screen

```bash
screen -S screenName
screen -ls
screen -r
```

- Ctrl+d  // detach window
- Ctrl+k  // kill window

### I/O Command

#### cat

concatenate files

#### sort

sort lines of text

#### uniq

report or omit repeated lines

#### grep

print lines matching a pattern

#### wc

print newline, word, and byte counts for each file

#### head/tail

output the first/last part of a file

```bash
head -n 5 filename
tail -f filename
```

#### tee

read from standard input and write to standard output and files

```bash
[me@linuxbox ~]$ ls /usr/bin | tee ls.txt | grep zip
bunzip2
bzip2
....
```

#### nl

number lines

#### fold

wrap each line to a specified length

#### fmt

a simple text formatter

#### pr

prepare text for printing

#### printf

format and print data

### 帮助命令

#### `man` `[可选参数] 命令名称`

- -f显示操作等级
- -k包含匹配
- -1/2/.../9显示命令不同操作等级的帮助

1. Commands (Programs)
  Those commands that can be executed by the user from within a shell.
2. System calls
  Those functions which must be performed by the kernel.
3. Library calls
  Most of the libc functions.
4. Special files (devices)
  Files found in /dev.
5. File formats and conventions
  The format for /etc/passwd and other human-readable files.
6. Games
7. Conventions and miscellaneous
  Overviews of various topics, conventions and protocols,
  character set standards, and miscellaneous other things.
8. System management commands
  Commands like mount(8), many of which only root can execute.

#### 系统命令 --help

只显示可选参数帮助

#### help shell内部命令

显示shell内部命令帮助，如cd命令(shell内部命令)

#### info

显示大型帮助文档 - enter进入  u返回  p上一节  n下一节  q退出

### 压缩命令

#### .zip

- zip -r(目录) 压缩文件 源文件/源目录
- unzip 源文件 -d 指定路径

#### .gz

- gzip 源文件
- gzip –c 源文件 > 压缩文件
- gzip  -r 源目录 将源目录下所有子文件分别单独压缩
- gzip –d(解压缩) 文件
- gunzip 压缩文件

#### .bz2

不可压缩目录

- bzip2 –k(保留源文件) 源文件
- bzip2 –d(解压缩) –k(保留压缩文件) 压缩文件
- bunzip2 –k(保留压缩文件) 压缩文件

#### .tar.gz/.tar.bz2

tar [可选参数] 压缩文件(可指定压缩路径)  [-c 解压缩路径]源文件/源目录

- -z 将.tar压缩为.tar.gz -j 将.tar压缩为.tar.bz2
- -c 打包 -x 解打包
- -t 查看压缩文件
- -v 显示过程
- -f 指定压缩文件名
- -C指定解压缩路径
- -zcvf/-zxvf/-ztcf -jcvf/-jxvf/-jtvf

#### .7z

```bash
7z x manager.7z -r -o /home/xx
7z a -t7z -r manager.7z /home/manager/*
```

- a: add
- x: extract
- -r: recursive
- -o: specific path
- -t: type

### 挂载命令

mount [-t 文件系统] [-o 特殊选项] 设备文件名 挂载点(挂载目录/media /misc /mnt)

- 无参数 显示当前挂载设备
- -a  依据/etc/fstab文件配置,自动挂载

umount 设备文件名/挂载点

fdisk –l

### 用户命令

- w/who 查看用户详细信息
- last 显示所有用户登陆信息(/var/log/wtmp)
- lastlog 显示所有用户最后一次登陆时间(/var/log/lastlog)

### 用户管理命令

#### 组操作

##### 创建组

groupadd test

##### 修改组

groupmod -n test2 test -g

##### 删除组

groupdel test2

##### 查看组

- groups someuser
- cat /etc/group

```bash
cat /etc/passwd | awk -F [:] ‘{print $4}’
\ |sort|uniq | getent group |awk -F [:] ‘{print $1}’
```

#### 用户操作

##### 增加用户

useradd [options] LOGIN

Options:

- -b, --base-dir BASE_DIR       设置基本路径作为用户的登录目录
- -c, --comment COMMENT         对用户的注释
- -d, --home-dir HOME_DIR       设置用户的登录目录
- -D, --defaults                改变设置
- -e, --expiredate EXPIRE_DATE  设置用户的有效期
- -f, --inactive INACTIVE       用户过期后，让密码无效
- -g, --gid GROUP               使用户只属于某个组
- -G, --groups GROUPS           使用户加入某个组(附设组)
- -h, --help                    帮助
- -k, --skel SKEL_DIR           指定其他的skel目录
- -K, --key KEY=VALUE           覆盖 /etc/login.defs 配置文件
- -m, --create-home             自动创建登录目录
- -l,                           不把用户加入到lastlog文件中
- -M,                           不自动创建登录目录
- -r,                           建立系统账号
- -o, --non-unique              允许用户拥有相同的UID
- -p, --password PASSWORD       为新用户使用加密密码
- -s, --shell SHELL             登录时候的shell
- -u, --uid UID                 为新用户指定一个UID
- -Z, --selinux-user SEUSER     use a specific SEUSER for the SELinux user mapping

`useradd test`

设置密码: `passwd test`

##### 修改用户

usermod -d /home/test -G test2 test

- -l 新用户名 旧用户名 修改用户名
- -g 新用户组 目标用户 改变用户所属组

gpasswd -a test test2  将用户test加入到test2组(附设组)

gpasswd -d test test2  将用户test从test2组中移出

##### 删除用户

userdel test -r同时删除用户登录目录(/home/xxx)

##### 查看用户

w/who 查看当前登录的所有用户

whoami 查看当前登录用户名

finger apacheuser 查看单个用户信息

##### 限制用户

- passwd -l 用户名  锁定用户
- passwd -u 用户名  解锁用户
- passwd -d 用户名  清除用户密码

### 权限管理命令

#### 普通权限

- chown 用户名：组名 文件名
- chgrp 组名 文件名
- umask存储位置 ——/etc/profile
- 文件默认权限 = 文件默认最大权限rw-(666)  减去  umask值(如----w--w-)(022)
- 目录默认权限 = 目录默认最大权限rwx(777) 减去 umask值

#### ACL权限

- 查看分区ACL权限是否开启 dumpe2fs -h 设备分区名
- 临时开启分区ACL权限        mount -o remount,acl 设备分区名
- 永久开启分区ACL权限        /etc/fstab

- setfacl -m  (d:默认权限) u/g:用户名/组名:权限(rwx)  文件名
- getfacl 文件名——查看文件ACL权限

#### sudo权限

/etc/sudoers.tmp

#### SetUID/SetGID权限——可执行程序/目录+普通用户临时获得root权限 （rws）

- chmod 0xxx  取消双权限
- chmod 2xxx  设置SetGID权限
- chmod 4xxx  设置SetUID权限
- chmod 6xxx  设置双权限

### 磁盘管理命令

主分区(primary)与延伸分区(extended) 延伸分区可以继续划分成逻辑分区(logical)

#### 修复命令

```bash
sudo debugfs /dev/sda9
> debugfs: lsdel
```

#### 分区命令

##### fdisk

分区表类型MBR

n p e l 新 主 逻辑 扩展 分区 w激活

##### parted

分区表类型MBR/GPT

- mklabel     选择分区表类型
- print       打印分区信息
- mkpart      新建分区
- rm          删除分区
- unit        选择单位
- quit        结束分区

### 包管理命令

#### rpm命令

安装和卸载时同时存在依赖性(包依赖、库依赖)

rpm查询:

- -q 包名 查询已安装的包  //必备参数
- -a 查询所有已安装的包
- -i 查询软件信息
- -l list
- -f 查询系统文件属于哪个软件包
- -R查询软件包的依赖性
- -p 查询未安装包   //普适参数

rpm校验(查看Cracker信息):

- -V 校验已安装包 相应信息不是.号便是被修改项 可用于找回丢失的系统命令

#### yum

源配置文件:/etc/yum.repos.d

```bash
cd /etc/yum.repos.d
mv CentOS-Base.repo CentOS-Base.repo.bk
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
yum makecache
```

- yum list
- yum search 'keyword'
- yum -y(自动回答yes) install 包名
- yum -y update 包名
- yum -y remove 包名
- yum grouplist
- yum groupinstall 软件组名
- yum groupremove 软件组名

#### 源码包安装

指定位置:

- /usr/local/软件名/
- /usr/local/src/软件名/

(如上述脚本出错，执行make clean）

```bash
make install
```

e.g apche  /var/www/html/index.html  /usr/local/apache/htdocs/index.html

### 网络连接命令

#### wget

- 下载全站资料
- -P  表示下载到哪个目录
- -r  表示递归下载
- -np 表示不下载旁站连接.
- -k  表示将下载的网页里的链接修改为本地链接.
- -p  获得所有显示网页所需的元素

```bash
wget -r -p -np -k -P ~/tmp/ http://java-er.com
```

### 网络管理命令

#### arp -a ——显示地址解析协议(IP地址—网卡地址)

- 网际互联层：IP协议(网际)、IGMP协议(互联网组管理)、ICMP协议(互联网控制报文)
- 传输层：TCP协议(传输控制)、UDP协议(用户数据报)

#### netstat -an——查看本机启用的端口

- (-a查看所有连接和监听端口 -n显示IP地址和端口号)
- -t tcp协议端口
- -u udp协议端口
- -l 监听状态服务

#### nslookup domain_name——查看DNS解析器

/etc/network/interfaces

主机名:

- /etc/hostname
- /etc/sysconfig/network

- /etc/resolv.conf

#### ping -c ip/domain——探测网络状况

#### `telnet [ip/domain] [端口]——远程管理与端口探测命令`

#### `traceroute [-n IP] domain —— 路由跟踪命令`

#### NetFilter框架

nftables  命令行工具：nft

### 网络扫描命令

预防策略——SYN攻击、DDOS攻击

#### `fping -a -u -g -f [target] —— 批量扫描主机地址`

#### `hping -p -S -a —— 可伪造IP地址`

#### `traceroute  -n -I -T -p —— 路由扫描`

#### `mtr  —— 路由扫描`

#### `nmap —— 批量主机服务扫描`

- -P ICMP
- -sS TCP SYN
- -sT TCP connect()
- -sU UDP

#### ncat —— 批量主机服务扫描

- -w 设置超时时间
- -v 显示命令执行过程
- -z 一个输入输出模式
- -u UDP协议

### 脚本运行命令

exec 1>>output.log
exec 2>>error.log

#### 定时任务

##### crontab

- /etc/crontab
- [Crontab Quick Tutorial](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)

crontab -l(list)
crontab -e(establish)

- m,n —— 分隔多个时间
- m-n —— 表示时间范围
- /n —— 表示每隔n时间
- 天数 与 星期 设置 之间 是  “或”关系

- /var/spool/cron/user_name/
- /var/log/con
- /etc/cron.*ly 时间表

/etc/anacrontab

anacron —— 异步时间表

#### 后台任务

- jobs —— 所有作业
- atq —— 延时作业队列

- at -M(不使用邮件发送运行结果) -f filename deltatime
- atrm 作业号/名

- bg/fg 作业号/名
- nohup 脚本 & —— 脱离控制台并后台运行脚本

19 ~ -20 （-20优先级最高）

- nice -n number 作业号/名
- renice number -p PID

#### 开机任务

- /etc/rc.local —— 系统开机任务
- /etc/profile/  /etc/bash.bashrc —— bash启动任务/远程登陆任务
- /etc/bash.bashrc —— SSH连接任务

### 历史记录命令

#### history

- -c 清除历史命令
- -w (~/.bash_history) 保存历史命令

/etc/profile中修改HISTSIZE !n/!!/!字符串  重复执行第n条/上一条/指定开头的历史命令

```bash
# repeat history command
!number
```

#### ctrl-r

press ctrl-r 提示符改变，显示我们正在执行反向增量搜索。
搜索过程是”反向的”，因为我们按照从”现在”到过去 某个时间段的顺序来搜寻。
下一步，我们开始输入要查找的文本搜索返回我们需要的结果。
(enter to execute, ctrl-j to copy)

#### History Shortcuts

|command|function|
|:--------|:------------------------|
|Ctrl-p|移动到上一个历史条目|
|Ctrl-n|移动到下一个历史条目|
|Alt-<|移动到历史列表开头|
|Alt->|移动到历史列表结尾|
|Ctrl-r|反向增量搜索|
|Alt-p|反向搜索，非增量搜索|
|Alt-n|向前搜索，非增量|
|Ctrl-o|执行历史列表中的当前项，并移到下一个|

### Driver Command

#### Touchpad Synaptics

```bash
synclient TouchpadOff=0
```

### 并行命令

命令间插入符

- command1;command2      顺序执行，相当于C语言中语句结束符
- command1&&command2     命令同时执行(当1正确时)或同时不执行(当1出错时)
- command1 ||  command2  只执行一个命令(正确命令)
- command1  |  command2  前一正确命令的输出结果作为后一命令的输入结果

> e.g ls && echo yes >> .log || echo no >> .log

## Shell编程

### Warings

- = 左右无空格
- () [] 内部最好有空格
- 数值运算用 (()) 或 $(())

### 文件重定向

- `>` 文件名/输出设备名        覆盖标准输出重定向
- `>>` 文件名/输出设备名    追加标准输出重定向
- 2>(右端无空格)文件名/输出设备名  覆盖错误输出重定向
- 2>>(右端无空格)文件名/输出设备名 追加错误输出重定向
- `>/>> 文件 2>&1  &>/&>>文件`  覆盖/追加正确输出与错误输出同时重定向
- `</<<` 文件名/输入设备名         覆盖/追加标准输入重定向

### 变量

#### 基本变量

- =  : 左右两端不可有空格
- ‘ ’: 完全标准字符串
- “ ”: 格式化字符串
- 调用变量值：$变量名
- set/unset——设置/取消变量

#### built-in 变量

- $@: argv[1], ..., argv[n]
- $#: argc
- $?: exit code of last command

```bash
if [ "$?" -ne "0" ];then
    echo "sorry, command execution failed!"
fi
```

每次 shift 命令执行的时候，变量 $2 的值会移动到变量 $1 中，变量 $3 的值会移动到变量 $2 中.
变量 $# 的值也会相应的减1

```bash
#!/bin/bash
# posit-param2: script to display all arguments
count=1
while [[ $# -gt 0 ]]; do
    echo "Argument $count = $1"
    count=$((count + 1))
    shift
done
```

```bash
usage () {
    echo "$PROGNAME: usage: $PROGNAME [-f file | -i]"
    return
}
# process command line options
interactive=
filename=
while [[ -n $1 ]]; do
    case $1 in
    -f | --file)            shift
                            filename=$1
                            ;;
    -i | --interactive)     interactive=1
                            ;;
    -h | --help)            usage
                            exit
                            ;;
    *)                      usage >&2
                            exit 1
                            ;;
    esac
    shift
done
```

#### 环境变量

- /etc/profile.d/*.sh
- ~/.bash_profile
- ~/.bashrc
- /etc/profile
- /etc/bash.bashrc
- /etc/issue——shell登录信息
- PS1环境变量——shell头行打印信息
- PATH环境变量

##### Env Commnad

- env——查看环境变量
- export 变量名=变量值——设置环境变量
- printenv

### 数值运算

#### declare命令

### Bash Expansions

- `$(())` or `$[]`: arithmetic expansion

一般地, 将数值运算用 `(())` `[[]]` 或 `$(())` 括起, 可以确保变量不会被识别为 string

```bash
read x
read y

echo $((x + y))
echo $((a < b ? a : b))

if ((a > b))
then
    echo "a > b"
fi

if [[ a -gt b ]]
then
    echo "a > b"
fi

if [ "$a" -gt "$b" ]
then
    echo "a > b"
fi
```

- `[[ xxx ]]`: condition
- `(( xxx ))`: arithemetic condition

|operator|function|
|:-----------|:-----------|
|! EXPRESSION|The EXPRESSION is false|
|-n STRING|The length of STRING is greater than zero|
|-z STRING|The lengh of STRING is zero (ie it is empty)|
|STRING1 == STRING2|STRING1 is equal to STRING2|
|STRING1 != STRING2|STRING1 is not equal to STRING2|
|STRING1 > STRING2|STRING1 sorts after STRING2|
|STRING1 < STRING2|STRING1 sorts before STRING2|
|INTEGER1 -eq INTEGER2|INTEGER1 is numerically equal to INTEGER2|
|INTEGER1 -gt INTEGER2|INTEGER1 is numerically greater than INTEGER2|
|INTEGER1 -lt INTEGER2|INTEGER1 is numerically less than INTEGER2|
|-d FILE|FILE exists and is a directory|
|-e FILE|FILE exists|
|-r FILE|FILE exists and the read permission is granted|
|-s FILE|FILE exists and it's size is greater than zero (ie. it is not empty)|
|-w FILE|FILE exists and the write permission is granted|
|-x FILE|FILE exists and the execute permission is granted|
|`AND -a &&`||
|`OR -o ||`||
|`NOT ! !`||

- {}: group regexp

```bash
echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b
```

- `${}`: string expansion
  - `${parameter:-word}`: 若 parameter 没有设置（例如，不存在）或者为空，展开结果是 word 的值。
    若 parameter 不为空，则展开结果是 parameter 的值
  - `${parameter:+word}`: 若 parameter 没有设置或为空，展开结果为空。
    若 parameter 不为空， 展开结果是 word 的值会替换掉 parameter 的值
  - `${parameter:=word}`: 若 parameter 没有设置或为空，展开结果是 word 的值。
    另外，word 的值会赋值给 parameter。
    若 parameter 不为空，展开结果是 parameter 的值
  - `${parameter:?word}`: 若 parameter 没有设置或为空，这种展开导致脚本带有错误退出，
    并且 word 的内容会发送到标准错误。
    若 parameter 不为空， 展开结果是 parameter 的值
  - `${!prefix*}` `${!prefix@}`: 这种展开会返回以 prefix 开头的已有变量名
  - `${#parameter}`: 展开成由 parameter 所包含的字符串的长度
  - `${parameter:offset}` `${parameter:offset:length}`: 提取一部分字符
  - `${parameter,,}` 把 parameter 的值全部展开成小写字母
  - `${parameter,}` 仅仅把 parameter 的第一个字符展开成小写字母
  - `${parameter^^}` 把 parameter 的值全部转换成大写字母
  - `${parameter^}` 仅仅把 parameter 的第一个字符转换成大写字母
  - `${parameter#pattern}` `${parameter##pattern}`,
    `${parameter%pattern}` `${parameter%%pattern}`: 从 paramter 所包含的字符串中清除开头/末尾一部分文本
  - `${parameter/pattern/string}`, `${parameter//pattern/string}`,
    `${parameter/#pattern/string}`, `${parameter/%pattern/string}`: replace

```bash
foo=file.txt.zip
echo ${foo#*.}
txt.zip
echo ${foo##*.}
zip

foo=file.txt.zip
echo ${foo%.*}
file.txt
echo ${foo%%.*}
file
```

```bash
foo=JPG.JPG
echo ${foo/JPG/jpg}
jpg.JPG
echo ${foo//JPG/jpg}
jpg.jpg
echo ${foo/#JPG/jpg}
jpg.JPG
echo ${foo/%JPG/jpg}
JPG.jpg
```

- $(): command result
- "": allow expansions string
- '': disallow expansions string

### 流程控制语句

#### if语句

```bash
if [[ 条件判断式 ]] ; then
    程序
fi
if [[ 条件判断式 ]]
    then
        程序
    else
        程序
fi

if [[ 条件判断式1 ]]
    then
        程序1
elif [[ 条件判断式2 ]]
    then
        程序2
……
else
        程序n
fi
```

#### case语句

```bash
case $变量名 in
    “值1”)
            程序
            ;;
    “值2”)
            程序
            ;;
    *)
            程序
;;
esac
```

|case pattern|function|
|:-----|:-----------------------------------------|
|`a)`|Matches if word equals "a"|
|`[[:alpha:]])`|Matches if word is a single alphabetic character|
|`???)`|Matches if word is exactly three characters long|
|`*.txt)|Matches if word ends with the characters “.txt”|
|`*)`|Matches any value of word|

```bash
#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Please Select:
1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
0. Quit
"
read -p "Enter selection [0-3] > "
case $REPLY in
    0)  echo "Program terminated."
        exit
        ;;
    1)  echo "Hostname: $HOSTNAME"
        uptime
        ;;
    2)  df -h
        ;;
    3)  if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        ;;
    *)  echo "Invalid entry" >&2
        exit 1
        ;;
esac
```

or case pattern

```bash
#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Please Select:
A. Display System Information
B. Display Disk Space
C. Display Home Space Utilization
Q. Quit
"
read -p "Enter selection [A, B, C or Q] > "
case $REPLY in
q|Q) echo "Program terminated."
     exit
     ;;
a|A) echo "Hostname: $HOSTNAME"
     uptime
     ;;
b|B) df -h
     ;;
c|C) if [[ $(id -u) -eq 0 ]]; then
         echo "Home Space Utilization (All Users)"
         du -sh /home/*
     else
         echo "Home Space Utilization ($USER)"
         du -sh $HOME
     fi
     ;;
*)   echo "Invalid entry" >&2
     exit 1
     ;;
esac
```

fall through case pattern (`;;&`)

```bash
#!/bin/bash
# case4-2: test a character
read -n 1 -p "Type a character > "
echo
case $REPLY in
    [[:upper:]])    echo "'$REPLY' is upper case." ;;&
    [[:lower:]])    echo "'$REPLY' is lower case." ;;&
    [[:alpha:]])    echo "'$REPLY' is alphabetic." ;;&
    [[:digit:]])    echo "'$REPLY' is a digit." ;;&
    [[:graph:]])    echo "'$REPLY' is a visible character." ;;&
    [[:punct:]])    echo "'$REPLY' is a punctuation symbol." ;;&
    [[:space:]])    echo "'$REPLY' is a whitespace character." ;;&
    [[:xdigit:]])   echo "'$REPLY' is a hexadecimal digit." ;;&
esac
```

#### for语句

```bash
for 变量 in 值1 值2 值3 …… 值n
    do
        程序
    done

`seq 1 50`  # 1 2 ... 50
{1..50}     # 1 2 ... 50
{0..10..2}  # 0 2 4 6 8 10

for (( 初始值;循环控制条件;变量变化 )); do
    程序
done
```

#### while语句与until语句

```bash
while [[ 条件判断式 ]]
    do
        程序
    done

until [[ 条件判断式 ]]
    do
        程序
    done
```

```bash
(( expression1 ))
while (( expression2 )); do
    commands
    (( expression3 ))
done
```

```bash
#!/bin/bash
# while-menu: a menu driven system information program
DELAY=3 # Number of seconds to display results
while [[ $REPLY != 0 ]]; do
    clear
    cat <<- _EOF_
        Please Select:
        1. Display System Information
        2. Display Disk Space
        3. Display Home Space Utilization
        0. Quit
    _EOF_
    read -p "Enter selection [0-3] > "
    if [[ $REPLY =~ ^[0-3]$ ]]; then
        if [[ $REPLY == 1 ]]; then
            echo "Hostname: $HOSTNAME"
            uptime
            sleep $DELAY
        fi
        if [[ $REPLY == 2 ]]; then
            df -h
            sleep $DELAY
        fi
        if [[ $REPLY == 3 ]]; then
            if [[ $(id -u) -eq 0 ]]; then
                echo "Home Space Utilization (All Users)"
                du -sh /home/*
            else
                echo "Home Space Utilization ($USER)"
                du -sh $HOME
            fi
            sleep $DELAY
        fi
    else
        echo "Invalid entry."
        sleep $DELAY
    fi
done
echo "Program terminated."
```

```bash
#!/bin/bash
# while-read: read lines from a file
while read distro version release; do
    printf "Distro: %s\tVersion: %s\tReleased: %s\n" \
        $distro \
        $version \
        $release
done < distros.txt
```

### Bash Array

- [Array Reference](http://billie66.github.io/TLCL/book/chap36.html)

### Bash Function

- 函数局部变量 local + 变量名
- 函数参数  :  $ + #/？/@/n
- 引用函数库文件  ——  source  sh文件名   /   .  sh文件名          可修改~/.bashrc文件

### Bash IO

```bash
#!/bin/bash
# read-validate: validate input
invalid_input () {
    echo "Invalid input '$REPLY'" >&2
    exit 1
}
read -p "Enter a single item > "
# input is empty (invalid)
[[ -z $REPLY ]] && invalid_input
# input is multiple items (invalid)
(( $(echo $REPLY | wc -w) > 1 )) && invalid_input
# is input a valid filename?
if [[ $REPLY =~ ^[-[:alnum:]\._]+$ ]]; then
    echo "'$REPLY' is a valid filename."
    if [[ -e $REPLY ]]; then
        echo "And file '$REPLY' exists."
    else
        echo "However, file '$REPLY' does not exist."
    fi
    # is input a floating point number?
    if [[ $REPLY =~ ^-?[[:digit:]]*\.[[:digit:]]+$ ]]; then
        echo "'$REPLY' is a floating point number."
    else
        echo "'$REPLY' is not a floating point number."
    fi
    # is input an integer?
    if [[ $REPLY =~ ^-?[[:digit:]]+$ ]]; then
        echo "'$REPLY' is an integer."
    else
        echo "'$REPLY' is not an integer."
    fi
else
    echo "The string '$REPLY' is not a valid filename."
fi
```

```bash
#!/bin/bash
# read-menu: a menu driven system information program
clear
echo "
Please Select:

    1. Display System Information
    2. Display Disk Space
    3. Display Home Space Utilization
    0. Quit
"
read -p "Enter selection [0-3] > "

if [[ $REPLY =~ ^[0-3]$ ]]; then
    if [[ $REPLY == 0 ]]; then
        echo "Program terminated."
        exit
    fi
    if [[ $REPLY == 1 ]]; then
        echo "Hostname: $HOSTNAME"
        uptime
        exit
    fi
    if [[ $REPLY == 2 ]]; then
        df -h
        exit
    fi
    if [[ $REPLY == 3 ]]; then
        if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        exit
    fi
else
    echo "Invalid entry." >&2
    exit 1
fi
```

```bash
# interactive mode
if [[ -n $interactive ]]; then
    while true; do
        read -p "Enter name of output file: " filename
        if [[ -e $filename ]]; then
            read -p "'$filename' exists. Overwrite? [y/n/q] > "
            case $REPLY in
            Y|y)    break
                    ;;
            Q|q)    echo "Program terminated."
                    exit
                    ;;
            *)      continue
                    ;;
            esac
        elif [[ -z $filename ]]; then
            continue
        else
            break
        fi
    done
fi
```

### 信号

- man 7 signal —— 传递信号给进程
- CTRL + C —— SIGINT
- CTRL + Z —— SIGSTP
- kill/killall —— SIGINT
- trap SIG*/EXIT —— 捕捉信号(后 + 忽略信号/默认处理信号/自定义处理信号)
- trap – SIG*/EXIT  —— 移除信号

### Bash Debugging

`-x` option

```bash
#!/bin/bash -x
# trouble: script to demonstrate common errors
number=1
if [ $number = 1 ]; then
    echo "Number is equal to 1."
else
    echo "Number is not equal to 1."
fi
```

```bash
#!/bin/bash
# trouble: script to demonstrate common errors
number=1
echo "number=$number" # DEBUG
set -x # Turn on tracing
if [ $number = 1 ]; then
    echo "Number is equal to 1."
else
    echo "Number is not equal to 1."
fi
set +x # Turn off tracing
```

### Interactive Shell Script Tips

- help option

```bash
#!/bin/sh
if [[ ${#@} -ne 0 ]] && [[ "${@#"--help"}" = "" ]]; then
  printf -- '...help...\n';
  exit 0;
fi;
```

- slient option

```bash
#!/bin/sh
if [[ ${#@} -ne 0 ]] && [[ "${@#"--silent"}" = "" ]]; then
  stty -echo;
fi;
# ...
# before point of intended output:
stty +echo && printf -- 'intended output\n';
# silence it again till end of script
stty -echo;
# ...
stty +echo;
exit 0;
```

- command available

```bash
#!/bin/sh
_=$(command -v docker);
if [[ "$?" != "0" ]]; then
  printf -- 'You don\'t seem to have Docker installed.\n';
  printf -- 'Get it: https://www.docker.com/community-edition\n';
  printf -- 'Exiting with code 127...\n';
  exit 127;
fi;
```

- absolute path

```bash
#!/bin/sh
CURR_DIR="$(dirname $0);"
printf -- 'moving application to /opt/app.jar';
mv "${CURR_DIR}/application.jar" /opt/app.jar;
```

- error handle

```bash
#!/bin/sh
error_handle() {
  stty echo;
}

if [[ ${#@} -ne 0 ]] && [[ "${@#"--silent"}" = "" ]]; then
  stty -echo;
  trap error_handle INT;
  trap error_handle TERM;
  trap error_handle KILL;
  trap error_handle EXIT;
fi;
# ...
```

- loading progress

```bash
#!/bin/sh
printf -- 'Performing asynchronous action..';
./trigger-action;
DONE=0;
while [ $DONE -eq 0 ]; do
  ./async-checker;
  if [ "$?" = "0" ]; then DONE=1; fi;
  printf -- '.';
  sleep 1;
done;
printf -- ' DONE!\n';
```

## Terminal

```bash
sudo update-alternatives --config x-terminal-emulator
```

## Perf Tools

### `uptime`

### `dmesg | tail`

### `vmstat 1`

### `mpstat -P ALL 1`

### `pidstat 1`

### `iostat -xz 1`

### `free -m`

### `sar -n DEV 1`

### `sar -n TCP,ETCP 1`

### `top`
