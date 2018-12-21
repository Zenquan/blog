---
title: 关于JavaScript/ES6的一些总结
categories: [前端, JavaScript]
date: 2018-12-21
tags: [技术,计算机,前端, JavaScript]

---

# 关于JavaScript/ES6的一些总结

1. String

   ![](https://user-gold-cdn.xitu.io/2018/12/21/167d08d56b897a5f?w=1275&h=588&f=png&s=28490)

2. DOM

   ![](https://user-gold-cdn.xitu.io/2018/12/21/167d08d9bd06a097?w=927&h=731&f=png&s=32716)

3. 三大系列——scroll、client、offset系列

   1. offset:

      - 在设置了box-sizing: border-box;offsetWidth=width;
      - 在没设置box-sizing: border-box;offsetWidth=width+padding+border;
      - offsetLeft只跟左边框到父级元素边框距离（绝对定位优先于父级padding，不要忽略自己的margin）有关
      - offsetTop只跟上边框到父级元素边框距离（绝对定位优先于父级padding，不要忽略自己的margin）有关

      ![](D:\zenquan\zenquan-note\personal-note\2018年12月工作记录\2018年12月知识总结\images\offset.png)

      2. client:

      无滚动条时，pageX=clientX，pageY = clientY

      在没设置box-sizing: border-box;clientWidth = width+padding;clientHeight = height+padding;

      clientLef = border-left

      clientTop = border-top

![](https://user-gold-cdn.xitu.io/2018/12/21/167d094e678c231a?w=427&h=305&f=png&s=15519)



   3.scroll

![](https://user-gold-cdn.xitu.io/2018/12/21/167d0953088f4a30?w=536&h=369&f=png&s=28866)

4. 事件类型

5. ES6中新增的数据结构Set、Map

![](https://user-gold-cdn.xitu.io/2018/12/21/167d0905758bce6c?w=557&h=303&f=png&s=8443)