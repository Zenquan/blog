### 我所知道的JavaScript中判断数据类型

> 相信一提到怎么判断js的数据类型，大家都会想到的是typeof、instanceof，那么为什么有了typeof的存在还要有instanceof？

#### typeof？

根据MDN：**typeof**操作符返回一个字符串，表示未经计算的操作数的类型。

eg：

```js
typeof 1; // 'number'
typeof NaN; // 'number'
typeof 'zenquan'; // 'string'
typeof true; // 'boolean'
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
typeof console.log // "function"
```

typeof出现的问题1——typeof null === 'object'

然后你会发现，`typeof null; // 'object' `。null可是原始数据类型的啊，怎么就是'object'了呢？？（不解.jpg）原来这个已经是历史问题了，在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

typeof出现的问题2——typeof 引用类型 | Math === ‘object’

> 这样根本不知道是数组还是对象

```js
typeof [] // "object"
typeof {} // "object"
```

typeof出现的问题3——typeof 基本包装类型 |  Array ||Date === ‘funtion’

> 这样也不能知道是Number还是Boolean还是String

```js
typeof Number // "function"
typeof Boolean // "function"
typeof String // "function"
```

#### instanceof？

> 因为typeof有了以上的问题，所以才有了instanceof。

根据MDN：instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置

也就是 p instaceof person === true,则p是person的实例化对象，用于包装对象或者是引用类型对象的判断。

```js
var str1 = 'zenquan';
console.log(str1 instanceof String); // false
var str2 = new String('jomsou');
console.log(str2 instanceof String); // true
```

可能会出现的面试题： 如何判断一个数组？

方法1： instanceof

```js
arr instanceof Array
```

方法2： Array.isArray()

```js
Array.isArray([])
```



#### 结合typeof和instanceof实现判断是否为原始类型

```js
class PrimitiveString {
    static [Symbol.hasInstance](x) {
        return typeof(x) == 'string';
    }
}
console.log('hello world' instanceof PrimitiveString);
```

> 你可能不知道 `Symbol.hasInstance` 是什么东西，其实就是一个能让我们自定义 `instanceof` 行为的东西，以上代码等同于 `typeof 'hello world' === 'string'`，所以结果自然是 `true` 了。这其实也侧面反映了一个问题， `instanceof` 也不是百分之百可信的。

#### 判断数据类型的方法

1. Object.prototype.toString.call(e).slice(8, -1)

```js
function type(e) {
    return Object.prototype.toString.call(e).slice(8, -1);
}
console.log(type(null))
console.log(type(1))
console.log(type('zenquan'))
console.log(type(undefined))
console.log(type(Symbol()))
console.log(type(true))
console.log(type(console.log))
```

2. [type](https://github.com/jsmini/type): JS类型检测库，弥补typeof的问题，原生兼容IE6
3. 通过一些系统自带的API函数来判断，eg： `Array.isArray()`

所以，typeof和instanceof结合起来就可以数据类型的判断。