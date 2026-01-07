---
sidebar_position: 36
tags: [Web, JavaScript, ECMAScript, Network]
---

# Network

## JSON

JSON (JavaScript Object Notation) methods:

```ts
const obj = JSON.parse(json)
const json = JSON.stringify(obj)
```

[`JSON.stringify(value, filter, space)`](https://exploringjs.com/impatient-js/ch_json.html#json-replacers-revivers):

- `Symbol`/`function`/`NaN`/`Infinity`/`undefined`: `null`/ignored.
- `BitInt`: throw `TypeError`.
- Circular reference object: throw `TypeError`.
- `toJSON` method:

```ts
const obj = {
  name: 'zc',
  toJSON() {
    return 'return toJSON'
  },
}

// return toJSON
console.log(JSON.stringify(obj))

// "2022-03-06T08:24:56.138Z"
JSON.stringify(new Date())
```

## AJAX

### AJAX Data Format

| Format                           | Size (bytes) | Download (ms) | Parse (ms) |
| :------------------------------- | -----------: | ------------: | ---------: |
| Verbose XML                      |      582,960 |         999.4 |      343.1 |
| Verbose JSON-P                   |      487,913 |         598.2 |        0.0 |
| Simple XML                       |      437,960 |         475.1 |       83.1 |
| Verbose JSON                     |      487,895 |         527.7 |       26.7 |
| Simple JSON                      |      392,895 |         498.7 |       29.0 |
| Simple JSON-P                    |      392,913 |         454.0 |        3.1 |
| Array JSON                       |      292,895 |         305.4 |       18.6 |
| Array JSON-P                     |      292,912 |         316.0 |        3.4 |
| Custom Format (script insertion) |      222,912 |          66.3 |       11.7 |
| Custom Format (XHR)              |      222,892 |          63.1 |       14.5 |

### AJAX Usage

```ts
const XHR = (function () {
  const standard = {
    createXHR() {
      return new XMLHttpRequest()
    },
  }
  const newActionXObject = {
    createXHR() {
      return new ActionXObject('Msxml12.XMLHTTP')
    },
  }
  const oldActionXObject = {
    createXHR() {
      return new ActionXObject('Microsoft.XMLHTTP')
    },
  }

  // 根据兼容性返回对应的工厂对象
  // 此立即函数运行一次即可完成兼容性检查, 防止重复检查
  if (standard.createXHR()) {
    return standard
  } else {
    try {
      newActionXObject.createXHR()
      return newActionXObject
    } catch (o) {
      oldActionXObject.createXHR()
      return oldActionXObject
    }
  }
})()

const request = XHR.createXHR()

// 3rd argument : async mode
request.open('GET', 'example.txt', true)

request.onreadystatechange = function () {
  // do something
  /*
  switch(request.readyState) {
    case 0: initialize
    case 1: loading
    case 2: loaded
    case 3: transaction
    case 4: complete
  }
  */
  if (request.readyState === 4) {
    const para = document.createElement('p')
    const txt = document.createTextNode(request.responseText)
    para.appendChild(txt)
    document.getElementById('new').appendChild(para)
  }
}

request.send(null)
```

```ts
ajax({
  url: './TestXHR.aspx', // 请求地址
  type: 'POST', // 请求方式
  data: { name: 'super', age: 20 }, // 请求参数
  dataType: 'json',
  success(response, xml) {
    // 此处放成功后执行的代码
  },
  fail(status) {
    // 此处放失败后执行的代码
  },
})

function ajax(options) {
  options = options || {}
  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'
  const params = formatParams(options.data)
  let xhr

  // 创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    // IE6及其以下版本浏览器
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  // 接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const status = xhr.status
      if (status >= 200 && status < 300)
        options.success && options.success(xhr.responseText, xhr.responseXML)
      else
        options.fail && options.fail(status)
    }
  }

  // 连接 和 发送 - 第二步
  if (options.type === 'GET') {
    xhr.open('GET', `${options.url}?${params}`, true)
    xhr.send(null)
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true)
    // 设置表单提交时的内容类型
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  }
}

// 格式化参数
function formatParams(data) {
  const arr = []

  for (const name in data)
    arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`)

  arr.push(`v=${Math.random()}`.replace('.', ''))
  return arr.join('&')
}
```

```ts
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open('GET', url)

    request.onload = function () {
      try {
        if (this.status === 200)
          resolve(JSON.parse(this.response))
        else
          reject(new Error(`${this.status} ${this.statusText}`))
      } catch (e) {
        reject(e.message)
      }
    }

    request.onerror = function () {
      reject(new Error(`${this.status} ${this.statusText}`))
    }

    request.send()
  })
}

