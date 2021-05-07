import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import './plugins'
import './assets/style.css'
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
