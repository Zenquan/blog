---
title: webpack4
categories: [前端, 工程化]
date: 2018-07-18
tags: [技术,计算机,前端,webpack4]
---

>webpack 是一个现代 JavaScript 应用程序的静态模块打包器(static module bundler)。在 webpack 处理应用程序时，它会在内部创建一个依赖图(dependency graph)，用于映射到项目需要的每个模块，然后将所有这些依赖生成到一个或多个bundle。

<!--more-->

1、webpack约定大于配置
2、默认入口src/index.js
3、打包为dist/main.js
4、设置模式'develpoment' || 'production' 

```js
//webpack约定大于配置，默认src/index.js->dist/main.js
module.exports = {
    mode: 'production' //'develpoment' || 'production' 
}
```

webpack-dev-sever打包后的放内存里了

## React

1.导入包

```js
import React from 'react'//react->虚拟dom和组件化、生命周期
import ReactDOM from 'react-dom'//react-dom->把创建好的组件和虚拟dom放在页面上展示
```

2.创建虚拟DOM元素
- 参数1： 创建的元素的类型，字符串，表示元素的名称
- 参数2： 是一个对象或null，表示当前这个DOM元素的属性
- 参数3： 子节点（包括其他 虚拟DOM获取文本子节点）
- 参数4： 其他子节点

3.使用ReactDOM把虚拟DOM渲染到页面上去
- 参数1：要渲染的虚拟DOM元素 
- 参数2：指定页面的目标容器

4.加属性

### 增加eslint做代码规范

安装依赖

```
npm install eslint eslint-config-standard eslint-loader eslint-plugin-html eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard -D
```
配置.eslintrc

```json
{
    "extends": "standard",
    "plugins": [
        "html"
    ],
    "parser": "babel-eslint"
}
```
配置package.json的脚本：

```json
"lint": "eslint --ext .js --ext .jsx --ext .vue client/",
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",
"precommit": "npm run lint-fix"
```

执行命令

```
npm run lint 
or 
npm run lint-fix
```

### webapck4升级

1.webpack相关的插件就是带有webpack的，以及loader插件（边升级报错，边修改）;

2.有些API的修改或者废弃，需要修改配置

新增:

1、mode属性，在config中一定要写`mode: process.env.NODE_ENV || 'production'`
2、optimization属性

```js
optimization: {
  splitChunks: {
      chunks: 'all'
  },
  runtimeChunk: true
}
```

废弃：
- 1、webpack.NoEmitOnErrorsPlugin()
- 2、webpack.optimize.CommonsChunkPlugin()

