<template>
  <div class="card-index">
    <div style="overflow:hidden;">
      <div class="card-index-title">来自知乎</div>
      <div class="card" v-for="(item,index) in list" :key="index" @click="enterArticle(item)">
        <div class="card-img">
          <img :src="attachImageUrl(item.images[0])" alt="">
        </div>
        <el-tooltip effect="dark" :content=item.title placement="bottom">
          <div class="card-title">{{item.title}}</div>
        </el-tooltip>
      </div>
    </div>
    <div class="loadingBtn">
      <el-button type="text" icon="el-icon-arrow-down" @click="loadingMore">点击加载更多</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      list: [],
      date: '',
      onLoading: false
    }
  },
  methods: {
    // 修改图片链接
    attachImageUrl: function (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    // 获取前一天的时间
    reduceDate (date) {
      var y = date.substr(0, 4)
      var m = date.substr(4, 2)
      var d = date.substr(6, 2)
      var dateStr = [y, m, d].join('/')
      let newDate = new Date(dateStr)
      var preDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000)
      return preDate
    },
    loadingMore () {
      this.onLoading = true
      let preDate = this.reduceDate(this.date)
      let y = preDate.getFullYear()
      let m = preDate.getMonth() + 1
      m = m.toString().padStart(2, '0')
      let d = preDate.getDate()
      d = d.toString().padStart(2, '0')
      this.date = '' + y + m + d
      this.$axios.get('api/api/4/stories/before/' + this.date)
        .then((res) => {
          this.list = [...this.list, ...res.data.stories]
          this.onLoading = false
        }).catch(() => {
          this.onLoading = false
        })
    },
    ...mapActions(['addPopups']),
    enterArticle (item) {
      const id = `popus_${+new Date()}`
      this.$store.dispatch('addPopups', {
        id,
        url: '/aplenty/Card/popups/article.vue',
        params: {
          id: item.id
        },
        title: '文章详细',
        noTip: true
      })
      // this.addPopups( {
      //   id,
      //   url: '/aplenty/Card/popups/article.vue',
      //   params: {
      //     id: item.id
      //   },
      //   title: '文章详细',
      //   noTip: true
      // })
    }
  },
  created () {
    this.onLoading = true
    this.$axios.get('api/api/4/stories/latest')
      .then((res) => {
        this.list = res.data.stories
        this.date = res.data.date
        this.onLoading = false
      }).catch(() => {
        this.onLoading = false
      })
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
