---
title: 关于事件循环Event Loop
categories: [前端,node]
date: 2018-10-05
tags: [技术,计算机,前端,node]
---

>前端开发人员都知道的，js是一门单线程的语言，所以为了解决这个问题，就有了事件循环存在的价值了。

<!--more-->

## 为什么js是单线程的？

1.进程
>进程是资源分配的基本单位。

进程控制块 (Process Control Block, PCB) 描述进程的基本信息和运行状态，所谓的创建进程和撤销进程，都是指对 PCB 的操作。

2.线程
>线程是独立调度的基本单位。

一个进程中可以有多个线程，它们共享进程资源。

QQ 和浏览器是两个进程，浏览器进程里面有很多线程，例如 HTTP 请求线程、事件响应线程、渲染线程等等，线程的并发执行使得在浏览器中点击一个新链接从而发起 HTTP 请求时，浏览器还可以响应用户的其它事件。

**如果把进程比作是工厂，线程则是工厂里的工人**

这跟历史有关系。JavaScript从诞生起就是单线程。原因大概是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。后来就约定俗成，JavaScript为一种单线程语言。（Worker API可以实现多线程，但是JavaScript本身始终是单线程的。）

## 何为Event Loop？

Event Loop：JavaScript解决单线程的执行机制。

## Event Loop的原理

JavaScript的运行机制

![](./images/eventloop01.png)
事件（任务）如果是同步任务就进入执行栈，异步任务进入event table，然后主线程执行同步任务的宏任务（settimeout、setInterval、new Promise（）、script）和 微任务（Promise.then、process.nextTick）,等到主线程有空闲时，异步任务形成的队列，也是先执行宏任务再执行微任务，然后一直轮询执行事件循环。
![](./images/eventloop02.png)

## 实践理解Event Loop
```js
console.log('script start');

setTimeout(() => {
    console.log('settimeout01');
}, 0);

new Promise(resolve=>{
    console.log('promise1');
    resolve();
    setTimeout(() => {
        setTimeout(() => {
            console.log('settimeout02');
        }, 1000);
        new Promise(resolve=>{
            console.log('promise2');
            resolve();
        })
    }, 0);
}).then(()=>{
    console.log('then');
})

console.log('script end');

/**
 * script start
 * promise1
 * script end
 * resolve();
 * then
 * settimeout01
 * promise2
 * resolve();
 * settimeout02
*/
```