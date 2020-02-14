<template>
  <ul :style="{ transform: `rotate(${rotates * -30}deg)` }">
    <li
      v-for="(item, index) in hourList"
      :key="index"
      :class="{ hover: index == rotates - 1 || index == rotates - 13 }"
      :style="{transform: `rotate(${(index + 1) * 30}deg) translateX(270px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'hour',
  props: ['hour'],
  data () {
    return {
      rotates: '',
      hourList: [
        '一点',
        '二点',
        '三点',
        '四点',
        '五点',
        '六点',
        '七点',
        '八点',
        '九点',
        '十点',
        '十一点',
        '十二点'
      ]
    }
  },
  watch: {
    hour (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 7
</style>