getJSON('data/sample.json')
  .then((ninjas) => {
    assert(ninjas !== null, 'Get data')
  })
  .catch(e => handleError(`Error: ${e}`))
```

### AJAX Cross Origin Request

```html
<!-- HTML -->
<meta http-equiv="Access-Control-Allow-Origin" content="*" />
```

```ts
Response.Headers.Add('Access-Control-Allow-Origin', '*')
```

```ts
$.ajax({
  url: 'http://map.oicqzone.com/gpsApi.php?lat=22.502412986242&lng=113.93832783228',
  type: 'GET',
  dataType: 'JSONP', // 处理 AJAX 跨域问题.
  success(data) {
    $('body').append(`Name: ${data}`)
  },
})
```

### AJAX Alternatives

- `client.request(config)`.
- `client.get(url[, config])`.
- `client.delete(url[, config])`.
- `client.head(url[, config])`.
- `client.options(url[, config])`.
- `client.post(url[, data[, config]])`.
- `client.put(url[, data[, config]])`.
- `client.patch(url[, data[, config]])`.
- `client.getUri([config])`.

```ts
const client = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    // Do something before request is sent.
    return config
  },
  (error) => {
    // Do something with request error.
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx trigger this function.
    // Do something with response data.
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx trigger this function.
    // Do something with response error.
    return Promise.reject(error)
  }
)
```

## Fetch

- GET: read resources.
- POST: create resources.
- PUT: fully update resources.
- PATCH: partially update resources.
- DELETE: delete resources.

### Fetch Basis Usage

```ts
const response = await fetch('/api/names', {
  headers: {
    Accept: 'application/json',
  },
})

