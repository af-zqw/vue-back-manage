<template>
    <div class="menu-index">
      <el-scrollbar style="height:100%;">
          <div class="menu-logo">
            <i class="el-icon-sunrise"></i>LOGO
          </div>
          <el-menu
          class="el-menu-vertical-demo"
          background-color="rgb(48, 65, 86)"
          text-color="rgb(191, 203, 217)"
          active-text-color="rgb(64, 158, 255)"
          :default-active=activePath
          :collapse="isCollapse">
              <!-- <el-menu-item index="4" @click="chooseMenu(homeItem)">
                  <i class="el-icon-s-home"></i>
                  <span slot="title">{{homeItem.label}}</span>
              </el-menu-item>
              <el-submenu :index="item.index" v-for="(item,index) in menuList" :key="index">
                  <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.label}}</span>
                  </template>
                  <el-menu-item-group v-for="(itemInner,index) in item.group" :key="index">
                      <el-menu-item :index="itemInner.index"
                                  @click="chooseMenu(itemInner)"
                                  >
                                  {{itemInner.label}}
                      </el-menu-item>
                  </el-menu-item-group>
              </el-submenu> -->
              <el-menu-item v-for="item in firstFloorRoutes"
                            :key="item.redirect"
                            :index="item.redirect"
                            @click="choiceRoute(item.redirect)">
                <i :class="item.meta.icon"></i>
                <span>{{item.name}}</span>
              </el-menu-item>
              <el-submenu v-for="(item, index) in manyFloorRoutes" :key="index" :index="item.path">
                  <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item v-for="(innerItem,index) in item.children"
                                v-show="!innerItem.hidden"
                                :key="index"
                                :index="item.path+'/'+innerItem.path"
                                @click="choiceRoute(item.path+'/'+innerItem.path)">
                                {{innerItem.name}}
                  </el-menu-item>
              </el-submenu>
          </el-menu>
        </el-scrollbar>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'AfMenu',
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.getMenuList
    },
    routes () { // 显示在菜单的全部路由
      return this.$router.options.routes
    },
    firstFloorRoutes () { // 一层路由
      return this.routes.filter((item) => {
        return item.children.length === 1
      })
    },
    manyFloorRoutes () { // 多层路由，目前只能两层
      return this.routes.filter((item) => {
        return item.children.length > 1
      })
    },
    activePath () {
      return this.$route.path
    }
  },
  methods: {
    choiceRoute (path) {
      this.$router.push(path)
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>

<style lang="stylus" scoped>
.menu-index
    height 100%
.menu-index>>>.el-scrollbar__wrap
    overflow-x hidden;
</style>

<style type="text/css" scoped>
.menu-logo{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: rgba(64, 158, 255, 1);
}
.menu-logo i{
    font-size: 20px;
    color: rgba(255, 252, 64, 1);
}
.el-menu{
    border: 0;
}
.el-menu-vertical-demo>>>.el-submenu__title:hover{
    background:rgb(38,52,69) !important;
}
.el-menu-vertical-demo>>>li:hover{
    background:rgb(38,52,69) !important;
}
.el-menu-vertical-demo>>>.el-menu-item-group__title{
    padding:0 !important;
}
</style>
