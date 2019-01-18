---
title: aysnc...await总结
categories: [前端, ES6]
date: 2018-12-11
tags: [技术,计算机,前端, ES6]
---

# aysnc...await

## 是什么

>ES7中新增的另一种解决异步的方案

### Syntax

```js
async function name([param[, param[, ... param]]]) {
   statements
}
```

** async function返回一个Promie,await就相当于then **

## 为什么

>和Promise 实现是一样的，但是async...await看起来清晰得多，几乎跟同步代码一样

### Promise

```js
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
```

### async...await

```js
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
```

## 怎么使用

### 简单使用

```js
async function test01() {
function fuc() {
   console.log('test02');
}
let test02 = await fuc();
console.log('test01');
}
console.log(test01());
```

### 结合Promise使用

```js
var resolveAfter2Seconds = function () {
      console.log("starting slow promise");
      return new Promise(resolve => {
        setTimeout(function () {
          resolve(20);
          console.log("slow promise is done");
        }, 2000);
      });
    };

var resolveAfter1Second = function () {
console.log("starting fast promise");
return new Promise(resolve => {
   setTimeout(function () {
      resolve(10);
      console.log("fast promise is done");
   }, 1000);
});
};

var sequentialStart = async function () {
console.log('==SEQUENTIAL START==');

// If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.
const slow = await resolveAfter2Seconds();

const fast = await resolveAfter1Second();
console.log(slow);
console.log(fast);
}

var concurrentStart = async function () {
console.log('==CONCURRENT START with await==');
const slow = resolveAfter2Seconds(); // starts timer immediately
const fast = resolveAfter1Second();

console.log(await slow);
console.log(await fast); // waits for slow to finish, even though fast is already done!
}

var stillConcurrent = function () {
console.log('==CONCURRENT START with Promise.all==');
Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
   console.log(messages[0]); // slow
   console.log(messages[1]); // fast
});
}

var parallel = function () {
console.log('==PARALLEL with Promise.then==');
resolveAfter2Seconds().then((message) => console.log(message));
resolveAfter1Second().then((message) => console.log(message));
}

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"
// wait above to finish
setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"
// wait again
setTimeout(stillConcurrent, 7000); // same as concurrentStart
// wait again
setTimeout(parallel, 10000); // trully parallel: after 1 second, logs "fast", then after 1 more second, "slow"
```

![async-await-mdn](./images/async-await-mdn.png)

参考文章：

- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

- [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)