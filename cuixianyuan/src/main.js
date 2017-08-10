// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import $ from 'jquery'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

Vue.use(MintUI)


Vue.use(ElementUI)

Vue.config.productionTip = false

window.bus = new Vue()
window.bus.arr = []
window.bus.rmb = 0

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
