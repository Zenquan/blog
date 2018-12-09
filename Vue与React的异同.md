---
title: Vue与React的异同
categories: [前端, 框架]
date: 2018-08-20
tags: [技术,计算机,前端,JavaScript,Vue,React]
---

>众所周知，前端现在最火的两个框架是Vue和React了。通过一段时间的学习与项目上的实践，我想通过比较他们之间的异同点来发现以后在项目的技术选型中知道怎么抉择用哪个。有一点说明的是他们各自有自己的优势，都是很棒的框架，无需说说更厉害点。记得今年Vue“生日”的时候，react还“送”了它生日礼物呢，cp~

<!--more-->

![](https://user-gold-cdn.xitu.io/2018/8/20/1655784b15cebc76?w=1080&h=1440&f=jpeg&s=97475)

## vue与react的区别

1.Vue里使用.vue格式模板实现组件化，而react采用把html写进js即jsx

2.vue是双向数据绑定，react是单向数据绑定，在通过state来管理

3.Virtual DOM上的差异

Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。

而对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过shouldComponentUpdate这个生命周期方法来进行控制，但Vue将此视为默认的优化。

4.在状态管理、对象属性的差异

如果你对React熟悉，你就会知道应用中的状态是（React）关键的概念。也有一些配套框架被设计为管理一个大的state对象，如Redux。此外，state对象在React应用中是不可变的，意味着它不能被直接改变（这也许不一定正确）。在React中你需要使用setState()方法去更新状态。

在Vue中，state对象并不是必须的，数据由data属性在Vue对象中进行管理。

而在Vue中，则不需要使用如setState()之类的方法去改变它的状态，在Vue对象中，data参数就是应用中数据的保存者。

对于管理大型应用中的状态这一话题而言，Vue.js的作者尤雨溪曾说过，（Vue的）解决方案适用于小型应用，但对于对于大型应用而言不太适合。

## vue与react的相同点

React与Vue存在很多相似之处，例如他们都是JavaScript的UI框架，专注于创造前端的富应用。不同于早期的JavaScript框架“功能齐全”，Reat与Vue只有框架的骨架，其他的功能如路由、状态管理等是框架分离的组件。

1.Virtual DOM

>所谓的Virtual DOM基本上说就是它名字的意思：虚拟DOM，DOM树的虚拟表现。它的诞生是基于这么一个概念：改变真实的DOM状态远比改变一个JavaScript对象的花销要大得多。

Virtual DOM是一个映射真实DOM的JavaScript对象，如果需要改变任何元素的状态，那么是先在Virtual DOM上进行改变，而不是直接改变真实的DOM。当有变化产生时，一个新的Virtual DOM对象会被创建并计算新旧Virtual DOM之间的差别。之后这些差别会应用在真实的DOM上。

2.组件化

>React与Vue都鼓励组件化应用。这本质上说，是建议你将你的应用分拆成一个个功能明确的模块，每个模块之间可以通过合适的方式互相联系。关于组件化的例子可以在这篇文章的中间部分被找到:

你可以认为组件就是用户界面中的一小块。如果让我来设计Facebook的UI界面，那么聊天窗口会是一个组件，评论会是另一个组件，不断更新的好友列表也会作为一个组件。

3.Props

这是properties的简写。props在组件中是一个特殊的属性，允许父组件往子组件传送数据。

4.构建工具

React和Vue都有自己的构建工具，你可以使用它快速搭建开发环境。React可以使用Create React App (CRA)，而Vue对应的则是vue-cli。两个工具都能让你得到一个根据最佳实践设置的项目模板。

5.调试工具

>React和Vue都有很好的Chrome扩展工具去帮助你找出bug。它们会检查你的应用，让你看到Vue或者React中的变化。你也可以看到应用中的状态，并实时看到更新。

React的开发工具: https://cdn.deliciousbrains.com/content/uploads/2017/06/15151112/react-devtools.mp4

Vue的开发工具: https://cdn.deliciousbrains.com/content/uploads/2017/06/15151111/vue-devtools.mp4

6.配套全家桶

>Vue与React最后一个相似但略有不同之处是它们配套框架的处理方法。相同之处在于，两个框架都专注于UI层，其他的功能如路由、状态管理等都交由同伴框架进行处理。

而不同之处是在于它们如何关联它们各自的配套框架。Vue的核心团队维护着vue-router和vuex，它们都是作为官方推荐的存在。而React的react-router和react-redux则是由社区成员维护，它们都不是官方维护的。

7.移动端解决方案

react——>react native

vue——>weex

## 技术选型考虑

1. 项目的规模，小型项目较倾向于选Vue，大型项目较倾向于选React。

2. 学习成本考虑，Vue较React平缓，因为无需学Jsx。

3. 现有应用想快速升级，倾向于选Vue，因为Vue模板也是html。