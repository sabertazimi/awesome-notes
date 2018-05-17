# Virtualization Basic Notes

## LXC

### Linux Namespaces

LXC 所实现的隔离性主要是来自内核的命名空间

*   PID Namespace: 隔离进程
*   Network Namespace: 隔离网络
*   IPC Namespace: 隔离消息
*   Mount Namespace: 隔离文件系统
*   UTS Namespace: 隔离 hostname
*   Users Namespace

```go
package main

import (
    "log"
    "os"
    "os/exec"
    "syscall"
)

func main() {
    switch os.Args[1] {
    case "run":
        run()
    case "child":
        child()
    default:
        log.Fatal("Invalid command")
    }
}

func run() {
    cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
    cmd.Stdin = os.Stdin
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    cmd.SysProcAttr = &syscall.SysProcAttr {
        Cloneflags: syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID | syscall.CLONE_NEWNS | syscall.CLONE_NEWUSER,
        Credential: &syscall.Credential{Uid: 0, Gid: 0},
        UidMappings: []syscall.SysProcIDMap{
            {ContainerID: 0, HostID: os.Getuid(), Size: 1},
        },
        GidMappings: []syscall.SysProcIDMap{
            {ContainerID: 0, HostID: os.Getgid(), Size: 1},
        },
    }

    must(cmd.Run())
}

func child() {
    log.Printf("running %v as PID %d\n", os.Args[2:], os.Getpid())

    cmd := exec.Command(os.Args[2], os.Args[3:]...)
    cmd.Stdin = os.Stdin
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr

    must(syscall.Sethostname([]byte("mocker")))
    must(syscall.Chroot("/home/sabertazimi/rootfs"))
    must(syscall.Chdir("/"))
    must(syscall.Mount("proc", "proc", "proc", 0, ""))
    must(cmd.Run())
    must(syscall.Unmount("proc", 0))
}

func must(err error) {
    if err != nil {
        log.Fatal(err)
    }
}
```

### chroot

### Control Groups (cgroups)

resources limitation: CPU, Memory, Disk I/O, Process numbers, Network, Device
