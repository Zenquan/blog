---
title: react知识总结
categories: [前端, 框架]
date: 2018-07-26
tags: [技术,计算机,前端,JavaScript,React]
---

>用于构建用户界面的 JavaScript 库

<!--more-->

## JSX语法
style
```javascript
let style = {
  color: 'r'+'ed',
  fontSize: '30px'
}
let jsx = <div style={style}>jsx...</div>;
```


className
```javascript
import './index.scss';
let jsx = (
  <div className="jsx">
  jsx...
  </div>
);
```
变量的使用和条件判断
```javascript
let name = "Jomsou";
let flag = false;
let jsx = (
  <div>
    { flag ? <p> I am {name} </p> : <p> I am not {name}</p>} 
  </div>
);
```
数组循环
```js
let names = ['jomsou', 'marry', 'james']
let jsx = (
  <div>
    { names.map((name, index)=><p key={index}>Hello, I am {name}</p>)}
  </div>
);
```
## React组件的定义
```js
ES5
function  Component() {
  return <h1>I am Jomsou</h1>
}
ES6
class ES6component extends React.Component{
  render(){
    return <h1>I am Jomsou</h1>
  }
}
ReactDOM.render(
  <div>
    <Component/>
    <ES6component/>
  </div>,
  document.getElementById('app')
);
```

state：状态，即所有参数
setState：设置状态变化
super：继承父组件的this指针
```js
class ES6component extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: 'Jomsou'
    }
  }
  render(){
    //用于异步操作
    setTimeout(() => {
      this.setState({
        name: 'Jomsou Can'
      })
    }, 2000);
    return <h1>I am {this.state.name}</h1>
  }
}
ReactDOM.render(
  <div>
    {/* <Component/> */}
    <ES6component/>
  </div>,
  document.getElementById('app')
);
```
props: 父组件往子组件里传递东西
```js
class ES6component extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <h1>I am {this.props.name}</h1>
  }
}
ReactDOM.render(
  <div>
    <ES6component name="Jomsou STC"/>
  </div>,
  document.getElementById('app')
);
```
### 事件处理

方式1：

1、按钮button点击后，this会改变，所以需要在constructor中加`this.handleClick = this.handleClick.bind(this);`
```js
handleClick(){
    this.setState({
        age: this.state.age+1
    })
}
render(){
    return (
        <div>
        <h1>I am {this.state.name}</h1>
        <p>I am {this.state.age} years</p>
        <button onClick={this.handleClick}>加一岁</button>
        </div>
    )
}
```
方式2：
```js
onValChange(e){
    this.setState({
      age: e.target.value
    })
  }
  render(){
    return (
      <div>
        <h1>I am {this.state.name}</h1>
        <p>I am {this.state.age} years</p>
        <input type="text" onChange={(e)=>this.onValChange(e)} />
      </div>
    )
  }
```
### 容器式组件和单纯组件
```js
class Title extends React.Component {
  render(props){
    // return <h1>{this.props.title}</h1>
    return <h1>{this.props.children}</h1>
  }
}
class App extends React.Component {
  render(){
    return (
      <div>
      {/* 容器式组件 */}
        {/* <Title title="App Title"/> */}
        <Title>
          <span>App Span</span>
          <a href="">link</a>
        </Title>
        <hr/>
        {/* 单纯组件 */}
        <Component/>
      </div>
    )
  }
}
```
### 父组件向子组件传值
>用props传值
```js
class Title extends React.Component {
  render(props){
    <h1>{this.props.title}</h1>
  }
}
class Father extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div}>
        <Title title="App Title"/>
      </div>
    )
  }
}
```

### 子组件向父组件传值
>通过回调函数
```js
class Child extends React.Component {
  constructor(props){
    super(props);
  }
  handleClick(){
    this.props.onChangeColor('red');
  }
  render(){
    return (
      <div>
        <h1>父组件的背景颜色：{this.props.bgColor}</h1>
        <button onClick={(e)=>this.handleClick(e)}>改变颜色</button>
      </div>
    )
  }
}
class Title extends React.Component {
  render(props){
    return <h1>{this.props.children}</h1>
  }
}
class Father extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bgColor: '#999'
    }
  }
  onChangeColor(color){
    this.setState({
      bgColor: color
    })
  }
  render(){
    return (
      <div style={{background: this.state.bgColor}}>
        <Child bgColor={this.state.bgColor} onChangeColor={color=>this.onChangeColor(color)}/> 
      </div>
    )
  }
}
ReactDOM.render(
  <div>
    <Father/>
  </div>,
  document.getElementById('app')
);
```
### 兄弟组件相互传值
>状态提升——先提升到父组件上，再到兄弟组件里
```js
class Child1 extends React.Component {
  constructor(props){
    super(props);
  }
  handleClick(){
    this.props.changeChild2Color('red');
  }
  render(){
    return (
      <div>
        <h1>child1：{this.props.bgColor}</h1>
        <button onClick={(e)=>this.handleClick(e)}>改变颜色</button>
      </div>
    )
  }
}
class Child2 extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={{background: this.props.bgColor}}>
        <h1>Child2：{this.props.bgColor}</h1>
      </div>
    )
  }
}
class Title extends React.Component {
  render(props){
    return <h1>{this.props.children}</h1>
  }
}
class Father extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bgColor: '#999'
    }
  }
  onChangeChild2Color(color){
    this.setState({
      bgColor: color
    })
  }
  render(){
    return (
      <div>
        <Child1 changeChild2Color={(color)=>this.onChangeChild2Color(color)}/> 
        <Child2 bgColor={this.state.bgColor}/> 
      </div>
    )
  }
}
ReactDOM.render(
  <div>
    <Father/>
  </div>,
  document.getElementById('app')
);
```
## 生命周期
>从生到死

作用：

- Mounting: 挂载阶段

- Updating：运行时阶段

- Unmounting：卸载阶段

- Error Handling： 错误处理

挂载阶段
```
constructor
componentWillMount
render
componentDidMount
```

有更新的情况
```
componentWillReceiveProps//如果父组件向子组件传值，执行
shouldComponentUpdate: 默认是true，可以更新//设置为flase则没有以下步骤
componentWillUpdate
render
componentDidUpdate
```
卸载阶段

componentWillUnmount

## Router原理及React-Router

历史--栈的形式
跳转--可传递数据
事件

常见的Router
- 页面Router：重新渲染
```js
window.location.href="https://www.baidu.com"
```
- Hash Router
```js
window.loaction = '#hash';
window.onhashchange = function(){
  console.log('current hash:', window.location.hash)
}
``` 
- H5 Router
>包括页面跟hash路由
```js
//推进一个状态
history.pushState('name', 'title', '/path');
//替换一个状态
history.replaceState('name', 'title', '/path');
//popstate
window.onpopstate = function(){
  console.log(window.location.href);
  console.log(windos.location.pathname);
}
```
HashRouter和BrowserRouter

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class A extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>Component A</div>
        )
    }
}
class B extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>Component B</div>
        )
    }
}
class Wraper extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Link to="/a">组件A</Link>
                <br/>
                <Link to="/b">组件B</Link>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <Wraper>
            <Route path="/a" component={A} />
            <Route path="/b" component={B} />
        </Wraper>
    </Router>
    , document.getElementById('app'));

```
![](https://user-gold-cdn.xitu.io/2018/8/20/165579ae3cc43c99?w=332&h=153&f=png&s=5671)

如果把hashRouter改成BrowserRouter，则变成

![](https://user-gold-cdn.xitu.io/2018/8/20/165579b36ce7221a?w=317&h=156&f=png&s=4983)


