<template>
  <div class="_index">
    <el-card class="_card">
      <list :listData="listData" @scroll="listScroll"></list>
    </el-card>
    <el-card class="_card">
      <h3>打开控制台查看列表项的DOM渲染</h3>
      <h4>滚动距离:{{scrollTop}}</h4>
      <h4>第一项:{{start}}</h4>
      <h4>最后一项:{{end}}</h4>
      <h4>偏移量:{{startOffset}}</h4>
    </el-card>
  </div>
</template>

<script>
import list from './components/list'

let listData = []
for (let i = 0; i < 1000; i++) {
  listData.push({ id: i, value: i })
}

export default {
  components: {
    list
  },
  data () {
    return {
      listData,
      info: {}
    }
  },
  computed: {
    scrollTop () {
      return this.info.scrollTop ? this.info.scrollTop : 0
    },
    start () {
      return this.info.start ? this.info.start : 0
    },
    end () {
      return this.info.end ? this.info.end - 1 : 0
    },
    startOffset () {
      return this.info.startOffset ? this.info.startOffset : 0
    }
  },
  methods: {
    listScroll (info) {
      this.info = info
    }
  }
}
</script>

<style lang="stylus" scoped>
vw(size)
  (size/13.66)vw
._index>>>.el-card__body
  height 500px
._card
  width 49%
  margin-right 1%
  float left
._card:nth-child(2n)
  margin-right 0
</style>
