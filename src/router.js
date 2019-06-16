import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { isAuthenticated } from './utils/auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/authorize',
      name: 'authorize',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Authorize.vue'),
    },
    {
      path: '/r/:title*',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue'),
      props: true
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "about" */ './views/PageNotFound.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'home' && to.name !== 'detail' || isAuthenticated()) {
    return next();
  }

  window.location.href = 'https://www.reddit.com/api/v1/authorize' +
    `?client_id=${process.env.VUE_APP_REDDIT_CLIENT_ID}` +
    '&response_type=token' +
    `&state=${process.env.VUE_APP_REDDIT_STATE}` +
    `&redirect_uri=http://localhost:8080/authorize` +
    '&scope=read'
})

export default router
