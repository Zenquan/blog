---
title: 用mpvue构建一个图书微信小程序
categories: [前端]
date: 2018-06-02
tags: [技术,计算机,前端,JavaScript,框架]
---

## 背景

1、现在微信小程序比较好，用户也比较多；利用微信小程序做推广，效果好；
2、小程序的痛点在于不需要在手机里额外安装app，利用微信提供的入口，用时扫码，用后清除；
3、开发周期与开发难度小于原生app。

<!--more-->

## 技术栈
采用前后端分离
1、Vue全家桶
2、mpvue
3、koa2+mysql

## 构建过程
1、安装工作
a)安装好node
b)安装vue-cli
c)安装mysql
2、前端构建
```
# 1. 先检查下 Node.js 是否安装成功
$ node -v
v8.9.0

$ npm -v
5.6.0

# 2. 由于众所周知的原因，可以考虑切换源为 taobao 源
$ npm set registry https://registry.npm.taobao.org/

# 3. 全局安装 vue-cli
# 一般是要 sudo 权限的
$ npm install --global vue-cli

# 4. 创建一个基于 mpvue-quickstart 模板的新项目
# 新手一路回车选择默认就可以了
$ vue init mpvue/mpvue-quickstart my-project

# 5. 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```
3、后端构建
a)腾讯云的配置
[腾讯云支持](https://developers.weixin.qq.com/miniprogram/dev/qcloud/qcloud.html#%E4%BB%8B%E7%BB%8D)
b)本地导入node代码
[wafer2-startup](https://github.com/tencentyun/wafer2-startup),将其中的server文件夹放到项目目录下。
配置server——config.js
```javascript
const CONF = {
      // 其他配置 ...
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
      // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '您的腾讯云 AppID',//[账户信息](https://console.qcloud.com/developer)
    qcloudSecretId: '您的腾讯云 SecretId',//[获取地址](https://console.qcloud.com/cam/capi)
    qcloudSecretKey: '您的腾讯云 SecretKey',//[获取地址](https://console.qcloud.com/cam/capi)
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}
```
4、test
/routes/index.js
```javascript
//注册demo路由
router.get('/demo', controllers.demo)
```
/controllers/demo.js
```javascript
module.exports = async (ctx)=>{
    ctx.state.data = {
        msg: 'hello, 小程序后台'
    }
}
```
5、本地环境搭建
a)在命令行执行新建默认名为cAuth的数据库
![default](https://user-images.githubusercontent.com/38183707/40872719-99552e8a-6685-11e8-8b5c-2b3289e91ad4.PNG)

b)npm install -g nodemon
c)进入server目录，开启server

![default](https://user-images.githubusercontent.com/38183707/40872721-a7a1d6dc-6685-11e8-9cb4-4e8ba323631c.PNG)
6、打开微信开发工具，新建并导入项目
![default](https://user-images.githubusercontent.com/38183707/41193459-82a8879a-6c3e-11e8-87d3-7813622757f2.PNG)

项目目录
![default](https://user-images.githubusercontent.com/38183707/41193469-b42201d4-6c3e-11e8-821b-1d9075dd9644.PNG)

7、test结果
![test](https://user-images.githubusercontent.com/38183707/41193471-b9732ba4-6c3e-11e8-8b52-e3404ebb6a28.PNG)

## 本地运行
````
git clone 
npm install
npm run dev
````