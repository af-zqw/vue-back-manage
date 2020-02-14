// 注册全局组件
import Vue from 'vue'
import table from './table.vue'
import Identify from './Identify.vue'
import Loading from './Loading.vue'

export default{
  install () {
    const components = [table, Identify, Loading]
    let i = components.length
    while (i) {
      i -= 1
      Vue.component(components[i].name, components[i])
    }
  }
}
