---
title: Good Code
categories: [前端, 可维护]
date: 2018-08-09
tags: [技术,计算机,前端]
---

## 编写可维护的代码

<!--more-->

### 组件编写规范

1.引进所需要的包；

2.引进组件；

3.引进样式；

4.声明组件；

5.导出组件；


注意点：

1.按照例子来空行隔断模块、写注释，利于后期维护；

2.规范化、语义化命名有利于团队协作与后期维护；

```jsx
/*
* @Author: Jomsou
* @Date:   2018.08.06 17:36
*/  

//引进所需要的包
import React from 'react';
import{Link} from 'react-router-dom';

//引进组件
import PageTitle from 'component/page-title/index.jsx';

//引进样式 
import 'xx/index.scss'

/**
 * 错误处理组件
 * 
 * @class Error
 * @extends {React.Component}
 */
class Error extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="出错了！" />
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到该路径</span>
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error;
```

## 编写强健型代码

### 编写测试代码

1.karma + Jest

## 持续集成ci