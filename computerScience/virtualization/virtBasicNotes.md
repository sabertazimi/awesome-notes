# Virtualization Basic Notes

<!-- TOC -->

- [Virtualization Basic Notes](#virtualization-basic-notes)
  - [LXC](#lxc)
    - [Linux Namespaces](#linux-namespaces)
    - [chroot](#chroot)
    - [Control Groups (cgroups)](#control-groups-cgroups)

<!-- /TOC -->

## LXC

### Linux Namespaces

LXC 所实现的隔离性主要是来自内核的命名空间

- PID Namespace: 隔离进程
- Network Namespace: 隔离网络
- IPC Namespace: 隔离消息
- Mount Namespace: 隔离文件系统
- UTS Namespace: 隔离 hostname
- Users Namespace

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
        Cloneflags: syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID
          | syscall.CLONE_NEWNS | syscall.CLONE_NEWUSER,
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

    // cg()

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

```go
must(syscall.Chroot("/home/sabertazimi/rootfs"))
must(syscall.Chdir("/"))
must(syscall.Mount("proc", "proc", "proc", 0, ""))
```

### Control Groups (cgroups)

resources limitation: CPU, Memory, Disk I/O, Process numbers, Network, Device

```go
func cg() {
    cgroups := "/sys/fs/cgroup/"
    pids := filepath.Join(cgroups, "pids")
    os.Mkdir(filepath.Join(pids, "sabertazimi"), 0755)
    must(ioutil.WriteFile(filepath.Join(pids, "sabertazimi/pids.max"),
      []byte("20"), 0700))
    must(ioutil.WriteFile(filepath.Join(pids, "sabertazimi/notify_on_release"),
      []byte("1"), 0700))
    must(ioutil.WriteFile(filepath.Join(pids, "sabertazimi/cgroup.procs"),
      []byte(strconv.Itoa(os.Getpid())), 0700))
}
```
