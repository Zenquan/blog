---
title: 以选项卡的故事扯扯js面向对象
categories: [前端]
date: 2018-02-06
tags: [技术,计算机,前端,JavaScript]
---
>在现在的网页中，选项卡（我自己这样子叫）是非常普遍的，也是比较基础，学了原型实现选项卡也挺久了，最近在学ES6，学了用类实现选项卡，今天就在此做个总结，别的废话也不多说。

<!--more-->

##  以“貌”说这货
### 外貌——还好，长得挺帅
![1](https://user-images.githubusercontent.com/29729724/35848653-d12216ca-0b59-11e8-9971-fec78c167f8a.PNG)
![2](https://user-images.githubusercontent.com/29729724/35848654-d15386f6-0b59-11e8-9485-058927c34aa5.PNG)
（自己理解的）选项卡：就是通过点击头部切换内容的货。
## 怎么得到这货
### html代码
```
<div id="div1">
    <input type="button" value="出国" class="active">
    <input type="button" value="留学">
    <input type="button" value="旅游">
    <div style='display: block'>123</div>
    <div>456</div>
    <div>789</div>
</div> 
```
### css代码
```
#div1 div{
width: 200px;
height: 200px;
border: 1px solid #ccc;
display: none;
}
.active {
background: orange;
}
```
### js代码
#### 入门
```js
window.onload=function ()
{
	var oDiv=document.getElementById('div1');
	var aBtn=oDiv.getElementsByTagName('input');
	var aDiv=oDiv.getElementsByTagName('div');
	
	for(var i=0;i<aBtn.length;i++)
	{
		aBtn[i].index=i;
		aBtn[i].onclick=function ()
		{
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className='';
				aDiv[i].style.display='none';
			}
			this.className='active';
			//alert(this.index);
			aDiv[this.index].style.display='block';
		};
	}
};
```
#### 面向对象
```js
 window.onload = function (){
    new tab('div1');
}
```
用原型实现
```js
function tab(id)
{
    var oDiv = document.getElementById(id);
    this.aBtn = oDiv.getElementsTagName('input');
    this.aDiv = oDiv.getElemetsTagName('div');

    var _this = this;
    for(var i=0;i<this.aBtn.length;i++){
        this.aBtn[i].index = i;
        this.aDiv[i].addEventListener('click',function(){
            _this.tabSwitch(this);
        },false)
    }
}

tab.prototype.tabSwitch = function (oBtn){
    for(var i=0;i<this.aBtn.length;i++)
    {
        this.aBtn[i].className = '';
        this.aDiv[i].style.display = 'none';
    }
    oBtn.className = 'avtive';
    this.aDiv[oBtn.index].style.display = 'block';
}
```
用ES6引进的类class实现
```js
class tab {
constructor(id) {
var oDiv = document.getElementById(id);
this.aBtn = oDiv.getElementsByTagName('input');
this.aDiv = oDiv.getElementsByTagName('div');

var _this = this;
for (var i = 0; i < this.aBtn.length; i++) {
    this.aBtn[i].index = i;
    this.aBtn[i].addEventListener('click', function () {
        _this.tabSwitch(this);
    }, false)
} 
}
tabSwitch(oBtn) {
for (var i = 0; i < this.aBtn.length; i++) {
    this.aBtn[i].className = '';
    this.aDiv[i].style.display = 'none';
}
oBtn.className = 'active';
this.aDiv[oBtn.index].style.display = 'block';
}    
}
```

## 关于面向对象（自己的理解）

### 何为对象？

对象，就是拥有属性和方法的集合。

### 何为面向对象？

根据面向对象的三大特征：
- 多态：多种状态；
- 封装：把功能封装成工具，不用过多的理会怎么实现的，会使用就行；
- 继承：跟css继承性类似，继承父的属性和方法。

### js里的面对对象与Java中的面对对象的区别

js是基于原型的面对对象，而Java是类的面向对象

### 怎么理解js里的原型？

原型可以用css里class去类似理解，就是一组元素通过原型实现相同属性、方法的。

### 用原型写面向对象
```js
function User(name, pass)
    {
        this.name=name;
        this.pass=pass;
    };
    
    User.prototype.showName=function()
    {
        alert(this.name);
    }
    User.prototype.showPass=function(){
        alert(this.pass);
    }

    function VipUser(name, pass, level){
        User.call(this, name, pass);

        this.level = level;
    }
    VipUser.prototype=new User();
    VipUser.prototype.constructor=VipUser;
    /*for(var i in User.prototype)
    {
        VipUser[i].prototype = User[i].prototype;
    }*/
    VipUser.prototype.showLevel=function(){
        alert(this.level);
    };
```
### 用类写面向对象
```js
class person
{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    showName(){
        alert(this.name);
    }
    showAge(){
        alert(this.age);
    }
}
class vip extends person
{
    constructor(name,age,sex) {
        super(name, age);
        this.sex = sex;
    }
    showSex(){
        alert(this.sex);
    }
}
```






