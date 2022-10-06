import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Register from '../views/Register'
import Login from '../views/Login'
import Main from '../views/Main'
import Setting from '../views/Setting'
import AdminTweets from '../views/AdminTweets'

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
    path: '/f',
    name: 'user-follow',
    component: () => import('../views/Follow.vue')
  },
  {
    path: '/u',
    name: 'user-detail',
    component: () => import('../views/UserDetail.vue')
  },
  {
    path: '/adt',
    name: 'admin-tweet',
    component: AdminTweets
  },
  {
    path: '/adu',
    name: 'admin-user',
    component: () => import('../views/AdminUsers.vue')
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
