# Go Basic Notes

## CLI

### Installation

```sh
$ sudo apt install golang
$ echo "export $GOPATH=$HOME/Work/Source/goproj"
```

```sh
goproj
|--- bin
|--- src

```

### Basic Command

```sh
$ go version
$ go run main.go
```

*   go 的大部分工具的作用基本单位为 package(directories)

```sh
# path/to/test => goproj/src/path/to/test/*.go

# $GOPATH/pkg/linux_amd64/path/to/test.a
$ go build path/to/test

# $GOPATH/bin/test
$ go install path/to/test

$ go fmt /path/to/test
```

