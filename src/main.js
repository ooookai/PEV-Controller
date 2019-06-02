import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/vuesax.js'

Vue.config.productionTip = false

import VueFire from 'vuefire'
Vue.use(VueFire)

import VueRx from 'vue-rx'
Vue.use(VueRx)

import Timeago from 'vue-timeago'
Vue.use(Timeago)

import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
Vue.use(VueProgress)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
