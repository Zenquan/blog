---
title: 关于var、let、const的故事
categories: [前端]
date: 2018-05-07
tags: [技术,计算机,前端,JavaScript]
---

>对于一门编程语言来说，变量与常量是再正常不过的两种，JavaScript是一直解释型的弱类型语言。

<!--more-->

*JavaScript中变量或者常量可以用var、let、const（后两者是ES6的新特性）。*
## 1.let、const基本用法
>只在声明所在的块级作用域内有效
```
{
    let a = 1;
    var b = 1;
    const c = 1;
}
a//Uncaught ReferenceError: a is not defined
b//1
c//Uncaught ReferenceError: c is not defined
```
## 2.有块级作用域
一般在for循环中使用
经典案例：
ES6以前
```
for(var i=0;i<4;i++){
    setTimeout(function(){
         console.log(i);
   },30)
} //4 4 4 4
```
当然了，这种情况也是有解决的办法的。
```
 for (var i=1; i<=4; i++) {
     (function(j){
         setTimeout( function timer(){
             console.log( j );
         }, 1000 );
     })( i );
 }
```
*IIFE显得没有必要了，心疼它几秒*
//IIFE
```
(function(){
    var tmp = ...;
    ...
})();
```
//ES6
```
{
    let tmp = ...;
    ...
}
```
## 3.不存在变量提升
```
console.log(a);
let a  = 1; //Uncaught ReferenceError: a is not defined
```
而ES6之前
```
console.log(a);
var  a  = 1; //undefined
```
## 4.不允许重复声明
```
let a = 1;
let a = 2;//Uncaught SyntaxError: Identifier 'a' has already been declared
const b = 2;
const b = 3;//Uncaught SyntaxError: Identifier 'b' has already been declared
```
而ES6之前
```
var a = 1;
var a = 2;//2
var b = 2;
var b = 3//3
```
```
function func(arg){
    let arg;//error
}
```
VS
```
function func(arg){
    {
        let arg;//ok
    }
}
```
## 5.暂时性死区
>ES6明确规定，如果区块存在let或者const，则区块对这些变量从一开始就形成了封闭的作用域。只要在声明之前就使用这些变量，就会报错。
```
var tmp = 123;
if(true){
    tmp = 'abc';//ReferenceError
    let tmp;
}
```
>上面的代码中存在变量tmp，但块级作用域内let有声明了一个局部变量tmp，导致后者绑定了这个块级作用域，所以在let声明前使用这些变量，就会报错。

>TDZ(temporal dead zone, 简称TDZ)
```
if(true){
    //TDZ开始
    tmp = abc';//ReferenceError
   console.log(tmp);//ReferenceError

   let tmp;//TDZ结束
   console.log(tmp);//undefined
}
```
*容易忽略的暂时性死区*
```
function bar(x=y,y=2){
    return [x, y];
}
bar();//报错
```
相反：
```
function bar(x=2,y=x){
    return [x, y];
}
bar();//[2,2]
```
*为什么ES6规定暂时性死区和变量提升?*
>主要是减少运行时错误，防止在变量声明前使用这个变量，从而导致意料之外的行为。

>let 与 const的区别：
let用于声明变量，const只能声明常量，一旦声明，其值不可改变。

原文链接：https://github.com/Zenquan/blog/issues/2