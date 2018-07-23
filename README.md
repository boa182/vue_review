# 归纳总结那些年学到的vue和遇到的vue坑
## 一、个人练习项目
- <a href="https://github.com/boa182/vue_review/tree/master/project">individual event</a>

## 二、工作中遇到vue的坑
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
1）注册处理函数时，用如下方式，明确声明为不是被动的
window.addEventListener('touchmove', func, { passive: false })

2) 应用 CSS 属性 touch-action: none; 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。

```
touch-action 还有很多选项，详细请参考：<a href="https://w3c.github.io/pointerevents/#the-touch-action-css-property">click me!</a>
### 2、项目数据数组和组件一多起来，维护和查看就变得很困难了。。
- 你不知道它们各自携带的信息是啥，渲染页面，开发新功能应该调用哪个
- 一个组件嵌套了N多个子组件，然后N多个子组件又互相嵌套，代码数量很长很长，你不知道各自组件间的通信，嵌套关系，心好累<br/>
#### 解决方案：使用vue-devtools
1.**安装**
- （1）chrome商店直接安装，要翻墙
- （2）手动安装
```
git clone https://github.com/vuejs/vue-devtools.git
npm install //如果太慢的话，可以安装一个cnpm, 然后命令换成 cnpm install
npm run build
游览器输入地址“chrome://extensions/”进入扩展程序页面，点击“加载已解压的扩展程序...”按钮，选择vue-devtools>shells下的chrome文件夹。
/**
*如果看不见“加载已解压的扩展程序...”按钮，则需要勾选“开发者模式”。
*/
```

2.**vue-devtools的使用**
- vue项目, 打开f12, 选择vue就可以使用了.
- vue是数据驱动的, 这样就能看到对应数据了, 方便我们进行调试
![Image text](https://github.com/boa182/vue_review/blob/master/images/2.png)

### 3、**vue的transition使用**
```
 <transition name="fade">
 	//所有需要过渡的内容
 <div show="true"><div>
 </transition>
```
```css
@keyframes pullUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    animation: pullUp .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    animation: pullUp .5s reverse;
  }
```

### 4、**vue-router路由懒加载(解决vue项目首次加载慢)**
- 懒加载：也叫延迟加载，即在需要的时候进行加载，随用随载。
- 为什么需要？ 
```
像vue这种单页面应用，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，
造成进入首页时，需要加载的内容过多，时间过长，会出啊先长时间的白屏，即使做了loading也是不利于用户体验，
而运用懒加载则可以将页面进行划分，需要的时候加载页面，
可以有效的分担首页所承担的加载压力，减少首页加载用时
```
- 假设你的路由配置是这样的
```
import MainPage from './routes/MainPage.vue'
import OtherMassivePage from './routes/OtherMassivePage.vue'
 
const router = new Router({
	routes: [
			{ path: '/main', component: MainPage },
			{ path: '/other', component: OtherMassivePage }
	]
}) 

export default router
```
-  现在使用require.ensure来替代import，并且给chunk命名，按组分块
```
const MainPage = r => require.ensure([], () => r(require('./routes/MainPage.vue')),'MainPage')
const OtherMassivePage = r => require.ensure([], () => r(require('./routes/OtherMassivePage.vue')),'OtherMassivePage')

const router = new Router({
	routes: [
		{ path: '/main', component: MainPage },
		{ path: '/other', component: OtherMassivePage }
	]
})

export default router
```
### 5.**加载后台图片失败时，如何显示默认图片的骚操作**
```javascript
<img :src="path+item.cosuretyPhoto+token" :onerror="errorImg">

computed: {
	errorImg () {
		return 'this.src="' + require('assets/surety/avatar.png') + '"'
	}
}

```
### 6.**在vue项目中使用svg图**
- 传统使用方法：
```
   首先新建一个svg.vue文件，在该文件中使用svg标签定义一堆svg图，再分别用symbol标签分别定义一个个svg图，
