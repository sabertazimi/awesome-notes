"use strict";(self.webpackChunkawesome_notes=self.webpackChunkawesome_notes||[]).push([[2034],{33407:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});const l=JSON.parse('{"id":"Web/Frameworks/jQueryBasicNotes","title":"jQuery Basic Notes","description":"Callbacks Queue","source":"@site/notes/Web/Frameworks/jQueryBasicNotes.md","sourceDirName":"Web/Frameworks","slug":"/Web/Frameworks/jQueryBasicNotes","permalink":"/awesome-notes/Web/Frameworks/jQueryBasicNotes","draft":false,"unlisted":false,"editUrl":"https://github.com/sabertazimi/awesome-notes/edit/main/notes/Web/Frameworks/jQueryBasicNotes.md","tags":[{"inline":true,"label":"Web","permalink":"/awesome-notes/tags/web"},{"inline":true,"label":"Framework","permalink":"/awesome-notes/tags/framework"},{"inline":true,"label":"jQuery","permalink":"/awesome-notes/tags/j-query"}],"version":"current","lastUpdatedBy":"sabertazimi","lastUpdatedAt":1712724461000,"frontMatter":{"author":"Sabertazimi","authorTitle":"Web Developer","authorURL":"https://github.com/sabertazimi","authorImageURL":"https://github.com/sabertazimi.png","tags":["Web","Framework","jQuery"]},"sidebar":"tutorialSidebar","previous":{"title":"Library Basic Notes","permalink":"/awesome-notes/Web/Frameworks/LibraryBasicNotes"},"next":{"title":"HTML Basic Notes","permalink":"/awesome-notes/Web/HTML/HTMLBasicNotes"}}');var t=s(23420),r=s(51967);const i={author:"Sabertazimi",authorTitle:"Web Developer",authorURL:"https://github.com/sabertazimi",authorImageURL:"https://github.com/sabertazimi.png",tags:["Web","Framework","jQuery"]},a="jQuery Basic Notes",o={},c=[{value:"Callbacks Queue",id:"callbacks-queue",level:2},{value:"Deferred Queue",id:"deferred-queue",level:2},{value:"Sizzle Selector Engine",id:"sizzle-selector-engine",level:2},{value:"DOM Module",id:"dom-module",level:2},{value:"DOM Internal",id:"dom-internal",level:3},{value:"structure",id:"structure",level:3},{value:"class",id:"class",level:3},{value:"style",id:"style",level:3},{value:"Events Module",id:"events-module",level:2},{value:"Events Internal",id:"events-internal",level:3},{value:"Mouse",id:"mouse",level:3},{value:"Keyboard",id:"keyboard",level:3},{value:"Form",id:"form",level:3},{value:"Document and Window Event",id:"document-and-window-event",level:3},{value:"\u5e38\u7528\u591a\u6001\u51fd\u6570",id:"\u5e38\u7528\u591a\u6001\u51fd\u6570",level:3},{value:"AJAX Module",id:"ajax-module",level:2},{value:"JSON API",id:"json-api",level:3},{value:"AJAX API",id:"ajax-api",level:3},{value:"Animation Module",id:"animation-module",level:2},{value:"Tween Object",id:"tween-object",level:3}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"jquery-basic-notes",children:"jQuery Basic Notes"})}),"\n",(0,t.jsx)(n.h2,{id:"callbacks-queue",children:"Callbacks Queue"}),"\n",(0,t.jsxs)(n.p,{children:["callback queue use ",(0,t.jsx)(n.code,{children:"Observer"})," pattern to\nadd callbacks to callback queue,\nfire callbacks when events happen."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"function Callbacks(options) {\n  let list = []\n  const self = {\n    add(fn) {\n      if (options === 'unique') {\n        if (!list.includes(fn))\n          list.push(fn)\n      } else {\n        list.push(fn)\n      }\n    },\n    fire(args) {\n      list.forEach((fn) => {\n        fn(args)\n      })\n\n      if (options === 'once')\n        list = undefined\n    },\n  }\n\n  return self\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"deferred-queue",children:"Deferred Queue"}),"\n",(0,t.jsxs)(n.p,{children:["Same to ",(0,t.jsx)(n.code,{children:"Promise"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"class Promise {\n  // `executor` takes 2 parameters, `resolve()` and `reject()`. The executor\n  // function is responsible for calling `resolve()` or `reject()` to say that\n  // the async operation succeeded (resolved) or failed (rejected).\n  constructor(executor) {\n    if (typeof executor !== 'function')\n      throw new TypeError('Executor must be a function')\n\n    // Internal state. `$state` is the state of the promise, and `$chained` is\n    // an array of the functions we need to call once this promise is settled.\n    this.$state = 'PENDING'\n    this.$chained = []\n\n    // Implement `resolve()` and `reject()` for the executor function to use\n    const resolve = (res) => {\n      // A promise is considered \"settled\" when it is no longer\n      // pending, that is, when either `resolve()` or `reject()`\n      // was called once. Calling `resolve()` or `reject()` twice\n      // or calling `reject()` after `resolve()` was already called\n      // are no-ops.\n      if (this.$state !== 'PENDING')\n        return\n\n      // If `res` is a \"thenable\", lock in this promise to match the\n      // resolved or rejected state of the thenable.\n      const then = res != null ? res.then : null\n      if (typeof then === 'function') {\n        // In this case, the promise is \"resolved\", but still in the 'PENDING'\n        // state. This is what the ES6 spec means when it says \"A resolved promise\n        // may be pending, fulfilled or rejected\" in\n        // http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects\n        return then(resolve, reject)\n      }\n\n      this.$state = 'FULFILLED'\n      this.$internalValue = res\n\n      // If somebody called `.then()` while this promise was pending, need\n      // to call their `onFulfilled()` function\n      for (const { onFulfilled } of this.$chained) onFulfilled(res)\n\n      return res\n    }\n\n    const reject = (err) => {\n      if (this.$state !== 'PENDING')\n        return\n\n      this.$state = 'REJECTED'\n      this.$internalValue = err\n\n      for (const { onRejected } of this.$chained) onRejected(err)\n    }\n\n    // Call the executor function with `resolve()` and `reject()` as in the spec.\n    try {\n      // If the executor function throws a sync exception, we consider that\n      // a rejection. Keep in mind that, since `resolve()` or `reject()` can\n      // only be called once, a function that synchronously calls `resolve()`\n      // and then throws will lead to a fulfilled promise and a swallowed error\n      executor(resolve, reject)\n    } catch (err) {\n      reject(err)\n    }\n  }\n\n  // `onFulfilled` is called if the promise is fulfilled, and `onRejected`\n  // if the promise is rejected. For now, you can think of 'fulfilled' and\n  // 'resolved' as the same thing.\n  then(onFulfilled, onRejected) {\n    return new Promise((resolve, reject) => {\n      // Ensure that errors in `onFulfilled()` and `onRejected()` reject the\n      // returned promise, otherwise they'll crash the process. Also, ensure\n      // that the promise\n      const _onFulfilled = (res) => {\n        try {\n          // If `onFulfilled()` returns a promise, trust `resolve()` to handle\n          // it correctly.\n          // store new value to new Promise\n          resolve(onFulfilled(res))\n        } catch (err) {\n          reject(err)\n        }\n      }\n\n      const _onRejected = (err) => {\n        try {\n          // store new value to new Promise\n          reject(onRejected(err))\n        } catch (_err) {\n          reject(_err)\n        }\n      }\n\n      if (this.$state === 'FULFILLED') {\n        _onFulfilled(this.$internalValue)\n      } else if (this.$state === 'REJECTED') {\n        _onRejected(this.$internalValue)\n      } else {\n        this.$chained.push({\n          onFulfilled: _onFulfilled,\n          onRejected: _onRejected,\n        })\n      }\n    })\n  }\n\n  catch(onRejected) {\n    return this.then(null, onRejected)\n  }\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"sizzle-selector-engine",children:"Sizzle Selector Engine"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"runtime tokenizer and parser"}),"\n",(0,t.jsxs)(n.li,{children:["api from ",(0,t.jsx)(n.code,{children:"querySelectorAll"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"dom-module",children:"DOM Module"}),"\n",(0,t.jsx)(n.h3,{id:"dom-internal",children:"DOM Internal"}),"\n",(0,t.jsx)(n.p,{children:"createDocumentFragment:"}),"\n",(0,t.jsx)(n.p,{children:"\u591a\u6b21\u4f7f\u7528\u8282\u70b9\u65b9\u6cd5(\u5982\uff1aappendChild)\u7ed8\u5236\u9875\u9762\uff0c\u6bcf\u6b21\u90fd\u8981\u5237\u65b0\u9875\u9762\u4e00\u6b21\u3002\n\u4f7f\u7528 document_createDocumentFragment()\u521b\u5efa\u4e00\u4e2a\u6587\u6863\u788e\u7247\uff0c\u628a\u6240\u6709\u7684\u65b0\u7ed3\u70b9\u9644\u52a0\u5728\u5176\u4e0a\uff0c\n\u7136\u540e\u628a\u6587\u6863\u788e\u7247\u7684\u5185\u5bb9\u4e00\u6b21\u6027\u6dfb\u52a0\u5230 document \u4e2d\uff0c\u63d0\u5347\u6027\u80fd"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"function domManipulation(parentElements, target, callback) {\n  const fragment = buildFragment([target], parentElements)\n  callback.call(parentElements)\n}\n\nfunction after(...args) {\n  return this.domManipulation(...args, function (elem) {\n    this.parentNode.insertBefore(elem, this.nextSibling)\n  })\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"structure",children:"structure"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$('selector').html('tag+text')\n$('selector').text('text')\n\n$('selector').clone()\n$('selector').remove()\n$('selector').appendTo('selector')\n\n$('selector').parent()\n$('selector').children()\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$('selector').index()\n"})}),"\n",(0,t.jsx)(n.h3,{id:"class",children:"class"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$('selector').addClass('')\n$('selector').removeClass('')\n$('selector').hidden()\n"})}),"\n",(0,t.jsx)(n.h3,{id:"style",children:"style"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$('selector').css('color', 'red')\n$('selector').prop('disable', 'true')\n"})}),"\n",(0,t.jsx)(n.h2,{id:"events-module",children:"Events Module"}),"\n",(0,t.jsx)(n.h3,{id:"events-internal",children:"Events Internal"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"\u901a\u8fc7 on \u7ed1\u5b9a\u4e8b\u4ef6\uff0c\u5206\u6790\u4f20\u9012\u7684\u6570\u636e\uff0c\u52a0\u5de5\u53d8\u6210 add \u80fd\u591f\u8bc6\u522b\u7684\u6570\u636e"}),"\n",(0,t.jsx)(n.li,{children:"\u901a\u8fc7 add \u628a\u6570\u636e\u6574\u7406\u653e\u5230\u6570\u636e\u7f13\u5b58\u4e2d\u4fdd\u5b58\uff0c\u901a\u8fc7 addEventListener \u7ed1\u5b9a\u4e8b\u4ef6"}),"\n",(0,t.jsx)(n.li,{children:"\u89e6\u53d1\u4e8b\u4ef6\u6267\u884c addEventListener \u56de\u8c03 dispatch \u65b9\u6cd5"}),"\n",(0,t.jsx)(n.li,{children:"\u4fee\u6b63\u4e8b\u4ef6\u5bf9\u8c61\u5b58\u5728\u7684\u95ee\u9898\uff0c\u901a\u8fc7 fix \u751f\u6210\u4e00\u4e2a\u53ef\u5199\u7684\u4e8b\u4ef6\u5bf9\u8c61"}),"\n",(0,t.jsx)(n.li,{children:'\u5f15\u5165 handlers \u628a\u59d4\u6258\u548c\u539f\u751f\u4e8b\u4ef6\uff08\u4f8b\u5982"click"\uff09\u7ed1\u5b9a\u533a\u5206\u5bf9\u5f85'}),"\n",(0,t.jsx)(n.li,{children:"\u6267\u884c\u6570\u636e\u7f13\u5b58\u7684\u4e8b\u4ef6\u56de\u8c03\uff0c\u4f20\u5165\u5185\u90e8\u4ea7\u751f\u7684\u4e8b\u4ef6\u5bf9\u8c61"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"mouse",children:"Mouse"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"click"}),"\n",(0,t.jsx)(n.li,{children:"dbclick"}),"\n",(0,t.jsx)(n.li,{children:"mouseenter"}),"\n",(0,t.jsx)(n.li,{children:"mouseleave"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"keyboard",children:"Keyboard"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"keypress"}),"\n",(0,t.jsx)(n.li,{children:"keydown"}),"\n",(0,t.jsx)(n.li,{children:"keyup"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"form",children:"Form"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"submit"}),"\n",(0,t.jsx)(n.li,{children:"change"}),"\n",(0,t.jsx)(n.li,{children:"focus"}),"\n",(0,t.jsx)(n.li,{children:"blur"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"document-and-window-event",children:"Document and Window Event"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"load"}),"\n",(0,t.jsx)(n.li,{children:"resize"}),"\n",(0,t.jsx)(n.li,{children:"scroll"}),"\n",(0,t.jsx)(n.li,{children:"unload"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$(window).scroll((event) => {})\n$(document).height() // \u8fd4\u56de\u6574\u4e2a\u7f51\u9875\u7684\u9ad8\u5ea6\n$(window).height() // \u8fd4\u56de\u7a97\u53e3\u9ad8\u5ea6\n$(window).scrollTop() // \u8fd4\u56de\u6eda\u52a8\u6761\u8ddd\u7f51\u9875\u9876\u90e8\u8ddd\u79bb\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u5e38\u7528\u591a\u6001\u51fd\u6570",children:"\u5e38\u7528\u591a\u6001\u51fd\u6570"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$(selector).data()\n$(selector).html()\n$(selector).css()\n$(document).ready(() => {})\n"})}),"\n",(0,t.jsx)(n.h2,{id:"ajax-module",children:"AJAX Module"}),"\n",(0,t.jsx)(n.h3,{id:"json-api",children:"JSON API"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"$.getJSON"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$.getJSON(url, data, success(data, statusCode, xhr))\n\n$.getJSON('test.js', (json) => {\n  alert(`JSON Data: ${json.users[3].name}`)\n})\n"})}),"\n",(0,t.jsx)(n.h3,{id:"ajax-api",children:"AJAX API"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"$.ajax"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"$.ajax({\n  url: 'http://localhost:3000',\n  type: 'GET' / 'POST' / 'PUT' / 'DELETE',\n  data: dataSchema,\n  dataType: 'json',\n  success: successCallback,\n  error: errorHandle,\n})\n"})}),"\n",(0,t.jsx)(n.h2,{id:"animation-module",children:"Animation Module"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u901a\u8fc7\u591a\u4e2a animate \u65b9\u6cd5\u5f62\u6210\u52a8\u753b\u94fe\uff0c\u90a3\u4e48\u8fd9\u4e2a\u52a8\u753b\u94fe\u5176\u5b9e\u90fd\u662f\u4f1a\u52a0\u5165\u5230 queue \u961f\u5217\u91cc\u9762"}),"\n",(0,t.jsx)(n.li,{children:"\u5728\u6bcf\u4e00\u6b21 queue \u65b9\u6cd5\u4e2d\u4f1a\u628a\u52a8\u753b\u6570\u636e\u5199\u5230\u961f\u5217\u4e2d\uff0c\u7136\u540e\u53d6\u51fa\u961f\u5217\u4e2d\u7684\u7b2c\u4e00\u4e2a\u5e8f\u5217\u901a\u8fc7 dequeue \u65b9\u6cd5\u6267\u884c"}),"\n",(0,t.jsxs)(n.li,{children:["\u5f00\u59cb\u6267\u884c\u4e4b\u524d\u5199\u4e00\u4e2a\u8fdb\u7a0b\u9501 ",(0,t.jsx)(n.code,{children:"inProgress"})," \u5230 queue \u91cc\u9762\uff0c \u4ee3\u8868\u8fd9\u4e2a\u52a8\u753b\u8fd8\u5728\u6267\u884c\u4e2d\uff0c\n\u9632\u6b62\u540c\u4e2a\u5e8f\u5217\u7684\u591a\u4e2a\u52a8\u753b\u91cd\u590d\u6267\u884c\uff0c\u8fd9\u4e2a\u5c31\u662f\u5f02\u6b65\u6267\u884c\u540c\u6b65\u6536\u96c6\u7684\u5904\u7406\u65b9\u6848"]}),"\n",(0,t.jsx)(n.li,{children:"\u6b64\u65f6\u52a8\u753b\u5f00\u59cb\u4e86\uff0c\u8fd9\u91cc\u6ce8\u610f\u52a8\u753b\u662f\u5728\u5f02\u6b65\u6267\u884c\u7684\u540c\u6b65\u7684\u4ee3\u7801\uff0c\u7ee7\u7eed\u8c03\u7528\u4e0b\u4e00\u4e2a animate"}),"\n",(0,t.jsx)(n.li,{children:"\u6267\u884c\u540c\u6837\u7684 animate \u65b9\u6cd5\u903b\u8f91\u4f46\u662f\u6b64\u65f6\u95ee\u9898\u6765\u4e86\uff0c\n\u52a8\u753b\u53ef\u80fd\u8fd8\u5728\u6267\u884c\u53ef\u662f\u540e\u7eed\u7684 animate \u8fd8\u5728\u7ee7\u7eed\u8c03\u7528\uff0c\u6240\u4ee5\u8fd9\u4e2a\u65f6\u5019\u540e\u9762\u7684\u52a8\u753b\u4ee3\u7801\u5c31\u9700\u8981\u7b49\u5f85\u4e86\uff08\u8fdb\u7a0b\u9501\uff09"}),"\n",(0,t.jsxs)(n.li,{children:["\u961f\u5217\u5934\u662f\u6709\u4e00\u628a ",(0,t.jsx)(n.code,{children:"inProgress"})," \u8fdb\u7a0b\u9501\u7684\uff0c\u90a3\u4e48\u8fd9\u65f6\u5019\u52a8\u753b\u53ea\u9700\u8981\u52a0\u5165\u961f\u5217\uff0c\n\u4f46\u662f\u53ef\u4ee5\u901a\u8fc7 ",(0,t.jsx)(n.code,{children:"inProgress"})," \u662f\u5426\u5b58\u5728\u6765\u5224\u65ad\u662f\u5426\u6267\u884c"]}),"\n",(0,t.jsx)(n.li,{children:"\u6240\u6709\u7684 animate \u65b9\u6cd5\u5728\u52a0\u5165\u961f\u5217\u90fd\u662f\u6309\u7167\u4ee5\u4e0a\u7684\u903b\u8f91\u4f9d\u6b21\u6267\u884c\uff0c\n\u52a8\u753b\u6267\u884c\u5b8c\u6bd5\u4e86\u5c31\u4f1a\u6709\u4e00\u4e2a\u7ed3\u675f\u901a\u77e5\uff0c\u7136\u540e\u4ece queue \u53d6\u51fa\u7b2c\u4e00\u4e2a\u961f\u5217\u7ee7\u7eed\u6267\u884c\u4e86\uff0c\u5982\u6b64\u5faa\u73af"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tween-object",children:"Tween Object"}),"\n",(0,t.jsx)(n.p,{children:"\u901a\u8fc7\u4e00\u4e2a Tween \u7c7b\u6784\u9020\u51fa\u6765\u7684\u7f13\u52a8\u5bf9\u8c61\uff0c\u5176\u5b9e\u5c31\u662f\u9488\u5bf9\u6bcf\u4e00\u4e2a\u5c5e\u6027\u7684\u5c01\u88c5\u5bf9\u8c61\uff0c\n\u8fd9\u6837\u6211\u4eec\u53ea\u9700\u8981\u8bbe\u8ba1\u4e00\u4e2a\u5b9a\u65f6\u5668\uff0c\u5728\u6307\u5b9a\u7684\u65f6\u95f4\u5185\u8c03\u7528 Tween \u751f\u6210\u7684\u8fd9\u4e9b\u5bf9\u8c61\u5c31\u53ef\u4ee5\u4e86\uff0c\nTween \u5185\u90e8\u63a7\u5236\u7740\u5404\u81ea\u5c5e\u6027\u7684\u72b6\u6001\u6539\u53d8\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u5177\u4f53\u53f3\u8fb9\u7684\u5b9e\u73b0\u4ee3\u7801\u6d89\u53ca\u4e86\u5982\u4e0b\u51e0\u4e2a\u90e8\u5206\u4e86\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Animation \u51fd\u6570\uff0c\u5165\u53e3\u51fd\u6570\u7528\u6765\u505a\u4e00\u4e9b\u53c2\u6570\u7684\u521d\u59cb\u5316\u5de5\u4f5c\uff0c\u6574\u4e2a\u52a8\u753b\u7684\u5f00\u59cb\u8c03\u5ea6"}),"\n",(0,t.jsx)(n.li,{children:"animation \u5bf9\u8c61\u5c31\u662f\u5b9e\u9645\u7684\u52a8\u753b\u5bf9\u8c61\u4e86\uff0c\u901a\u8fc7 Animation \u51fd\u6570\u521b\u5efa\uff0c\u8fd9\u4e2a\u5bf9\u8c61\u4e0a\u5b9e\u73b0\u4e86\u6240\u6709\u5c5e\u6027\u4e0e\u65b9\u6cd5"}),"\n",(0,t.jsx)(n.li,{children:"new Tween() \u901a\u8fc7 Tween \u521b\u5efa\u6bcf\u4e00\u4e2a\u5c5e\u6027\u5bf9\u8c61\u76f8\u5173\u7684\u6570\u636e"}),"\n",(0,t.jsx)(n.li,{children:"animation.tweens \u4fdd\u5b58\u4e86\u6bcf\u4e00\u4e2a\u5c5e\u6027\u5bf9\u8c61\u7684\u5bb9\u5668"}),"\n",(0,t.jsx)(n.li,{children:"Animation.fx \u5c31\u662f\u5177\u4f53\u5f00\u59cb\u52a8\u753b\u6267\u884c\u7684\u8c03\u7528\u7684\u4e00\u4e2a\u8c03\u5ea6\u5bf9\u8c61\u4e86"}),"\n",(0,t.jsx)(n.li,{children:"\u5b9a\u65f6\u5668\u90fd\u662f\u6267\u884c\u4e00\u4e2a\u56de\u8c03\u51fd\u6570\u7684\uff0ctick \u5c31\u662f\u5b9a\u65f6\u5668\u6267\u884c\u7684\u56de\u8c03\uff0c\ntick \u51fd\u6570\u4e2d\u901a\u8fc7\u8ba1\u7b97\u51fa\u53d8\u5316\u6570\u636e\uff0c\u7136\u540e\u901a\u8fc7\u5faa\u73af animation.tweens \u4e2d\u7684\u6bcf\u4e00\u4e2a\u52a8\u753b\u5c5e\u6027\u5bf9\u8c61\uff0c\u6765\u5b9e\u73b0\u6539\u53d8"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},51967:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>a});var l=s(36672);const t={},r=l.createContext(t);function i(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);