
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Articles.vue')
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewArticle.vue')
  },
  {
    path: '/edit-article/:id',
    name: 'EditArticle',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditArticle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router