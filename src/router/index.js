import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Register from '../views/Register'
import Login from '../views/Login'
import Main from '../views/Main'
import Setting from '../views/Setting'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-page',
    component: Main
  },
  {
    path: '/1',
    name: 'tweet-detail',
    component: () => import('../views/TweetDetail.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/settings',
    name: 'settings',
    component: Setting
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
