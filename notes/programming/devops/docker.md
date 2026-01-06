---
tags: [Programming, DevOps, Docker]
---

# Docker

## Docker Basis

`Docker` is **process-level** `Linux` virtual container:

- `Namespace`: IPC/network/PID/UTS/user isolation.
- `Cgroup`: resources control.
- `rootfs`: file system isolation.

```go
// https://github.com/lizrice/containers-from-scratch
package main

import (
    "fmt"
    "io/ioutil"
    "os"
    "os/exec"
    "path/filepath"
    "strconv"
    "syscall"
)

// go run main.go run <cmd> <args>
func main() {
    switch os.Args[1] {
    case "run":
        run()
    case "child":
        child()
    default:
        panic("help")
    }
}

func run() {
    fmt.Printf("Running %v \n", os.Args[2:])

    cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
    cmd.Stdin = os.Stdin
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    cmd.SysProcAttr = &syscall.SysProcAttr{
        Cloneflags:   syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID | syscall.CLONE_NEWNS,
        Unshareflags: syscall.CLONE_NEWNS,
    }

    must(cmd.Run())
}

func child() {
    fmt.Printf("Running %v \n", os.Args[2:])

    cg()

    cmd := exec.Command(os.Args[2], os.Args[3:]...)
    cmd.Stdin = os.Stdin
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr

    must(syscall.Sethostname([]byte("container")))
    must(syscall.Chroot("/home/liz/ubuntufs"))
    must(os.Chdir("/"))
    must(syscall.Mount("proc", "proc", "proc", 0, ""))
    must(syscall.Mount("thing", "myTemp", "tmpfs", 0, ""))

    must(cmd.Run())

    must(syscall.Unmount("proc", 0))
    must(syscall.Unmount("thing", 0))
}

func cg() {
    cgroups := "/sys/fs/cgroup/"
    pids := filepath.Join(cgroups, "pids")
    os.Mkdir(filepath.Join(pids, "liz"), 0755)
    must(ioutil.WriteFile(filepath.Join(pids, "liz/pids.max"), []byte("20"), 0700))
    // Removes the new cgroup in place after the container exits
    must(ioutil.WriteFile(
        filepath.Join(pids, "liz/notify_on_release"),
        []byte("1"),
        0700
    ))
    must(ioutil.WriteFile(
        filepath.Join(pids, "liz/cgroup.procs"),
        []byte(strconv.Itoa(os.Getpid())),
        0700
    ))
}

func must(err error) {
    if err != nil {
        panic(err)
    }
}
```

## Docker CLI Workflows

### Docker Installation

```bash
 sudo apt-get update
 sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg \
  lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo DRY_RUN=1 sh get-docker.sh
```

```bash
sudo systemctl status docker
sudo usermod -aG docker $USER
```

### Docker Uninstallation

```bash
docker container stop $(docker container ls -aq)
docker system prune -a --volumes
sudo apt purge docker-ce docker-ce-cli containerd.io
sudo apt autoremove
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

### Get Docker Image

```bash
docker images
docker images -a
docker search <images>
docker pull <images:tag>
```

### Build Docker Image

```bash
docker build . -t image-name

# use Dockerfile at the root of the repository
docker build <github-repo-url> -t image-name
```

### Run Docker Container

- `run`.
- `start`.
- `stop`.
- `restart`.

```bash
# docker run -dp <host-port>:<container-port> [docker-image]
docker run -d -p 80:80 --name app-name docker/getting-started
docker run -d -p 80:80/tcp -p 80:80/udp --name app-name docker/getting-started
```

### List Docker Container

```bash
docker ps
docker ps -l
docker ps -a
docker ps -q
```

### Execute Command in Docker Container

```bash
docker exec -it <container> <command>
docker exec -it <container> bash
```

### Remove Docker Container

```bash
docker rm <container>
```

### Log Docker Container

```bash
docker logs -f <container>
```

## Dockerfile

### Dockerfile Directives

- `FROM`: source image.
- `ENV`: set environment variable.
- `WORKDIR`: change directory.
- `COPY`: copy file.
- `RUN`: run command.
- `CMD`: final command.
- `EXPOSE`: expose port.

```Dockerfile
FROM centos:7
RUN yum -y install httpd
COPY index.html /usr/share/httpd/noindex/index.html
EXPOSE 80
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
```

```Dockerfile
FROM centos:7
RUN rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
RUN yum -y install nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Docker Hub

### Docker Hub Mirror and Proxy

