## 大兄dei，早点看清this吧
>说道this，可以说是前端中很重要的问题之一了，也是面试或者笔试常考的问题。所以还是早点看清this吧，大兄dei。
### this是什么？为什么要存在？
>this关键字是js中最最复杂的机制之一。他被自动定义到所有函数的作用域中。
通过把属性或者方法挂载在this上就可以实现属性或者方法的在函数中的公用。
eg: 
```js
function person(name, age) {
  this.name = name;
  this.age = age;
}
person.prototype.getName = function() {
  return this.name;
}
```
### 如何正确判断普通函数中的this？又如何正确判断箭头函数中的this？
![](https://ws1.sinaimg.cn/large/005Pf0eLgy1g0ea196fuaj310b0edmxi.jpg)
#### 普通函数
eg：
```js
function bar() {
  console.log(this.a)
}
var a = 1
bar() // 1

const obj = {
  a: 2,
  bar: bar
}
obj.bar() // 2

const b = new bar(); // this.a->undefined
console.log(b);
```
- 直接调用 bar 来说，不管 bar 函数被放在了什么地方，this 一定是window
- obj.bar() 来说，我们只需要记住，谁调用了函数，谁就是this，所以在这个场景下 bar 函数中的 this 就是 obj 对象
- new 的方式来说，new完之后得到一个实例对象, this 被永远绑定在了实例对象b上面，不会被任何方式改变this

#### 箭头函数
>箭头函数中的this，指的是包裹箭头函数的第一个普通函数的this

eg： 
```js
function b() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(b()()()) // this->window
```

### 关于this的一点问题
>构造函数中用this和prototype定义属性或函数方法的区别

![](https://ws1.sinaimg.cn/large/005Pf0eLgy1g0e9gktdb2j30va0qrmxh.jpg)

```js
function obj() {
  this.a = [];
  this.fn = function() {

  }
}
var o1 = new obj();
o1.fn = {};
console.log(typeof o1.fn);
var o2 = new obj();
console.log(typeof o2.fn);
```
>而构造函数中用和prototype定义属性或函数方法是这样的
```js
function obj1() {
  this.a = []
}
obj1.prototype.share = []
var o3 = new obj1();
o3.share.push(1);
var o4 = new obj1();
o4.share.push(2);
console.log(o4.share);
```
*this定义的方式，实例化之后是让每一个实例化对象都有一份属于自己的在构造函数中的对象或者函数方法，而prototype定义的方式，实例化之后每个实例化对象共同拥有一份构造函数中的对象或者函数方法。*
### 想想除了以上情况，在哪里可以巧妙的使用一下this呢？

emmm...

#### call、apply的实现
```js
Function.prototype.mycall = function(context, ...arg) {
  // 1. 通过this获取函数，
  var context = context || window;
  context.fn = this;
  // 执行函数
  context.fn(...arg);
  // 2. 删除函数
  delete context.fn;      
}
var foo = {
  value: 'foo'
}
var bar = function(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
  console.log(this);
}
// bar.mycall(foo, 'zenquan', 23);
bar.mycall(null, 'zenquan', 23)
```

#### jQuery的链式操作

>通过一个`return this`实现。

总而言之，this是JavaScript中非常重要的东西,掌握了才能写好代码，不然就乱了套了。

本人就是一个前端菜鸟，如果有什么问题，欢迎指出交流，谢谢~