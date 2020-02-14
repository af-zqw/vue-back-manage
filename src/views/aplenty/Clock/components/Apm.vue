<template>
  <ul :style="{ transform: `rotate(${rotates * -30}deg)` }">
    <li
      v-for="(item, index) in apmList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
      :style="{transform:`rotate(${(index + 1)*30}deg) translateX(230px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'apm',
  props: ['apm'],
  data () {
    return {
      rotates: '',
      apmList: ['上午', '下午']
    }
  },
  watch: {
    apm (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 6
</style>
