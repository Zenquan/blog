## 关于babel官网的学习

> 提起babel，前端er大概都不陌生。但是为什么要有babel呢？解决了什么问题？怎么使用babel呢？注意点在哪？以下就从这几个方面总结一下我关于babel学习的结果吧。

#### 为什么要有babel呢？

距离ES2015提出已经有几年了，各个浏览器厂商也在积极地支持着各个好用的ES6的新特性和新语法。但是还有许多的东西还是不支持的。所以这个时候就需要有一个编译器，把ES6+的语法转换成<=ES5的语法。

![](https://ws1.sinaimg.cn/large/005Pf0eLgy1g0z6twvez1j30le07vaa5.jpg)

#### 怎么使用babel呢？

- 安装babel相关的库

```bash
yarn add @babel/core @babel/cli @babel/preset-env -D
yarn add @babel/polyfill 
```

- 配置好babel.config.js或者.babelrc(只需要配置一个就行)

  ![](https://ws1.sinaimg.cn/large/005Pf0eLgy1g0z6wa5x3mj30o804j3yf.jpg)

  babel.config.js

  ```js
  module.exports = function(api) {
    api.cache(true); // 这句要加上
    const presets = [
      [
        "@babel/env",
        {
          targets: {
            // ie: '9',
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1",
          },
          useBuiltIns: "usage",
        },
      ],
    ];
    const plugins = [
      ["@babel/plugin-transform-arrow-functions", { "spec": true }]
    ];
    return {
      presets, 
      plugins
    }
  };
  ```
  ```js
  const presets = [
  [
    "@babel/env",
    {
      targets: {
        // ie: '9',
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
  ];
  const plugins = [
  ["@babel/plugin-transform-arrow-functions", { "spec": true }]
  ];
  ```

```js
module.exports =  {
  presets,
  plugins
};
```

  .babelrc

  ```json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            // ie: '9',
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1",
          },
          "useBuiltIns": "usage",
        },
      ]
    ],
    "plugins": [
      "@babel/plugin-transform-arrow-functions"
    ]
  }
  ```


#### 注意点在哪？

[Trying to build Jest is throwing “Caching was left unconfigured.”](https://stackoverflow.com/questions/50939445/trying-to-build-jest-is-throwing-caching-was-left-unconfigured)

#### 怎么写一个babel插件

[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

