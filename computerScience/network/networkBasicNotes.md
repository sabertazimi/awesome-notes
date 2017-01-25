# Computer NetWorking Notes

## Computer Network and Internet

### What is Internet

#### Consist

Internet Service Provider -> Packet Switch/Communication Link -> Host/End System

#### Delay

nodal = proc + queue + trans + prop: 总时延 = 产生/到达时延 + 排队时延 + 传输时延 + 传播时延

#### Layer

*   Application Layer Protocol: HTTP SMTP (message)
*   Transport Layer Protocol: TCP UDP (segment)
*   Network Layer Protocol: IP (因特网的粘合剂) (datagram)
*   Data Link Layer Protocol: Wifi PPP(点对点) 以太网 (frame)
*   Physical Layer Protocol 

## Application Layer

### Application Layer Protocol

defines:

*   types of messages exchanged
*   syntax of various message types(fields defination)
*   semantics of fields
*   rules fsor when/how to send/respond to messages

### HTTP

*   HTTP -> Socket Interface -> TCP
*   stateless protocol

#### Non-Persistent Connections and Persistent Connections

*   non-persistent connections: 1 http request with 1 tcp connection
*   persistent connections: multiple http request with 1 tcp connection

#### HTTP Message Format

*    http request format

```http
request line -> (method field, object url field, protocol version)
header lines -> Host/Connections(close -> non-persistent connection)/User-agent/Accept-language
\r\n
entity body
```

*   http response format

```http
status line -> (protocol version, status code, corresponding status message)
header lines -> Connections/Date/Server/Last-Modified/Content-Length(bytes)/Content-Type
\r\n
entity body
```

### Process

#### Port to Transport Layer

*   bandwidth-sensitive application: UDP
*   reliable-sensitive application: TCP

```sh
email                   - SMTP              - TCP
remote terminal access  - Telnet            - TCP
Web                     - HTTP/HTTPS        - TCP
file tranfer            - FTP               - TCP
streaming multimedia    - HTTP/HTTPS/RTP    - TCP/UDP
internet telephony      - SIP/RTP           - UDP
```
#### Address

*   (32 bits)IP  : find specific host/end-system
*   (16 bits)port: find specific process

## Transport Layer

### TCP

*   reliable transmission and **flow control**
*   connection-oriented service

### UDP

*   lightweight without connection
 