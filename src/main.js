import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'phila-standards/dist/css/phila-standards.min.css';
// REVIEW this tries to make an ajax call for the services directory which is
// missing cors headers
// import 'phila-standards';

// this mixes in the config to all vue instances as this.$config
import './config';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('main');
