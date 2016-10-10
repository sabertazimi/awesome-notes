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

```sh
# path/to/test => goproj/src/path/to/test/test.go
# bin/test     => goproj/bin/test
$ go install path/to/test

$ go fmt test.go
```

