import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Register from '../views/Register'
import Login from '../views/Login'
import Main from '../views/Main'
import AdminTweets from '../views/AdminTweets'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main-page',
    component: Main
  },
  {
    path: '/tweets/:id',
    name: 'tweet-detail',
    component: () => import('../views/TweetDetail.vue')
  },
  {
    path: '/users/follower',
    name: 'user-follow',
    component: () => import('../views/Follow.vue')
  },
  {
    path: '/users/:id/following',
    name: 'user-follow',
    component: () => import('../views/Follow.vue')
  },
  {
    path: '/users/:id',
    name: 'user-detail',
    component: () => import('../views/UserDetail.vue')
  },
  {
    path: '/tweets/:id',
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
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweet',
    component: AdminTweets
  },
  {
    path: '/admin/users',
    name: 'admin-user',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/tweets'
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

router.beforeEach((to, from, next) => {
  console.log(to,from)
  next()
})


export default router
