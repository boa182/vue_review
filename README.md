# 归纳总结那些年学到的vue和遇到的vue坑
#### 下面的是遇到的坑
## 一、项目中的坑
### 1、Unable to preventDefault inside passive event listener
	最近做项目经常在 chrome 的控制台看到如下提示： 
	Unable to preventDefault inside passive event listener due to target being treated as passive.
	See https://www.chromestatus.com/features/5093566007214080 
	这是由于浏览器必须要在执行事件处理函数之后，才能知道有没有掉用过 preventDefault() ，这就导致了浏览器不能及时响应滚动，略有延迟。
	所以为了让页面滚动的效果如丝般顺滑，从 chrome56 开始，在 window、document 和 body 上注册的 touchstart 和 touchmove 事件处理函数，
	会默认为是 passive: true。浏览器忽略 preventDefault() 就可以第一时间滚动了。
```javascript
	举个栗子：
	wnidow.addEventListener('touchmove', func) 效果和下面一句一样
	wnidow.addEventListener('touchmove', func, { passive: true })
```
这就导致了一个问题：如果在以上这 3 个元素的 touchstart 和 touchmove 事件处理函数中调用 e.preventDefault() ，会被浏览器忽略掉，并不会阻止默认行为。<br/>
解决方案2个：<br />
```javascript
1、注册处理函数时，用如下方式，明确声明为不是被动的
window.addEventListener('touchmove', func, { passive: false })

2、应用 CSS 属性 touch-action: none; 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
touch-action 还有很多选项，详细请参考：<a href="https://w3c.github.io/pointerevents/#the-touch-action-css-property"></a>
```
#### 下面的是基础总结
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

## 四、初次使用vue（看demo文件夹里面的01）
![Image text](https://github.com/boa182/vue_review/blob/master/images/p1.PNG)


