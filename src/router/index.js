import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SearchResults from '@/views/SearchResults'
import Account from '@/views/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      namh: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'searchResults',
      component: SearchResults,
      props: (route) => ({ address: route.query.address })
    },
    {
      path: '/account/:account',
      props: true,
      name: 'account',
      component: Account
    }
  ]
})
