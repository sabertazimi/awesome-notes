---
sidebar_position: 32
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, ECMAScript, DOM]
---

# DOM Core

- DOM Level 0.
- DOM Level 1:
  - DOM Core.
  - DOM XML.
  - DOM HTML.
- DOM Level 2:
  - DOM2 Core.
  - DOM2 XML.
  - DOM2 HTML.
  - DOM2 Views.
  - DOM2 StyleSheets.
  - DOM2 CSS.
  - DOM2 CSS 2.
  - DOM2 Events.
  - DOM2 UIEvents.
  - DOM2 MouseEvents.
  - DOM2 MutationEvents (Deprecated).
  - DOM2 HTMLEvents.
  - DOM2 Range.
  - DOM2 Traversal.
- DOM Level 3:
  - DOM3 Core.
  - DOM3 XML.
  - DOM3 Events.
  - DOM3 UIEvents.
  - DOM3 MouseEvents.
  - DOM3 MutationEvents (Deprecated).
  - DOM3 MutationNameEvents.
  - DOM3 TextEvents.
  - DOM3 Load and Save.
  - DOM3 Load and Save Async.
  - DOM3 Validation.
  - DOM3 XPath.

```ts
const hasXmlDom = document.implementation.hasFeature('XML', '1.0')
const hasHtmlDom = document.implementation.hasFeature('HTML', '1.0')
```

## DOM Nodes

```ts
document.createElement('nodeName')
document.createTextNode('String')

document.getElementById(id)
document.getElementsByName(elementName)
document.getElementsByTagName(tagName)
document.getElementsByClassName(className) // HTML5
document.querySelector(cssSelector) // Selectors API
document.querySelectorAll(cssSelector) // Selectors API

element.getAttribute(attrName) // get default HTML attribute
element.setAttribute(attrName, attrValue)
element.removeAttribute(attrName)

element.compareDocumentPosition(element)
element.contains(element)
element.isSameNode(element) // Same node reference
element.isEqualNode(element) // Same nodeName/nodeValue/attributes/childNodes
element.matches(cssSelector)
element.closest(cssSelector) // Returns closest ancestor matching selector
element.cloneNode()
element.normalize()
element.before(...elements)
element.after(...elements)
element.replaceWith(...elements)
element.remove()

parentElement.hasChildNodes()
parentElement.appendChild(childElement)
parentElement.append(childElements)
parentElement.insertBefore(newChild, targetChild)
parentElement.replaceChild(newChild, targetChild)
parentElement.replaceChildren(children)
parentElement.removeChild(child)
```

```ts
function showAlert(type, message, duration = 3) {
  const div = document.createElement('div')
  div.className = type
  div.appendChild(document.createTextNode(message))
  container.insertBefore(div, form)
  setTimeout(() => div.remove(), duration * 1000)
}
```

### DOM Node Type

Node 除包括元素结点 (tag) 外,
包括许多其它结点 (甚至空格符视作一个结点),
需借助 `nodeType` 找出目标结点.

| Node Type | Node Representation      | Node Name            | Node Value    |
| :-------- | :----------------------- | :------------------- | :------------ |
| 1         | `ELEMENT_NODE`           | Tag Name             | null          |
| 2         | `ATTRIBUTE_NODE`         | Attr Name            | Attr Value    |
| 3         | `TEXT_NODE`              | `#text`              | Text          |
| 4         | `CDATA_SECTION_NODE`     | `#cdata-section`     | CDATA Section |
| 5         | `ENTITY_REFERENCE_NODE`  |                      |               |
| 6         | `ENTITY_NODE`            |                      |               |
| 8         | `COMMENT_NODE`           | `#comment`           | Comment       |
| 9         | `DOCUMENT_NODE`          | `#document`          | null          |
| 10        | `DOCUMENT_TYPE_NODE`     | `html`/`xml`         | null          |
| 11        | `DOCUMENT_FRAGMENT_NODE` | `#document-fragment` | null          |
| 12        | `NOTATION_NODE`          |                      |               |

