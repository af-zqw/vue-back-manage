import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scale: document.body.clientWidth / 1366,
    popups: '',
    API_PROXY: 'https://bird.ioliu.cn/v1/?url=',
    menuList: [],
    token: 0,
    loading: false,
    color: '',
    user: [
      {username: 'admin', password: '123456', token: 'admin'},
      {username: 'test', password: '123456', token: 'test'}
    ]
  },
  getters: {
    getScale (state) {
      return state.scale
    },
    getPopups (state) {
      return state.popups || []
    },
    getMenuList (state) {
      return state.menuList
    },
    getToken (state) {
      return state.token || 0
    },
    getLoading (state) {
      return state.loading
    },
    getColor (state) {
      return state.color || '#409EFF'
    },
    getUser (state) {
      return state.user
    }
  },
  actions: {
    addPopups (ctx, args) {
      const list = ctx.getters.getPopups
      const argCopy = { ...args }
      import('@/views' + args.url).then((res) => {
        argCopy.component = res.default
        list.push(argCopy)
        ctx.commit('setPopups', list)
      })
    },
    delPopups (ctx, id) {
      const list = ctx.getters.getPopups
      list.every((item, index) => {
        if (item.id === id) {
          list.splice(index, 1)
          ctx.commit('setPopups', list)
          return false
        }
        return true
      })
    }
  },
  mutations: {
    setScale (state, data) {
      state.scale = data
    },
    setPopups (state, data) {
      state.popups = data
    },
    setMenu (state, data) {
      state.menuList = data
    },
    setToken (state, data) {
      console.log(data)
      state.token = data
    },
    setLoading (state, data) {
      state.loading = data
    },
    setColor (state, data) {
      state.color = data
    },
    setUser (state, data) { // 注册
      state.user = state.user.concat([data])
    }
  }
})
