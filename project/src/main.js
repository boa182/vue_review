// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'utility/rem.js'
import Vue from 'vue'
import App from './App'
import router from 'router'
import {XInput, Group} from 'vux'

Vue.config.productionTip = false
const components = {
  'x-input': XInput,
  'group': Group
}
for (let [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>'
})
