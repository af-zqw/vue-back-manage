<template>
    <div style="height:100%;">
        <el-row style="height:100%;">
            <af-menu ref="menu"
                    :isCollapse="isCollapse"
                    :class="{isCollapse:isCollapse}"
                    class="af-menu">
            </af-menu>
            <div class="af-main" :class="{'active':isCollapse}">
                <div class="brand">
                    <i class="toggleIcon"
                       style="cursor:pointer"
                       :style="{color:_color}"
                       :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
                       @click="toggleMenu">
                    </i>
                    <span class="brand-name" :style="{color:_color}">
                        <i class="el-icon-headset"></i>
                        Af
                    </span>
                    <!-- 颜色选择组件 -->
                    <theme-picker class="theme-picker-component"></theme-picker>
                    <!-- 全屏切换组件 -->
                    <full-creen class="full-creen"></full-creen>
                    <el-dropdown trigger="click" @command="clickDropdown" class="exit-dropdown">
                        <span class="el-dropdown-link" :style="{color:_color}">
                            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="permission">切换权限</el-dropdown-item>
                            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="router-tab">
                  <scroll-pane>
                    <div class="tab-item"
                        v-for="(item,index) of tabList"
                        :key="index"
                        :class="{active:activePath==item.path}"
                        :style="{color:activePath==item.path?_color:''}"
                        @click="clickTag(item)">
                      <span>{{item.name}}</span>
                      <i class="el-icon-close"
                        @click.stop="delTab(item,index)"
                        v-if="index != 0 || tabList.length != 1">
                      </i>
                    </div>
                  </scroll-pane>
                </div>
              <div class="main-content">
                <el-scrollbar style="height:100%">
                  <div style="padding:20px;">
                    <!-- <component :is="component" class="main-component" :transmitData="transmitData"></component>
                     -->
                     <router-view :transmitData="transmitData"></router-view>
                  </div>
                </el-scrollbar>
              </div>
            </div>
        </el-row>
        <div class="alert" v-for="(item,index) in popupsList" :key=index>
			<div class="alert-body">
				<div class="alert-title">{{item.title}}<span v-if="!item.noTip" style="color:red;">(*为必填项)</span>
                    <div style="float:right;cursor:pointer;" @click='$store.dispatch("delPopups", item.id)'>
                        <i class="el-icon-close"></i>
                    </div>
                </div>
				<component :is="item.component"
                           :params="item.params"
                           :ID="item.id"
                           class="alert-main"
                           @transmit="transmit">
                </component>
			</div>
		</div>
        <af-loading v-if="loading"></af-loading>
    </div>
</template>

<script type="text/javascript">
import AfMenu from './Menu/index.vue'
import FullCreen from '@/components/Common/FullCreen.vue'
import ScrollPane from '@/components/Common/ScrollPane.vue'
import ThemePicker from '@/components/Common/ThemePicker.vue'
export default{
  components: {
    AfMenu,
    FullCreen,
    ScrollPane,
    ThemePicker
  },
  data () {
    return {
      component: '',
      transmitData: [],
      isCollapse: false,
      username: sessionStorage.getItem('token'),
      color: 'rgb(64, 158, 255, 1)',
      tabList: [] // 标签列表
    }
  },
  computed: {
    popupsList () {
      return this.$store.getters.getPopups
    },
    loading () {
      return this.$store.getters.getLoading
    },
    activePath () {
      return this.$route.path
    }
  },
  methods: {
    loadComponent: function (item) { // 加载组件
      // this.$router.push({
      //   name: 'main',
      //   query: {
      //     url: item.path
      //   }
      // })
      // import('@/components/' + item.path)
      //   .then((res) => {
      //     this.component = res.default
      //   }).then(() => {
      //     this.activePath = item.path
      //     let flag = true
      //     for (let i = 0, len = this.tabList.length; i < len; i++) {
      //       if (item.label === this.tabList[i].label) {
      //         flag = false
      //         break
      //       }
      //     }
      //     if (flag) {
      //       this.tabList.push(item)
      //     }
      //   })
    },
    clickTag (item) {
      this.$router.push(item.path)
    },
    delTab (item, index) {
      this.tabList.splice(index, 1)
      if (this.activePath === item.path) {
        if (index === 0) {
          this.$router.push(this.tabList[index].path)
        }
        this.$router.push(this.tabList[index - 1].path)
      }
    },
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    transmit (data) {
      this.transmitData = data
    },
    clickDropdown (command) {
      if (command === 'exit') {
        this.exitLogin()
      } else if (command === 'permission') {
        this.swichPermission()
      }
    },
    exitLogin () {
      this.$alertMsgBox(`确定要退出用户 ${this.username}吗?`)
        .then(() => {
          sessionStorage.removeItem('token')
          this.$router.push('/login')
        }).catch(() => {})
    },
    swichPermission () {
      this.$confirm('点击确定将退出当前账户，您可以注册新用户来测试数据权限', '切换权限', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        sessionStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {})
    },
    changeColor (color) {
      this.$store.commit('setColor', color)
    }
  },
  watch: {
    $route: { // 为了添加便签
      handler: function (to, from) {
        console.log(to.meta.type)
        let flag = this.tabList.some((item) => { // 过滤重复的
          if (item.name === to.name) {
            return true
          }
        })
        if (!flag && to.meta.type !== 'error') { // 404不添加
          this.tabList.push(to)
        }
      },
      deep: true
    }
  },
  created () {
    if (this.$route.meta.type !== 'error') { // 初始化添加第一个进来的页面到标签组
      this.tabList.push(this.$route)
    }
  },
  mounted () {
    // this.$refs.menu.initchooseMenu()
  }
}
</script>

<style type="text/css">
.main-content{
    box-sizing: border-box;
    height: calc(100% - 84px);
    position: relative;
    overflow: auto;
    overflow-x: hidden;
}
.main-component{
    position: relative;
}
</style>
<style lang="stylus" scoped>
.main-content>>>.el-scrollbar__wrap
  overflow-x hidden
</style>
