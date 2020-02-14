// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastClick' // 从npm上安装，解决移动动点击三百毫秒延迟的问题
import VueAwesomeSwiper from 'vue-awesome-swiper'// 从npm上安装，可以使用swiper插件
// import './assets/styles/reset.css'  //解决不同手机样式的问题
import './assets/styles/border.css' // 解决手机一像素边框的问题
import './assets/styles/iconfont.css'
// import './assets/styles/varibles.styl'
// import './assets/styles/common.styl'
import 'swiper/dist/css/swiper.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from 'axios'
import store from './store'
import commonComponents from './components/Common' // 引入全局组件的注册方法
import './util/iconfont.js'
import Icon from '@/components/Common/Icon'
import {appRouterAdmin, errorPage, appRouterTest} from '@/router/router.js'
import '../theme/index.css'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI, {
  size: 'mini'
})
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
// 封装axios，实现跨域
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(commonComponents)// 注册全局组件
Vue.component('Icon', Icon)

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  created () {
    let token = sessionStorage.getItem('token')
    if (token) { // 为了页面刷新重新挂载路由，不然会消失
      if (token === 'admin') {
        router.options.routes = appRouterAdmin
        router.addRoutes([...appRouterAdmin, errorPage]) // 动态添加路由
      } else {
        router.options.routes = appRouterTest
        router.addRoutes([...appRouterTest, errorPage]) // 动态添加路由
      }
    } else {
      router.push('/login')
    }
  },
  components: { App: App }, // 定义一个局部组件
  template: '<App/>'
})

// 监听窗口的缩放级别
window.onresize = function () {
  const size = document.body.clientWidth / 1366
  vm.$store.commit('setScale', size)
}
// 全局混合
Vue.mixin({
  computed: {
    scale () {
      return this.$store.getters.getScale
    },
    _color () {
      return this.$store.getters.getColor
    }
  },
  watch: {
    onLoading () {
      this.$store.commit('setLoading', this.onLoading)
    }
  },
  directives: {
    resize: { // 指令的名称
      bind (el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = ''
        let height = ''
        function isReize () {
          const style = document.defaultView.getComputedStyle(el)
          if (width !== style.width || height !== style.height) {
            binding.value()
          }
          width = style.width
          height = style.height
        }
        el.__vueSetInterval__ = setInterval(isReize, 500)
      },
      unbind (el) {
        clearInterval(el.__vueSetInterval__)
      }
    }
  }
})

Vue.prototype.$alertMsgBox = function alert (msg = '确认要删除该数据？', title = '提示', settings = {}) {
  Object.assign(settings, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true
  })
  return this.$confirm(`<p style="font-weight:bold;">${msg}</p>`, title, settings)
}
