<template>
  <div class="drawer-index">
    <el-row>
      <el-col span="5">
        <el-input placeholder="过滤树数据" v-model="filterText"></el-input>
        <div class="tree-box">
          <el-tree
            :data="treeData"
            ref="tree"
            node-key="id"
            default-expand-all
            @node-click="selectTree"
            :highlight-current="true"
            :expand-on-click-node="false"
            :filter-node-method="filterNode">
            <div class="tree-slot" slot-scope="{node,data}">
              <i :class="data.children?'el-icon-dish':'el-icon-fork-spoon'"></i>
              <span>{{data.label}}</span>
            </div>
          </el-tree>
          <el-alert type="info" :closable="false" show-icon>
            <span>当前选择:{{currentTitle}}</span>
          </el-alert>
        </div>
      </el-col>
    </el-row>

    <el-button type="primary" class="drawer-btn" @click="drawer=true">
      <span>打开抽屉<i class="el-icon-arrow-left"></i></span>
    </el-button>
    <transition name="slider">
      <div v-if="drawer" class="drawer-box">
        <el-button type="primary" class="clone-drawer" @click="drawer=false">
          <span>关闭抽屉<i class="el-icon-arrow-right"></i></span>
        </el-button>
        <div class="drawer-header">
          <span>数据管理</span>
        </div>
        <div class="drawer-content">
          <div class="one-box">
            <h3>一级数据</h3>
            <ul>
              <li v-for="(item,index) in treeData"
                  :key="index"
                  @click="chooseChildren(item,index)"
                  :class="{activeLi:currentIndex==index}">
                {{item.label}}<i class="el-icon-arrow-right"></i>
              </li>
            </ul>
          </div>
          <div class="two-box">
            <h3>二级数据</h3>
            <ul>
              <li v-for="(item,index) in childrenList" :key="index">
                <el-checkbox v-model="item.active">{{item.label}}</el-checkbox>
              </li>
            </ul>
          </div>
          <div class="opt-box">
            <h3>操作</h3>
            <div class="opt-btn">
              <button :disabled="disabledLeft"
                      @click="toLeft"
                      :class="{disabledBtn:disabledLeft}">
                      <i class="el-icon-arrow-left"></i>
              </button>
              <button @click="toRight"
                      :disabled="disabledRight"
                      :class="{disabledBtn:disabledRight}"
                      >
                      <i class="el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="there-box">
            <h3>存储数据</h3>
            <ul>
              <li v-for="(item,index) in initList" :key="index">
                <el-checkbox v-model="item.active">{{item.label}}</el-checkbox>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: '',
      currentTitle: '',
      drawer: false, // 控制抽屉的出现与隐藏
      currentIndex: null, // 当前选择的一级节点的index
      treeData: [ // 树形控件数据
        { id: '1', label: '一类', children: [{ id: '2', label: '烤串', active: false }, { id: '3', label: '竹鼠', active: false }] },
        { id: '4', label: '二类', children: [{ id: '5', label: '辣椒', active: false }, { id: '6', label: '青椒', active: false }] }
      ],
      childrenList: [], // 显示的二级数据，初始化时treeData某一项的的children
      initList: [ // 显示的存储数据
        { id: '7', label: '猪肝', active: false },
        { id: '8', label: '猪尾巴', active: false },
        { id: '9', label: '羊腰子', active: false },
        { id: '10', label: '茄子', active: false },
        { id: '11', label: '大蒜', active: false },
        { id: '12', label: '油菜', active: false }
      ],
      disabledLeft: true, // 禁用按钮
      disabledRight: true
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    chooseChildren (item, index) { // 在抽屉里面点击一级数据触发的事件
      this.childrenList = [...item.children] // 给二级数据赋值
      this.currentIndex = index // 保存现在的index
    },
    toRight () { // 点击向右按钮
      let selArr = this.childrenList.filter(item => item.active) // 返回选中的数据
      let noSelArr = this.childrenList.filter(item => !item.active) // 返回没选中的数据
      selArr.map(item => { // 拿到选中的数据的checkbox改成未选中的状态
        item.active = false
      })
      this.initList = this.initList.concat(selArr) // 拼接存储数据
      this.childrenList = [...noSelArr] // 这时的二级数据就等于剩下没选中的
      this.treeData[this.currentIndex].children = [...this.childrenList] // 跟树形控件数据联动
    },
    toLeft () {
      let selArr = this.initList.filter(item => item.active)
      let noSelArr = this.initList.filter(item => !item.active)
      selArr.map(item => {
        item.active = false
      })
      this.childrenList = this.childrenList.concat(selArr)
      this.initList = [...noSelArr]
      this.treeData[this.currentIndex].children = [...this.childrenList]
    },
    selectTree (data) {
      this.currentTitle = data.label
    }
  },
  watch: {
    childrenList: {
      handler: function (newValue) {
        let selArr = newValue.filter(item => item.active)
        if (selArr.length > 0) {
          this.disabledRight = false
        } else {
          this.disabledRight = true
        }
      },
      deep: true // 深度监听
    },
    initList: {
      handler: function (newValue) {
        let selArr = newValue.filter(item => item.active)
        if (selArr.length > 0) {
          this.disabledLeft = false
        } else {
          this.disabledLeft = true
        }
      },
      deep: true
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
