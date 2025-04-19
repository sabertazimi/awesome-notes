"use strict";(self.webpackChunkawesome_notes=self.webpackChunkawesome_notes||[]).push([[6609],{60428:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"Web/Angular/AngularBasicNotes","title":"Angular Basic Notes","description":"Basic","source":"@site/notes/Web/Angular/AngularBasicNotes.md","sourceDirName":"Web/Angular","slug":"/Web/Angular/AngularBasicNotes","permalink":"/awesome-notes/Web/Angular/AngularBasicNotes","draft":false,"unlisted":false,"editUrl":"https://github.com/sabertazimi/awesome-notes/edit/main/notes/Web/Angular/AngularBasicNotes.md","tags":[{"inline":true,"label":"Web","permalink":"/awesome-notes/tags/web"},{"inline":true,"label":"Angular","permalink":"/awesome-notes/tags/angular"}],"version":"current","lastUpdatedBy":"renovate[bot]","lastUpdatedAt":1732127335000,"frontMatter":{"author":"Sabertazimi","authorTitle":"Web Developer","authorURL":"https://github.com/sabertazimi","authorImageURL":"https://github.com/sabertazimi.png","tags":["Web","Angular"]},"sidebar":"tutorialSidebar","previous":{"title":"Verilog Basic Notes","permalink":"/awesome-notes/Language/Verilog/VerilogBasicNotes"},"next":{"title":"Bootstrap Basic Notes","permalink":"/awesome-notes/Web/CSS/BootstrapBasicNotes"}}');var l=r(23420),s=r(51967);const t={author:"Sabertazimi",authorTitle:"Web Developer",authorURL:"https://github.com/sabertazimi",authorImageURL:"https://github.com/sabertazimi.png",tags:["Web","Angular"]},a="Angular Basic Notes",c={},o=[{value:"Basic",id:"basic",level:2},{value:"CLI",id:"cli",level:3},{value:"Module",id:"module",level:2},{value:"Component",id:"component",level:2},{value:"Props",id:"props",level:3},{value:"Event",id:"event",level:3},{value:"Attributes",id:"attributes",level:3},{value:"Reference",id:"reference",level:3},{value:"Pipe",id:"pipe",level:3},{value:"Pure Pipe",id:"pure-pipe",level:4},{value:"Impure Pipe",id:"impure-pipe",level:4},{value:"Async Pipe",id:"async-pipe",level:4},{value:"Service",id:"service",level:2},{value:"Injection Provider",id:"injection-provider",level:3},{value:"RxJS",id:"rxjs",level:2},{value:"Basis",id:"basis",level:3},{value:"RxJS Pipe Helper",id:"rxjs-pipe-helper",level:3},{value:"Operator",id:"operator",level:3},{value:"Creation Operator",id:"creation-operator",level:4},{value:"Transformation Operator",id:"transformation-operator",level:4},{value:"Filter Operator",id:"filter-operator",level:4},{value:"Combination Operator",id:"combination-operator",level:4},{value:"Multi-Cast Operator",id:"multi-cast-operator",level:4},{value:"Error Handling Operator",id:"error-handling-operator",level:4},{value:"Utils Operator",id:"utils-operator",level:4},{value:"Router",id:"router",level:2},{value:"Form",id:"form",level:2},{value:"Event Binding",id:"event-binding",level:2},{value:"Directives",id:"directives",level:2},{value:"Structural Directives",id:"structural-directives",level:3},{value:"For Directive",id:"for-directive",level:4},{value:"If Directive",id:"if-directive",level:4},{value:"Attribute Directives",id:"attribute-directives",level:3},{value:"Class Directive",id:"class-directive",level:4},{value:"Styles",id:"styles",level:2},{value:"CSS Class Binding",id:"css-class-binding",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"angular-basic-notes",children:"Angular Basic Notes"})}),"\n",(0,l.jsx)(n.h2,{id:"basic",children:"Basic"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://angular.io/guide/quickstart",children:"Installation"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://angular.io/tutorial",children:"Basic Tutorial"})}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"cli",children:"CLI"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://angular.io/cli",children:"CLI Commands"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npm install -g @angular/cli\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"ng new my-app\nng add <package-name>\nng serve --open\nng lint\nng test\nng e2e\n"})}),"\n",(0,l.jsxs)(n.p,{children:["production build: suffix ",(0,l.jsx)(n.code,{children:"/"})," is required"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"ng build --prod true --outputPath ./build --baseHref https://sabertazimi.github.io/hust-web/angular/learn/\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"ng generate --help\n"})}),"\n",(0,l.jsx)(n.h2,{id:"module",children:"Module"}),"\n",(0,l.jsxs)(n.p,{children:["Angular \u9700\u8981\u77e5\u9053\u5982\u4f55\u628a\u5e94\u7528\u7a0b\u5e8f\u7684\u5404\u4e2a\u90e8\u5206\u7ec4\u5408\u5230\u4e00\u8d77,\n\u4ee5\u53ca\u8be5\u5e94\u7528\u9700\u8981\u54ea\u4e9b\u5176\u5b83\u6587\u4ef6\u548c\u5e93,\n\u8fd9\u4e9b\u4fe1\u606f\u88ab\u79f0\u4e3a\u5143\u6570\u636e\uff08metadata.\n\u6709\u4e9b\u5143\u6570\u636e\u4f4d\u4e8e",(0,l.jsx)(n.code,{children:"@Component"}),"\u88c5\u9970\u5668\u4e2d, \u4f60\u4f1a\u628a\u5b83\u52a0\u5230\u7ec4\u4ef6\u7c7b\u4e0a.\n\u53e6\u4e00\u4e9b\u5173\u952e\u6027\u7684\u5143\u6570\u636e\u4f4d\u4e8e",(0,l.jsx)(n.code,{children:"@NgModule"}),"\u88c5\u9970\u5668\u4e2d."]}),"\n",(0,l.jsx)(n.p,{children:"NgModule \u4e3a\u5176\u4e2d\u7684\u7ec4\u4ef6\u63d0\u4f9b\u4e86\u4e00\u4e2a\u7f16\u8bd1\u4e0a\u4e0b\u6587\u73af\u5883.\n\u6839\u6a21\u5757\u603b\u4f1a\u6709\u4e00\u4e2a\u6839\u7ec4\u4ef6, \u5e76\u5728\u5f15\u5bfc\u671f\u95f4\u521b\u5efa\u5b83.\n\u4efb\u4f55\u6a21\u5757\u90fd\u80fd\u5305\u542b\u4efb\u610f\u6570\u91cf\u7684\u5176\u5b83\u7ec4\u4ef6,\n\u8fd9\u4e9b\u7ec4\u4ef6\u53ef\u4ee5\u901a\u8fc7\u8def\u7531\u5668\u52a0\u8f7d, \u4e5f\u53ef\u4ee5\u901a\u8fc7\u6a21\u677f\u521b\u5efa.\n\u90a3\u4e9b\u5c5e\u4e8e\u8fd9\u4e2a NgModule \u7684\u7ec4\u4ef6\u4f1a\u5171\u4eab\u540c\u4e00\u4e2a\u7f16\u8bd1\u4e0a\u4e0b\u6587\u73af\u5883."}),"\n",(0,l.jsx)(n.h2,{id:"component",children:"Component"}),"\n",(0,l.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import { Input } from '@angular/core'\n\nclass InputComponent {\n  @Input() hero: Hero\n}\n"})}),"\n",(0,l.jsx)(n.p,{children:"private props"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import type { HeroService } from '../hero.service'\n\nclass HeroComponent {\n  constructor(private heroService: HeroService) {}\n}\n"})}),"\n",(0,l.jsx)(n.h3,{id:"event",children:"Event"}),"\n",(0,l.jsx)(n.p,{children:"parent"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import type { OnInit } from '@angular/core'\nimport { Component } from '@angular/core'\n\n@Component({\n  selector: 'app-root',\n  template: `<app-child (valueChange)=\"displayCounter($event)\"></app-child>`,\n})\nexport class AppComponent implements OnInit {\n  ngOnInit() {}\n\n  displayCounter(count) {\n    console.log(count)\n  }\n}\n"})}),"\n",(0,l.jsx)(n.p,{children:"child"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import { Component, EventEmitter, Input, Output } from '@angular/core'\n\n@Component({\n  selector: 'app-child',\n  template: `<button class=\"btn btn-primary\" (click)=\"handleClick()\">\n    Click me\n  </button>`,\n})\nexport class AppChildComponent {\n  @Output() valueChange: EventEmitter<number> = new EventEmitter()\n  counter = 0\n\n  handleClick() {\n    this.counter += 1\n    this.valueChange.emit(this.counter)\n  }\n}\n"})}),"\n",(0,l.jsx)(n.h3,{id:"attributes",children:"Attributes"}),"\n",(0,l.jsx)(n.p,{children:"Angular \u53ea\u4f1a\u7ed1\u5b9a\u5230\u7ec4\u4ef6\u7684\u516c\u5171\u5c5e\u6027"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import type { MessageService } from '../message.service'\n\nclass MessageComponent {\n  constructor(public messageService: MessageService) {}\n}\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<div *ngIf="messageService.messages.length">\n  <h2>Messages</h2>\n  <button class="clear" (click)="messageService.clear()">Clear</button>\n  <div *ngFor="let message of messageService.messages">{{message}}</div>\n</div>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"reference",children:"Reference"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"#"})," refer to DOM"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:"<div>\n  <label\n    >Hero name:\n    <input #heroName />\n  </label>\n  <button (click)=\"add(heroName.value); heroName.value=''\">add</button>\n</div>\n"})}),"\n",(0,l.jsx)(n.h3,{id:"pipe",children:"Pipe"}),"\n",(0,l.jsx)(n.h4,{id:"pure-pipe",children:"Pure Pipe"}),"\n",(0,l.jsx)(n.p,{children:"Angular \u53ea\u6709\u5728\u5b83\u68c0\u6d4b\u5230\u8f93\u5165\u503c\u53d1\u751f\u4e86\u7eaf\u53d8\u66f4\u65f6\u624d\u4f1a\u6267\u884c\u7eaf\u7ba1\u9053.\n\u7eaf\u53d8\u66f4\u662f\u6307\u5bf9\u539f\u59cb\u7c7b\u578b\u503c (String\u3001Number\u3001Boolean\u3001Symbol) \u7684\u66f4\u6539,\n\u6216\u8005\u5bf9\u5bf9\u8c61\u5f15\u7528 (Date\u3001Array\u3001Function\u3001Object) \u7684\u66f4\u6539.\nHigher performance."}),"\n",(0,l.jsx)(n.h4,{id:"impure-pipe",children:"Impure Pipe"}),"\n",(0,l.jsx)(n.p,{children:"Angular \u4f1a\u5728\u6bcf\u4e2a\u7ec4\u4ef6\u7684\u53d8\u66f4\u68c0\u6d4b\u5468\u671f\u4e2d\u6267\u884c\u975e\u7eaf\u7ba1\u9053.\n\u975e\u7eaf\u7ba1\u9053\u53ef\u80fd\u4f1a\u88ab\u8c03\u7528\u5f88\u591a\u6b21,\n\u548c\u6bcf\u4e2a\u6309\u952e\u6216\u6bcf\u6b21\u9f20\u6807\u79fb\u52a8\u4e00\u6837\u9891\u7e41."}),"\n",(0,l.jsx)(n.h4,{id:"async-pipe",children:"Async Pipe"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'\x3c!-- heroes$ is a Observable --\x3e\n<li *ngFor="let hero of heroes$ | async">{{hero.name}}</li>\n'})}),"\n",(0,l.jsx)(n.h2,{id:"service",children:"Service"}),"\n",(0,l.jsx)(n.h3,{id:"injection-provider",children:"Injection Provider"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"@Injectable({\n  providedIn: 'root',\n})\nclass Logger {}\n"})}),"\n",(0,l.jsx)(n.h2,{id:"rxjs",children:"RxJS"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"RxJS \u7ba1\u7406\u6240\u6709\u8f93\u5165\u7684 input -> consumer/redux action \u7684\u8c03\u5ea6\u8fc7\u7a0b"}),"\n",(0,l.jsx)(n.li,{children:"\u6761\u4ef6\u53d8\u66f4\u4e4b\u540e\u7684\u81ea\u52a8\u91cd\u65b0\u8ba1\u7b97 (Reactive)"}),"\n",(0,l.jsx)(n.li,{children:"\u540c\u6b65\u4e0e\u5f02\u6b65\u7684\u7edf\u4e00"}),"\n",(0,l.jsx)(n.li,{children:"\u83b7\u53d6\u548c\u8ba2\u9605\u7684\u7edf\u4e00"}),"\n",(0,l.jsx)(n.li,{children:"\u73b0\u5728\u4e0e\u672a\u6765\u7684\u7edf\u4e00"}),"\n",(0,l.jsx)(n.li,{children:"\u53ef\u7ec4\u5408\u7684\u6570\u636e\u53d8\u66f4\u8fc7\u7a0b"}),"\n",(0,l.jsx)(n.li,{children:"\u6570\u636e\u4e0e\u89c6\u56fe\u7684\u7cbe\u786e\u7ed1\u5b9a"}),"\n",(0,l.jsx)(n.li,{children:"UI \u53d8\u5316\u5f88\u590d\u6742\u65f6\uff0c\u7528 component \u5f52\u4e00\u5316\u5904\u7406"}),"\n",(0,l.jsx)(n.li,{children:"state \u53d8\u5316\u5f88\u590d\u6742\u65f6\uff0c\u7528 action/state \u5f52\u4e00\u5316\u5904\u7406"}),"\n",(0,l.jsx)(n.li,{children:"data-input \u5f88\u590d\u6742\u65f6\uff0c\u7528 RxJS/observable \u5f52\u4e00\u5316\u5904\u7406"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://reactive.how",children:"reactive.how"})}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"basis",children:"Basis"}),"\n",(0,l.jsx)(n.p,{children:"\u53ef\u89c2\u5bdf\u5bf9\u8c61\u53ef\u4ee5\u53d1\u9001\u591a\u4e2a\u4efb\u610f\u7c7b\u578b\u7684\u503c \u2014\u2014 \u5b57\u9762\u91cf\u3001\u6d88\u606f\u3001\u4e8b\u4ef6.\n\u65e0\u8bba\u8fd9\u4e9b\u503c\u662f\u540c\u6b65\u53d1\u9001\u7684\u8fd8\u662f\u5f02\u6b65\u53d1\u9001\u7684,\n\u63a5\u6536\u8fd9\u4e9b\u503c\u7684 API \u90fd\u662f\u4e00\u6837\u7684.\n\u7531\u4e8e\u51c6\u5907\uff08setup\uff09\u548c\u6e05\u573a\uff08teardown\uff09\u7684\u903b\u8f91\u90fd\u662f\u7531\u53ef\u89c2\u5bdf\u5bf9\u8c61\u81ea\u5df1\u5904\u7406\u7684,\n\u56e0\u6b64\u5e94\u7528\u4ee3\u7801\u53ea\u7ba1\u8ba2\u9605\u5e76\u6d88\u8d39\u8fd9\u4e9b\u503c\u5c31\u53ef\u4ee5\u4e86, \u505a\u5b8c\u4e4b\u540e, \u53d6\u6d88\u8ba2\u9605.\n\u65e0\u8bba\u8fd9\u4e2a\u6d41\u662f\u51fb\u952e\u6d41\u3001HTTP \u54cd\u5e94\u6d41\u8fd8\u662f\u5b9a\u65f6\u5668,\n\u5bf9\u8fd9\u4e9b\u503c\u8fdb\u884c\u76d1\u542c\u548c\u505c\u6b62\u76d1\u542c\u7684\u63a5\u53e3\u90fd\u662f\u4e00\u6837\u7684."}),"\n",(0,l.jsx)(n.p,{children:"Observer\uff08\u89c2\u5bdf\u8005\uff09\u662f Observable\uff08\u53ef\u89c2\u5bdf\u5bf9\u8c61\uff09\u63a8\u9001\u6570\u636e\u7684\u6d88\u8d39\u8005.\n\u5728 RxJS \u4e2d, Observer \u662f\u4e00\u4e2a\u7531\u56de\u8c03\u51fd\u6570\u7ec4\u6210\u7684\u5bf9\u8c61,\n\u952e\u540d\u5206\u522b\u4e3a next, error, complete,\n\u4ee5\u6b64\u63a5\u53d7 Observable \u63a8\u9001\u7684\u4e0d\u540c\u7c7b\u578b\u7684\u901a\u77e5 (data input)."}),"\n",(0,l.jsx)(n.p,{children:"Subscription \u662f\u4e00\u4e2a\u4ee3\u8868\u53ef\u4ee5\u7ec8\u6b62\u8d44\u6e90\u7684\u5bf9\u8c61,\n\u8868\u793a\u4e00\u4e2a Observable \u7684\u6267\u884c\u8fc7\u7a0b.\nSubscription \u6709\u4e00\u4e2a\u91cd\u8981\u7684\u65b9\u6cd5: unsubscribe.\n\u8fd9\u4e2a\u65b9\u6cd5\u4e0d\u9700\u8981\u4f20\u5165\u53c2\u6570,\n\u8c03\u7528\u540e\u4fbf\u4f1a\u7ec8\u6b62\u76f8\u5e94\u7684\u8d44\u6e90.\nObservable \u5f53\u6709\u6570\u636e\u4ea7\u751f\u65f6\u624d\u4f1a\u63a8\u9001\u7ed9\u8ba2\u9605\u8005,\n\u6240\u4ee5\u5b83\u53ef\u80fd\u4f1a\u65e0\u9650\u6b21\u5411\u8ba2\u9605\u8005\u63a8\u9001\u6570\u636e.\n\u56e0\u6b64\u5728 Angular \u91cc\u9762\u521b\u5efa\u7ec4\u4ef6\u7684\u65f6\u5019\u52a1\u5fc5\u8981\u53d6\u6d88\u8ba2\u9605\u64cd\u4f5c, \u4ee5\u907f\u514d\u5185\u5b58\u6cc4\u6f0f."}),"\n",(0,l.jsx)(n.p,{children:"Subject \u65e2\u662f\u53ef\u89c2\u5bdf\u5bf9\u8c61\u7684\u6570\u636e\u6e90, \u672c\u8eab\u4e5f\u662f Observable.\n\u53ef\u4ee5\u50cf\u8ba2\u9605\u4efb\u4f55 Observable \u4e00\u6837\u8ba2\u9605 Subject.\n\u8fd8\u53ef\u4ee5\u901a\u8fc7\u8c03\u7528\u5b83\u7684 next(value) \u65b9\u6cd5\u5f80 Observable \u4e2d\u63a8\u9001\u4e00\u4e9b\u503c."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"// Create simple observable that emits three values\nconst myObservable = of(1, 2, 3)\n\n// Create observer object\nconst myObserver = {\n  next: x => console.log(`Observer got a next value: ${x}`),\n  error: err => console.error(`Observer got an error: ${err}`),\n  complete: () => console.log('Observer got a complete notification'),\n}\n\n// Execute with the observer object\nconst subscription = myObservable.subscribe(myObserver)\n// Logs:\n// Observer got a next value: 1\n// Observer got a next value: 2\n// Observer got a next value: 3\n// Observer got a complete notification\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"class Component {\n  search(term: string): void {\n    this.searchTerms.next(term)\n  }\n\n  ngOnInit(): void {\n    this.heroes$ = this.searchTerms.pipe(\n      // wait 300ms after each keystroke before considering the term\n      debounceTime(300),\n\n      // ignore new term if same as previous term\n      distinctUntilChanged(),\n\n      // switch to new search observable each time the term changes\n      // return another Observable\n      switchMap((term: string) => this.heroService.searchHeroes(term))\n    )\n  }\n}\n"})}),"\n",(0,l.jsx)(n.h3,{id:"rxjs-pipe-helper",children:"RxJS Pipe Helper"}),"\n",(0,l.jsx)(n.p,{children:"RxJS \u63d0\u4f9b\u4e86 pipe \u8f85\u52a9\u51fd\u6570,\n\u5b83\u5b58\u5728\u4e8e Observable \u4e0a,\n\u5b83\u7f13\u89e3\u4e86\u64cd\u4f5c\u7b26\u4e0d\u5728\u539f\u578b\u4e0a\u6240\u5e26\u6765\u7684\u95ee\u9898."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import { of } from '@rxjs/observable'\nimport { map, take } from '@rxjs/operators'\n\nmap.call(take.call(of(1, 2, 3), 2), val => val + 2)\n\nof(1, 2, 3).pipe(\n  take(2),\n  map(val => val + 2)\n)\n"})}),"\n",(0,l.jsx)(n.h3,{id:"operator",children:"Operator"}),"\n",(0,l.jsx)(n.h4,{id:"creation-operator",children:"Creation Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5355\u503c: of, empty, never"}),"\n",(0,l.jsx)(n.li,{children:"\u591a\u503c: from"}),"\n",(0,l.jsx)(n.li,{children:"\u5b9a\u65f6: interval, timer"}),"\n",(0,l.jsx)(n.li,{children:"\u4ece\u4e8b\u4ef6\u521b\u5efa: fromEvent/fromEventPattern"}),"\n",(0,l.jsx)(n.li,{children:"\u4ece Promise \u521b\u5efa: fromPromise"}),"\n",(0,l.jsx)(n.li,{children:"\u81ea\u5b9a\u4e49\u521b\u5efa: create"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"transformation-operator",children:"Transformation Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"map"}),"\n",(0,l.jsx)(n.li,{children:"mapTo"}),"\n",(0,l.jsx)(n.li,{children:"mergeMap/flatMap"}),"\n",(0,l.jsx)(n.li,{children:"pluck"}),"\n",(0,l.jsx)(n.li,{children:"reduce"}),"\n",(0,l.jsx)(n.li,{children:"scan"}),"\n",(0,l.jsx)(n.li,{children:"groupBy"}),"\n",(0,l.jsx)(n.li,{children:"switch"}),"\n",(0,l.jsx)(n.li,{children:"switchMap: \u5728\u6bcf\u6b21\u53d1\u51fa\u65f6, \u4f1a\u53d6\u6d88\u524d\u4e00\u4e2a\u5185\u90e8 Observable (\u6240\u63d0\u4f9b\u51fd\u6570\u7684 return value) \u7684\u8ba2\u9605,\n\u7136\u540e\u8ba2\u9605\u4e00\u4e2a\u65b0\u7684 observable. \u5373\u5f53\u6709\u65b0\u7684\u8f93\u5165\u65f6\u4fbf\u4e0d\u518d\u5173\u5fc3\u4e4b\u524d\u8bf7\u6c42\u7684\u54cd\u5e94\u7ed3\u679c."}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["\u501f\u52a9",(0,l.jsx)(n.code,{children:"switchMap"}),"\u64cd\u4f5c\u7b26,\n\u6bcf\u4e2a\u6709\u6548\u7684\u51fb\u952e\u4e8b\u4ef6\u90fd\u4f1a\u89e6\u53d1\u4e00\u6b21",(0,l.jsx)(n.code,{children:"HttpClient.get()"}),"\u65b9\u6cd5\u8c03\u7528.\n\u5373\u4f7f\u5728\u6bcf\u4e2a\u8bf7\u6c42\u4e4b\u95f4\u90fd\u6709\u81f3\u5c11 300ms \u7684\u95f4\u9694,\n\u4ecd\u7136\u53ef\u80fd\u4f1a\u540c\u65f6\u5b58\u5728\u591a\u4e2a\u5c1a\u672a\u8fd4\u56de\u7684 HTTP \u8bf7\u6c42.\n",(0,l.jsx)(n.code,{children:"switchMap()"}),"\u4f1a\u8bb0\u4f4f\u539f\u59cb\u7684\u8bf7\u6c42\u987a\u5e8f,\n\u53ea\u4f1a\u8fd4\u56de\u6700\u8fd1\u4e00\u6b21 HTTP \u65b9\u6cd5\u8c03\u7528\u7684\u7ed3\u679c,\n\u4ee5\u524d\u7684\u90a3\u4e9b\u8bf7\u6c42\u90fd\u4f1a\u88ab\u53d6\u6d88\u548c\u820d\u5f03."]}),"\n",(0,l.jsx)(n.h4,{id:"filter-operator",children:"Filter Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"audit"}),"\n",(0,l.jsx)(n.li,{children:"auditTime"}),"\n",(0,l.jsx)(n.li,{children:"filter"}),"\n",(0,l.jsx)(n.li,{children:"skip"}),"\n",(0,l.jsx)(n.li,{children:"first"}),"\n",(0,l.jsx)(n.li,{children:"last"}),"\n",(0,l.jsx)(n.li,{children:"take"}),"\n",(0,l.jsx)(n.li,{children:"takeWhile"}),"\n",(0,l.jsx)(n.li,{children:"takeUntil"}),"\n",(0,l.jsx)(n.li,{children:"throttle"}),"\n",(0,l.jsx)(n.li,{children:"throttleTime"}),"\n",(0,l.jsx)(n.li,{children:"debounce"}),"\n",(0,l.jsx)(n.li,{children:"debounceTime"}),"\n",(0,l.jsxs)(n.li,{children:["distinctUntilChanged: \u53ea\u6709\u5f53\u5f53\u524d\u503c\u4e0e\u4e4b\u524d\u6700\u540e\u4e00\u4e2a\u503c ",(0,l.jsx)(n.code,{children:"!=="})," \u65f6\u624d\u5c06\u5176\u53d1\u51fa"]}),"\n",(0,l.jsx)(n.li,{children:"bufferTime"}),"\n",(0,l.jsx)(n.li,{children:"subscribeOn"}),"\n",(0,l.jsx)(n.li,{children:"ObserveOn"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"combination-operator",children:"Combination Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"concat: \u4fdd\u6301\u539f\u6765\u7684\u5e8f\u5217\u987a\u5e8f\u8fde\u63a5\u4e24\u4e2a\u6570\u636e\u6d41"}),"\n",(0,l.jsx)(n.li,{children:"merge: \u5408\u5e76\u5e8f\u5217"}),"\n",(0,l.jsx)(n.li,{children:"race: \u9884\u8bbe\u6761\u4ef6\u4e3a\u5176\u4e2d\u4e00\u4e2a\u6570\u636e\u6d41\u5b8c\u6210"}),"\n",(0,l.jsx)(n.li,{children:"forkJoin: \u9884\u8bbe\u6761\u4ef6\u4e3a\u6240\u6709\u6570\u636e\u6d41\u90fd\u5b8c\u6210"}),"\n",(0,l.jsx)(n.li,{children:"zip: \u53d6\u5404\u6765\u6e90\u6570\u636e\u6d41\u6700\u540e\u4e00\u4e2a\u503c\u5408\u5e76\u4e3a\u5bf9\u8c61"}),"\n",(0,l.jsx)(n.li,{children:"combineLatest: \u53d6\u5404\u6765\u6e90\u6570\u636e\u6d41\u6700\u540e\u4e00\u4e2a\u503c\u5408\u5e76\u4e3a\u6570\u7ec4"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"multi-cast-operator",children:"Multi-Cast Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"MultiCast"}),"\n",(0,l.jsx)(n.li,{children:"Publish"}),"\n",(0,l.jsx)(n.li,{children:"Share"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"error-handling-operator",children:"Error Handling Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"throw"}),"\n",(0,l.jsx)(n.li,{children:"catch/catchError"}),"\n",(0,l.jsx)(n.li,{children:"retry"}),"\n",(0,l.jsx)(n.li,{children:"retryWhen"}),"\n",(0,l.jsx)(n.li,{children:"finally"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"utils-operator",children:"Utils Operator"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"do/tap"}),"\n",(0,l.jsx)(n.li,{children:"delay"}),"\n",(0,l.jsx)(n.li,{children:"delayWhen"}),"\n",(0,l.jsx)(n.li,{children:"timeout"}),"\n",(0,l.jsx)(n.li,{children:"toPromise"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"router",children:"Router"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"<router-outlet>"})," \u4f1a\u544a\u8bc9\u8def\u7531\u5668\u8981\u5728\u54ea\u91cc\u663e\u793a\u8def\u7531\u7684\u89c6\u56fe."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import type { Routes } from '@angular/router'\nimport { NgModule } from '@angular/core'\nimport { RouterModule } from '@angular/router'\nimport { HeroesComponent } from './heroes/heroes.component'\n\nconst routes: Routes = [\n  {\n    path: 'heroes',\n    component: HeroesComponent,\n  },\n]\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes)],\n  exports: [RouterModule],\n})\nexport class AppRoutingModule {}\n"})}),"\n",(0,l.jsx)(n.h2,{id:"form",children:"Form"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"[(ngModel)]"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"(ngSubmit)"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"event-binding",children:"Event Binding"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"()"})," template syntax for event binding"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<li (click)="onSelect($event.target.name)"></li>\n<li (click)="onSelect(hero.name)"></li>\n'})}),"\n",(0,l.jsx)(n.h2,{id:"directives",children:"Directives"}),"\n",(0,l.jsx)(n.h3,{id:"structural-directives",children:"Structural Directives"}),"\n",(0,l.jsx)(n.h4,{id:"for-directive",children:"For Directive"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<li *ngFor="let hero of heroes">{{hero.name}}</li>\n'})}),"\n",(0,l.jsx)(n.h4,{id:"if-directive",children:"If Directive"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<div *ngIf="selectedHero">Selected</div>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"attribute-directives",children:"Attribute Directives"}),"\n",(0,l.jsx)(n.h4,{id:"class-directive",children:"Class Directive"}),"\n",(0,l.jsxs)(n.p,{children:["same to ",(0,l.jsx)(n.code,{children:"[ngStyle]"})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>\n'})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"class Component {\n  currentClasses\n\n  setCurrentClasses() {\n    // CSS classes: added/removed per current state of component properties\n    this.currentClasses = {\n      saveable: this.canSave,\n      modified: !this.isUnchanged,\n      special: this.isSpecial,\n    }\n  }\n}\n"})}),"\n",(0,l.jsx)(n.h2,{id:"styles",children:"Styles"}),"\n",(0,l.jsx)(n.h3,{id:"css-class-binding",children:"CSS Class Binding"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'\x3c!-- toggle the "special" class on/off with a property --\x3e\n<div [class.special]="isSpecial">The class binding is special</div>\n\n\x3c!-- binding to `class.special` trumps the class attribute --\x3e\n<div class="special" [class.special]="!isSpecial">This one is not so special</div>\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},51967:(e,n,r)=>{r.d(n,{R:()=>t,x:()=>a});var i=r(36672);const l={},s=i.createContext(l);function t(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);