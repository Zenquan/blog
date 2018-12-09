---
title: CSS清除浮动大全
categories: [前端]
date: 2017-08-11
tags: [技术,计算机,前端,CSS]
---

>在各种浏览器兼容问题上，这样让清除浮动更难了，下面总结8种清除浮动的方法：
浮动导致的问题：父级标签高度塌陷---其实就是没有高度

<!--more-->

![](http://upload-images.jianshu.io/upload_images/2907785-2e0264413b0d1f63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 下面八中方法：
### 1、父级div定义 height
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box {
                width: 300px;
                /解决问题/
                height: 400px;
                background: bisque;
                border: 2px solid black;
            }
            #div1 {
                width: 100px;
                height: 200px;
                float: left;
                background: red;
            }
            #div2 {
                width: 100px;
                height: 200px;
                float: right;
                background: yellow;
            }
        </style>
    </head>
    <body>
        <div id="box">
            <div id="div1">
                1
            </div>
            <div id="div2">
                2
            </div>
        </div>
    </body>
</html>
```
>**原理**：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。
**优点**：简单、代码少、容易掌握
**缺点**：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题
**建议**：不推荐使用，只建议高度固定的布局时使用

### 2、结尾处加空div标签 clear:both

![](http://upload-images.jianshu.io/upload_images/2907785-b8d9709eef43a02f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box {
                width: 300px;
                background: bisque;
                border: 2px solid black;
            }
            #div1 {
                width: 100px;
                height: 200px;
                float: left;
                background: red;
            }
            #div2 {
                width: 100px;
                height: 200px;
                float: right;
                background: yellow;
            }
            .clearflow {
                clear: both;
            }
        </style>
    </head>
    <body>
        <div id="box">
            <div id="div1">
                1
            </div>
            <div id="div2">
                2
            </div>
            <!--解决问题-->
            <div class="clearflow">
            </div>
        </div>
    </body>
</html>
```
>原理：添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度
优点：简单、代码少、浏览器支持好、不容易出现怪问题
缺点：不少初学者不理解原理；如果页面浮动布局多，就要增加很多空div，让人感觉很不好
建议：不推荐使用，但此方法是以前主要使用的一种清除浮动方法

### 3，父级div定义 伪类:after

![](http://upload-images.jianshu.io/upload_images/2907785-0a48f7a14c788f81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #div1 {
                width: 100px;
                height: 200px;
                float: left;
                background: red;
            }
            #div2 {
                width: 100px;
                height: 200px;
                float: right;
                background: yellow;
            }
            #box {
                width: 300px;
                background: bisque;
                border: 2px solid black;
            }
                        .clearfloat {zoom:1}
            .clearfloat:after {
                / 这三句必须写 /
                display:block;
                clear:both;
                /必须有这样写/
                content:"";
                /  这两句写不写无所谓/
                /visibility:hidden;/
                /height:0;/
            }
        </style>
    </head>
    <body>
        <div id="box" class="clearfloat">
            <div id="div1">
                1
            </div>
            <div id="div2">
                2
            </div>
        </div>
    </body>
</html>
```
>原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE专有属性)可解决ie6,ie7浮动问题 （其他浏览器不用）
优点：浏览器支持好、不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等）
缺点：代码多、不少初学者不理解原理，要两句代码结合使用才能让主流浏览器都支持。
建议：推荐使用，建议定义公共类，以减少CSS代码。

### 4，父级div定义 overflow:hidden

![](http://upload-images.jianshu.io/upload_images/2907785-a436991789e2b42c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #div1 {
                width: 100px;
                height: 200px;
                float: left;
                background: red;
            }
            #div2 {
                width: 100px;
                height: 200px;
                float: right;
                background: yellow;
            }
            #box {
                width: 300px;
                background: bisque;
                border: 2px solid black;
                /解决问题/
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <div id="box" class="clearfloat">
            <div id="div1">
                1
            </div>
            <div id="div2">
                2
            </div>
        </div>
    </body>
</html>
```
>原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度
优点：简单、代码少、浏览器支持好
缺点：不能和position配合使用，因为超出的尺寸的会被隐藏。
建议：只推荐没有使用position或对overflow:hidden理解比较深的朋友使用。

### 5、父级div定义 overflow:auto

>与方法4相同
这个不能用滚动条，所以不推荐使用哦！

### 6、父级div 也一起浮动
```html
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #div1 {
                width: 100px;
                height: 200px;
                float: left;
                background: red;
            }
            #div2 {
                width: 100px;
                height: 200px;
                float: right;
                background: yellow;
            }
            #box {
                width: 300px;
                background: bisque;
                border: 2px solid black;
                /解决问题/
                float: left;
            }
        </style>
    </head>
    <body>
        <div id="box" class="clearfloat">
            <div id="div1">
                1
            </div>
            <div id="div2">
                2
            </div>
        </div>
    </body>
</html>
```
>原理：所有代码一起浮动，就变成了一个整体
优点：没有优点
缺点：会产生新的浮动问题。
建议：不推荐使用，只作了解。

### 7、父级div定义 display:table
>原理：将div属性变成表格
优点：没有优点
缺点：会产生新的未知问题。
建议：不推荐使用，只作了解。

### 8、结尾处加 br标签 clear:both
>与第二种方法一样，这里只要是块元素都是可以的;

