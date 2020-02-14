<template>
  <div class="tab-index">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-finished"></i> 插入标签</span>
        <one-table></one-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-open"></i> 插入开关</span>
        <two-table></two-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-bottom"></i>插入下拉列表</span>
        <there-table></there-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-aim"></i>筛选表格</span>
        <four-table></four-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OneTable from './components/OneTable'
import TwoTable from './components/TwoTable'
import ThereTable from './components/ThereTable'
import FourTable from './components/FourTable'
export default {
  components: {
    OneTable,
    TwoTable,
    ThereTable,
    FourTable
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
