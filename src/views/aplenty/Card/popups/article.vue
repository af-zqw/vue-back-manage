<template>
  <div class="article-index">
    <div id="content_detail_body" v-html="this.attachBodyContent(content.body)"></div>
  </div>
</template>

<script>
export default {
  props:{
    params:{
      type:Object
    },
    ID:{
      type:String
    }
  },
  data() {
    return {
      content:{},
      onLoading:false
    }
  },
  watch:{
    onLoading() {
      this.$store.commit('setLoading',this.onLoading)
    }
  },
  methods:{
    //引入css
    setStyle: function (cssurl) {
      let linkCss = document.createElement('link')
      linkCss.href = cssurl
      // linkCss.setAttribute('type', 'text/css')
      linkCss.setAttribute('rel', 'stylesheet')
      linkCss.setAttribute('id', '#listcontent')
      document.getElementsByTagName('head')[0].appendChild(linkCss)
      // document.getElementById('listcontent').appendChild(linkCss)
    },
    // 修改axios得到的data中body里images的链接
    attachBodyContent: function (body) {
      if (body !== undefined) {
        return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
      }
    },
  },
  created() {
    this.onLoading = true
    this.$axios.get('/api/4/news/'+this.params.id)
      .then((res) => {
        this.content = res.data
        this.setStyle(res.data.css[0])
        this.onLoading = false
      }).catch(() => {
        this.onLoading = false
        this.$message.error('加载失败');
      })
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/article.styl';
</style>


