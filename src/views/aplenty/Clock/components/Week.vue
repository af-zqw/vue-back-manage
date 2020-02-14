
<template>
  <ul :style="{ transform: `rotate(${rotates * -51.428}deg)` }">
    <li
      v-for="(item, index) in weekList"
      :key="index"
      :class="{ hover: index == rotates - 1 || index == rotates + 6 }"
      :style="{transform:`rotate(${(index + 1)*51.428}deg) translateX(180px)`}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'week',
  props: ['week'],
  data () {
    return {
      rotates: '',
      weekList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
    }
  },
  watch: {
    week (val) {
      this.rotates = val
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  z-index: 5;
</style>
