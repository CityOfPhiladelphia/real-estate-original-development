import Vue from 'vue';
import Router from 'vue-router';
import Intro from './views/Intro.vue';
import Search from './views/Search.vue';
import Account from './views/Account.vue';
import StartPayment from './views/StartPayment.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
    // {
    //   path: '/start-payment',
    //   name: 'start-payment',
    //   component: StartPayment,
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
