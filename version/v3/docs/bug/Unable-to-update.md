---
title: 无法更新
description: 这里总结了可能遇到的问题以及解决方案。
layout: doc
---

# 无法更新
这里总结了可能遇到的更新问题以及解决方案。
## 出现以下情况
![](https://tc.ets2la.cn/d/img/25-12/159edea699ff58cd089dd475bfe59721.png)或![](https://tc.ets2la.cn/d/img/25-12/4ff5bec06baa7c9e8c51d17f054ca2f9.png)

 ### 1.简单方法
 重新安装ETS2LA,安装方法请参考[安装](/version/v3/docs/base/install.html)

 ### 2.复杂方法
在 ETS2LA 安装目录中打开`activate.bat`文件并依次运行以下代码即可。
```angular2html
git fetch origin main
```
```angular2html
git checkout origin/main
```
直到出现以下提示代表成功，此时再次更新就可以了。
![](https://tc.ets2la.cn/d/img/25-12/97834EB548ED24098FDB0C1784197285.png)

::: tip 注意
在继续[软件外](/version/v3/docs/base/use.html#_5-2-软件外)更新时，需要先关闭ETS2LA。
