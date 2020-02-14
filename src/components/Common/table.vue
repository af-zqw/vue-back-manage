<template>
  <div class="af-table">
    <el-table style="width:100%;"
              ref="table"
              v-loading="loading"
              :data="data"
              stripe
              tooltip-effect="dark"
              border>
      <el-table-column label="序号" type="index" width="70" align="center" v-if="settings.showIndex">
      </el-table-column>
      <el-table-column v-for="(item,index) in cols"
                       :width="item.width*scale"
                       :prop="item.prop"
                       :label="item.label"
                       :key="index"
                       :type="item.type"
                       align='center'>
        <template slot-scope="scope">
          {{scope.row[item.prop]}}
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AfTable',
  data () {
    return {
    }
  },
  props: {
    cols: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    settings: {
      type: Object,
      default () {
        return {
          showIndex: false
        }
      }
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/table.styl';
</style>
