import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './../pages/home';

var Routers = new VueRouter({
    routes: [
        { path: '/home', component: Home }
    ]
})
export default Routers;