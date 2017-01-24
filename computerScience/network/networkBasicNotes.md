# Net Working Notes

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
*   syntax/fields of message types

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
 
