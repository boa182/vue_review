import Vue from 'vue';
import App from './App.vue';
window.Vue = Vue;

//1.引入需要的模块
//引入路由
import router from './router/index';


//全局使用axios
import axios from 'axios'
Vue.prototype.$axios = axios;

//2.引进来的东西还要Vue.use注册一下



//3.挂载到实例上
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})