- Docker [mirrors](https://github.com/dongyubin/DockerHub).
- [HubProxy](https://github.com/sky22333/hubproxy).

## Kubernetes

### Kubernetes Installation

```bash
# 查看帮助
kubectl --help

# 查看API版本
kubectl api-versions

# 查看集群信息
kubectl cluster-info
```

### Kubernetes Resource Creation

```bash
# 创建并运行一个指定的镜像
kubectl run NAME --image=image [params...]
# e.g. 创建并运行一个名字为nginx的Pod
kubectl run nginx --image=nginx

# 根据YAML配置文件或者标准输入创建资源
kubectl create RESOURCE
# e.g.
# 根据nginx.yaml配置文件创建资源
kubectl create -f nginx.yaml
# 根据URL创建资源
kubectl create -f https://k8s.io/examples/application/deployment.yaml
# 根据目录下的所有配置文件创建资源
kubectl create -f ./dir

# 通过文件名或标准输入配置资源
kubectl apply -f (-k DIRECTORY | -f FILENAME | stdin)
# e.g.
# 根据nginx.yaml配置文件创建资源
kubectl apply -f nginx.yaml
```

### Kubernetes Resource Listing

```bash
# 查看集群中某一类型的资源
kubectl get RESOURCE
# 其中，RESOURCE可以是以下类型：
kubectl get pods / po         # 查看Pod
kubectl get svc               # 查看Service
kubectl get deploy            # 查看Deployment
kubectl get rs                # 查看ReplicaSet
kubectl get cm                # 查看ConfigMap
kubectl get secret            # 查看Secret
kubectl get ing               # 查看Ingress
kubectl get pv                # 查看PersistentVolume
kubectl get pvc               # 查看PersistentVolumeClaim
kubectl get ns                # 查看Namespace
kubectl get node              # 查看Node
kubectl get all               # 查看所有资源

# 后面还可以加上 -o wide 参数来查看更多信息
kubectl get pods -o wide

# 查看某一类型资源的详细信息
kubectl describe RESOURCE NAME
# e.g. 查看名字为nginx的Pod的详细信息
kubectl describe pod nginx
```

### Kubernetes Resource Update

```bash
# 更新某个资源的标签
kubectl label RESOURCE NAME KEY_1=VALUE_1 ... KEY_N=VALUE_N
# e.g. 更新名字为nginx的Pod的标签
kubectl label pod nginx app=nginx

# 设置某个资源的副本数
kubectl scale --replicas=COUNT RESOURCE NAME
# e.g. 设置名字为nginx的Deployment的副本数为3
kubectl scale --replicas=3 deployment/nginx

# 根据配置文件或者标准输入替换某个资源
kubectl replace -f FILENAME
# e.g. 根据nginx.yaml配置文件替换名字为nginx的Deployment
kubectl replace -f nginx.yaml
```

### Kubernetes Resource Deletion

```bash
# 删除某个资源
kubectl delete RESOURCE NAME
# e.g. 删除名字为nginx的Pod
kubectl delete pod nginx

# 删除某个资源的所有实例
kubectl delete RESOURCE --all
# e.g. 删除所有Pod
kubectl delete pod --all

# 根据YAML配置文件删除资源
kubectl delete -f FILENAME
# e.g. 根据nginx.yaml配置文件删除资源
kubectl delete -f nginx.yaml
```

### Kubernetes Logs

```bash
# 进入某个Pod的容器中
kubectl exec [-it] POD [-c CONTAINER] -- COMMAND [args...]
# e.g. 进入名字为nginx的Pod的容器中，并执行/bin/bash命令
kubectl exec -it nginx -- /bin/bash

# 查看某个Pod的日志
kubectl logs [-f] [-p] [-c CONTAINER] POD [-n NAMESPACE]
# e.g. 查看名字为nginx的Pod的日志
kubectl logs nginx

# 将某个Pod的端口转发到本地
kubectl port-forward POD [LOCAL_PORT:]REMOTE_PORT [...[LOCAL_PORT_N:]REMOTE_PORT_N]
# e.g. 将名字为nginx的Pod的80端口转发到本地的8080端口
kubectl port-forward nginx 8080:80

# 连接到现有的某个Pod（将某个Pod的标准输入输出转发到本地）
kubectl attach POD -c CONTAINER
# e.g. 将名字为nginx的Pod的标准输入输出转发到本地
kubectl attach nginx

# 运行某个Pod的命令
kubectl run NAME --image=image -- COMMAND [args...]
# e.g. 运行名字为nginx的Pod
kubectl run nginx --image=nginx -- /bin/bash
```

### Kubernetes Dashboard

```bash
# 在master节点上安装portainer，并将其暴露在NodePort 30777上
kubectl apply -n portainer -f https://downloads.portainer.io/ce2-19/portainer.yaml
```
