<template>
  <ul :style="{ transform: `rotate(${rotates * -11.613}deg)` }">
    <li
      v-for="(item, index) in dayList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
      :style="{transform:`rotate(${(index + 1)*11.6129}deg) translateX(120px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'day',
  props: ['day'],
  data () {
    return {
      rotates: '',
      dayList: [
        '一号',
        '二号',
        '三号',
        '四号',
        '五号',
        '六号',
        '七号',
        '八号',
        '九号',
        '十号',
        '十一号',
        '十二号',
        '十三号',
        '十四号',
        '十五号',
        '十六号',
        '十七号',
        '十八号',
        '十九号',
        '二十号',
        '二十一号',
        '二十二号',
        '二十三号',
        '二十四号',
        '二十五号',
        '二十六号',
        '二十七号',
        '二十八号',
        '二十九号',
        '三十号',
        '三十一号'
      ]
    }
  },
  watch: {
    day (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 4
</style>
