<template>
  <ul :style="{ transform: `rotate(${rotates * -6}deg)` }">
    <li
      v-for="(item, index) in secondList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
      :style="{transform:`rotate(${(index + 1) * 6}deg) translateX(390px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'second',
  props: ['second'], // 外面传过来的多少秒
  data () {
    return {
      rotates: '',
      secondList: [
        '零秒',
        '一秒',
        '二秒',
        '三秒',
        '四秒',
        '五秒',
        '六秒',
        '七秒',
        '八秒',
        '九秒',
        '十秒',
        '十一秒',
        '十二秒',
        '十三秒',
        '十四秒',
        '十五秒',
        '十六秒',
        '十七秒',
        '十八秒',
        '十九秒',
        '二十秒',
        '二十一秒',
        '二十二秒',
        '二十三秒',
        '二十四秒',
        '二十五秒',
        '二十六秒',
        '二十七秒',
        '二十八秒',
        '二十九秒',
        '三十秒',
        '三十一秒',
        '三十二秒',
        '三十三秒',
        '三十四秒',
        '三十五秒',
        '三十六秒',
        '三十七秒',
        '三十八秒',
        '三十九秒',
        '四十秒',
        '四十一秒',
        '四十二秒',
        '四十三秒',
        '四十四秒',
        '四十五秒',
        '四十六秒',
        '四十七秒',
        '四十八秒',
        '四十九秒',
        '五十秒',
        '五十一秒',
        '五十二秒',
        '五十三秒',
        '五十四秒',
        '五十五秒',
        '五十六秒',
        '五十七秒',
        '五十八秒',
        '五十九秒'
      ]
    }
  },
  watch: {
    second (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 9
</style>
