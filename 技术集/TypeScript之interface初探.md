---
title: TypeScript之interface初探
categories: [前端,TypeScript]
date: 2018-06-30
tags: [技术,计算机,前端,TypeScript]
---

>TypeScript的核心原则之一是对值所具有的结构进行类型检查,在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

<!--more-->

```ts
function printLabel(labelObj: {label: String}){
    console.log(labelObj.label);
}
let myObj = {name: 'Hi', label: "See you agin"};
printLabel(myObj);

```

用Interface重写以上例子

```ts
interface labelObjType {
    label: String;
}
function printLabel2(labelObj: {label: String}){
    console.log(labelObj.label);
}
printLabel2(myObj);
```
### 可选属性

```ts
function createSquare(Config: SquareConfig): {color: String;  area: number}{
    let newSquare = {color: 'white', area: 100};
    if(Config.color){
        newSquare.color = Config.color;
    }
    if(Config.width){
        newSquare.area = Config.width*Config.width;
    }

    return newSquare;
}
let Square = createSquare({color: 'red', width: 20});
console.log(Square);

```
### 只读属性
>TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改:

```ts
interface Point {
    readonly x: number;
    readonly y: String;
}
let obj: Point = {x: 10, y: 'Jomsou'};
//obj.x = 52;//error

let a: number[] = [1, 2, 54, 65, 41];
let b: ReadonlyArray<number> = a;
a[0] = 24;
//b[0] = 25;//error
//b.length = 10;//error
//b.push(10);//error
//a = b;//error
a = b as number[];//上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
```

绕过检查方法

```ts
let mySquare = createSquare({ colour: "red", width: 100 });
```
- 用类型断言重写：

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
- 添加一个字符串索引签名
>前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

`[propName: string]: any;`

```ts
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

- 它就是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。

```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
### 函数类型
>接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```


