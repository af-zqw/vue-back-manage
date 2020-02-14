<template>
  <div class="full" :title="fullCreen?'退出全屏':'点击全屏'">
    <Icon iconClass="qiehuan"
          :pointer="true"
          @click.native="getFullCreen"
          :color="getColor">
    </Icon>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'  //getters的语法糖
export default {
  data () {
    return {
      fullCreen: false
    }
  },
  computed: {
    ...mapGetters([  //对应getters里面的singer方法，等于直接拿到getters返回的数据，不用重新写一个计算属性
      'getColor'
    ]),
    // _color () {
    //   return this.$store.getters.getColor
    // }
  },
  methods: {
    getFullCreen () {
      this.fullCreen = !this.fullCreen
      this.fullCreen ? this.inFullCreen(document.documentElement) : this.outFullCreen(document)
    },
    inFullCreen (element) {
      let el = element
      let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
      if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    outFullCreen (element) {
      let el = element
      let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.full
  display inline-block
</style>