```ts
const type = node.nodeType
const name = node.nodeName
const value = node.nodeValue

if (someNode.nodeType === Node.ELEMENT_NODE)
  alert('Node is an element.')
```

### DOM Attribute Node

```ts
const id = element.attributes.getNamedItem('id').nodeValue
const id = element.attributes.id.nodeValue
element.attributes.id.nodeValue = 'someOtherId'
const oldAttr = element.attributes.removeNamedItem('id')
element.attributes.setNamedItem(newAttr)
```

```ts
const attr = document.createAttribute('align')
attr.value = 'left'
element.setAttributeNode(attr)

alert(element.attributes.align.value) // "left"
alert(element.getAttributeNode('align').value) // "left"
alert(element.getAttribute('align')) // "left"
```

Further reading:
[DOM properties reflection on HTML attributes](../html/html.md#dom-properties-reflection).

### DOM Text Node

Text node methods:

- appendData(text): 向节点末尾添加文本 text.
- deleteData(offset, count): 从位置 offset 开始删除 count 个字符.
- insertData(offset, text): 在位置 offset 插入 text.
- replaceData(offset, count, text): 用 text 替换从位置 offset 到 offset + count 的文本.
- splitText(offset): 在位置 offset 将当前文本节点拆分为两个文本节点.
- substringData(offset, count): 提取从位置 offset 到 offset + count 的文本.

Normalize text nodes:

```ts
const element = document.createElement('div')
element.className = 'message'

const textNode = document.createTextNode('Hello world!')
const anotherTextNode = document.createTextNode('Yippee!')

element.appendChild(textNode)
element.appendChild(anotherTextNode)
document.body.appendChild(element)
alert(element.childNodes.length) // 2

element.normalize()
alert(element.childNodes.length) // 1
alert(element.firstChild.nodeValue) // "Hello world!Yippee!"
```

Split text nodes:

```ts
const element = document.createElement('div')
element.className = 'message'

const textNode = document.createTextNode('Hello world!')
element.appendChild(textNode)
document.body.appendChild(element)

const newNode = element.firstChild.splitText(5)
alert(element.firstChild.nodeValue) // "Hello"
alert(newNode.nodeValue) // " world!"
alert(element.childNodes.length) // 2
```

:::tip[TextContent vs InnerText vs InnerHTML]

- `textContent`:
  - **Security**: Doesn’t parse HTML.
  - **Performance**: Including `<script>` and `<style>` text content.
- `innerText`:
  - Doesn't parse HTML.
  - Only show **human-readable** text content
  - `innerText` care CSS styles, read `innerText` value will trigger `reflow`.
- `innerHTML`:
  - Do parse HTML.

```ts
const textContent = element.textContent
const innerHTML = element.innerHTML
// eslint-disable-next-line unicorn/prefer-dom-node-text-content -- API example
const innerText = element.innerText
```

:::

### DOM Document Node

`document` node (`#document`):

```ts
alert(document.nodeType) // 9
alert(document.nodeName) // "#document"
alert(document.nodeValue) // null
```

```ts
const html = document.documentElement
const doctype = document.doctype
const head = document.head // HTML5 head.
const body = document.body

const title = document.title // 可修改.
const domain = document.domain // 可设置同源域名.
const url = document.URL
const referer = document.referer
const charSet = document.characterSet // HTML5 characterSet.

const anchors = documents.anchors
const images = documents.images
const links = documents.links
const forms = documents.forms
const formElements = documents.forms[0].elements // 第一个表单内的所有字段

// HTML5 compatMode:
if (document.compatMode === 'CSS1Compat')
  console.log('Standards mode')
else if (document.compatMode === 'BackCompat')
  console.log('Quirks mode')
```

```ts
document.getElementById(id)

document.getElementsByName(name)
document.getElementsByTagName(tagName)
document.getElementsByClassName(className) // HTML5
document.querySelector(cssSelector) // Selectors API
document.querySelectorAll(cssSelector) // Selectors API
document.write()
document.writeln()
```

### DOM Document Type Node

```html
<!DOCTYPE html PUBLIC "-// W3C// DTD HTML 4.01// EN" "http:// www.w3.org/TR/html4/strict.dtd">
```

```ts
console.log(document.doctype.name) // "html"
console.log(document.nodeType) // 10
console.log(document.doctype.nodeName) // "html"
console.log(document.doctype.nodeValue) // null
console.log(document.doctype.publicId) // "-// W3C// DTD HTML 4.01// EN"
console.log(document.doctype.systemId) // "http://www.w3.org/TR/html4/strict.dtd"

const doctype = document.implementation.createDocumentType(
  'html',
  '-// W3C// DTD HTML 4.01// EN',
  'http://www.w3.org/TR/html4/strict.dtd'
)
const doc = document.implementation.createDocument(
  'http://www.w3.org/1999/xhtml',
  'html',
  doctype
)
```

### DOM Document Fragment Node

减少 DOM 操作次数, 减少页面渲染次数:

```ts
const frag = document.createDocumentFragment()

let p
let t

p = document.createElement('p')
t = document.createTextNode('first paragraph')
p.appendChild(t)
frag.appendChild(p)

p = document.createElement('p')
t = document.createTextNode('second paragraph')
p.appendChild(t)
frag.appendChild(p)

// 只渲染一次HTML页面
document.body.appendChild(frag)
```

克隆节点进行处理, 处理完毕后再替换原节点:

```ts
const oldNode = document.getElementById('result')
const clone = oldNode.cloneNode(true)
// work with the clone

// when you're done:
oldNode.parentNode.replaceChild(clone, oldNode)
```

Parse HTML:

```ts
const range = document.createRange()
const parse = range.createContextualFragment.bind(range)

parse(`<ol>
  <li>a</li>
  <li>b</li>
</ol>
<ol>
  <li>c</li>
  <li>d</li>
</ol>`)

function parseHTML(string) {
  const context = document.implementation.createHTMLDocument()

  // Set the base href for the created document so any parsed elements with URLs
  // are based on the document's URL
  const base = context.createElement('base')
  base.href = document.location.href
  context.head.appendChild(base)

  context.body.innerHTML = string
  return context.body.children
}
```

## DOM Manipulation

### Append DOM Node

| Method             | Node | HTML | Text | IE  | Event Listeners | Secure  |
| ------------------ | ---- | ---- | ---- | --- | --------------- | ------- |
| append             | Yes  | No   | Yes  | No  | Preserves       | Yes     |
| appendChild        | Yes  | No   | No   | Yes | Preserves       | Yes     |
| innerHTML          | No   | Yes  | Yes  | Yes | Loses           | Careful |
| insertAdjacentHTML | No   | Yes  | Yes  | Yes | Preserves       | Careful |

```ts
const testDiv = document.getElementById('testDiv')

const para = document.createElement('p')
testDiv.appendChild(para)

const txt = document.createTextNode('Hello World')
para.appendChild(txt)
```

`innerHTML`: non-concrete, including all types of childNodes:

```ts
div.innerHTML = '<p>Test<em>test</em>Test.</p>'
// <div>
//   <p>Test<em>test</em>Test.</p>
// </div>
```

`innerHTML` performance:

```ts
// BAD
for (const value of values)
  ul.innerHTML += `<li>${value}</li>` // 别这样做！

// GOOD
let itemsHtml = ''
for (const value of values)
  itemsHtml += `<li>${value}</li>`

ul.innerHTML = itemsHtml

// BEST
ul.innerHTML = values.map(value => `<li>${value}</li>`).join('')
```

### Insert DOM Node

```ts
// Append
el.appendChild(newEl)

// Prepend
el.insertBefore(newEl, el.firstChild)

// InsertBefore
el.parentNode.insertBefore(newEl, el)

// InsertAfter
function insertAfter(newElement, targetElement) {
  const parent = targetElement.parentNode

  if (parent.lastChild === targetElement)
    parent.appendChild(newElement)
  else
    parent.insertBefore(newElement, targetElement.nextSibling)
}
```

`insertAdjacentHTML`/`insertAdjacentText`:

- beforebegin: 插入前一个兄弟节点.
- afterbegin: 插入第一个子节点.
- beforeend: 插入最后一个子节点.
- afterend: 插入下一个兄弟节点.

```ts
// 4 positions:
//
// <!-- beforebegin -->
// <p>
// <!-- afterbegin -->
// foo
// <!-- beforeend -->
// </p>
// <!-- afterend -->
const p = document.querySelector('p')

p.insertAdjacentHTML('beforebegin', '<a></a>')
p.insertAdjacentText('afterbegin', 'foo')

// simply be moved element, not copied element
p.insertAdjacentElement('beforebegin', link)
```

### Replace DOM Node

```ts
node.replaceChild(document.createTextNode(text), node.firstChild)
node.replaceChildren(...nodeList)
```

### Remove DOM Node

```ts
// 删除第一个子节点
const formerFirstChild = someNode.removeChild(someNode.firstChild)

// 删除最后一个子节点
const formerLastChild = someNode.removeChild(someNode.lastChild)

while (div.firstChild)
  div.removeChild(div.firstChild)

// Remove self
el.parentNode.removeChild(el)
el.remove()
```

### Traverse DOM Node

```ts
const parent = node.parentNode
const children = node.childNodes
const first = node.firstChild
const last = node.lastChild
const previous = node.previousSibling
const next = node.nextSibling

node.matches(selector)
```

[Element Traversal API](https://www.w3.org/TR/ElementTraversal):
navigation properties listed above refer to all nodes.
For instance,
in `childNodes` can see both text nodes, element nodes, and even comment nodes.

```ts
const count = el.childElementCount
const parent = el.parentElement
const children = el.children
const first = el.firstElementChild
const last = el.lastElementChild
const previous = el.previousElementSibling
const next = el.nextElementSibling

el.matches(selector)
```

NodeList is iterable:

```ts
const elements = document.querySelectorAll('div')

for (const element of elements)
  console.log(element)
```

[Node Iterator](https://developer.mozilla.org/docs/Web/API/NodeIterator):

```ts
const div = document.getElementById('div1')
function filter(node) {
  return node.tagName.toLowerCase() === 'li'
    ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_SKIP
}
const iterator = document.createNodeIterator(
  div,
  NodeFilter.SHOW_ELEMENT,
  filter,
  false
)

for (
  let node = iterator.nextNode();
  node !== null;
  node = iterator.nextNode()
)
  console.log(node.tagName) // 输出标签名
```

[Tree Walker](https://developer.mozilla.org/docs/Web/API/TreeWalker):

```ts
const div = document.getElementById('div1')
const walker = document.createTreeWalker(
  div,
  NodeFilter.SHOW_ELEMENT,
  null,
  false
)

walker.firstChild() // 前往<p>
walker.nextSibling() // 前往<ul>

for (
  let node = walker.firstChild();
  node !== null;
  node = walker.nextSibling()
)
  console.log(node.tagName) // 遍历 <li>
```

:::tip[NodeIterator vs TreeWalker]

- `NodeFilter.acceptNode()` `FILTER_REJECT`:
  - For `NodeIterator`, this flag is synonymous with `FILTER_SKIP`.
  - For `TreeWalker`, child nodes are also rejected.
- `TreeWalker` has more methods:
  - `firstChild`.
  - `lastChild`.
  - `previousSibling`.
  - `nextSibling`.

:::

### Attributes DOM Node

HTML attributes 设置对应的 DOM properties 初始值:

```ts
alert(div.getAttribute('id')) // "myDiv" default div.id
alert(div.getAttribute('class')) // "bd" default div.class
div.setAttribute('id', 'someOtherId')
div.setAttribute('class', 'ft')
div.removeAttribute('id')
div.removeAttribute('class')

// `data-src`
console.log(el.dataset.src)
```

### Select DOM Node

[Range API](https://developer.mozilla.org/docs/Web/API/Range):

- `startContainer`: 范围起点所在的节点 (选区中第一个子节点的父节点).
- `startOffset`: 范围起点在 startContainer 中的偏移量.
- `endContainer`: 范围终点所在的节点 (选区中最后一个子节点的父节点).
- `endOffset`: 范围起点在 startContainer 中的偏移量.
- `commonAncestorContainer`:
  文档中以 `startContainer` 和 `endContainer` 为后代的最深的节点.
- `setStartBefore(refNode)`:
  把范围的起点设置到 refNode 之前,
  从而让 refNode 成为选区的第一个子节点.
- `setStartAfter(refNode)`:
  把范围的起点设置到 refNode 之后,
  从而将 refNode 排除在选区之外,
  让其下一个同胞节点成为选区的第一个子节点.
- `setEndBefore(refNode)`:
  把范围的终点设置到 refNode 之前,
  从而将 refNode 排除在选区之外,
  让其上一个同胞节点成为选区的最后一个子节点.
- `setEndAfter(refNode)`:
  把范围的终点设置到 refNode 之后,
  从而让 refNode 成为选区的最后一个子节点.
- `setStart(refNode, offset)`.
- `setEnd(refNode, offset)`.
- `deleteContents()`: remove.
- `extractContents()`: remove and return.
- `cloneContents()`: clone.
- `insertNode(node)`: 在范围选区的开始位置插入一个节点.
- `surroundContents(node)`: 插入包含范围的内容.
- `collapse(boolean)`: 范围折叠.
- `compareBoundaryPoints(Range.HOW, sourceRange)`: 确定范围之间是否存在公共的边界 (起点或终点).

```html
<!doctype html>
<html>
  <body>
    <p id="p1"><b>Hello</b> world!</p>
  </body>
</html>
```

```ts
const p1 = document.getElementById('p1')
const helloNode = p1.firstChild.firstChild
const worldNode = p1.lastChild
const range = document.createRange()

range.setStart(helloNode, 2)
range.setEnd(worldNode, 3)
const fragment1 = range.cloneContents() // clone
const fragment2 = range.extractContents() // remove and return

p1.parentNode.appendChild(fragment1)
p1.parentNode.appendChild(fragment2)
```

```ts
const p1 = document.getElementById('p1')
const helloNode = p1.firstChild.firstChild
const worldNode = p1.lastChild
const range = document.createRange()

const span = document.createElement('span')
span.style.color = 'red'
span.appendChild(document.createTextNode('Inserted text'))

range.setStart(helloNode, 2)
range.setEnd(worldNode, 3)
range.insertNode(span)
// <p id="p1"><b>He<span style="color: red">Inserted text</span>llo</b> world</p>
```

```ts
const p1 = document.getElementById('p1')
const helloNode = p1.firstChild.firstChild
const worldNode = p1.lastChild
const range = document.createRange()

const span = document.createElement('span')
span.style.backgroundColor = 'yellow'

range.selectNode(helloNode)
range.surroundContents(span)
// <p><b><span style="background-color:yellow">Hello</span></b> world!</p>
```

## DOM Loading

### Dynamic Scripts Loading

```ts
function loadScript(url) {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  document.body.appendChild(script)
}
```

```ts
function loadScriptString(code) {
  const script = document.createElement('script')
  script.async = true
  script.type = 'text/javascript'

  try {
    script.appendChild(document.createTextNode(code))
  } catch (ex) {
    script.text = code
  }

  document.body.appendChild(script)
}
```

:::caution[InnerHTML Script]

所有现代浏览器中, 通过 `innerHTML` 属性创建的 `<script>` 元素永远不会执行.

:::

- Next.js route [loader](https://github.com/vercel/next.js/blob/canary/packages/next/client/route-loader.ts).
- Next.js `<Script>` [component](https://github.com/vercel/next.js/blob/canary/packages/next/client/script.tsx).

### Dynamic Styles Loading

```ts
function loadStyles(url) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url

  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
```

```ts
function loadStyleString(css) {
  const style = document.createElement('style')
  style.type = 'text/css'

  try {
    style.appendChild(document.createTextNode(css))
  } catch (ex) {
    style.styleSheet.cssText = css
  }

  const head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}
```

:::danger[StyleSheet CSSText]

- 若重用同一个 `<style>` 元素并设置该属性超过一次, 则可能导致浏览器崩溃.
- 将 `cssText` 设置为空字符串也可能导致浏览器崩溃.

:::

## Table Manipulation

`<table>` 元素添加了以下属性和方法:

- `caption`: 指向 `<caption>` 元素的指针 (如果存在).
- `tBodies`: 包含 `<tbody>` 元素的 HTMLCollection.
- `tFoot`: 指向 `<tfoot>` 元素 (如果存在).
- `tHead`: 指向 `<thead>` 元素 (如果存在).
- `rows`: 包含表示所有行的 HTMLCollection.
- `createTHead()`: 创建 `<thead>` 元素, 放到表格中, 返回引用.
- `createTFoot()`: 创建 `<tfoot>` 元素, 放到表格中, 返回引用.
- `createCaption()`: 创建 `<caption>` 元素, 放到表格中, 返回引用.
- `deleteTHead()`: 删除 `<thead>` 元素.
- `deleteTFoot()`: 删除 `<tfoot>` 元素.
- `deleteCaption()`: 删除 `<caption>` 元素.
- `deleteRow(pos)`: 删除给定位置的行.
- `insertRow(pos)`: 在行集合中给定位置插入一行.

`<tbody>` 元素添加了以下属性和方法:

- `rows`: 包含 `<tbody>` 元素中所有行的 HTMLCollection.
- `deleteRow(pos)`: 删除给定位置的行.
- `insertRow(pos)`: 在行集合中给定位置插入一行, 返回该行的引用.

`<tr>` 元素添加了以下属性和方法:

- `cells`: 包含 `<tr>` 元素所有表元的 HTMLCollection.
- `deleteCell(pos)`: 删除给定位置的表元.
- `insertCell(pos)`: 在表元集合给定位置插入一个表元, 返回该表元的引用.

```ts
// 创建表格
const table = document.createElement('table')
table.border = 1
table.width = '100%'

// 创建表体
const tbody = document.createElement('tbody')
table.appendChild(tbody)

// 创建第一行
tbody.insertRow(0)
tbody.rows[0].insertCell(0)
tbody.rows[0].cells[0].appendChild(document.createTextNode('Cell 1, 1'))
tbody.rows[0].insertCell(1)
tbody.rows[0].cells[1].appendChild(document.createTextNode('Cell 2, 1'))

// 创建第二行
tbody.insertRow(1)
tbody.rows[1].insertCell(0)
tbody.rows[1].cells[0].appendChild(document.createTextNode('Cell 1, 2'))
tbody.rows[1].insertCell(1)
tbody.rows[1].cells[1].appendChild(document.createTextNode('Cell 2, 2'))

// 把表格添加到文档主体
document.body.appendChild(table)
```

## Iframe

| Attribute                      |                                             |
| ------------------------------ | ------------------------------------------- |
| `src="https://google.com/"`    | Sets address of the document to embed       |
| `srcdoc="<p>Some html</p>"`    | Sets HTML content of the page to show       |
| `height="100px"`               | Sets iframe height in pixels                |
| `width="100px"`                | Sets iframe width in pixels                 |
| `name="my-iframe"`             | Sets name of the iframe (used in JavaScript |
| `allow="fullscreen"`           | Sets feature policy for the iframe          |
| `referrerpolicy="no-referrer"` | Sets referrer when fetching iframe content  |
| `sandbox="allow-same-origin"`  | Sets restrictions of the iframe             |
| `loading="lazy"`               | Lazy loading                                |

```html
<iframe src="https://www.google.com/" height="500px" width="500px"></iframe>
<iframe src="https://platform.twitter.com/widgets/tweet_button.html"></iframe>
<iframe srcdoc="<html><body>App</body></html>"></iframe>
<iframe
  sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts"
  src="http://maps.example.com/embedded.html"
></iframe>
```

```ts
const iframeDocument = iframe.contentDocument
const iframeStyles = iframe.contentDocument.querySelectorAll('.css')
iframe.contentWindow.postMessage('message', '*')
```
