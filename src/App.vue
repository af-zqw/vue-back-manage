<template>
  <div id="app">
    <!-- 显示当前路由地址所对应的内容 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
@import './assets/styles/varibles.styl';
@import './assets/styles/common.styl';
</style>