const response = await fetch('/api/names', {
  method: 'POST',
  body: JSON.stringify(object),
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Fetch Form Data

```ts
const imageFormData = new FormData()
const imageInput = document.querySelector('input[type="file"][multiple]')
const imageFiles = imageInput.files

for (const file of imageFiles)
  imageFormData.append('image', file)

fetch('/img-upload', {
  method: 'POST',
  body: imageFormData,
})
```

### Fetch Aborting

```ts
const abortController = new AbortController()

fetch('wikipedia.zip', { signal: abortController.signal }).catch(() =>
  console.log('Aborted!')
)

// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10)
```

### Fetch Objects API

[`Headers` object](https://developer.mozilla.org/docs/Web/API/Headers):

```ts
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/xml')
myHeaders.get('Content-Type') // should return 'text/xml'
```

[`Request` object](https://developer.mozilla.org/docs/Web/API/Request):

```ts
const request = new Request('/api/names', {
  method: 'POST',
  body: JSON.stringify(object),
  headers: {
    'Content-Type': 'application/json',
  },
})

const response = await fetch(request)
```

[`Response` object](https://developer.mozilla.org/docs/Web/API/Response):

```ts
fetch('//foo.com').then(console.log)
// Response {
//   body: (...)
//   bodyUsed: false
//   headers: Headers {}
//   ok: true
//   redirected: false
//   status: 200
//   statusText: "OK"
//   type: "basic"
//   url: "https://foo.com/"
// }

fetch('//foo.com/redirect-me').then(console.log)
// Response {
//   body: (...)
//   bodyUsed: false
//   headers: Headers {}
//   ok: true
//   redirected: true
//   status: 200
//   statusText: "OK"
//   type: "basic"
//   url: "https://foo.com/redirected-url/"
// }

fetch('//foo.com/does-not-exist').then(console.log)
// Response {
//   body: (...)
//   bodyUsed: false
//   headers: Headers {}
//   ok: false
//   redirected: true
//   status: 404
//   statusText: "Not Found"
//   type: "basic"
//   url: "https://foo.com/does-not-exist/"
// }

fetch('//foo.com/throws-error').then(console.log)
// Response {
//   body: (...)
//   bodyUsed: false
//   headers: Headers {}
//   ok: false
//   redirected: true
//   status: 500
//   statusText: "Internal Server Error"
//   type: "basic"
//   url: "https://foo.com/throws-error/"
// }
```

### Fetch Streaming

`Request`/`Response` `body` (`ReadableStream`) methods:

- `text()`.
- `json()`.
- `formData()`.
- `arrayBuffer()`.
- `blob()`.
- `bodyUsed`: 布尔值, 表示 `ReadableStream` 是否已摄受 (`disturbed`).

```ts
fetch('https://fetch.spec.whatwg.org/')
  .then(response => response.body)
  .then((body) => {
    const reader = body.getReader()

    function processNextChunk({ value, done }) {
      if (done)
        return

      console.log(value)
      return reader.read().then(processNextChunk)
    }

    return reader.read().then(processNextChunk)
  })
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// ...

fetch('https://fetch.spec.whatwg.org/')
  .then(response => response.body)
  .then(async (body) => {
    const reader = body.getReader()

    while (true) {
      const { value, done } = await reader.read()

      if (done)
        break

      console.log(value)
    }
  })
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// ...
```

```ts
fetch('https://fetch.spec.whatwg.org/')
  .then(response => response.body)
  .then(async (body) => {
    const reader = body.getReader()
    const asyncIterable = {
      [Symbol.asyncIterator]() {
        return {
          next() {
            return reader.read()
          },
        }
      },
    }

    for await (const chunk of asyncIterable)
      console.log(chunk)
  })
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// ...
```

```ts
async function* streamGenerator(stream) {
  const reader = stream.getReader()

  try {
    while (true) {
      const { value, done } = await reader.read()

      if (done)
        break

      yield value
    }
  } finally {
    reader.releaseLock()
  }
}

const decoder = new TextDecoder()

fetch('https://fetch.spec.whatwg.org/')
  .then(response => response.body)
  .then(async (body) => {
    for await (const chunk of streamGenerator(body))
      console.log(decoder.decode(chunk, { stream: true }))
  })
// <!doctype html><html lang="en"> ...
// whether a <a data-link-type="dfn" href="#concept-header" ...
// result to <var>rangeValue</var>. ...
// ...
```

```ts
fetch('https://fetch.spec.whatwg.org/')
  .then(response => response.body)
  .then((body) => {
    const reader = body.getReader()
    // 创建第二个流
    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { value, done } = await reader.read()

            if (done)
              break

            // 将主体流的块推到第二个流
            controller.enqueue(value)
          }
        } finally {
          controller.close()
          reader.releaseLock()
        }
      },
    })
  })
  .then(secondaryStream => new Response(secondaryStream))
  .then(response => response.text())
  .then(console.log)
// <!doctype html><html lang="en"><head><meta charset="utf-8"> ...
```

## RESTful

- Client/Server architecture.
- Stateless.
- Cacheable.
- Layer system.
- Code via need.
- Isomorphic interface.
- Design [reference](https://github.com/aisuhua/restful-api-design-references).

## Server-Sent Events

- Event source [API](https://developer.mozilla.org/docs/Web/API/EventSource).
- Server-sent events [API](https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events).

```ts
const source = new EventSource('/path/to/stream-url')

source.onopen = function () {}

source.onerror = function () {}

source.addEventListener('foo', (event) => {
  processFoo(event.data)
})

source.addEventListener('ping', (event) => {
  processPing(JSON.parse(event.data).time)
})

source.onmessage = function (event) {
  log(event.id, event.data)
  if (event.id === 'CLOSE')
    source.close()
}
```

## WebSocket

### WebSocket Message Header

Request Header:

```bash
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: 16-byte, base64 encoded
Sec-WebSocket-Version: 13
Sec-Websocket-Protocol: protocol [,protocol]*
Sec-Websocket-Extension: extension [,extension]*
```

Response Header:

```bash
HTTP/1.1 101 "Switching Protocols" or other description
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: 20-byte, MD5 hash in base64
Sec-Websocket-Protocol: protocol [,protocol]*
Sec-Websocket-Extension: extension [,extension]*
```

### WebSocket Extensions

WebSocket 存在与 HTTP/1.1 类似的性能瓶颈: 队头阻塞, 无法多路复用.

WebSocket 规范允许对协议进行扩展,
数据格式和 WebSocket 协议的语义可以通过新的操作码和数据字段扩展:

- 多路复用扩展 (WebSocket Multiplexing Extension):
  使用`信道 ID`扩展每个 WebSocket 帧, 实现多个虚拟的 WebSocket 信道共享一个 TCP 连接.
- 压缩扩展 (WebSocket Compression Extension):
  给 WebSocket 协议增加了压缩功能.

### WebSocket Basic Usage

通信功能:

- `data`:
  - `string`.
  - `ArrayBuffer`.
  - `Blob`.
- `readyState`:
  - `WebSocket.OPENING`: `0`, 连接正在建立.
  - `WebSocket.OPEN`: `1`, 连接已经建立.
  - `WebSocket.CLOSING`: `2`, 连接正在关闭.
  - `WebSocket.CLOSE`: `3`, 连接已经关闭.

```ts
function WebSocketTest() {
  if ('WebSocket' in window) {
    alert('WebSocket is supported by your Browser!')
    // Let us open a web socket
    const ws = new WebSocket('ws://localhost:9998/echo')

    ws.onopen = function () {
      // WebSocket is connected, send data using send()
      ws.send('Message to send')
      alert('Message is sent...')
    }

    ws.onmessage = function (event) {
      const receivedMessage = event.data
      alert('Message is received...')
    }

    ws.onclose = function (event) {
      // websocket is closed.
      console.log(
        `As clean? ${event.wasClean} Code=${event.code} Reason=${event.reason}`
      )
    }

    ws.onerror = function () {
      alert('Connection error.')
    }
  } else {
    // The browser doesn't support WebSocket
    alert('WebSocket NOT supported by your Browser!')
  }
}
```

### WebSocket HeartBeat Mechanism

连接终止时, WebSocket 不会自动恢复,
需要自己实现, 通常为了保持连接状态, 需要增加心跳机制.

每隔一段时间会向服务器发送一个数据包, 告诉服务器自己 Alive,
服务器端如果 Alive, 就会回传一个数据包给客户端.
主要在一些**长时间连接**的应用场景需要考虑心跳机制及重连机制,
以保证长时间的连接及数据交互.

### WebSocket Performance

- 使用安全 WebSocket (基于 TLS 的 WSS) 实现可靠的部署, 绕过中间代理.
- 密切关注腻子脚本的性能.
- 利用子协议协商确定应用协议.
- 优化二进制净荷以最小化传输数据.
- 考虑压缩 UTF-8 内容以最小化传输数据.
- 设置正确的二进制类型以接收二进制净荷.
- 监控客户端缓冲数据的量.
- 切分应用消息以避免队首阻塞.
- 合用的情况下利用其他传输机制.
- 对于无线设备, 注意节能:
  消除周期性无效数据, 减少冗余数据, 消除不必要的长连接.

### WebSocket References

- [WebSocket Guide](https://hpbn.co/websocket)
- [WebSocket vs Long Polling](https://ably.com/blog/websockets-vs-long-polling)

## WebRTC

### Web Real-Time Communication

[Web Real-Time Communication](https://developer.mozilla.org/docs/Web/API/WebRTC_API)
(Web 实时通信, WebRTC) 由一组标准, 协议和 JavaScript API 组成,
用于实现浏览器之间 (端到端, P2P) 的音频/视频/数据共享:

- [MediaStream](https://developer.mozilla.org/docs/Web/API/MediaStream).
- [RTCPeerConnection](https://developer.mozilla.org/docs/Web/API/RTCPeerConnection):
  - 管理穿透 NAT 的完整 ICE 工作流.
  - 发送自动 (STUN) 持久化信号.
  - 跟踪本地流.
  - 跟踪远程流.
  - 按需触发自动流协商.
  - 生成连接提议, 接收应答, 允许查询连接的当前状态等.
- [RTCDataChannel](https://developer.mozilla.org/docs/Web/API/RTCDataChannel):
  DataChannel API 用于实现端到端之间的任意应用数据交换 (端到端交换版本的 WebSocket).

![WebRTC Engine](./figures/web-rtc-engine.png 'WebRTC Engine')

### WebRTC Layer Protocol

![WebRTC Layer Protocol](./figures/web-rtc-layer-protocol.png 'WebRTC Layer Protocol')

- WebRTC 使用 UDP 作为传输层协议: 低延迟和及时性才是关键.
- ICE: Interactive Connectivity Establishment (RFC 5245).
  - STUN: Session Traversal Utilities for NAT (RFC 5389).
  - TURN: Traversal Using Relays around NAT (RFC 5766).
- SDP: Session Description Protocol (RFC 4566).
- DTLS: Datagram Transport Layer Security (RFC 6347).
- SCTP: Stream Control Transport Protocol (RFC 4960).
- SRTP: Secure Real-Time Transport Protocol (RFC 3711).

### WebRTC Basic Usage

```ts
const ice = {
  iceServers: [
    { url: 'stun:stun.l.google.com:19302' },
    { url: 'turn:user@turnserver.com', credential: 'pass' },
  ],
}
const signalingChannel = new SignalingChannel()
const pc = new RTCPeerConnection(ice)

navigator.getUserMedia({ audio: true }, getStream, logError)

function getStream(evt) {
  pc.addstream(evt.stream)

  const localVideo = document.querySelector('#local-video')
  localVideo.src = window.URL.createObjectURL(evt.stream)

  pc.createOffer((offer) => {
    pc.setLocalDescription(offer)
    signalingChannel.send(offer.sdp)
  })
}

pc.onicecandidate = function (evt) {
  if (evt.candidate)
    signalingChannel.send(evt.candidate)
}

pc.oniceconnectionstatechange = function (evt) {
  logStatus(`ICE connection state change: ${evt.target.iceConnectionState}`)
}

pc.onaddstream = function (evt) {
  const remoteVideo = document.querySelector('#remote-video')
  remoteVideo.src = window.URL.createObjectURL(evt.stream)
}

signalingChannel.onmessage = function (msg) {
  if (msg.candidate)
    pc.addIceCandidate(msg.candidate)
}
```

### WebRTC Performance

- 发信服务:
  - 使用低延迟传输机制.
  - 提供足够的容量.
  - 建立连接后, 考虑使用 DataChannel 发信.
- 防火墙和 NAT 穿透:
  - 初始化 RTCPeerConnection 时提供 STUN 服务器.
  - 尽可能使用增量 ICE, 虽然发信次数多, 但建立连接速度快.
  - 提供 STUN 服务器, 以备端到端连接失败后转发数据.
  - 预计并保证 TURN 转发时容量足够用.
- 数据分发:
  - 对于大型多方通信, 考虑使用超级节点或专用的中间设备.
  - 中间设备在转发数据前, 考虑先对其进行优化或压缩.
- 数据效率:
  - 对音频和视频流指定适当的媒体约束.
  - 优化通过 DataChannel 发送的二进制净荷.
  - 考虑压缩通过 DataChannel 发送的 UTF-8 数据.
  - 监控 DataChannel 缓冲数据的量, 同时注意适应网络条件变化.
- 交付及可靠性:
  - 使用乱序交付避免队首阻塞.
  - 如果使用有序交付, 把消息大小控制到最小, 以降低队首阻塞的影响.
  - 发送小消息 (小于 1150 字节), 以便将分段应用消息造成的丢包损失降至最低.
  - 对部分可靠交付:
    - 设置适当的重传次数和超时间隔.
    - 正确的设置取决于消息大小, 应用数据类型, 端与端之间的延迟.

### WebRTC References

- [WebRTC Guide](https://hpbn.co/webrtc)
- [WebRTC Security List](https://dzone.com/articles/webrtc-security-vulnerabilities-you-should-know-ab)
