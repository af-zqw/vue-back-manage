<template>
    <div class="echart-index" v-resize="resize">
        <line-char ref="lineChar"></line-char>
        <bar-char ref="barChar"></bar-char>
        <pie-char ref="pieChar"></pie-char>
    </div>
</template>
<script type="text/javascript">
import LineChar from './components/LineChar'
import BarChar from './components/BarChar'
import pieChar from './components/pieChar'
export default{
  components: {
    LineChar,
    BarChar,
    pieChar
  },
  directives: { // 使用局部注册指令的方式
    resize: { // 指令的名称
      bind (el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = ''
        let height = ''
        function isReize () {
          const style = document.defaultView.getComputedStyle(el)
          if (width !== style.width || height !== style.height) {
            binding.value()
          }
          width = style.width
          height = style.height
        }
        el.__vueSetInterval__ = setInterval(isReize, 500)
      },
      unbind (el) {
        clearInterval(el.__vueSetInterval__)
      }
    }
  },
  methods: {
    resize () {
      this.$refs.lineChar.drawLine()
      this.$refs.barChar.drawBar()
      this.$refs.pieChar.drawPieLeft()
      this.$refs.pieChar.drawPieRight()
    }
  }
}
</script>

<style type="text/css">
</style>
