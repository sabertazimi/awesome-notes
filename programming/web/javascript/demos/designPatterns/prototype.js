/**
 * @author: sabertazimi
 * @date: 2015.05.02
 */

/**
 * 创建对象有三种形式:
 * 对象字面量,构造函数,Object.create
 * 此三种形式创建后的形成的原型链存在着显著差异
 */

// 原型链的顶端
console.log(Object.prototype.__proto__ === null);
// Function.prototype 对象由 Object函数 构造
console.log(Function.prototype.__proto__ === Object.prototype.constructor.prototype);

/*
 * 对象字面量
 */
var obj = {
        name: 'sabertazimi'
    };

console.log('Literal: ' + (obj.__proto__ === Object.prototype));

/*
 * new 构造函数
 */
function Foo(status) {
    this.status = status || true;
}

function isArray(obj) {
    Foo.apply(this);
    return Array.prototype.toString.apply(obj) === '[object Array]';
}
isArray.prototype = new Foo();

var foo = new Foo(),
    is = new isArray([]);

// 实例化对象没有 prototype 指针
console.log('foo has no prototype property: ' + foo.prototype);
// 函数有 prototype 指针，指向 特殊对象 Prototype,存放着公有属性/方法(可通过原型链__proto__访问)
console.log('foo.__proto__ === Foo.prototype: ' + (foo.__proto__ === Foo.prototype));
// is 对象由 isArray 构造函数构造
console.log('is created by isArray: ' + (is.__proto__ === isArray.prototype));

/*
 * Object.create(o)
 */
var switchProto = {
        isOn: function isOn() {
                  return this.state;
              },
        toggle: function toggle() {
                  this.state = !this.state;
                  return this;
              },
        state: false
    };

// var switchInstance = Object.create(switchProto.__proto__);
// console.log(switchInstance.__proto__ === Object.prototype); => true

var switchInstance = Object.create(switchProto);

console.log('switchInstance.__proto__ === switchProto: ' + (switchInstance.__proto__ === switchProto));

console.log('Instance: ' + switchInstance.state);
console.log('Proto: ' + switchInstance.__proto__.state);
switchInstance.state = true;
console.log('Instance: ' + switchInstance.state);
console.log('Proto: ' + switchInstance.__proto__.state);
switchProto.state = true;
console.log('Instance: ' + switchInstance.state);
console.log('Proto: ' + switchInstance.__proto__.state);

