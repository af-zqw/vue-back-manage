import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: routers
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
export default router
