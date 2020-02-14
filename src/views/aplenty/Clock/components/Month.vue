<template>
  <ul :style="{ transform: `rotate(${rotates * -30}deg)` }">
    <li
      v-for="(item, index) in monthList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
      :style="{transform:`rotate(${(index + 1)*30}deg) translateX(60px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'month',
  props: ['month'],
  data () {
    return {
      rotates: '',
      monthList: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
    }
  },
  watch: {
    month (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 3;
</style>
