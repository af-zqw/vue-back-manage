<template>
  <ul :style="{ transform: `rotate(${rotates * -6}deg)` }">
    <li
      v-for="(item, index) in minuteList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
      :style="{transform:`rotate(${(index + 1) * 6}deg) translateX(320px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'minute',
  props: ['minute'],
  data () {
    return {
      rotates: '',
      minuteList: [
        '一分',
        '二分',
        '三分',
        '四分',
        '五分',
        '六分',
        '七分',
        '八分',
        '九分',
        '十分',
        '十一分',
        '十二分',
        '十三分',
        '十四分',
        '十五分',
        '十六分',
        '十七分',
        '十八分',
        '十九分',
        '二十分',
        '二十一分',
        '二十二分',
        '二十三分',
        '二十四分',
        '二十五分',
        '二十六分',
        '二十七分',
        '二十八分',
        '二十九分',
        '三十分',
        '三十一分',
        '三十二分',
        '三十三分',
        '三十四分',
        '三十五分',
        '三十六分',
        '三十七分',
        '三十八分',
        '三十九分',
        '四十分',
        '四十一分',
        '四十二分',
        '四十三分',
        '四十四分',
        '四十五分',
        '四十六分',
        '四十七分',
        '四十八分',
        '四十九分',
        '五十分',
        '五十一分',
        '五十二分',
        '五十三分',
        '五十四分',
        '五十五分',
        '五十六分',
        '五十七分',
        '五十八分',
        '五十九分',
        ' 0分'
      ]
    }
  },
  watch: {
    minute (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 8
</style>
