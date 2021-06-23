---
title: github常见错误提示之一
categories: [技能]
date: 2017-07-20 
tags: [技术,计算机,git]
---

>如果输入$ Git remote add origin git@github.com:Jomsou（github帐号名）/gitdemo（项目名）.git 
>提示出错信息：fatal: remote origin already exists.

    解决办法如下：
    
    1、先输入$ git remote rm origin
    
    2、再输入$ git remote add origin git@github.com:Jomsou/gitdemo.git 就不会报错了！
    
    3、如果输入$ git remote rm origin 还是报错的话，error: Could not remove config section 'remote.origin'. 我们需要修改gitconfig文件的内容
    
    4、找到你的github的安装路径，我的是C:\Users\ASUS\AppData\Local\GitHub\PortableGit_ca477551eeb4aea0e4ae9fcd3358bd96720bb5c8\etc
    
    5、找到一个名为gitconfig的文件，打开它把里面的[remote "origin"]那一行删掉就好了！

>如果输入$ ssh -T git@github.com
>出现错误提示：Permission denied (publickey).因为新生成的key不能加入ssh就会导致连接不上github。

    解决办法如下：
    
    1、先输入$ ssh-agent，再输入$ ssh-add ~/.ssh/id_key，这样就可以了。
    
    2、如果还是不行的话，输入ssh-add ~/.ssh/id_key 命令后出现报错Could not open a connection to your authentication agent.解决方法是key用Git Gui的ssh工具生成，这样生成的时候key就直接保存在ssh中了，不需要再ssh-add命令加入了，其它的user，token等配置都用命令行来做。
    
    3、最好检查一下在你复制id_rsa.pub文件的内容时有没有产生多余的空格或空行，有些编辑器会帮你添加这些的。

>如果输入$ git push origin master
>提示出错信息：error:failed to push som refs to .......

    解决办法如下：
    
    1、先输入$ git pull origin master //先把远程服务器github上面的文件拉下来
    
    2、再输入$ git push origin master
    
    3、如果出现报错 fatal: Couldn't find remote ref master或者fatal: 'origin' does not appear to be a git repository以及fatal: Could not read from remote repository.
    
    4、则需要重新输入$ git remote add origin git@github.com:Jomsou/gitdemo.git