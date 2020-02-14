<template>
  <div class="addMenu-index">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加一级菜单" name="first">
        <one-form></one-form>
      </el-tab-pane>
      <el-tab-pane label="添加二级菜单" name="second">
        <two-form></two-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OneForm from './components/oneForm'
import TwoForm from './components/twoForm'
export default {
  components: {
    OneForm,
    TwoForm
  },
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
