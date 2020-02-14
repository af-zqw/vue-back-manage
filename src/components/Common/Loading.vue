<template>
  <div class="loading-index">
    <div class="loading-box">
      <span>loading...</span>
    </div>
    <i @click="closeLoading" class="el-icon-close"></i>
  </div>
</template>

<script>
export default {
  name:'AfLoading',
  data() {
    return {
      onLoading:true
    }
  },
  methods:{
    closeLoading() {
      this.onLoading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/loading.styl';
</style>
