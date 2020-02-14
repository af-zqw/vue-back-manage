<template>
  <div class="drag-index">
    <el-button @click="dialogVisible=true" type="primary">开开弹窗</el-button>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               v-drag
               width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div style="margin-top:50px;display:flex;align-items:center;">
    <color-progress style="margin-left:50px;" :progress="75"
                    label="color-progress"
                    :circleRadius="90"
                    :circleWidth="8"
                    :lineWidth="14"
                    :graColor="['#0B24E6','#D51629','#D516BF','#8012D5']"
                    type="square"
                    >
    </color-progress>
    <color-progress :progress="60"
                    style="margin-left:70px;"
                    :lineWidth="12"
                    :isShowPoint="true"
                    :pointRadius="10"
                    type="square"
                    >
    </color-progress>
    <color-progress :progress="70"
                    style="margin-left:50px;"
                    baseColor="#EFE411"
                    :graColor="['#EF116D','#EF1118','#B411EF']"
                    :lineWidth="12"
                    :isShowPoint="true"
                    :pointRadius="10"
                    pointColor="#EF4511"
                    >
    </color-progress>
    <color-progress :progress="50" style="margin-left:50px;"></color-progress>
    </div>
  </div>
</template>

<script>
import {vDrag} from './drag'
import ColorProgress from 'vue-color-progress'
import AfProgress from '@/components/Common/Progress.vue'
export default {
  components: {
    ColorProgress,
    AfProgress
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  directives: {
    Drag: vDrag
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
vw(size)
  (size/13.66)vw
.drag-index
  background #fff
  padding vw(20)
</style>