再使用id来标记各个svg图，最后在需要实用的地方使用use标签绑定每个id即可使用svg图 
```
- 新方法：通过插件使用svg图
```
步骤1： npm install vue2-svg-icon --save-dev
步骤2：把svg图文件xxx.svg放到src/assets/svg下
步骤3: 在入口文件main.js文件中配置:
      import Icon from 'vue2-svg-icon/Icon.vue'
      vue.component('icon',Icon)
步骤4：在vue文件中使用svg
     <icon name="xxx" :width="'20px'" :height="'20px'"></icon>
     xxx就是你的svg文件名
```

### 7.**vue中的$set的使用**
- 需求：根据数组对象渲染一个手风琴效果的列表，如下图 <br />
![Image text](https://github.com/boa182/vue_review/blob/master/images/p3.png)

- 假设后端返回给你的数据结构是这样的
```javascript
list: [
        {
          label: '列表一',
          props: [
            {name: 123},
            {name: 132}
          ]
        },
        {
          label: '列表二',
          props: [
            {name: 123},
            {name: 132}
          ]
        },
        {
          label: '列表三',
          props: [
            {name: 123},
            {name: 132}
          ]
        }
      ]
```

- 首先for循环生成你要的html结构
```html
<div
  class="cell-box"
  v-for="(item,index) of list"
  :key="index">
  <cell
    isLink
    @click.native="showDatelist(item)"
    :arrow-direction="item.isShow ? 'up' : 'down'"
    :title="item.label">
  </cell>
  <div class="transition-fade" :style="{maxHeight: item.isShow ? (item.props.length*24) + 'px':0}">
    <p
      v-for="(p,i) in item.props"
      :key="i">
      {{p.name}}
    </p>
  </div>
</div>
```

- 你想给这个数组的每一个对象加一个isShow属性，方便之后的点击伸缩事件判断
```javascript
this.list.forEach((item) => {
  item.isShow = false
})
```

- 但你会发现，你的点击事件成功赋值了，但却不会自动更新到视图上
```javascript
showDatelist (item) {
  if (item.isShow === true) {
    item.isShow = false
  } else {
    item.isShow = true
  }
}
```

- 通过控制台打印数组的对象，你会发现label，props都有get()和set(),但isShow并没有，因此设置了isShow值vue并不会自动更新到视图上。这时候只要
```javascript
this.list.forEach((item) => {
  this.$set(item, 'isShow', false)
})
```

- 通过查阅官方文档
```
Vue.set(target,key,value)
因为 Vue 无法探测普通的新增属性。
向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新，
它必须用于向响应式对象上添加新属性。
```

## 三、基础总结
## （一）、认识vue
### 1、什么是vue？
	 Vue.js 是一套构建用户界面(UI)的渐进式JavaScript框架
### 2、为什么使用vue？
	vue自身不是一个全能框架--它只聚焦于视图层，因此它非常容易学习，非常容易与其他库或已有项目整合。另一方面， 在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。

## （二）、认识数据驱动模式
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

## （三）、浅识MVVM模式
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

## （四）、初次使用vue（看demo文件夹里面的01）
![Image text](https://github.com/boa182/vue_review/blob/master/images/p1.PNG)

## (五)、Vue Router相关
### router link 跳转传参
```javascript
<router-link 
    :to="{path:'/employeeDetail',query:{name:'boa'}}">
    申诉
</router-link>
```
### this.$router.push 传参
```javascript
this.$router.push({
   path: '/employeeDetail',
   query: {
      name: 'boa'
   }
})
```

## (六)、vuex的使用
### 1.最简单的使用
- 创建一个简单的store
```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    reduce (state) {
      state.count--
    }
  }
})
```
- 由于store的状态是响应式的，在组件中调用store中的状态仅需在计算属性中返回即可。
```javascript
<p>{{count}}</p>

