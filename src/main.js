import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PhilaLoadingIndicator from '@/components/PhilaLoadingIndicator'

Vue.config.productionTip = false
Vue.component('PhilaLoadingIndicator', PhilaLoadingIndicator)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
