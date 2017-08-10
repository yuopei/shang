import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import list from '@/components/list'
import cart from '@/components/cart'
import user from '@/components/user'
import details from '@/components/details'
import search from '@/components/search'
import kuan from '@/components/kuan'

Vue.use(Router)

export default new Router({
  routes: [
    {
       path:'/',
       redirect:'/home'
    },
    {
      path: '/home',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path:'/details',
      name:'details',
      component: details
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path:'/kuan',
      name:'kuan',
      component:kuan
    }
  ]
})
