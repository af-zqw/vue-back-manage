<template>
  <div class="bright-index">
    <div class="search-box" @keyup.enter="search">
      <input type="text"
             v-model="keyword"
             class="input"
             placeholder="请输入搜索内容, 提示:搜索设备">
      <button class="btn"
              @click="search">
              搜索
      </button>
    </div>
    <div class="content-box">
      <div class="content-card" v-for="(item ,index) in resultList" :key="index">
        设备名称:<span v-html="item.name" style="color:#000;"></span>
        <span>日期:<span v-html="item.date"></span></span>
        <span>地址:<span v-html="item.adress"></span></span>
        <span>类型:<span v-html="item.type"></span></span>
      </div>
      <h2 v-if="isShowTip">没有搜索到匹配结果</h2>
    </div>
  </div>
</template>

<script>
import {getDeviceData} from '@/api/commonly'
export default {
  data () {
    return {
      keyword: '',
      mockList: [],
      resultList: [],
      isShowTip: false,
      resolve: null
    }
  },
  methods: {
    getMockData () {
      return getDeviceData({testParams: true})
        .then((res) => {
          // this.mockList = res.data.data.deviceList
          return Promise.resolve(res.data.data)
        })
    },
    search () {
      this.isShowTip = false
      this.getMockData().then((res) => {
        this.mockList = res.deviceList
      }).then(() => {
        if (this.keyword == '') {
          this.$message.warning('请输入搜索内容')
          return
        }
        this.resultList = []
        this.resultList.length = 0
        // this.mockList.map((item) => {
        //   item.name = this.brightKeyword(item, item.name)
        //   item.date = this.brightKeyword(item, item.date)
        //   item.adress = this.brightKeyword(item, item.adress)
        // })
        this.mockList.forEach((item) => {
          if (item.name.indexOf(this.keyword) > -1 ||
            item.date.indexOf(this.keyword) > -1 ||
            item.adress.indexOf(this.keyword) > -1 ||
            item.type.indexOf(this.keyword) > -1) {
            this.resultList.push(item)
          }
        })
        if (this.resultList.length == 0) {
          this.isShowTip = true
        }
        this.resultList.map((item) => {
          item.name = this.brightKeyword(item.name)
          item.date = this.brightKeyword(item.date)
          item.adress = this.brightKeyword(item.adress)
          item.type = this.brightKeyword(item.type)
        })
        // this.resolve()
      })
    },
    brightKeyword (val) {
      let keyword = this.keyword
      if (val.indexOf(keyword) !== -1) {
        return val.replace(keyword, `<font color='#409eff'>${keyword}</font>`)
      } else {
        return val
      }
    }
    // testfo () {
    //   return new Promise((resolve, reject) => {
    //     this.resolve = resolve
    //   }).then(() => {
    //     this.keyword = 'resolve用法' // 调用一次就会执行一次
    //   })
    // }
  },
  created () {
    // this.testfo()
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