computed: {
	count () {
		return this.$store.state.count
	}
},
```
- 通过提交mutation（commit）的方式，而非直接改变状态对象
```javascript
methods: {
	cut () {
		this.$store.commit('reduce')
	},
	add () {
		this.$store.commit('increment')
	}
}
```

### 2.vuex——state访问
- 方法一、直接获取

```
<span>{{$store.state.count}}<span>
```

- 方法二、通过computed的计算属性直接赋值

```
<span>{{count}}</span>

<script type="text/javascript">
    computed: {
        count(){
            return this.$store.state.count
        }
    } 
</script>
```

- 方法三、通过mapState的计算属性直接赋值

```
<span>{{count}}{{count1}}{{count2}}</span>

import {mapState} from 'vuex'
computed: mapState({
 count: state => state.count,
 count1: state => state.count1,
 count2: state => state.count2,

// 为了能够使用'this'获取局部状态，必须使用常规函数
 countPlusLocalState (state) {
	 return state.count + this.localCount
 }
})
```

- 方法四、通过mapState的数组赋值

```
<span>{{count}}{{count1}}{{count2}}</span>

import {mapState} from 'vuex'
computed: mapState(['count', 'count1', 'count2'])
```

- 方法五、对象展开运算符

```
// 使用于它与局部计算属性混合使用
computed: {
	localComputed () {},
  ...mapState({
    count: state => state.count
  })
}
```

### 3.getter的使用
- 为什么使用getter？

```
有的组件中获取到 store 中的state,  需要对进行加工才能使用，computed 属性中就需要写操作函数，如果有多个组件中都需要进行这个操作，那么在各个组件中都写相同的函数，那就非常麻烦，这时可以把这个相同的操作写到store 中的getters,  每个组件只要引用getter 就可以了。
```
- 创建一个getters
```javascript
state: {
  count: 0,
  filtersList: [
    { id: 1, name: 'laoxie' },
    { id: 2, name: 'lenmo' }
  ]
},
getters: {
  total: (state) => (symblo) => {
    if (symblo) {
      return symblo + (state.count * 1 + 3)
    } else {
      return '$ ' + state.count
    }
  },
  filtration: (state) => (filtrationFactor) => {
    return state.filtersList.find(item => item.id === filtrationFactor)
  }
}
```
- getter通过属性访问
```html
<p>price: <span>{{$store.getters.total}}</span></p>
```
- gettert通过方法访问
```html
<!-- 传参￥ -->
<p>price: <span>{{$store.getters.total('￥')}}</span></p>
<!--使用id为1的name -->
<p>name: <span>{{$store.getters.filtration(1).name}}</span></p>
```
- mapGetters辅助函数
```javascript
<h3>count-{{total('￥')}}</h3>

computed: {
  ...mapGetters([
      'total'
  ])
}
```
- mapGetters辅助函数之别名
```javascript
computed: {
  ...mapGetters([
      amount: 'total'
  ])
}
```

### 4、action异步
```javascript
register ({commit}) {
    axios.post('register', {
        name: 'sam',
        password: '123456'
    }).then(() => {
        console.log('注册成功');  // 注册成功
        commit('SUCCESS');       // mutation
    }).catch(err => {
         console.log(err);  // catch 处理注册失败
         commit('FAIL');
    }   
} 
```

- 分发action
```html
<input type="button" value="register" @click="$store.dispatch('register')"/>
```

- mapActions(和mutation的使用方法基本一样)

```javascript
methods: {
  ...mapActions(['register']),
  ...mapActions({reg: 'register'})
}
```

## (七)、vue中父子间的传参

1.**子传父**

- this.$emit(event,...args)
```
evet: 要触发的父组件事件
args: 将要传给父组件的参数
```

- 子组件的内容
```javascript
<button @click="iclick">点击传参给</button>

methods: {
  iclick () {
    let dataList = {
      a: 'data'
    }
    this.$emit('ievent',dataList,'lalala')
  }
}
```

- 父组件的内容
```javascript
<child v-on:ievent="ievent"></child>

methods: {
  ievent (...data) {
    console.log('allData',data) // data为包含传过来所有数据的数组，第一个元素是对象，第二个元素是字符串
  }
}
```
