---
title: windows8安装msi或exe软件提示2503错误的解决办法
categories: [技能]
date: 2017-07-20 
tags: [技术,计算机,软件安装]
---

>windows8以后的版本安装msi软件（比如nodejs.msi、Git.msi、python.msi、T ortoiseSVN.msi）的时候老师出现2503、2502的错误，究其原因还是系统权限的问题。

<!--more-->

![2503代码错误](http://upload-images.jianshu.io/upload_images/1599190-aaa3022d5e5d6909.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!--more-->
### 命令安装方法
>按住win+x，在菜单中选择”命令提示符(管理员)(A)“；
或者在走下角的win的logo上右键，在菜单中选择”命令提示符(管理员)(A)“；




![](http://upload-images.jianshu.io/upload_images/1599190-79cfe33ef161370e.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>在命令提示符窗口中输入： msiexec /package "安装文件的全路径";
这里说的是安装文件在哪里，而不是要安装到哪里，请把这个问题注意一下，否则找不到文件。
也可以使用cd命令进入到安装文件的目录，再执行msiexec命令。



![](http://upload-images.jianshu.io/upload_images/1599190-d54cac622697c564.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/1599190-a88101579c896240.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>如果安装文件的路径中有空格一定要使用（"）,英文状态下的。其实，最好在安装的路径中始终都使用引号。比如，我的安装文件”E:\softwareunion\开发软件“下的”TortoiseSVN-1.8.5.25224-x64-svn-1.8.8.msi“，那么，我的命令就是这样的了：
msiexec /package "E:\softwareunion\开发软件\TortoiseSVN-1.8.5.25224-x64-svn-1.8.8.msi"
回车就可了。。。。


>此后就可以走下一步流程了，详细过程不再说了！
PS：此方法只是临时方法，只是仅限于当前安装文件，以后要安装msi文件，还必须重新这样的操作！

### 权限设置方法
>为了解决方法一的繁琐，因此方法就出现了！事实上，世上大多数事物的出现都是因为前者失去了市场的需求才导致后者的出现，生命的更替、技术的创新等等大都如此吧！

>打开”运行“框，或者按win+r，打开运行框，输入命令：gpedit.msc 并确认；


![](http://upload-images.jianshu.io/upload_images/1599190-9e7346dd26031a48.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>打开本地组策略编辑器，依次展开 ：“计算机配置”->“管理模板”->"windows组件"->“windows installer”，并找到“始终以提升的权限进行安装”；


![](http://upload-images.jianshu.io/upload_images/1599190-27f17c8ba2039c31.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>双击该选项，或者右键”编辑“，在弹出的对话框中设置为“已启用”，并应用，如下图；


![](http://upload-images.jianshu.io/upload_images/1599190-346cb1f53379387f.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>在本地组策略编辑器中依次展开 ：“用户配置”->“管理模板”->"windows组件"->“windows installer”，并找到“始终以提升的权限进行安装”；


![](http://upload-images.jianshu.io/upload_images/1599190-4d9c9de7cafef2ac.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>双击该选项，或者右键”编辑“，在弹出的对话框中设置为“已启用”，并应用，如下图；

![](http://upload-images.jianshu.io/upload_images/1599190-6dfff0c7ef984d5c.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
