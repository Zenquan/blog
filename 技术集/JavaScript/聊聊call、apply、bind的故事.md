## 聊聊call、apply、bind的故事

> 说到call、apply、bind，前端的胖友可是不陌生。以下就从几个方面分别聊聊它们。

### 是什么？(what?)

![](https://ws1.sinaimg.cn/large/005Pf0eLgy1fzb21et4usj305r05q74a.jpg)

实际上它们真正的样子是这样的：

- Function.prototype.call(thisArg, arg1, arg2, ...)
- Function.prototype.apply(thisArg, [arg1, arg2, ...])
- Function.prototype.bind(thisArg, arg1, arg2, ...)

它们几个的作用都是改变this的指向。

### 三者有什么区别？

- .call(thisArg, arg1, arg2, ...)和.apply(thisArg, [arg1, arg2, ...])的区别只是后者的参数列表以数组形式传入。

- .bind()与另外两个的区别则是前者改变this，不立即调用函数；而后者改变this，立即调用函数。

### 非严格模式和严格模式的注意点

以下例子在非严格模式下，

```js
// 注释的是各个情况this的指向
let test = {
    foo: function(...arg) {
        console.log(this);
        console.log([...arg]);
    }
}
test.foo();
test.foo.call(null, 1, 2);//this->window
test.foo.call('', 1, 2);// this->string
test.foo.call(undefined, 1, 2); //this->window
test.foo.apply(null, [1, 2]);//this->window
test.foo.apply('', [1, 2]);// this->string
test.foo.apply(undefined, [1, 2]);//this->window
test.foo.bind(null, 1, 2);
test.foo.bind('', 1, 2);
test.foo.bind(undefined, 1, 2);
```

在严格模式下，

```js
// 注释的是各个情况this的指向
'use strict'
let test = {
    foo: function(...arg) {
        console.log(this);
        console.log([...arg]);
    }
}
test.foo();
test.foo.call(null, 1, 2);//this->null
test.foo.call('', 1, 2);// this->
test.foo.call(undefined, 1, 2); //this->undefined
test.foo.apply(null, [1, 2]);//this->null
test.foo.apply('', [1, 2]);//this->
test.foo.apply(undefined, [1, 2]);// this->undefined
test.foo.bind(null, 1, 2);
test.foo.bind('', 1, 2);
test.foo.bind(undefined, 1, 2);
```

### 怎么模拟实现三者呢？

那么为什么要模拟实现呢？

- 更加理解三者改变this指向的原理
- 兼容一些浏览器

##### .mycall()的实现

```js
Function.prototype.mycall = function(context, ...arg) {
      // 改变this指向
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



##### .myapply()的实现

```js
Function.prototype.myapply= function(context, [...arg]) {
      // 改变this指向
      // 1. 通过this获取函数，
      var context = Object(context) || window;
      context.fn = this;
      var result = null;
      // 执行函数
      if(![...arg]) {
        result = context.fn();
      }else {
        result = context.fn(...arg);
      }
      // 2. 删除函数
      delete context.fn;  
      return result;    
    }
var bar = function(name, age) {
      console.log(name);
      console.log(age);
      // console.log(this.value);
      console.log(this);
    }
    bar.myapply(null, ['zenquan', 23]);
```



##### .mybind()的实现

```js
Function.prototype.mybind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

> Emmm，说好了聊聊故事，结果还是说了一大堆干巴巴的知识，可能我是个不会讲故事的标题党吧。

