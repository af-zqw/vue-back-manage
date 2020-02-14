<template>
  <div class="err-404">
    <Icon iconClass="404" size="50px" :color="_color"></Icon>
    <span>您搜索的网页不存在</span>
  </div>
</template>

<script>
export default {
  computed: {
    _color () {
      return this.$store.getters.getColor
    }
  }
}
</script>
<style lang="stylus" scoped>
.err-404
  display flex
  align-items center
  span
    font-size 20px
    margin-left 10px
</style>
