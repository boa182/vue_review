# 归纳总结学过的vue框架
## 主要通过一些小案例和项目进行复习和总结

## 一、认识vue
### 1、什么是vue？
	 Vue.js 是一套构建用户界面(UI)的渐进式JavaScript框架
### 2、为什么使用vue？
	vue自身不是一个全能框架--它只聚焦于视图层，因此它非常容易学习，非常容易与其他库或已有项目整合。另一方面， 在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。

## 二、认识数据驱动模式
###	 区别：
###   jquery是操作DOM节点的
###   vue是数据驱动的设计模式

```html
	<div id="div1"></div>
	<div id="app">
		<span>{{message}}</span>
	</div>
```
```javascript
	//jq的DOM 节点操作：
	document.getElementById('div1').innerText = '节点手动改变，每次改变都需要重新操作一遍'
	
	//Vue 数据驱动： 当 message 发生改变的时候，span 会相应的发生改变，而不需要手动去改变 span。
	var vm = new Vue({
		el: '#app',
		data: {
			message: '我是通过映射显示的文本'
		}
	})
```

## 三、浅识MVVM模式
### M：Model，称之为数据模型，在前端以对象的形式表现。

```javascript
	var data = {message: '我就是一个数据模型'}
```

### V：View，视图，也就是 HTML

```html
	<div id="app">
		<span>我是视图</span>
	</div>
```

### VM：ViewModel，就是连接数据和视图的桥梁，当 Model 发生改变的时候，ViewModel 便将数据映射到视图。
