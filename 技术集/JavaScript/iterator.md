## 聊聊iterator

>相信，对于循环，程序员们都是熟的不能再熟悉了。今天就聊聊对for循环优化的方案吧。

### 以前

```js
for(let i=0;i<5;i++) {
  console.log(i);
}
```

### 后来

```js
for(let key in iterator) {
  console.log(key);
}
```

```js
var person = {
  name: 'zenquan',
  age: 23
}
for(let value of person) {
  console.log(value);
}//VM162:5 Uncaught TypeError: person is not iterable
```