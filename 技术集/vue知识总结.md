---
title: vue知识总结
categories: [前端, 框架]
date: 2018-08-02
tags: [技术,计算机,前端,JavaScript,Vue]
---

>vue: 渐进式JavaScript 框架

<!--more-->

## Vue项目构建

```
npm install -g vue
vue init webpack-simple my-project
cd my-project
npm install
npm  run dev
```

## vue项目开发步骤

- 根据原型稿拆分组件——》路由组件（pages）、复用组件（components）

- 根据路由组件定好路由router/index.js
- 看后端接口文档写好api/ajax、index请求好数据，有些时候后端没写好接口则需要自己mock数据
- 确定好共享的状态数据，写好store
- 分别用复用组件开发路由组件

## Vue知识总结

>Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层

### 模块化与组件化的区别：

- 1.模块化是针对代码来说的，即抽离js代码进行复用

- 2.组件化是针对Ui来说的，由组件就能很快组成一个页面

### vue与react的比较

- 1.Vue里使用.vue格式模板实现组件化，而react采用把html写进js即jsx

- 2.vue是双向数据绑定，react是单向数据绑定，在通过state来管理

### 声明式渲染
```js
<div id="app">
  {{ message }}
</div>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
### 条件与循环
```js
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```
### 处理用户输入

v-on 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法

v-on:click = @click 事件

### 组件化应用构建

![](https://cn.vuejs.org/images/components.png)

#### 全局定义组件

```js
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```
### vue生命周期

![](https://cn.vuejs.org/images/lifecycle.png)

### vue指令

v-html绑定html
v-text绑定文本
v-bind:属性 = :属性 绑定属性
v-on:click = @click 事件

#### v-class

```html
<ul  v-for="item in list1">
    <li :class='{red: flag, blue: !flag}'>{{item}}</li>
</ul>

```

#### v-style
```html
<div class="box" :style="{'width': boxWidth+'px'}">

</div>
```



获取ref定义的dom节点
```html
<input type="text" ref="userInfo">
<div ref="box"></div>
<button @click="getValue()">点击</button>
export default {
    data(){
        return {
            message: '这是一个根组件',
        }
    },
    methods: {
        getValue(){
            console.log(this.$refs.userInfo);
            this.$refs.box.style.background='red';
            alert(this.$refs.userInfo.value);
        }
    }
}
```
### 修饰符

- sync：在2.3.0+版本之后，vue又重新引进了.sync这个修饰符了，这个修饰符可以让子组件的数据带动父组件的数据改动。但是除了这个修饰符，我们还要在子组件里面添加一个watch 监测事件来，触发修改父组件的数据。

### 自定义属性

1.html里设置data-xx

2.把$event传给事件

3.事件利用e.srcElement.dataset.aid获取 或
e.srcElement.style.background='red';修改样式

```html
<button data-aid='123' @click="eventFn($event)">事件对象</button>
```

```js
export default {
  data () {
    return {
      msg: '你好vue',
      list:[]
    }
  },
  methods:{
    eventFn(e){
      console.log(e);
      // e.srcElement  dom节点
      e.srcElement.style.background='red';
      console.log(e.srcElement.dataset.aid);//123  /*获取自定义属性的值*/
    }

  }
}
```

### vue父子组件通信

1、父组件可以使用 props 把数据传给子组件。
2、子组件可以使用 $emit 触发父组件的自定义事件。

vm.$emit( event, arg ) //触发当前实例上的事件

vm.$on( event, fn );//监听event事件后运行 fn；

例如：

子组件：

```html
<template>
  <div class="train-city">
    <h3>父组件传给子组件的toCity:{{sendData}}</h3>
    <br/><button @click='select(`大连`)'>点击此处将‘大连’发射给父组件</button>
  </div>
</template>
<script>
  export default {
    name:'trainCity',
    props:['sendData'], // 用来接收父组件传给子组件的数据
    methods:{
      select(val) {
        let data = {
          cityname: val
        };
        this.$emit('showCityName',data);//select事件触发后，自动触发showCityName事件
      }
    }
  }
</script>
```

父组件：

```html
<template>
    <div>父组件的toCity{{toCity}}</div>
    <train-city @showCityName="updateCity" :sendData="toCity"></train-city>
<template>
<script>
  import TrainCity from "./train-city";
  export default {
    name:'index',
    components: {TrainCity},
    data () {
      return {
        toCity:"北京"
      }
    },
    methods:{
      updateCity(data){//触发子组件城市选择-选择城市的事件
        this.toCity = data.cityname;//改变了父组件的值
        console.log('toCity:'+this.toCity)
      }
    }
  }
</script>
```

### 同级通信

```js
<body>
    <div id="app">
        <huahua></huahua>
        <shuandan></shuandan>
    </div>
    <script src="./vue.js"></script>
    <script>
        let Event = new Vue();
        Vue.component('huahua', {
            template: `<div>我说：<input v-model='i_said' @keyup='onChange'></div>`,
            data: function(){
                return {
                    i_said: ''
                }
            },
            methods: {
                onChange: function(){
                   Event.$emit('huahua-said-something', this.i_said);
                }
            }
        });
        Vue.component('shuandan', {
            template: '<div>花花说：{{huahua_said}}</div>',
            data: function(){
                return {
                    huahua_said: ''
                }
            },
            mounted: function(){
                let _this = this;
                console.log(_this);
                Event.$on('huahua-said-something', function(data){
                    console.log('data', data);
                    //console.log('this', this);
                    _this.huahua_said = data;
                })
            }
        })
        let app = new Vue({
            el: '#app'
        })
    </script>
```

vue中的注意点：
1.component中的data必须是函数
```js
Vue.component('', {
  template: '<div></div>',
  data: function(){
      return {
          huahua_said: ''
      }
  }
})
```

2.为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

### vue组件库的使用。

element-ui使用局部引入使用
1.在组件里`import { Table, TableColumn } from "element-ui"`;

2.`components: {Table, TableColumn}`

3.`<Table></Table>、<table-column type="selection" width="55"></table-column>`全局引入使用

1.在main中`import { Input} from 'element-ui';`

2.在组件中`<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" @change="search" id="el-input"></el-input>`

二者在使用时注意是否要加`el-`

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


升级成webpack4过程遇到的坑

1.`npm run dev`后出现`Path variable [contentHash] not implemented in this context: styles.[contentHash].css`

解决方案：把[contentHash]换成 [chunkhash:8]

2.extract-text-webpack-plugin升级中警告它需要依赖webpack3，故决定试试@next，结果可以，
`npm install extract-text-webpack-plugin@next`,以后试试@next

### 单元测试(Unit Test)

>用来对一个模块、一个函数或者一个类进行正确性检验的测试工作。

测试驱动开发: TDD-> Test-Driven Dovelopment

#### Karma（在node跑的测试框架）+Mocha

>Mocha（测试框架） 不带断言库+Chai断言库

### Vue遇到的坑

- scpoed只对当前文件起作用。
- for循环必须加key值，key值一般用item值而不用index，是为了虚拟dom的优化机制。

### Vue犯错

- router/index.js中的routes写错成routers，导致错误。



### Vue组件库使用经验

## element-ui使用

### 局部引入使用

1.在组件里`import { Table, TableColumn } from "element-ui";`

2.`  components: {Table, TableColumn}`

3.`<Table></Table>`、`<table-column type="selection"          width="55"></table-column>`

### 全局引入使用

1.在main中`import { Input} from 'element-ui';`

2.在组件中`<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" @change="search" id="el-input"></el-input>`

**二者在使用时注意是否要加`el-`**