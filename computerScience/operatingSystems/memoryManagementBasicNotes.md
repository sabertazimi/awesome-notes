# Memory Management Basic Notes

- [Memory Management Basic Notes](#memory-management-basic-notes)
  - [Tools](#tools)
    - [perf](#perf)
    - [trace](#trace)
    - [vmstat](#vmstat)
    - [pmap](#pmap)
    - [Memory Hot Plug](#memory-hot-plug)
    - [TCMalloc](#tcmalloc)
    - [Oprofile](#oprofile)

## Tools

### perf

### trace

### vmstat

check usage of virtual memory and swap region

```sh
vmstat 2
```

### pmap

check detailed usage of memory

```sh
pmap PID
```

### Memory Hot Plug

- [User Guide](http://www.kernel.org/doc/Documentation/memory-hotplug.txt)

### TCMalloc

Google TCMalloc

### Oprofile

- [User Guide](http://oprofile.sourceforge.net)
