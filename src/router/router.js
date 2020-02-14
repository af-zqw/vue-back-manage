import Main from '@/views/base/main.vue'
import Login from '@/views/base/Login/index.vue'

export const loginRouter = {
  path: '/login',
  name: 'login',
  component: Login
}
export const errorPage = {
  path: '*',
  name: '错误页面',
  component: Main,
  redirect: '/404',
  children: [{
    path: '/404',
    name: '404',
    meta: {type: 'error'},
    component: () => import('@/views/other/404.vue')
  }]
}

export const appRouterAdmin = [
  {
    path: '/',
    name: '首页',
    component: Main,
    redirect: '/home',
    meta: {icon: 'el-icon-s-home'},
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/base/Home/index.vue')
      }
    ]
  },
  {
    path: '/commonly',
    name: '常用',
    component: Main,
    redirect: '/commonly/table',
    meta: {icon: 'el-icon-location'},
    children: [
      {
        path: 'table',
        name: '表格表单弹窗',
        component: () => import('@/views/commonly/Table/index.vue')
      },
      {
        path: 'echart',
        name: 'echart',
        component: () => import('@/views/commonly/Echart/index.vue')
      },
      {
        path: 'tab',
        name: 'tab+table',
        component: () => import('@/views/commonly/Tab/index.vue')
      },
      {
        path: 'device',
        name: '综合-设备管理',
        component: () => import('@/views/commonly/Device/index.vue')
      },
      {
        path: 'drawer',
        name: '抽屉',
        component: () => import('@/views/commonly/Drawer/index.vue')
      }
    ]
  },
  {
    path: '/aplenty',
    name: '丰富',
    component: Main,
    meta: {icon: 'el-icon-menu'},
    redirect: '/aplenty/card',
    children: [
      {
        path: 'card',
        name: '卡片',
        component: () => import('@/views/aplenty/Card/index.vue')
      },
      {
        path: 'clock',
        name: '大屏时钟',
        component: () => import('@/views/aplenty/Clock/index.vue')
      },
      {
        path: 'businesscard',
        name: '生成名片',
        component: () => import('@/views/aplenty/Businesscard/index.vue')
      },
      {
        path: 'bright',
        name: '搜索高亮',
        component: () => import('@/views/aplenty/bright/index.vue')
      },
      {
        path: 'map',
        name: '地图',
        component: () => import('@/views/aplenty/Map/index.vue')
      },
      {
        path: 'virtuallist',
        name: '虚拟列表',
        component: () => import('@/views/aplenty/VirtualList/index.vue')
      },
      {
        path: 'drag',
        name: '拖拽',
        component: () => import('@/views/aplenty/Drag/index.vue')
      }
    ]
  },
  {
    path: '/miniprogram',
    name: '管理小程序',
    component: Main,
    meta: {icon: 'el-icon-s-promotion'},
    redirect: '/miniprogram/playlist',
    children: [
      {
        path: 'playlist',
        name: '歌单列表',
        component: () => import('@/views/miniprogram/playlist/index.vue')
      },
      {
        path: 'playlist/edit/:id',
        component: () => import('@/views/miniprogram/playlist/edit.vue'),
        name: '编辑歌单',
        hidden: true,
        meta: {activePath: '/miniprogram/playlist'}
      }, {
        path: 'swiper',
        component: () => import('@/views/miniprogram/swiper/index.vue'),
        name: '轮播图管理'
      }, {
        path: 'blog',
        component: () => import('@/views/miniprogram/blog/index.vue'),
        name: '博客管理'
      }
    ]
  },
  {
    path: '/relevant',
    name: '相关',
    component: Main,
    meta: {icon: 'el-icon-s-promotion'},
    redirect: '/relevant/version',
    children: [
      {
        path: 'version',
        name: '版本相关',
        component: () => import('@/views/Relevant/Version/index.vue')
      },
      {
        path: 'algorithm',
        name: '简单算法',
        component: () => import('@/views/Relevant/Algorithm/index.vue')
      }
    ]
  }
]
export const appRouterTest = [
  {
    path: '/',
    name: '首页',
    component: Main,
    redirect: '/home',
    meta: {icon: 'el-icon-s-home'},
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/base/Home/index.vue')
      }
    ]
  },
  {
    path: '/test',
    name: '测试',
    component: Main,
    redirect: '/test/test',
    meta: {icon: 'el-icon-smoking'},
    children: [
      {
        path: 'test',
        name: '测试',
        component: () => import('@/views/Relevant/Test/index.vue')
      }
    ]
  }
]
export const routers = [
  loginRouter
  // errorPage
  // ...appRouterAdmin
]
